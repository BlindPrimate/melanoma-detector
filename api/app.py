
from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
import tensorflow as tf
from api.melanomaModel import load_patient_details_model
from api.melanomaModel import load_image_model
from api.melanomaModel import load_df
import pydicom as dicom


app = Flask(__name__)
CORS(app)

# model loading
df = load_df()
image_model = load_image_model()
patient_details_model = load_patient_details_model()


@app.route('/api/submit', methods=['post'])
def submit_info():
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


if __name__ == '__main__':
    app.run()