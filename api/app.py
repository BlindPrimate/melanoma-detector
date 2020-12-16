
from flask import Flask
from flask import request
from random import getrandbits

app = Flask(__name__)

@app.route('/api/submit', methods=['post'])
def submit_info():
    hash = getrandbits(32)
    f = request.files['image']
    file_path = '../data/' + str(hash) + ".dcm"
    f.save(file_path)
    return file_path

@app.route('/api', methods=['get'])
def test():
    return "Boom"

if __name__ == '__main__':
    app.run()