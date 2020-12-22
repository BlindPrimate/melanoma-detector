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

df = pd.read_csv(os.path.join(file_path, "data", "siim-isic-melanoma-classification", "train.csv"))


def load_df():
    with open(os.path.join(file_path, 'dataframe.pkl'), 'rb') as file:
        df = pickle.load(file)
        return df

def load_image_model():
    with open(os.path.join(file_path, 'model_patient_image.pkl'), 'rb') as file:
        model = pickle.load(file)
        return model

def load_patient_details_model():
    with open(os.path.join(file_path, 'model_patient_details.pkl'), 'rb') as file:
        model = pickle.load(file)
        return model

# pd.set_option('display.max_columns', None)

Patient_model = load_patient_details_model()
Image_model = load_image_model()
# df = load_df()
# new_row = {
#     "site_torso": 0,
#     "site_lower extremity": 0,
#     "site_upper extremity": 1,
#     "sex_male": 0,
#     "age_approx": 55
# }
# df = df.append(new_row, ignore_index=True)
#
# print(df)
# print(Patient_model.predict([df.iloc[0]]))


