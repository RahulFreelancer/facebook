
import { useContext, useEffect, useState } from "react";
import LightStoreContext from "../../utils/lightStoreContext";
import UserContext from "../../utils/userContext";
import styles from '../../CssModules/about.module.css';
import RelationshipForm from "./forms/addRelationshipForm";
import AboutSkeleton from "../../utils/aboutSkeleton";
import FriendFunctions from "../../utils/isFriend";


const FamilyAndRel = () => {
         
            const {user,activeUserProfile}=useContext(UserContext);
            const {about,updateAbout,myAudience, 
                updateMyAudience,updateAboutProperty} = useContext(LightStoreContext);
        const [showRelationshipForm,changeShowRelationshipForm]=useState(false);
        const [showEditDropdown,changeShowEditDropdown]=useState(false)
        const [isFriendStatus] = FriendFunctions();
        
     
        
        
        useEffect(()=>{
             
           showEditDropdown&&document.addEventListener('click',removeShowEditDropdown)
            return()=>{document.removeEventListener('click',removeShowEditDropdown)}
        },[showEditDropdown])
        
        const removeShowEditDropdown=()=>{
            changeShowEditDropdown(false)
        }
        
        
        
        
        
        
        
        
        
        
        const removeRelationship=()=>{
            const data ={status:'',audience:''}
            updateAboutProperty(user.username,data,'familyAndRel','relationship');
            changeShowRelationshipForm(false);
        }
        
 
    
        
        
        
    if(!about.familyAndRel){return <AboutSkeleton  keyArray={[7,8,9]}/>}
    const {relationship}=about.familyAndRel;
            return ( <div className={`${styles.workAndEducationContainer}`}>
        
                <div id={'relationship'} className={`${styles.propertyBox}`}>
                    <span className={styles.workAndEduHeadings}>Relationship</span>
                    {showRelationshipForm&&<RelationshipForm
                     showForm={changeShowRelationshipForm} 
                     arg1={'familyAndRel'}
                     arg2={'relationship'}
                     arg3={'status'}
                     placeholder={''}/>}
                    {!showRelationshipForm&&
                    <div className={`${styles.aroundWorkPlaceBox} `}>
                          {(relationship.status||user.username!==activeUserProfile)&&<div className={styles.aroundImage}>
                        <img src = {`${process.env.NEXT_PUBLIC_HOST}/img/relationship.png`}>
                        </img>
                        </div>}
                    <div className={styles.workPlaceBox}>
                        <div className={styles.workPlaceString} >
                        {relationship.status&&(relationship.audience==='public'||
                user.username===activeUserProfile||
                (relationship.audience==='friends'&&isFriendStatus(activeUserProfile)))?<>
                            <span className={styles.string1}>
                                {`${about.familyAndRel.relationship.status}`}
                                </span>
                                </>:
           (!showRelationshipForm&&!about.familyAndRel.relationship.status&&user.username===activeUserProfile)?
           <div  onClick={()=>changeShowRelationshipForm(true)} className={`${styles.addImgAndString}`}>
           <img className={styles.addImg} src ={`${process.env.NEXT_PUBLIC_HOST}/img/add.png`}>
           </img>
           <span className={styles.addString}>Add a Relationship Status</span>
          </div>:<span className={styles.notToShowStrig}>
                        Nothing to Show
                        </span> }
                        
                        </div>
                        {relationship.status&&user.username===activeUserProfile&&<div className={styles.aroundEditDropdownContainer}>
                            <div className={styles.editDropdownContainer }>
                            <span type='button' data-toggle="tooltip" data-placement="bottom" title={relationship.audience} 
                         className={styles.aroundAudienceIcon}><img width='16' height='16'
                        src={`${process.env.NEXT_PUBLIC_HOST}/img/audience/${relationship.audience}.png`}></img></span>
                        
                        <span  type='button' onClick={()=>changeShowEditDropdown(true)}
                         className={styles.editDropdownIcon}><img width='20' height='20'
                        src={`${process.env.NEXT_PUBLIC_HOST}/img/moreIconPng.png`}></img></span>
                        </div>
        
                         {showEditDropdown&&
                         <div className={styles.aroundEditDropdown}>
                         <div className={`flex-coloumn 
                      align-items-center ${styles.editDropdown}`}>
                       
                      <button  onClick={()=>changeShowRelationshipForm(true)} className={`btn d-flex justify-content-start
                      align-items-center ${styles.dropButtons}`}>
                          <img className={`${styles.dropButtonIcon}`} 
                          src ={`${process.env.NEXT_PUBLIC_HOST}/img/edit.svg`}/>
                      Edit Relationship</button>
                  
                      <button onClick={removeRelationship} className={`btn d-flex justify-content-start
                      align-items-center ${styles.dropButtons}`}>
                          <img  className={`${styles.dropButtonIcon}`} 
                          src ={`${process.env.NEXT_PUBLIC_HOST}/img/delete.svg`}/>
                   Delete Relationship
                      </button>
                   </div>
                      </div>}
                        </div>}
                       
                    </div>
                    </div>}
                    
                    {/* {(!showRelationshipForm&&!about.familyAndRel.relationship.status)&&<div  onClick={()=>changeShowRelationshipForm(true)} className={`${styles.addImgAndString}`}>
                     <img className={styles.addImg} src ={`${process.env.NEXT_PUBLIC_HOST}/img/add.png`}>
                     </img>
                     <span className={styles.addString}>Add a Relationship Status</span>
                    </div>} */}
                </div></div>)}

 
export default FamilyAndRel;