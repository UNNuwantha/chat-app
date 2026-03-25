import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import { getMessages, getUserForSidedbar, markMessageAsSeen, sendMessage } from '../controllers/messageCntroller.js';


const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUserForSidedbar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("/mark/:id", protectRoute, markMessageAsSeen);
messageRouter.post("/send/:id", protectRoute, sendMessage);

export default messageRouter;