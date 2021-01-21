import json
from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
import tensorflow as tf
from api.melanomaModel import load_patient_details_model
from api.melanomaModel import load_image_model
from api.melanomaModel import load_df
from api.melanomaModel import get_df_columns
from api.melanomaModel import get_age_cancer_rate_data, get_location_cancer_rate_data
from api.melanomaModel import get_image_model_data, get_details_model_data
import pydicom as dicom


app = Flask(__name__)
CORS(app)

# model loading
image_model = load_image_model()
patient_details_model = load_patient_details_model()

@app.route('/api/charts', methods=['get'])
def get_charts():
    data = {
        "age": get_age_cancer_rate_data(),
        "location": get_location_cancer_rate_data(),
        "details": get_details_model_data(),
        "images": get_image_model_data(),
    }
    return jsonify(data)

@app.route('/api/image/submit', methods=['post'])
def submit_image():
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

    image_result = image_model.predict(processed_image)

    return jsonify(result=str(image_result))

@app.route('/api/details/submit', methods=['post'])
def submit_details():
    patient_dict_keys = get_df_columns()
    patient_dict_values = [0 for i in range(len(patient_dict_keys))]

    patient_dict = dict(zip(patient_dict_keys, patient_dict_values))
    df = load_df()
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
    detail_result = patient_details_model.predict(df)


    return jsonify(result=str(detail_result))


if __name__ == '__main__':
    app.run()
    # print(get_age_cancer_rate_data())