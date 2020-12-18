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

import os

file_path = os.path.dirname(os.path.realpath(__file__))
data_path = os.path.join(file_path, "data", "siim-isic-melanoma-classification")


df = pd.read_csv(os.path.join(data_path, "train.csv"))

print(df.head())

images = []
for x in df['image_name']:
    image = os.path.join(data_path, 'train',  x + '.dcm')
    ds = dicom.dcmread(image)
    pixels = ds.pixel_array
    images.append(pixels.flatten())

images = tf.keras.preprocessing.sequence.pad_sequences(
  images,
  maxlen = 720,
  dtype = "int32",
  padding = "pre",
  truncating = "pre",
  value = 0
)

if __name__ == '__main__':
    pass
