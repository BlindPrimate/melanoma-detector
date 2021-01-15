import json
from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
import tensorflow as tf
from api.melanomaModel import load_patient_details_model
from api.melanomaModel import load_image_model
from api.melanomaModel import load_df
from api.melanomaModel import get_df_columns
import pydicom as dicom


app = Flask(__name__)
CORS(app)

# model loading
image_model = load_image_model()
patient_details_model = load_patient_details_model()


@app.route('/api/submit', methods=['post'])
def submit_info():
    patient_dict_keys = get_df_columns()
    patient_dict_values = [0 for i in range(len(patient_dict_keys))]

    patient_dict = dict(zip(patient_dict_keys, patient_dict_values))
    df = load_df()
    image = request.files['image']
    image = dicom.dcmread(image)
    pixels = image.pixel_array
    flattened_image = [pixels.flatten()]
    processed_image = tf.keras.preprocessing.sequence.pad_sequences(
        flattened_image,
        maxlen=720,
        dtype="int32",
        padding="pre",
        truncating="pre",
        value=0
    )
    form_data = json.loads(request.form['patientData'])
    # assign values to patient_dict from form submission
    patient_dict['age'] = form_data['age']

    if form_data['sex'] == 'male':
        patient_dict['sex_male'] = 1

    if form_data['location'] == 'arm':
        patient_dict['site_upper extremity'] = 1
    elif form_data['location'] == 'leg':
        patient_dict['site_lower extremity'] = 1
    elif form_data['location'] == 'torso':
        patient_dict['site_torso'] = 1

    patient_dict['diagnosis_unknown'] = 1

    df = df.append(patient_dict, ignore_index=True)
    detail_result = patient_details_model.predict_proba(df)
    detail_result = detail_result[0]

    image_result = image_model.predict_proba(processed_image)
    image_result = image_result[0]

    print(df)
    print("Image model: " + str(image_result))
    print("Details model: " + str(detail_result))

    final_result = round(detail_result + image_result / 2)


    return jsonify(result=str(final_result))


if __name__ == '__main__':
    app.run()