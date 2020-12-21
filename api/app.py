
from flask import Flask
from flask import request, jsonify
from random import getrandbits
from flask_cors import CORS
from api.melanomaModel import Patient_model
from api.melanomaModel import Image_model

app = Flask(__name__)
CORS(app)


@app.route('/api/submit', methods=['post'])
def submit_info():
    return(jsonify(request.json))
    # hash = getrandbits(32)
    # f = request.files['image']
    # file_path = '../data/' + str(hash) + ".dcm"
    # f.save(file_path)
    # return file_path

@app.route('/api', methods=['get'])
def test():
    return "Boom"

if __name__ == '__main__':
    # Patient_model.predict([55, 0, 0, 0, 1, 1, 0])
    Image_model.predict([55,0,0,0,1,1,0])
    # app.run()