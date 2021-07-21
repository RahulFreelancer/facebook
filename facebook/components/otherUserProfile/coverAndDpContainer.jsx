// import { urlObjectKeys } from 'next/dist/next-server/lib/utils';
import { useContext, useState } from 'react';
import styles from '../../CssModules/userProfile.module.css'
import spinner from '../../CssModules/loading.module.css'
import Nav from "./navBar";
import UserContext from "../../utils/userContext";
const CoverAndDpContainer = ({activeUser}) => {

    const [screenLoading,changeScreenLoading]=useState(false);
    const {profileUser,
        profileUserDp,profileUserCropDp,
        profileUserCoverPhoto} =useContext(UserContext);


    
                                            



    return ( <> 
     {screenLoading&&
     <div id={`${spinner.coverSpin}`}>
   
</div>
}
    
    

<div draggable="false" className={` ${styles.aroundCoverAndDpContaier}`}>
    <div draggable="false" className={`main ${styles.coverAndDpContainer}`}>
    <div  className={styles.aroundCoverPhotoContainer}>
      <div className={`${styles.aroundCoverPhoto}`}>
    <img className={styles.coverPhoto} src={profileUserCoverPhoto} >
      </img>
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
         <img draggable="false" className={`  ${styles.dp} `} 
         src = {profileUserCropDp.cropImg || profileUserDp.img}/>
         </div>
         </div>
         <div draggable="false" className={`${styles.aroundUserNameString}`}>
         <span draggable="false" >{profileUser.fname+" "+profileUser.sname}</span>
         </div>
         </div>
         </div>
         </div>

     
    </div>

             <Nav activeUser={activeUser}/>
             </div>
                
   
     
             
    </>);
}
 
export default CoverAndDpContainer;