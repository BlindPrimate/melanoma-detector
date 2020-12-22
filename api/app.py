
from flask import Flask
from flask import request, jsonify
from random import getrandbits
from flask_cors import CORS
import tensorflow as tf
from api.melanomaModel import Patient_model
from api.melanomaModel import Image_model
import pydicom as dicom


app = Flask(__name__)
CORS(app)


@app.route('/api/submit', methods=['post'])
def submit_info():
    print(request.form)
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
    image_result = Image_model.predict(processed_image)
    print(image_result[0])

    # return jsonify(result="boop")
    return jsonify(result=str(image_result[0]))


@app.route('/api', methods=['get'])
def test():
    return "Boom"

if __name__ == '__main__':
    app.run()