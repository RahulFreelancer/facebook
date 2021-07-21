import { useContext, useEffect, useRef, useState } from 'react';
import styles from '../CssModules/chatBox.module.css'
import ThirdStoreContext from '../utils/thirdStoreContext';
import ReactTooltip from 'react-tooltip'
import { useRouter } from 'next/router';
import UserContext from '../utils/userContext';
import ContentEditable from 'react-contenteditable';
import 'emoji-mart/css/emoji-mart.css'
import {Picker} from 'emoji-mart';
import {chatSocket} from './chatBox'


const MessengerBox = ({chatBox,activeUserChatUsername}) => {
    const {user}=useContext(UserContext);
   const {activeChatBoxes,addChatBoxes,removeChatBoxes,
    addNewMsgFromUser,newMsgNoti,userChats,seenChatBox,seenAllMsg}= useContext(ThirdStoreContext)
const [msg,changeMsg]=useState('');
const [activeIcons,changeActiveIcons]=useState(false);
const [showEmojiPicker,changeShowEmojiPicker]=useState(false);
   const router=useRouter();
   const chatBoxRef=useRef();
const userTypedMsg=useRef('');
const emojiPickerRef=useRef();
const emojiPickerButtonRef=useRef();
const innerRefOfMsgBox=useRef();
const messagesEnd=useRef();

// console.log('running');
useEffect(()=>{
    showEmojiPicker&&document.addEventListener('click',removeEmojiPicker)
  return()=>document.removeEventListener('click',removeEmojiPicker)
  },[showEmojiPicker])
//   console.log(userChats[activeUserChatUsername])
  useEffect(()=>{
      if(messagesEnd.current){
          if(document.activeElement.id==='chatBox'||
          document.activeElement.id==='chatBoxInput')
          {!chatBox.seen&&updateMsgSeen(user.username,activeUserChatUsername);
            !chatBox.seen&&seenChatBox(activeUserChatUsername);
            messagesEnd.current.scrollIntoView({ behavior: "smooth" })}
      
        //   console.log(newMsgNoti);

}
  },[userChats[activeUserChatUsername]&&userChats[activeUserChatUsername].length]
  )
  useEffect(()=>{
      if(messagesEnd.current){innerRefOfMsgBox.current.focus();
        messagesEnd.current.scrollIntoView({ behavior: "smooth" })}
    },[])
  
  
  const removeEmojiPicker=(e)=>{
  if(emojiPickerRef.current&&!emojiPickerRef.current.contains(e.target)&&!emojiPickerButtonRef.current.contains(e.target)){
    changeShowEmojiPicker(false);
  }}
  
  
  
  
  const handleMsgChange=(e)=>{
    const newValue = e.target.value.toString().replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ').trim();
    userTypedMsg.current=newValue;
    changeMsg(newValue);
  
  }
  
  const addEmoji=(e)=>{
    let sym = e.unified.split('-')
    let codesArray = []
    sym.forEach(el => codesArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codesArray)
    userTypedMsg.current=userTypedMsg.current+emoji;
    changeMsg(msg+emoji);
  //  changeMyCaption(myCaption+emoji);
  }
  
  
  
  function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        let range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        let textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
  }
  
  
  const onPaste=(ev)=>{
    ev.preventDefault();
    var text = ev.clipboardData.getData("text");
    document.execCommand('insertText', false, text);
  }
  
  
  const postMsg=(e,user,friend)=>{
    e.preventDefault();
    
const msgId=new Date()+Math.floor(Math.random() * 11120952341235920)+user.username;
const date=new Date();

const msgObj={msgId,
    from:user.username,
to:friend.username,
userInfo:{fname:user.fname,sname:user.sname,_id:user._id},
date:{dateString:date.toLocaleTimeString()+' '+date.toDateString(),dateObj:date},
seen:false,
msg:userTypedMsg.current}
addNewMsgFromUser(msgObj,friend.userInfo); 
const msgObjWithId={...msgObj};
msgObjWithId.userInfo=user._id;
// console.log(msgObj,msgObjWithId);
chatSocket.emit('sendMsg',{msgObj,msgObjWithId,friendId:friend.userInfo._id})


userTypedMsg.current=''   // console.log(userTypedMsg.current);
}



