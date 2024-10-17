import room from "../models/rooms.js";
import {isAdminValid} from "../controllers/userControllers.js"

export function createRooms(req,res){
    if(!isAdminValid(req)){
        res.status(403).json({
            message : "Unauthorized"
        })
        return
}

const newRoom = new room(req.body)
newRoom.save().then(
    (result)=>{
        res.json({
            message : "Room created successfully",
            result : result
        })
    }
).catch(
    (err)=>{
        res.status(500).json({
            message : "Room creation failed",
            error : err
        })
    }
)

}

// delete room
export function deleteRooms(req,res){

    if(!isAdminValid(req)){
        res.status(403).json({
            message : "Unauthorized"
        })
        return
    }

    const roomId = req.params.roomId
    room.deleteOne({roomId : roomId}).then(
        ()=>{
            res.json({
                message : "Room deleted successfully"
            })
        }
    ).catch(
        (err)=>{
            res.json({
                message : "Room deletion failed",
                error : err
            })
        }
    )
}


//getrooms
export function getRoombyId(req,res){

    const roomId = req.params.roomId
    room.findOne({roomId : roomId}).then(
        (result)=>{
            if(result == null){
                res.json({
                    message : "Room not found"
                })
            }else{
                res.json({
                    message : "Room found",
                    result : result
                })
            }
        }
    ).catch(
        (err)=>{   
            res.json({
                message : "Room search failed",
                error : err
            })
        }
    )

}

//get all rooms

export function getRooms(req,res){
    room.find().then(
        (result)=>{
            res.json({
                Rooms : result
            })
        }
    ).catch(
        (err)=>{   
            res.json({
                message : "Rooms not found",
                error : err
            })
        }
    )
}


//update rooms

export function updateRooms(req,res){

    if(!isAdminValid(req)){
        res.status(403).json({
            message : "Unauthorized"
        })
        return
    }

    const roomId = req.params.roomId
    room.updateOne({roomId : roomId},req.body).then(
        (result)=>{
            res.json({
                message : "Room updated successfully",
                result : result
            })
        }
    ).catch(
        (err)=>{
            res.json({
                message : "Room update failed",
                error : err
            })
        }
    )

}