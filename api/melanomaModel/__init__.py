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

pd.set_option('max_columns', None)

def get_details_model_data():
    pass

def get_image_model_data():
    pass

def get_age_cancer_rate_data():
    data = df[df['target'] == 1]
    total_patients = len(df.index)
    men, women = data.groupby('sex').size()
    results = {
        "total": total_patients,
        "sex": {
            "male": men,
            "female": women
        }
    }
    return results

def get_location_cancer_rate_data():
    pass

def get_df_columns():
    with open(os.path.join(file_path, 'columns.txt'), 'rb') as file:
        columns = pickle.load(file)
        return columns

def load_df():
    columns = get_df_columns()
    return pd.DataFrame(columns=columns)

def load_image_model():
    with open(os.path.join(file_path, 'model_patient_image.pkl'), 'rb') as file:
        model = pickle.load(file)
        return model

def load_patient_details_model():
    with open(os.path.join(file_path, 'model_patient_details.pkl'), 'rb') as file:
        model = pickle.load(file)
        return model





