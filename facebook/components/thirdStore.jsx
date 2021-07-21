import { React, Component } from "react";
import http from "../utils/http";
import ThirdStoreContext from "../utils/thirdStoreContext";

class ThirdStore extends Component {


    handleUpdateLatestFeedObjects=async(username)=>{
        const store = {...this.state};
try {
    const {data} = await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/getAllFeedObj`,{
        username
    })
    store.latestFeedObjects=data
    this.setState(store)
} catch (error) {
    console.log(error.message);
}
    }


    handleUpdateLatestFeedObjectsFromSocket=(obj)=>{
        const store = {...this.state};
        store.latestFeedObjects=obj
        this.setState(store)

    }
handleUpdateAllNotification=async(username)=>{
    const store = {...this.state};
    try {
        const {data}=await http.post(`${process.env.NEXT_PUBLIC_API}/notiApi/getAllNoti`,
        {username});
        // console.log(data);
        
        store.allNoti=data.sort(function(a, b){
            return new Date(b.date) - new Date(a.date);})
     
        this.setState(store);
    } catch (e) {
        console.log(e.message)
    }
}

handleUpdateAllNotiBySocket=(args)=>{
    const store = {...this.state};
    store.allNoti=args.notifications.sort(function(a, b){
        return new Date(b.date) - new Date(a.date);})
    store.newNoti=args.newNoti;
    this.setState(store);
}

handleUpdateNewNotiData=(obj)=>{
    const store = {...this.state};
    store.allNoti=obj.notifications;
    if(obj.newNoti>store.newNoti){
        store.showNotiBadge=true;   
}
    store.newNoti=obj.newNoti;

this.setState(store);
}
handleUpdateNotiToShow=(notifications)=>{
        const store = {...this.state};
        store.notiToShow=notifications
        this.setState(store);
}


handleUpdateNewNotiNumber=async(username)=>{
    const store = {...this.state}
    // console.log(store.newNoti);
    try {
        const {data}=
            await http.post(`${process.env.NEXT_PUBLIC_API}/notiApi/getAllNoti?newNoti=true`,{username})
        store.newNoti=data;
        this.setState(store);
    } catch (error) {
        console.log(error.message);
    }
}

handleUpdateNewNotiToZero=()=>{
    const store = {...this.state}
    store.newNoti=0
    this.setState(store);
   
}



updateNoti=async(username,notiId,apiEndPoint)=>{
    try {
        const {data}=await http.post(`${process.env.NEXT_PUBLIC_API}/notiApi/editNoti?typeOfAction=${apiEndPoint}`,{username,notiId})
//    console.log(data)
    } catch (e) {
        console.log(e.message);
    }
}

handleDeleteNoti=(username,notiId)=>{
    const store = {...this.state}
    store.allNoti=store.allNoti.filter((noti)=>{
        return noti.notiId!==notiId})
    this.setState(store);
    this.updateNoti(username,notiId,'deleteNoti')
}

handleReadNoti=(username,notiId)=>{
    const store = {...this.state}
store.allNoti.find((noti)=>{
        if(noti.notiId===notiId){
           return noti.read=true;
        }})
        this.setState(store)
 this.updateNoti(username,notiId,'readNoti')
}
handleReadAllNoti=(username,notiId)=>{
    const store = {...this.state}
    store.allNoti.map((noti)=>{
    return noti.read=true}
        )
        this.setState(store)
        this.updateNoti(username,notiId,'readAllNoti')
}
handleUnReadNoti=(username,notiId)=>{
    const store = {...this.state}
    store.allNoti.find((noti)=>{
        if(noti.notiId===notiId){
           return noti.read=false;
        }})
        this.setState(store)
        this.updateNoti(username,notiId,'unReadNoti')
}
handleUnReadAllNoti=(username,notiId)=>{
    const store = {...this.state}
    store.allNoti.map((noti)=>{
    return noti.read=false}
        )
        this.setState(store)
        this.updateNoti(username,notiId,'unReadAllNoti')
}

handleUpdateAllChat=async(arg)=>{
    const store={...this.state}
store.allChat=arg.allChats;
args.allChat.map((chatObj)=>store.userChats[chatObj.username]=chatObj.chat)
store.newMsgNoti=arg.newMsgNoti;

this.setState(store);
}

handleChatToShow=(chats)=>{
    const store = {...this.state};
    store.chatToShow=chats;
    this.setState(store);
}

handleUpdateNewNotiToZero=(chats)=>{
    const store={...this.state}
    store.chatToShow=chats;
    this.setState(store);
}

handleAddChatBoxes=async(username,friend)=>{
    const store = {...this.state};
    const newChatObj={username:friend.username,seen:true,userInfo:{fname:friend.userInfo.fname,sname:friend.userInfo.sname},chat:[]}
    let isPresent=store.activeChatBoxes.find((box)=>box.username===friend.username);
    if(isPresent){return};

    try {
        const {data}=await http.post(`${process.env.NEXT_PUBLIC_API}/friendRequestApi/relationStatus`,{username,otherUsername:friend.username})
        if(data.friends){friend.relationWithUser='You are friends on facebook'}
        else{friend.relationWithUser='You are not friends on facebook'}
       
        const isChatPresent= store.allChat.find((friendChatInfo)=>
        friendChatInfo.username===friend.username)
        if(store.activeChatBoxes.length>3){
            isChatPresent?store.activeChatBoxes[store.activeChatBoxes.length-1]=isChatPresent:store.activeChatBoxes[store.activeChatBoxes.length-1]=newChatObj;
          return  this.setState(store)
        }
isChatPresent?store.activeChatBoxes.push(isChatPresent):store.activeChatBoxes.push(newChatObj);
        this.setState(store)
    } catch (e) {
        console.log(e.message)
    }

  
}
handleAddNewMsgFromUser=(msgObj,friendUserinfo)=>{

const store = {...this.state};
const newChatObj={username:msgObj.to,seen:true,userInfo:{fname:friendUserinfo.fname,sname:friendUserinfo.sname},chat:[msgObj]}
const isPresent=store.allChat.find((chatUsers)=>
chatUsers.username===msgObj.to);
if(isPresent){
    isPresent.chat.push(msgObj);
}
else{
   
    store.allChat.unshift(newChatObj)
}
store.userChats[msgObj.to]?store.userChats[msgObj.to].push(msgObj):store.userChats[msgObj.to]=[msgObj]
this.setState(store);
}

handleAddNewMsgFromFriend=(msgObj)=>{
    const store = {...this.state};
    const newChatObj={username:msgObj.from,seen:false,userInfo:{fname:msgObj.userInfo.fname,sname:msgObj.userInfo.sname,_id:msgObj.userInfo._id},chat:[msgObj]}
    const isPresent = store.allChat.find((chatUsers)=>
    chatUsers.username===msgObj.from);
    if(isPresent){
     const msgObjPresent=isPresent.chat.find((msgObjs)=>msgObjs.msgId===msgObj.msgId)
!msgObjPresent&&isPresent.chat.push(msgObj);
isPresent.seen===true&&(store.newMsgNoti=store.newMsgNoti+1)&&(isPresent.seen=false);
store.activeChatBoxes.find((chatBox)=>chatBox.username===msgObj.from&&chatBox.seen&&(chatBox.seen=false));   
}
    else{
        store.allChat.unshift(newChatObj);
        store.newMsgNoti=store.newMsgNoti+1
    }
   
    store.userChats[msgObj.from]?store.userChats[msgObj.from].push(msgObj):store.userChats[msgObj.from]=[msgObj]
    this.setState(store);
    }




handleDeleteChatBoxes=(username)=>{
    const store = {...this.state};
    store.activeChatBoxes=store.activeChatBoxes.filter((friend)=>
    friend.username!==username);
    this.setState(store)
}

handleSeenAllMsg=(seenBy,seenOf)=>{
    const store = {...this.state}
 
    store.allChat.find((chatObj)=>{
        if(chatObj.username===seenBy){
            chatObj.chat.map((msgObj)=>msgObj.seen=true)
        }})
    store.userChats[seenBy].map((msgObj)=>msgObj.seen=true);
      
        this.setState(store);
}

handleSeenChatBox=(username)=>{
const store = {...this.state}
store.allChat.find((chatBox)=>chatBox.username===username&&!chatBox.seen&&(chatBox.seen=true)&&(store.newMsgNoti=store.newMsgNoti-1))
store.activeChatBoxes.find((chatBox)=>chatBox.username===username&&!chatBox.seen&&(chatBox.seen=true));
this.setState(store);
}

handleUpdateShowNotiBadge=(arg)=>{
    const store = {...this.state}
    store.showNotiBadge=arg;
    this.setState(store);
}
    state = { latestFeedObjects:[],
updateLatestFeedObjects:this.handleUpdateLatestFeedObjects ,
allNoti:[],
notiToShow:[],
updateAllNotification:this.handleUpdateAllNotification,
updateNotiToShow:this.handleUpdateNotiToShow,
updateNewNotiNumber:this.handleUpdateNewNotiNumber,
updateNewNotiToZero:this.handleUpdateNewNotiToZero,
newNoti:0,
updateDeleteNoti:this.handleDeleteNoti,
updateReadNoti:this.handleReadNoti,
updateReadAllNoti:this.handleReadAllNoti,
updateUnReadNoti:this.handleUnReadNoti,
updateUnReadAllNoti:this.handleUnReadAllNoti,
newMsgNoti:0,
allChat:[],
chatToShow:[],
updateAllChat:this.handleUpdateAllChat,
updateChatToShow:this.handleChatToShow,
addNewMsgFromUser:this.handleAddNewMsgFromUser,
addNewMsgFromFriend:this.handleAddNewMsgFromFriend,
activeChatBoxes:[],
addChatBoxes:this.handleAddChatBoxes,
removeChatBoxes:this.handleDeleteChatBoxes,
userChats:{},
seenChatBox:this.handleSeenChatBox,
seenAllMsg:this.handleSeenAllMsg,

updateNewNotiData:this.handleUpdateNewNotiData,
showNotiBadge:false,
updateShowNotiBadge:this.handleUpdateShowNotiBadge,
updateAllNotiBySocket:this.handleUpdateAllNotiBySocket,
updateLatestFeedObjectsFromSocket:this.handleUpdateLatestFeedObjectsFromSocket
}






    render() { 
        return (  <ThirdStoreContext.Provider value={this.state}>
            {this.props.children}
          </ThirdStoreContext.Provider> );
    }
}
 
export default ThirdStore;