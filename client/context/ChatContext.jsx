import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";


export const ChatContext = createContext();

export const ChatProvider = ({ children })=>{

const [messages, setMessages] = useState([]);
const [users, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);
const [unseenMessages, setUnseenMessages] = useState({})

const {socket, axios} = useContext(AuthContext);

//function to get all users for sidebar
const getUsers = async() =>{
    try {
       const { data } = await axios.get("/api/messages/users");
       if(data.success){
        setUsers(data.users)
        setUnseenMessages(data.unseenMessages)
       }
    } catch (error) {
        toast.error(error.message)
    }
}

//funcction to get messages for selected user
const getMessages = async(userId)=>{
    try {
       const { data } = await axios.get(`/api/messages/${userId}`);
       if(data.success){
        setMessages(data.messages)
        // mark unseen for this conversation as read in UI
        setUnseenMessages((prev) => ({
          ...prev,
          [userId]: 0,
        }))
       }
    } catch (error) {
        toast.error(error.message)
    }
}

//function to send meessages to selected user
const sendMessage = async (messageData)=>{
     try {
        const{ data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
        if(data.success){
            setMessages((prevMessages)=>[...prevMessages, data.newMessage])
        }else{
            toast.error(data.message);
        }
     } catch (error) {
        toast.error(error.message);
     }
}

//function to subscribe to messages for selected user
const subscribeToMessages = async () =>{
   if(!socket) return;

   socket.on("newMessage", (newMessage)=>{
    if(selectedUser && newMessage.senderId === selectedUser._id){
          newMessage.seen = true;
          setMessages((prevMessages)=> [...prevMessages, newMessage])
          axios.put(`/api/messages/mark/${newMessage._id}`);
          setUnseenMessages((prev) => ({
            ...prev,
            [selectedUser._id]: 0,
          }))
    } else {
        setUnseenMessages((prevUnseenMessages)=>(({
            ...prevUnseenMessages,
            [newMessage.senderId]: prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1 : 1,
        })))
    }
   })
}

//function to unsubscribe from messages
const unsubscribeFromMessages = ()=>{
    if(socket) socket.off("newMessage");
}

useEffect(()=>{
    subscribeToMessages();
    return ()=> unsubscribeFromMessages();
},[socket, selectedUser])

const value = {
      messages, users, selectedUser, getUsers, getMessages, sendMessage, setSelectedUser, unseenMessages, setUnseenMessages
}
    return (
        <ChatContext.Provider value={value}>
            { children }
        </ChatContext.Provider>
    )
}