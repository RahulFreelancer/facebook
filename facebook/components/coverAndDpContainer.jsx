// import { urlObjectKeys } from 'next/dist/next-server/lib/utils';
import { useContext, useEffect, useRef, useState } from 'react';
import styles from '../CssModules/userProfile.module.css'
import spinner from '../CssModules/loading.module.css'
import http from '../utils/http';
import Nav from "../components/navBar";
import UserContext from "../utils/userContext";
import UpdateDpModal from './updateDpModal';
const CoverAndDpContainer = () => {

    const [showEditDp,changeEditDp]=useState(false)
    const [showDpDropdown,changeDpDropdown]=useState(false)
    const [allProfilePhotosList,changeAllProfilePhotosList]=useState(null);
    const [showCoverDropdown,changeCoverDropdown]=useState(false);
    const [screenLoading,changeScreenLoading]=useState(false);
 

    const {user,profilePhoto,cropProfilePhoto,
        updateCoverPhoto,coverPhoto} =useContext(UserContext);
    const dpDropdownRef=useRef();
    const coverDropdownRef=useRef();

    useEffect(()=>{
     
        showEditDp&&document.addEventListener('mouseover',removeEditButtonListener)
        return()=>{document.removeEventListener('mouseover',removeEditButtonListener)}
    },[showEditDp])
    
useEffect(()=>{

    showDpDropdown&&document.addEventListener('click',removeDpDropdownListener);
    return()=>{
        document.removeEventListener('click',removeDpDropdownListener)
    }
},[showDpDropdown])

useEffect(()=>{showCoverDropdown&&document.addEventListener('click',removeCoverDropdownListener);
return()=>{
    document.removeEventListener('click',removeCoverDropdownListener)
}
},[showCoverDropdown])

    const removeEditButtonListener=(e)=>{
        if(!editDpRef.current.contains(e.target)){
        document.removeEventListener('mouseover',removeEditButtonListener);
        changeEditDp(false);
    }}
    
    const removeDpDropdownListener=(e)=>{
        if(!dpDropdownRef.current.contains(e.target)){
        changeDpDropdown(false);}
    }
const removeCoverDropdownListener=(e)=>{
    if(!coverDropdownRef.current.contains(e.target)){
    changeCoverDropdown(false);}
}
    const getProfilePhotosList=async()=>{
        try {
            const result = 
            await http.get('http://localhost:3000/api/getProfile/getAllProfilePhotosList');
   
            changeAllProfilePhotosList(result.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    
const handleCoverPhoto=async({currentTarget:input})=>{
    changeScreenLoading(true);
   
    let formData = new FormData();
    formData.append("coverPhoto", input.files[0]);

    try {
        const result = await http.post('http://localhost:3000/api/postProfile/coverPhoto',
        formData)
        const cover = await http.post('http://localhost:3000/api/getProfile/getCoverPhoto',{username:user.username})
        updateCoverPhoto(cover.data);
        changeScreenLoading(false);
    } catch (e) {
        console.log(e.message)
    }


}




    return ( <> 
     {screenLoading&&
     <div id={`${spinner.coverSpin}`}>
   
</div>
}
    
    <UpdateDpModal allProfilePhotosList={allProfilePhotosList}/>

<div draggable="false" className={` ${styles.aroundCoverAndDpContaier}`}>


    <div draggable="false"  className={`main ${styles.coverAndDpContainer}`}>
        

     
    
<div  className={styles.aroundCoverPhotoContainer}>
      <div draggable="false" className={`${styles.aroundCoverPhoto}`} >
{/* <div  className={styles.aroundAddCoverPhotoContainer}> */}
    <img  onClick={()=>{
                 showCoverDropdown?changeCoverDropdown(false):
             changeCoverDropdown(true)
            
            }}  draggable="false" className={`${styles.coverPhoto}`} src={coverPhoto} 
   ></img>
    <div className={styles.aroundAddCoverPhotoContainer} >
<div className={styles.aroundAddCoverPhoto}>
   
            <div className={styles.addCoverButtonAndDropContainer}>
                
             <div type='button' draggable="false" onClick={()=>{
                 showCoverDropdown?changeCoverDropdown(false):
             changeCoverDropdown(true)
            
            }} className={`  d-flex align-items-center
               ${styles.addCoverPhoto}`} >
                 
<img height="20px" width= 
  '20px' style={{marginRight:'0.4em'}} src="http://localhost:3000/img/camera.png"></img>
            Add cover photo
                  </div>
                  <div ref={coverDropdownRef} className={`${styles.coverPhotoDrop}
               
               ${!showCoverDropdown&&styles.hideCoverPhotoDrop}`}>
              <div type='button' className={` ${styles.dropButtons}`}>
                  <img className={`${styles.dropButtonIcon}`} 
                  src ="http://localhost:3000/img/gallery.svg"/>
             <span> Select Photo</span></div>
              
              <label type='button' htmlFor="coverPhoto"className={`${styles.dropButtons}`}>
                  <img  className={`${styles.dropButtonIcon}`} 
                  src ="http://localhost:3000/img/upload.svg"/>
             <span> Upload Photo</span>
              </label>
              <input type='file' name='coverPhoto' onChange={handleCoverPhoto}
               id='coverPhoto' style={{display:'none'}}></input>
                     
</div>
</div>
</div></div>

    
    

   </div>
   </div>
     <div className={styles.aroundDpNameEditContainer}>

{/* centeredBox */}
<div draggable="false" className={`${styles.aroundDpNameEdit} `}>
    <div className={`${styles.dpNameEdit}`}>


<div  draggable="false" className={`${styles.aroundDpContainer}`}>
<div draggable="false" className={`${styles.dpContainer}`} 
 id="dpDropMenuButton" 
>
         <img draggable="false" className={`  ${styles.dp} `} onClick={()=>{
showDpDropdown?changeDpDropdown(false):
                    changeDpDropdown(true)}}
         src = {cropProfilePhoto.cropImg || profilePhoto.img}/>
         </div>
         <div ref={dpDropdownRef} className={`flex-column 
             ${styles.aroundDpDropdown}
             ${showDpDropdown&&styles.allDropdown}
             ${!showDpDropdown&&styles.hideDpDropdown}
              `}  >
              <div draggable="false" onClick={getProfilePhotosList} type='button'   data-toggle="modal"
                data-target="#updateDpModal" className={`${styles.dpDropItems}`}>
                    <img src = {`${process.env.NEXT_PUBLIC_HOST}/img/cameraDp.png`}></img>
                   <span>Update photo</span> 
                </div>
           
              <div draggable="false" type= 'button' className={`${styles.dpDropItems}`}>
              <img src = {`${process.env.NEXT_PUBLIC_HOST}/img/delete.png`}></img>
                   <span>Delete photo</span> 
                  </div>
                 
                 </div>
         </div>
       
         <div draggable="false" className={`${styles.aroundUserNameString}`}>
         <span draggable="false">{user.fname+" "+user.sname}</span>
         </div>
                

         
         






</div>

         </div>
</div>
     
    </div>

    <Nav/>
   
           
             {/* <img className={`${styles.coverPhoto}`} width="100%" src={coverPhoto} 
  
  onClick={()=>{
    showCoverDropdown?changeCoverDropdown(false):
changeCoverDropdown(true)
}} 
   ></img> */}
             </div>
                
   
     
    
    </>);
}
 
export default CoverAndDpContainer;