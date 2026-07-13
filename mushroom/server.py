import socket

# 1. Create a TCP socket
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    # 2. Bind to an address and port (65432 is just a random high number)
    s.bind(('127.0.0.1', 65432)) 
    # 3. Start listening for incoming connections
    s.listen()
    print("Server is listening...")
    # 4. Accept a connection from a client
    conn, addr = s.accept()
    with conn:
        print(f"Connected by {addr}")
        while True:
            data = conn.recv(1024)
            if not data: break
            
            # DECODE the bytes into a string and print it
            message = data.decode('utf-8')
            print(f"Client sent: {message}")
            
            conn.sendall(data) # This sends it back to the client

