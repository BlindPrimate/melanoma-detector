import json
from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
import pandas as pd
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

    return jsonify(result=str(image_result[0]))

@app.route('/api/details/submit', methods=['post'])
def submit_details():
    patient_dict_keys = get_df_columns()
    patient_dict_values = [0 for i in range(len(patient_dict_keys))]

    patient_dict = dict(zip(patient_dict_keys, patient_dict_values))
    df = load_df()
    print(df)
    form_data = json.loads(request.form['patientData'])

    # assign values to patient_dict from form submission
    patient_dict['age'] = form_data['age']
    locations = ["site_head/neck", "site_upper extremity", "site_torso", "site_lower extremity"]
    # diagnoses = ["diagnosis_unknown", "diagnosis_nevus", "diagnosis_melanoma"]

    form_data['sex'] = int(form_data['sex'])

    target_location = locations[int(form_data['location'])]
    patient_dict[target_location] = 1

    # target_diagnosis = diagnoses[int(form_data['diagnosis'])]
    # patient_dict[target_diagnosis] = 1

    print(patient_dict)

    df = df.append(patient_dict, ignore_index=True)
    detail_result = patient_details_model.predict(df)
    print(df)
    print(detail_result)

    return jsonify(result=str(detail_result[0]))


if __name__ == '__main__':
    app.run()
    # print(get_age_cancer_rate_data())