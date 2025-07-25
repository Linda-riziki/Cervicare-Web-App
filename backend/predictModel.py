import pickle
import numpy as np

# Load model only once
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

def predict(data):
    """
    data: dict like {'age': '31-40', 'partners': '2-3', 'hpv': 'positive', 'pap': 'abnormal'}
    returns: prediction (e.g., 0 or 1) or risk level
    """
    # Map data to numerical values (adjust based on how the model was trained)
    mapping = {
        'age': {
            '18-25': 1, '26-30': 2, '31-40': 3,
            '41-50': 4, '51-60': 5, '60+': 6
        },
        'partners': {
            '0-1': 1, '2-3': 2, '4-6': 3, '7+': 4
        },
        'hpv': {
            'negative': 0, 'positive': 1, 'never': 2, 'unknown': 3
        },
        'pap': {
            'normal': 0, 'abnormal': 1, 'never': 2, 'overdue': 3
        }
    }

    features = [
        mapping['age'][data['age']],
        mapping['partners'][data['partners']],
        mapping['hpv'][data['hpv']],
        mapping['pap'][data['pap']],
    ]

    X = np.array([features])
    prediction = model.predict(X)
    return int(prediction[0])
