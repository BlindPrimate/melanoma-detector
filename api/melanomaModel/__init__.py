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
chart_details_arr = pickle.load(open(os.path.join(file_path, "chart_data", "details_comparison.txt"), 'rb'))
image_details_arr = pickle.load(open(os.path.join(file_path, "chart_data", "image_comparison.txt"), 'rb'))
cancer_positive_patients = df[df['target'] == 1]
cancer_positive_patients = cancer_positive_patients.rename(columns={'anatom_site_general_challenge': 'location'})

pd.set_option('max_columns', None)

def get_details_model_data():
    return {
        "labels": chart_details_arr[0],
        "count": chart_details_arr[1]
    }

def get_image_model_data():
    return {
        "labels": image_details_arr[0],
        "count": image_details_arr[1]
    }

def get_age_cancer_rate_data():
    data = cancer_positive_patients.reindex(columns=['age_approx'])
    ages = data.value_counts().sort_index(inplace=False)
    return {
        "labels": [i[0] for i in ages.index.values],
        "count": ages.values.tolist()
    }

def get_location_cancer_rate_data():
    data = cancer_positive_patients.reindex(columns=['location'])
    locations = data.value_counts()
    return {
        "labels": [i[0] for i in locations.index.values],
        "count": locations.values.tolist()
    }

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





