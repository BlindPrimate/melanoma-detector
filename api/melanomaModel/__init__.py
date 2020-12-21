import numpy as np
import tensorflow as tf
import pandas as pd
import matplotlib.pyplot as plt
import pydicom as dicom
import pandas as pd
import numpy as np
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.linear_model import LogisticRegression
import pickle
import os

file_path = os.path.dirname(os.path.realpath(__file__))


def load_image_model():
    with open(os.path.join(file_path, 'model_patient_image.pkl'), 'rb') as file:
        model = pickle.load(file)
        return model

def load_patient_details_model():
    with open(os.path.join(file_path, 'model_patient_details.pkl'), 'rb') as file:
        model = pickle.load(file)
        return model


Patient_model = load_patient_details_model()
Image_model = load_image_model()


if __name__ == '__main__':
    arr = [[55,0,0,0,1,1,0]]
    print( Patient_model.predict(arr) )
    # print( Image_model.predict(arr) )

