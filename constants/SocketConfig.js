import { io } from "socket.io-client";
import AsyncStorage from '@react-native-async-storage/async-storage';

let serverURL = "http://185.148.147.83:3002"
const getTokenFromAsyncStorage = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.log('Error retrieving token from AsyncStorage:', error);
    return null;
  }
};

export const connectToSocket = async () => {
  const token = await getTokenFromAsyncStorage();
  if (token) {
    const socket = io(serverURL, {
      // query: { token },

      transports: ["websocket"],
      autoConnect: false,
      reconnection: false,
      auth: {
        // how to pass token here from AsyncStorage   
        token: token
      }
      //'147|MA2oZQrnB3tFg3R9UbfrAXnLoYVQtNr6l0dpgVlf'

    });

    // Add event listeners and handle socket logic here
    if (socket.connected == true) {
      console.log("null")
    } else {
      socket.on('connect', () => {
        console.log('Connected to server');
      });

      socket.on('NewOrder', (data) => {
        console.log('Received message:', data);

      });

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });
    }
    return socket;
  }

  return null;
};
const listentoNewOrder = (socket) => {
  console.log('listentoNewOrder')
  console.log('socket', socket)

  socket.on("NewOrder", (args) => {
    // ...
    // setnewReqestModal(true)
    // console.log({ args })
    // setRequestes(args)
  });
}
const disconnect = async (socket) => {
  console.log({ socket })
  setsocketState(socket)
  socket.removeAllListeners("NewOrder");
  // for all events
  socket.removeAllListeners();
  socket.disconnect == true ? null
    : console.log('disconnect---->')
    socket.disconnect()
    socket.on("disconnect", () => {
    console.log(socket); // undefined
  });
  socket.close()
}