const updateMsgSeen=(seenBy,seenOf)=>{
    console.log('ye kyu chla')
    chatSocket.emit('sendSeenAllMsg',{seenBy,seenOf})
}








    return ( <div id='chatBox'
        tabIndex='10'
        onFocus={()=>{!chatBox.seen&&updateMsgSeen(user.username,activeUserChatUsername);
            !chatBox.seen&&seenChatBox(activeUserChatUsername)}}
      key={chatBox.username} className={styles.chatBox}>
           {showEmojiPicker&&<div ref={emojiPickerRef} className={styles.aroundEmojiPicker}>
  <Picker  title='' emoji='' showPreview={false} onSelect={addEmoji} set='facebook' />
  </div>}
                <div ref={chatBoxRef}  className={styles.chatBoxOne}>
                    <div  className={styles.chatBoxHead}>
                    <div  className={styles.chatBoxHeadOne}>
                    <div  className={`${!chatBox.seen&&styles.chatBoxHeadNotSeen} ${styles.chatBoxHeadTwo}`}>
                    
                    <ReactTooltip id='profileLink' place="top" effect="solid"></ReactTooltip>
                        <div data-tip='Go to profile' data-for='profileLink'  onClick={()=>router.push(`/${chatBox.username}`)}
                         className={`${styles.chatBoxUsername} 
                         ${!chatBox.seen&&styles.notSeenHeadItems}`}>
                            <div className={styles.chatBoxUsernameOne}>
                            <div className={styles.chatBoxUserDp}>
                                <img src={`${process.env.NEXT_PUBLIC_API}/getProfilePic?username=${chatBox.username}`}></img>
                                </div>
                                <div className={styles.chatBoxUsernameString}>
                                <div className={styles.chatBoxUsernameStringOne}>
                                <div className={styles.chatBoxUsernameRealString}>
                                <span >{chatBox.userInfo.fname+' '+chatBox.userInfo.sname}</span>
                                </div>
                                <div className={styles.chatBoxUsernameIcon}>
                                <svg className={`${styles.usernameIconFilled}
                                ${!chatBox.seen&&styles.headIconsFilledNotSeen}`} width="10px" height="10px" viewBox="0 0 18 10">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                 d="M1 2.414A1 1 0 012.414 1L8.293 6.88a1 1 0 001.414 0L15.586 1A1 1 0 0117 2.414L9.707 9.707a1 1 0 01-1.414 0L1 2.414z">
                                     </path></svg>
                                </div>
                            
                                </div>
                                </div>
                            </div>
                        </div>
                        <ReactTooltip id='closeChat' place="top" effect="solid"></ReactTooltip>
                        <div data-tip='Close chat' data-for='closeChat'  onClick={()=>removeChatBoxes(chatBox.username)}
                         className={`${styles.closeChatBox} ${!chatBox.seen&&styles.notSeenHeadItems}`}>
                        <svg width="26px" height="26px" viewBox="-4 -4 24 24">
                            <line x1="2" x2="14" y1="2" y2="14" 
                            className={`${styles.boxIcons} 
                            ${activeIcons&&styles.boxIconsActive} 
                            ${!chatBox.seen&&styles.headIconsNotSeen}
                             `} 
                        ></line><line x1="2" x2="14" y1="14" 
                        className={`${styles.boxIcons} 
                        ${activeIcons&&styles.boxIconsActive} 
                        ${!chatBox.seen&&styles.headIconsNotSeen}
                         `} 
                          y2="2" strokeLinecap="round" 
                        strokeWidth="2" ></line></svg>
                        </div>
                      
                    </div>
                    </div>
                    </div>
                    <div className={styles.chatBoxBody}>
                    <div className={styles.chatBoxBodyOne}>
                    {/* displyed msg area */}
                   
                    <div className={styles.chatBoxMsgDisplay}>
                    <div className={styles.chatBoxMsgDisplayOne}>
                    
                    <div className={styles.chatBoxMsgDisplayUserDetail}>
                    <div className={styles.chatBoxMsgDisplayUserDetailOne}>
                    
                    <div className={styles.chatBoxMsgDisplayDetail}>
                    <div className={styles.chatBoxMsgDisplayUserDpOne}>
                    <div className={styles.chatBoxMsgDisplayUserDpTwo}>
                    <img src={`${process.env.NEXT_PUBLIC_API}/getProfilePic?username=${chatBox.username}`}></img>
                        </div>
                        </div>
                        </div>
     
                     <div className={styles.chatBoxMsgDisplayDetail}>
                         <span className={styles.chatBoxMsgDisplayUsername}>
                         {chatBox.userInfo.fname+' '+chatBox.userInfo.sname}
                         </span>
                        </div>
                        
                        <div className={styles.chatBoxMsgDisplayDetail}>
                        <span className={styles.chatBoxMsgDisplayRelation}>
                         {chatBox.relationWithUser}
                         </span>
                        </div>



                        </div>
                        </div>

                        <div id='msgStringContainer'>
                            {userChats[chatBox.username]&&userChats[chatBox.username].map((chat)=>
                            <div key={chat.msgId}>{chat.from===chatBox.username?<div  className={styles.friendMsgBox}>
                            <div className={styles.friendMsgBoxOne}>
                                {/* {console.log(chat)} */}
                           {/* main string box */}
                            <div>
<div className={styles.friendMsgBoxMain}>
<div className={styles.friendMsgBoxMainOne}>
<div className={styles.friendMsgBoxString}>
    <div className={styles.friendMsgBoxStringOne}>
        <span>{chat.msg}</span>
        <span className={styles.msgDate}>{chat.date.dateString}</span>
    </div>
</div>
<div className={styles.msgSeenStatusAndDate}>
    {/* <span className={styles.msgDate}>2 dec 1998</span> */}
    <div className={styles.msgSeenStatus}>
    {/* {chat.seen?<img src={`${process.env.NEXT_PUBLIC_API}/getProfilePic?username=${user.username}`}></img>:
    <svg className={styles.boxIconsFilled} height="14px" width="14px" viewBox="2 2 20 20" role="img" 
xmlns="http://www.w3.org/2000/svg"><title>Sent</title>
<path d="m12 2a10 10 0 1 0 10 10 10.011 10.011 0 0 0 -10-10zm0 18.5a8.5 8.5 0 1 1 8.5-8.5 8.51 8.51 0 0 1 -8.5 8.5z"></path>
<path d="m15.982 8.762-5.482 5.487-2.482-2.478a.75.75 0 0 0 -1.06 1.06l3.008 3.008a.748.748 0 0 0 1.06 0l6.016-6.016a.75.75 0 0 0 -1.06-1.061z">
        </path></svg>} */}
    </div>
</div>
</div>

</div>
</div>
</div>
</div>:

<div   className={styles.friendMsgBox}>
                            <div className={styles.friendMsgBoxOne}>
                           {/* main string box */}
                            <div>
<div className={styles.friendMsgBoxMain}>
<div className={styles.friendMsgBoxMainOneUser}>
<div className={styles.friendMsgBoxString}>
    <div className={styles.friendMsgBoxStringOneUser}>
        <span>{chat.msg}</span>
        <span className={styles.msgDateUser}>{chat.date.dateString}</span>
    </div>
</div>
<div className={styles.msgSeenStatusAndDate}>
    {/* <span className={styles.msgDate}>2 dec 1998</span> */}
    <div className={styles.msgSeenStatus}>
    {chat.seen?<img src={`${process.env.NEXT_PUBLIC_API}/getProfilePic?username=${chatBox.username}`}></img>:
    <svg className={styles.boxIconsFilled} height="14px" width="14px" viewBox="2 2 20 20" role="img" 
xmlns="http://www.w3.org/2000/svg"><title>Sent</title>
<path d="m12 2a10 10 0 1 0 10 10 10.011 10.011 0 0 0 -10-10zm0 18.5a8.5 8.5 0 1 1 8.5-8.5 8.51 8.51 0 0 1 -8.5 8.5z"></path>
<path d="m15.982 8.762-5.482 5.487-2.482-2.478a.75.75 0 0 0 -1.06 1.06l3.008 3.008a.748.748 0 0 0 1.06 0l6.016-6.016a.75.75 0 0 0 -1.06-1.061z">
        </path></svg>}
    </div>
</div>
</div>

</div>
</div>
</div>
</div>}</div>
                            )




                            }
<div ref={messagesEnd} style={{display:'flex',alignSelf:'flex-end'}}></div>
                        </div>
                        </div>
                        </div>

                        <div className={styles.msgBoxFooter}>
                       
                            <div className={styles.sendMsgBox}>
                                <span className={styles.addMediaIcon}>
                              
                                <ReactTooltip id='moreAction' place="top" effect="solid"></ReactTooltip>
                                    <div data-tip='Open more actions' data-for='moreAction' className={styles.addMediaIconOne}>
                                    <svg className={`${styles.boxIconsFilled}  ${activeIcons&&styles.boxIconsFilledActive}`} viewBox="0 0 24 24" height="20px" width="20px" >
                                        <g  fillRule="evenodd">
                                            <polygon fill="none" points="-6,30 30,30 30,-6 -6,-6 "></polygon>
                                            <path d="m18,11l-5,0l0,-5c0,-0.552 -0.448,-1 -1,-1c-0.5525,0 -1,0.448 -1,1l0,5l-5,0c-0.5525,0 -1,0.448 -1,1c0,0.552 0.4475,1 1,1l5,0l0,5c0,0.552 0.4475,1 1,1c0.552,0 1,-0.448 1,-1l0,-5l5,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1m-6,13c-6.6275,0 -12,-5.3725 -12,-12c0,-6.6275 5.3725,-12 12,-12c6.627,0 12,5.3725 12,12c0,6.6275 -5.373,12 -12,12">
                                        </path></g></svg>
                                        </div>
                                        </span>

                        <div  onClick={()=>{placeCaretAtEnd(innerRefOfMsgBox.current)}} className={styles.inputMsgOne}>
                        <div  onClick={(e)=>e.stopPropagation()} className={styles.aroundEditableInput}>                                        <ContentEditable
onKeyDown={(e)=>{e.keyCode==13&&postMsg(e,user,chatBox);}}
className={styles.msgInputField}
placeholder={'Aa'}
onPaste={onPaste}
innerRef={innerRefOfMsgBox}
html={userTypedMsg.current} 
id='chatBoxInput'
//   innerHTML of the editable div
disabled={false}       // use true to disable editing
onChange={handleMsgChange}
onFocus={()=>{changeActiveIcons(true);
    !chatBox.seen&&updateMsgSeen(user.username,activeUserChatUsername)
    !chatBox.seen&&seenChatBox(activeUserChatUsername);}}
onBlur={()=>{changeActiveIcons(false)}}
// handle innerHTML change
tagName='div' // Use a custom HTML tag (uses a div by default
/>
                                            </div>
                                          
                                            <ReactTooltip id='chooseEmoji' place="top" effect="solid"></ReactTooltip>
                                                <span data-tip='Choose an emoji' data-for='chooseEmoji'  onClick={()=>changeShowEmojiPicker(!showEmojiPicker)} ref={emojiPickerButtonRef}  className={styles.emojiDropIcon}><div className={styles.emojiDropIconOne}>
                                                <svg  className={`${styles.boxIconsFilled}  ${activeIcons&&styles.boxIconsFilledActive}`}  height="20px" viewBox="0 0 38 38" width="20px">
                                                    <g fill="none" fillRule="evenodd">
                                                        <g transform="translate(-893.000000, -701.000000)">
                                                            <g transform="translate(709.000000, 314.000000)">
                                                                <g>
                                                            <path  className={`${styles.boxIconsFilled}  ${activeIcons&&styles.boxIconsFilledActive}`} d="M210.5,405 C209.121,405 208,403.879 208,402.5 C208,401.121 209.121,400 210.5,400 C211.879,400 213,401.121 213,402.5 C213,403.879 211.879,405 210.5,405 M212.572,411.549 C210.428,413.742 206.938,415 203,415 C199.062,415 195.572,413.742 193.428,411.549 C192.849,410.956 192.859,410.007 193.451,409.428 C194.045,408.85 194.993,408.859 195.572,409.451 C197.133,411.047 199.909,412 203,412 C206.091,412 208.867,411.047 210.428,409.451 C211.007,408.859 211.956,408.85 212.549,409.428 C213.141,410.007 213.151,410.956 212.572,411.549 M195.5,400 C196.879,400 198,401.121 198,402.5 C198,403.879 196.879,405 195.5,405 C194.121,405 193,403.879 193,402.5 C193,401.121 194.121,400 195.5,400 M203,387 C192.523,387 184,395.523 184,406 C184,416.477 192.523,425 203,425 C213.477,425 222,416.477 222,406 C222,395.523 213.477,387 203,387" 
                                     ></path></g></g></g></g></svg>
                                                    </div></span>
                                                                                    
                                        </div>

                                        <span onClick={(e)=>postMsg(e,user,chatBox)} className={styles.aroundSendMsgIcon}>
                                        <ReactTooltip id='sendButton' place="top" effect="solid"></ReactTooltip>
                                    <div data-tip='Press Enter to send' data-for='sendButton' className={styles.sendMsgIcon}>
                                    <svg  className={`${styles.boxIconsFilled}  ${activeIcons&&styles.boxIconsFilledActive}`} width="20px" height="20px" viewBox="0 0 24 24">
                                        <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" 
                                    fillRule="evenodd" stroke="none"></path></svg>
                                        </div>
                                        </span>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
            {/* <button onClick={()=>removeChatBoxes(chatBox.username)} className={'btn btn-primary'}>
                Remove this Chat box
            </button> */}
        </div>)}



 
export default MessengerBox;