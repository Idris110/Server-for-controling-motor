from websockets.sync.client import connect
import json

payload = {
    "from":"rasp", 
    "data1":"31",  
    "data2":"87", 
    "data3":"1442.23"
}

def hello():
    with connect("ws://localhost:59898") as websocket:
        websocket.send(json.dumps(payload))

        # message = websocket.recv()
        # print(f"Received: {message}")

hello()