from websockets.sync.client import connect

def hello():
    with connect("ws://localhost:59898") as websocket:
        websocket.send("Hello python here")

        # message = websocket.recv()
        # print(f"Received: {message}")

hello()