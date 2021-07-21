import { useContext, useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import styles from '../../CssModules/createPostModal.module.css'
import UserContext from '../../utils/userContext';
import ReactToolTip from 'react-tooltip'
import SelectAudience from '../../utils/audienceModel';
import LightStoreContext from '../../utils/lightStoreContext';
import http from '../../utils/http';

import 'emoji-mart/css/emoji-mart.css'
import {Picker} from 'emoji-mart';




const CreatePost = () => {
    const {user}=useContext(UserContext);
    const {myAudience,updateMyAudience,updateMyPosts}=useContext(LightStoreContext);
    const [smallCaption,changeSmallCaption]=useState(false);
    const captionRef =useRef('')
    const pickerRef=useRef();
    const showPickerButtonRef=useRef();
  
    const [myCaption,changeMyCaption]=useState('')
    const [userUploads,changeUserUploads]=useState({images:[],videos:[]})
    const [imageFilesPreview,changeImageFilesPreview]=useState([]);
    const [videoFilesPreview,changeVideoFilesPreview]=useState([]);
    const [showEmojiPicker,changeShowEmojiPicker]=useState(false);
    const [uploadingPost,changeUploadingPost]=useState(false);
   const [uploadedFiles,changeUploadedFiles]=useState(0)

    const currentPostId = useRef();
    const allFilesName=useRef([])
    const counter=useRef(0);
    const captionInputFieldRef = useRef();
let placeholder = `What's on your mind ${user.fname}?`


useEffect(()=>{
  updateMyAudience('public');
  jQuery("#createPostModal").on('hide.bs.modal',onHideModal)
},[])

useEffect(()=>{
  changeShowEmojiPicker&&document.addEventListener('click',removeEmojiDropDown);
  return()=>{document.removeEventListener('click',removeEmojiDropDown)}
},[showEmojiPicker])


useEffect(()=>{
 
  if(videoFilesPreview.length>0&&userUploads.images.length===0){
    const useruploads={...userUploads}
    const uploadVideoFile=useruploads.videos.shift();
    changeUserUploads(useruploads);
    uploadMedia('video',uploadVideoFile,currentPostId.current,);
  }




  if(userUploads.images.length>0){
    const useruploads={...userUploads}
    const uploadImageFile=useruploads.images.shift();
    changeUserUploads(useruploads);
    uploadMedia('image',uploadImageFile,currentPostId.current,);
  }

 

},[uploadedFiles])










const removeEmojiDropDown=(e)=>{
if(showPickerButtonRef.current){
  if(!showPickerButtonRef.current.contains(e.target)){
    changeShowEmojiPicker(false);
  }}
}


const onHideModal=()=>{
  captionRef.current='';
  changeMyCaption('');
  changeUserUploads({images:[],videos:[]})
  changeImageFilesPreview([])
  changeVideoFilesPreview([])
  updateMyAudience('public');
  changeUploadingPost(false);
  changeUploadedFiles(0);
  counter.current=0;
  typeof http.cancel==='function'&&http.cancel(499);
}

const disable = ()=>{
  // console.log(imageFilesPreview.length,videoFilesPreview.length,captionRef.current.length)
  // return true;
 
  return (imageFilesPreview.length>0||videoFilesPreview.length>0||myCaption.length>0)?false:true;
}




const handleCaptionChange=({target})=>{

    // console.log(target.value.length)
   !smallCaption&&target.value.length>100&&changeSmallCaption(true)
    smallCaption&&target.value.length<100&&changeSmallCaption(false)
    const newValue = target.value.toString().replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ').trim();
captionRef.current=newValue
changeMyCaption(newValue);
// console.log(captionRef.current);
}



const handleChangePhotoVideo =({currentTarget:input})=>{


  const data = {...userUploads};
  const videoPreview=[...videoFilesPreview];
  const imagePreview=[...imageFilesPreview];
  let fileSupported=['video','image'];
  let imageSupportedFormat=['image/jpeg','image/gif','image/png','image/webp']
  let videoSupportedFormat=['video/mp4','video/mkv','video/x-matroska','video/quicktime'];
  let ourFile = input.files[0]
  const {name,lastModified,type} = input.files[0]
  let typeOfFile = ourFile.type.split('/')[0];

  if(!fileSupported.includes(typeOfFile)){
    input.value='';

alert('only images and video files are supported');
console.log(input.files);
return false;
  };
 

if(typeOfFile==='video'){
if(videoSupportedFormat.includes(ourFile.type)){
  counter.current=counter.current+1
  data.videos.push({file:ourFile,type:'video',order:counter.current});
  changeUserUploads(data);
  videoPreview.push(URL.createObjectURL(ourFile));
 changeVideoFilesPreview(videoPreview) ;
 input.value=''

}
else{
  input.value=''
  alert('only Mp4 videos are supported');
  return false
}
}

if(typeOfFile==='image'){
  if(imageSupportedFormat.includes(ourFile.type)){
    counter.current=counter.current+1

 
      const blobURL = URL.createObjectURL(ourFile);
      const img = new Image();
      img.src = blobURL;
      img.onerror = function () {
        URL.revokeObjectURL(img.src);
        // Handle the failure properly
        console.log("Cannot load image");
      };
      img.onload = function () {
        URL.revokeObjectURL(img.src);
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        canvas.toBlob(
          (blob) => {
            const file = new File([blob],name,
              {lastModified,type});
      // console.log(file);
      // console.log(ourFile);
      
  data.images.push({file,type:'image',order:counter.current});
  changeUserUploads(data);
  imagePreview.push(URL.createObjectURL(file));
  changeImageFilesPreview(imagePreview) ;
  input.value=''
    },
          ourFile.type,
          0.6
        );
      
      };
    
  
  return
  }
  else{
    input.value=''
    alert('Only JPEG GIFF PNG and WEBp images are supported')}
    return false
}



}

const handleUploadProgress=(e)=>{

if(e.loaded===e.total){
  setTimeout(() => {
    return imageFilesPreview.length+videoFilesPreview.length===uploadedFiles?false:changeUploadedFiles(uploadedFiles+1)
  }, 200);
 
}
}

const deleteHalfPost=async()=>{
    try {
      const result = await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/deletePost?username=${user.username}`
      ,{postId:currentPostId.current,allFilesName:allFilesName.current})
      console.log(result.data);
    } catch (e) {
      console.log(e.message);
    }
  
}
    
const uploadMedia=async(name,file,postId)=>{

 
  const ourFilesName=[...allFilesName.current]
  let date = new Date();
 let filename= date.toDateString() + " " + date.getTime() + " " +
 name+file.file.name;
 ourFilesName.push(filename);
allFilesName.current=ourFilesName;
  let formData = new FormData();
  formData.append('postId',postId );
  formData.append('fileName',filename)
  formData.append('fileType',file.type)
  formData.append('fileOrder',file.order)
  formData.append(name,file.file );
 
  
try {
  const result = await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/savePostMedia?username=${user.username}`,
  formData,
    {
      cancelToken:new http.CancelToken((c)=>{
        http.cancel=c
      }
        ),
      onUploadProgress: handleUploadProgress,
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
  console.log(result.data);
  if(result.data){

    // console.log(result.data);
    if(result.data===(videoFilesPreview.length+imageFilesPreview.length)){
      changeUploadingPost(false);
      updateMyPosts(user.username,'userProfile');
    return   jQuery("#createPostModal").modal('hide');
    }
  }
  
  // console.log(result.data);
} catch (e) {
  e.message===499?deleteHalfPost():console.log(e.message)
}


}


const handlePostform=async()=>{
  changeUploadingPost(true)
  allFilesName.current=[];
  try {
    const {data} = await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/savePostCaption?username=${user.username}`,
   {_id:user._id,caption:captionRef.current,audience:myAudience});
  currentPostId.current=data;
  if( videoFilesPreview.length+imageFilesPreview.length===0){
  changeUploadingPost(false);
  updateMyPosts(user.username,'userProfile');
  return  jQuery("#createPostModal").modal('hide');
}
  changeUploadedFiles(1);

//  if(data){
//   userUploads.images.length>0&&userUploads.images.forEach(image => {
  
//       uploadMedia('image',image,data);
  
 
//   });
//   userUploads.videos.length>0&&userUploads.videos.forEach(video=>{

//       uploadMedia('video',video,data);

  
//   })
//  }

  } catch (error) {
    console.log(error.message);
    
  }

    
  
}




function caretPosition(el,pos) {
  console.log('asdfadsf')
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        let range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(pos);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        let textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(pos);
        textRange.select();
    }
  }

const addEmoji=(e)=>{
  let sym = e.unified.split('-')
  let codesArray = []
  sym.forEach(el => codesArray.push('0x' + el))
  let emoji = String.fromCodePoint(...codesArray)
 captionRef.current=captionRef.current+emoji;
 changeMyCaption(myCaption+emoji);
}


const discardUploads=()=>{
  changeUserUploads({images:[],videos:[]})
    changeImageFilesPreview([])
    changeVideoFilesPreview([])
    counter.current=0;
  
  
}
const onPasteCaption=(ev)=>{
  ev.preventDefault();
  var text = ev.clipboardData.getData("text");
  document.execCommand('insertText', false, text);
}

if(!user.username){return <div> loading...</div>}
    return (
        <>
  <SelectAudience/>
         {/* Modal  */}

        
        <div ref={pickerRef} className={`modal fade ${styles.modalTopBox}`} 
        
        id="createPostModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          
             
               {showEmojiPicker&&<div onClick={(e)=>e.stopPropagation()} className={styles.emojiDropdown}>


<Picker  title='' emoji='' showPreview={false} onSelect={addEmoji} set='facebook' />
</div>}
          <div className={`modal-dialog ${styles.mainBoxPostModal}`} role="document">
 
            <div className={`modal-content ${styles.createPostModalMain} `}>
            {uploadingPost&&<div className={styles.dummyModal}>
            <div className={styles.postLoading}>
             <span>Posting</span>
      <div className={styles['dot-pulse']}></div>
      </div>
            </div>}
      
              <div className="modal-header">
                <span className={` ${styles.modalHeading}`} >Create Post</span>
                <span type="button" className={`${styles.closeModalButton}`} data-dismiss="modal" aria-label="Close">
             <i></i>
                </span>
               
                <ReactToolTip className={styles.myPostTooltip} effect="solid" place='top'/>
              </div>
         
              <div className={`modal-body ${styles.modalBody}`}>
             
                  <div className={styles.postUserDpNameAndAudience}>
<div className={styles.aroundPostUserDp}>
    <span>
    <svg aria-hidden="true"  data-visualcompletion="ignore-dynamic" role="none" 
style={{height: 40, width: 40}}>
  <mask id="avtarMaskCreatePost">
    <circle  cx="20" cy="20" r='20'
    fill="white"
  ></circle>
    </mask>
    <g mask="url(#avtarMaskCreatePost)">
      <image x="0" y="0" height="100%" preserveAspectRatio="xMidYMid slice" 
      width="100%"
       xlinkHref= {`${process.env.NEXT_PUBLIC_API}/getProfilePic?username=${user.username}`}
       style={{height: 40, width: 40}}>
        </image><circle className={styles.createPostUserDpCircleSvg}  cx="20" cy="20" r="20">
          </circle>
          </g>
          </svg>
    </span>
</div>
<div className={styles.postUserNameAndAudience}>
    <span>{user.fname+' '+user.sname}</span>
    <div data-toggle="modal" 
              data-target="#audienceModal"  className={styles.aroundAudienceButton}>
        <div className={styles.audienceButton}>
            <img width='12px' height='12px' src={`${process.env.NEXT_PUBLIC_HOST}/img/audience/${myAudience}.png`}></img>
            <span>{
            
            myAudience=='public'&&'Public'
            ||myAudience=='friends'&&'Friends'
           || myAudience=='onlyMe'&&'Only me'
            }</span>
        </div>
    </div>
</div>
 </div>

 {/* contenteditable div with photos and othe features */}

<div className={`${styles.captionPhotoContainer}`}>

<div onClick={()=>{caretPosition(captionInputFieldRef.current,false)}}
className={`${styles.aroundCaptionAndEmoji}`}>
<div onClick={(e)=>{changeShowEmojiPicker(false); e.stopPropagation()}} className={`${styles.aroundCaption}`}>
<ContentEditable
  className={`${styles.caption} ${smallCaption&&styles.captionSmall} `}
  data-placeholder="Edit me"
  placeholder={placeholder}
  onPaste={onPasteCaption}
                innerRef={captionInputFieldRef}
                html={captionRef.current} // innerHTML of the editable div
                disabled={false}       // use true to disable editing
                onChange={handleCaptionChange}// handle innerHTML change
                tagName='div' // Use a custom HTML tag (uses a div by default)
                 />
               </div>
               <div  className={`${styles.aroundEmojiContainer}`}>
               <div  className={styles.aroundEmoji}>
            <span ref={showPickerButtonRef} onClick={()=>{
              showEmojiPicker?changeShowEmojiPicker(false):changeShowEmojiPicker(true);
            }}
              >
    <i data-tip = "Emoji" data-visualcompletion="css-img" 
  className={styles.emojiDropIcon}>
    </i></span></div>
   
    </div>
</div>
{
(imageFilesPreview.length>0||videoFilesPreview.length>0)&&<div className={`${styles.aroundUserUploads}`}>
<div className={`${styles.userUploads}`}>
  <div onClick={discardUploads} className={styles.discardUserUploadsButton}><i></i></div>
  <div className={`${styles.allUploads}`}>
    {imageFilesPreview.map((images)=>{
        return <div key={images} className={styles.uploadedItem}>
         <img src={images} ></img>
    
         </div>
    }
)}
   {videoFilesPreview.map((video)=>{
        return <div key={video} className={styles.uploadedItem}>
        
         <video src={video}  >
          
         </video>
         </div>
    }
)}



</div>
</div>
</div>

}


    </div>



             
              </div>
              <div className={`${styles.modalFooter}`}>
              <form >
                  <div className={`${styles.aroundAddingPhoto}`}>
                      <span>Add to Your post</span>
                      <label htmlFor='photoVideo' data-tip = "Photo/Video"  className={styles.aroundAddPhotoIcon}>
                      <div className={styles.addPhotoIcon}>
                          <div ><i ></i></div>
                          </div>
                      </label>
                      <input type="file" name="photuVideo" id='photoVideo' 
              onChange={handleChangePhotoVideo}  style={{display:'none'}}></input>
               </div>
               <div className={`${styles.submitPost}`}>
                      <button type='submit' onClick={handlePostform} disabled={disable()} type='button'  className={`btn
                      ${styles.submitPostButton} ${styles.disablePostButton}`}>
                          <span>Post</span>
                      </button>
                  </div>
              </form>
                 
                  
               
                 
              </div>
            </div>
          </div>
        </div> </> );
}
 
export default CreatePost;