import sys
import json
from predictModel import predict

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    result = predict(input_data)
    print(json.dumps({"prediction": result}))
