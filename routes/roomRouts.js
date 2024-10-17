import express from "express";
import { getRooms, getRoombyId, createRooms, updateRooms, deleteRooms } from "../controllers/roomControllers.js";

const roomRouter = express.Router();

roomRouter.post("/", createRooms);
roomRouter.delete("/:roomId", deleteRooms);
roomRouter.get("/", getRoombyId);
roomRouter.get("/:roomId", getRooms);
roomRouter.put("/:roomId", updateRooms);


export default roomRouter