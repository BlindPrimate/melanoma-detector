import requests
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
image_path = os.path.join(dir_path, os.path.abspath('..'), 'data', 'images')

base_url = 'https://isic-archive.com/api/v1/'
image_url = 'image/'

url_params = '?limit=500&sort=name&sortdir=1&detail=true'


def _get_and_sort_image_data():
    # get image list from api and sort by benign an malignant
    images = {'benign': [], 'malignant': []}
    response = requests.get(base_url + image_url + url_params)
    image_list = response.json()
    for image in image_list:
        if image['meta']['clinical']['benign_malignant'] == 'benign':
            images['benign'].append(image)
        elif image['meta']['clinical']['benign_malignant'] == 'malignant':
            images['malignant'].append(image)
    return images


def get_image(id, target_directory):
    response = requests.get(base_url + image_url + id + '/download')
    with open(os.path.join(target_directory, id + '.jpg'), 'wb') as f:
        f.write(response.content)

if __name__ == '__main__':
    images = _get_and_sort_image_data()
    malignant_dir = os.path.join(image_path, 'malignant')
    benign_dir = os.path.join(image_path, 'benign')
    for image in images['malignant']:
        get_image(image['_id'], malignant_dir)
    for image in images['benign']:
        get_image(image['_id'], benign_dir)
