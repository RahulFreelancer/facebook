import { applySession } from "next-iron-session";
import Notification from "../../../dbModel/apiNotification";
import cookieInfo from "../../../utils/cookie";
import database from "../../../utils/dbConnect";



database.connect();


const deleteNoti=async(req,res)=>{
    const {username,notiId}=req.body;
    try {
        const notiDb=await Notification.findOne({username});
       notiDb.notifications= notiDb.notifications.filter((noti)=>{return noti.notiId!==notiId})
    await new Notification(notiDb).save();
    return res.send('noti deleted successfully')
    } catch (e) {
        console.log(e.message)
       return res.status(501).send('internal server error')
    }
}

const readNoti=async(req,res)=>{
    const {username,notiId}=req.body;
    try {
        const notiDb=await Notification.findOne({username});
        notiDb.notifications.find((noti)=>{
            if(noti.notiId===notiId){
               return noti.read=true;
            }})
    await new Notification(notiDb).save();
    return res.send('noti read by user')
    } catch (e) {
        console.log(e.message)
       return res.status(501).send('internal server error')
    }
}


const readAllNoti=async(req,res)=>{
    const {username,notiId}=req.body;
    try {
        const notiDb=await Notification.findOne({username});
        notiDb.notifications.map((noti)=>{
       return noti.read=true;
})
    await new Notification(notiDb).save();
    return res.send('all Noti read by user')
    } catch (e) {
        console.log(e.message)
       return res.status(501).send('internal server error')
    }
}

const unReadNoti=async(req,res)=>{
    const {username,notiId}=req.body;
    try {
        const notiDb=await Notification.findOne({username});
        notiDb.notifications.find((noti)=>{
            if(noti.notiId===notiId){
               return noti.read=false;
            }})
    await new Notification(notiDb).save();
    return res.send('noti unread by user')
    } catch (e) {
        console.log(e.message)
       return res.status(501).send('internal server error')
    }
}

const unReadAllNoti=async(req,res)=>{
    const {username,notiId}=req.body;
    try {
        const notiDb=await Notification.findOne({username});
        notiDb.notifications.map((noti)=>{
       return noti.read=false;
})
    await new Notification(notiDb).save();
    return res.send('all Noti Unread by user')
    } catch (e) {
        console.log(e.message)
       return res.status(501).send('internal server error')
    }
}





export default async (req, res) => {
    await applySession(req, res, cookieInfo);
    if (!req.session || !req.session.get("user")) {
      return res.status(403).send("unathorized");
    }
const {typeOfAction} = req.query;
if(typeOfAction){
switch (typeOfAction)
{
    case 'deleteNoti':{return deleteNoti(req,res)}
    case 'readNoti':{return readNoti(req,res)}
    case 'readAllNoti':{return readAllNoti(req,res)}
    case 'unReadNoti':{return unReadNoti(req,res)}
    case 'unReadAllNoti':{return unReadAllNoti(req,res)}
    default: {
        return res.status(400).end();
      }
}}
}