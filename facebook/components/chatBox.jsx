
import { useContext, useEffect} from 'react';
import styles from '../CssModules/chatBox.module.css'
import {io} from 'socket.io-client'
import ThirdStoreContext from '../utils/thirdStoreContext';
import ReactTooltip from 'react-tooltip'
import { Tooltip } from '@material-ui/core';
export let chatSocket;
import MessengerBox from './messengerBox';
import UserContext from '../utils/userContext';
const ChatBox = () => {

   const {activeChatBoxes,addNewMsgFromFriend,seenAllMsg}= useContext(ThirdStoreContext)
   const {user} =useContext(UserContext);

   useEffect(()=>{
//  chatSocket implementation

chatSocket = io("ws://localhost:3500/expressApi/chat",
 {auth: {token: user._id,
   username:user.username,}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
 });
 
 chatSocket.on('connect',()=>{
   console.log('chatSocket '+chatSocket.connected);
   chatSocket.emit('getInitUpdate',{username:user.username})
  })
 
 chatSocket.on('receiveInitUpdate',(args)=>{
  //  console.log(args)
  })
 chatSocket.on('receiveMsg',(args)=>{
  //  console.log(args);
  addNewMsgFromFriend(args.msgObj)
})

chatSocket.on('receiveSeenAllMsg',(args)=>{
seenAllMsg(args.seenBy,args.seenOf);
})



 return ()=>{
   chatSocket.disconnect()
  }
 },[user])









   return ( <div className={styles.chatBoxContainer}>
                 <ReactTooltip id='newMessageButton'  effect="solid"></ReactTooltip>
     
        {activeChatBoxes.map((chatBox)=>{console.log(chatBox);
            return <MessengerBox key={chatBox.username}
           chatBox={chatBox} activeUserChatUsername={chatBox.username}/>})}
            {/* <Tooltip title="New message" placement='top'> */}

<div data-tip='New message' data-for='newMessageButton'  data-toggle="modal" data-target="#friendListModal" className={styles.newMessageButton}>
    <i></i>
</div>

{/* </Tooltip> */}
    </div> );
}
 
export default ChatBox;