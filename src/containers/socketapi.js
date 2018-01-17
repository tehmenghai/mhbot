import io from 'socket.io-client'

class SocketConnect {

    constructor(socketName) {
        this.socketName = socketName
        this.socket = ''
    }

    connectSocket(url) {
        // connect this socket to my socket server
        this.socket = io(url)
    }

    disconnectSocket() {
        if(this.socket) {
            // close the socket
            this.socket.close()
        }
    }

    subscribe(channelName, callback) {
        if (this.socket) {
            // subscribe for listening future event
            this.socket.on(channelName, callback)
        }
    }

    socketEmit(channelName, data) {
        if (this.socket) {
            // emit to a socket channel
            this.socket.emit(channelName, data)
        }
    }

}

export default SocketConnect