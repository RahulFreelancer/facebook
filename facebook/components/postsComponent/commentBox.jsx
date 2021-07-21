import { useContext, useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import styles from '../../CssModules/posts.module.css';
import LightStoreContext from "../../utils/lightStoreContext";
import UserContext from "../../utils/userContext";
import 'emoji-mart/css/emoji-mart.css'
import {Picker} from 'emoji-mart';


const CommentBox = ({placeholder,postId,commentId,action,boxRef,boxId,changeReplyTo,replyTo,defaultReplyTo}) => {


   const userTypedCommentRef=useRef('');
const commentInputFieldRef=useRef();
const emojiPickerRef=useRef();
const emojiPickerButtonRef=useRef();

const {user}=useContext(UserContext)
const {addComment,addReply}=useContext(LightStoreContext);
const [showCommentEmojiPicker,changeShowCommentEmojiPicker]=useState(false);
const [comment,changeComment]=useState('');

useEffect(()=>{
  showCommentEmojiPicker&&document.addEventListener('click',removeCommentEmojiPicker)
return()=>document.removeEventListener('click',removeCommentEmojiPicker)
},[showCommentEmojiPicker])


const removeCommentEmojiPicker=(e)=>{
if(emojiPickerRef.current&&!emojiPickerRef.current.contains(e.target)&&!emojiPickerButtonRef.current.contains(e.target)){
  changeShowCommentEmojiPicker(false);
}}




const handleCommentChange=(e)=>{
  
  const newValue = e.target.value.toString().replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ').trim();
  userTypedCommentRef.current=newValue;
  changeComment(newValue);

}

const addEmoji=(e)=>{
  let sym = e.unified.split('-')
  let codesArray = []
  sym.forEach(el => codesArray.push('0x' + el))
  let emoji = String.fromCodePoint(...codesArray)
  userTypedCommentRef.current=userTypedCommentRef.current+emoji;
  changeComment(comment+emoji);
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


const postComment=(e)=>{
  console.log(userTypedCommentRef.current.length);
  e.preventDefault()
if(action==='comment'){

 userTypedCommentRef.current===''?false:addComment(user,postId,userTypedCommentRef.current)
 userTypedCommentRef.current='';
}
if(action==='reply')
{
  const newReplyTo=(replyTo.current.fname&&replyTo.current)||(defaultReplyTo)
 userTypedCommentRef.current===''?false:addReply(user,postId,userTypedCommentRef.current,commentId,newReplyTo);
 userTypedCommentRef.current='';
 replyTo.current={}

}
  // console.log(userTypedCommentRef.current);
  
}

    return (
      <div className={styles.aroundWriteCommentBox}>
        <div className={styles.writeCommentBox}>
        <div className={styles.dpOFWhoWillCommentContainer}>
          <div className={styles.dpOFWhoWillComment}>
            <span>
          <svg aria-hidden="true"  data-visualcompletion="ignore-dynamic" role="none" 
  style={{height: 32, width:32}}>
    <mask id="avtarMaskCommentInput">
      <circle    cx="16" cy="16"  r="16"
      fill="white"
      ></circle>
      </mask>
      <g mask="url(#avtarMaskInput)">
        <image x="0" y="0" height="100%" preserveAspectRatio="xMidYMid slice" 
        width="100%"
         xlinkHref= {`${process.env.NEXT_PUBLIC_API}/getProfilePic?username=${user.username}`}
         style={{height:32, width:32}}>
          </image><circle className={styles.userAvtarCircle}   cx="16" cy="16" r="16">
            </circle>
            </g>
            </svg>
            </span>
          </div>
        
        </div>

        <div className={styles.commentInputContainer}>
        <div onClick={()=>{placeCaretAtEnd(boxRef.current[boxId])}} className={styles.commentInputForm}>
         <div onClick={(e)=>e.stopPropagation()} className={styles.aroundCommentInputField}>
           <form>
  <ContentEditable
  onKeyDown={(e)=>{e.keyCode==13&&postComment(e);}}
  className={styles.commentInputField}
  placeholder={placeholder}
  onPaste={onPaste}
  innerRef={(el)=>boxRef.current[boxId]=el}
  html={userTypedCommentRef.current} // innerHTML of the editable div
  disabled={false}       // use true to disable editing
  onChange={handleCommentChange}// handle innerHTML change
  tagName='div' // Use a custom HTML tag (uses a div by default

  />
      </form>
      </div>
   <div className={styles.commentExtra}>
   <span ref={emojiPickerButtonRef} onClick={()=>{changeShowCommentEmojiPicker(!showCommentEmojiPicker)}} data-tip = "Emoji" > <i data-visualcompletion="css-img" 
  className={styles.emojiDropButtonIcon}></i></span>
            <span> <i data-visualcompletion="css-img" 
  className={styles.gifDropButtonIcon}></i></span>
  </div>
        
        </div>
        </div>
       
      </div>
      {showCommentEmojiPicker&&<div ref={emojiPickerRef} className={styles.aroundCommentEmojiPicker}>
      <Picker  title='' emoji='' showPreview={false} onSelect={addEmoji} set='facebook' />
      </div>}
      </div>

        
        
        
        
        
        );
}
 
export default CommentBox;