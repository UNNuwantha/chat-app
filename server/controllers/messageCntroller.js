import Message from "../models/Message";
import User from "../models/User";


//Get all users expcept the logged in user
export const getUserForSidedbar = async (req, res)=>{
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password");

        //count number of messages not seen 
        const unseenMessages = {}
        const promises = filteredUsers.map(async (user)=>{
          const messages = await Message.find({sender: user._id, receiverId: userId, seen: false})
          if(messages.length > 0){
            unseenMessages[user._id] = messages.length;
          }
        })
        await Promise.all(promises);
        res.json({success: true, users: filteredUsers, unseenMessages})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}