import FormWithOneInput from "./forms/addPlaceLIvedForm";
import { useContext, useEffect, useState } from "react";
import LightStoreContext from "../../utils/lightStoreContext";
import UserContext from "../../utils/userContext";
import styles from '../../CssModules/about.module.css';
import AboutSkeleton from "../../utils/aboutSkeleton";
import FriendFunctions from "../../utils/isFriend";
const PlaceLived = () => {
 
   

    

     
        const {user,activeUserProfile}=useContext(UserContext);
        const {about,updateAbout,myAudience, 
            updateMyAudience,updateAboutProperty} = useContext(LightStoreContext);
    const [showCurrentCityForm,changeShowCurrentCityForm]=useState(false);
    const [showHomeTownForm,changeShowHomeTownForm]=useState(false);

    
    const [showEditDropdown,changeShowEditDropdown]=useState(false)
    const [showEditHomeTownDropdown,changeShowEditHomeTownDropdown]=useState(false)
    const [isFriendStatus] = FriendFunctions();

    
    
    
    useEffect(()=>{
         
       showEditDropdown&&document.addEventListener('click',removeShowEditDropdown)
        return()=>{document.removeEventListener('click',removeShowEditDropdown)}
    },[showEditDropdown])
    
    const removeShowEditDropdown=()=>{
        changeShowEditDropdown(false)
    }
    
    useEffect(()=>{
         
        showEditHomeTownDropdown&&document.addEventListener('click',removeShowHomeTownDropdown)
         return()=>{document.removeEventListener('click',removeShowHomeTownDropdown)}
     },[showEditHomeTownDropdown])
     
     const removeShowHomeTownDropdown=()=>{
         changeShowEditHomeTownDropdown(false)
     }
    
    
    
    
    
    
    
    
    
    const removeCurrentCity=()=>{
        const data ={currentCityName:'',audience:''}
        updateAboutProperty(user.username,data,'placeLived','current');
        changeShowCurrentCityForm(false);
    }
    
    const removeHomeTown=()=>{
        const data ={homeTownName:'',audience:''}
        updateAboutProperty(user.username,data,'placeLived','hometown');
        changeShowHomeTownForm(false);
    }

    
    
    
if(!about.placeLived){return <AboutSkeleton  keyArray={[16,17,19]}/>}
const {current,hometown}=about.placeLived;
        return ( <div className={`${styles.workAndEducationContainer}`}>
    
            <div id={'current'} className={`${styles.propertyBox}`}>
                <span className={styles.workAndEduHeadings}>Place Lived</span>
                {showCurrentCityForm&&<FormWithOneInput
                 showForm={changeShowCurrentCityForm} 
                 arg1={'placeLived'}
                 arg2={'current'}
                 arg3={'currentCityName'}
                 placeholder={'Current town/city'}/>}
                {!showCurrentCityForm&&
                <div className={styles.aroundWorkPlaceBox}>
                     {(current.currentCityName||user.username!==activeUserProfile)&&<div className={styles.aroundImage}>
                    <img src = {`${process.env.NEXT_PUBLIC_HOST}/img/current.png`}></img>
                    </div>}
                <div className={styles.workPlaceBox}>
                    <div className={styles.workPlaceString}>
                        
                {current.currentCityName&&(current.audience==='public'||
                user.username===activeUserProfile||
                (current.audience==='friends'&&isFriendStatus(activeUserProfile)))?<>
                        <span className={styles.string1}>
                            {`${about.placeLived.current.currentCityName}`}</span>
                        <span  className={styles.string2}>Current town/city</span>
                        </>:
                            (!showCurrentCityForm&&!about.placeLived.current.currentCityName&&user.username===activeUserProfile)?
                            <div  onClick={()=>changeShowCurrentCityForm(true)} className={`${styles.addImgAndString}`}>
                            <img className={styles.addImg} src ={`${process.env.NEXT_PUBLIC_HOST}/img/add.png`}>
                            </img>
                            <span className={styles.addString}>Add Current City</span>
                           </div>
         :<span className={styles.notToShowStrig}>
                        No Place to show
                        </span> }
                    </div>
                    {current.currentCityName&&user.username===activeUserProfile&&<div className={styles.aroundEditDropdownContainer}>
                        <div className={styles.editDropdownContainer }>
                        <span type='button' data-toggle="tooltip" data-placement="bottom" title={current.audience} 
                     className={styles.aroundAudienceIcon}><img width='16' height='16'
                    src={`${process.env.NEXT_PUBLIC_HOST}/img/audience/${current.audience}.png`}></img></span>
                    
                    <span  type='button' onClick={()=>changeShowEditDropdown(true)}
                     className={styles.editDropdownIcon}><img width='20' height='20'
                    src={`${process.env.NEXT_PUBLIC_HOST}/img/moreIconPng.png`}></img></span>
                    </div>
    
                     {showEditDropdown&&
                     <div className={styles.aroundEditDropdown}>
                     <div className={`flex-coloumn 
                  align-items-center ${styles.editDropdown}`}>
                   
                  <button  onClick={()=>changeShowCurrentCityForm(true)} className={`btn d-flex justify-content-start
                  align-items-center ${styles.dropButtons}`}>
                      <img className={`${styles.dropButtonIcon}`} 
                      src ={`${process.env.NEXT_PUBLIC_HOST}/img/edit.svg`}/>
                  Edit Current City</button>
              
                  <button onClick={removeCurrentCity} className={`btn d-flex justify-content-start
                  align-items-center ${styles.dropButtons}`}>
                      <img  className={`${styles.dropButtonIcon}`} 
                      src ={`${process.env.NEXT_PUBLIC_HOST}/img/delete.svg`}/>
               Delete Current City
                  </button>
               </div>
                  </div>}
                    </div>}
                   
                </div>
                </div>}
                
                {/* (!showCurrentCityForm&&!about.placeLived.current.currentCityName)&&<div  onClick={()=>changeShowCurrentCityForm(true)} className={`${styles.addImgAndString}`}>
                 <img className={styles.addImg} src ={`${process.env.NEXT_PUBLIC_HOST}/img/add.png`}>
                 </img>
                 <span className={styles.addString}>Add Current City</span>
                </div> */}
            </div>
    
    
    
    
            {/* hometown */}
            <div id={'hometown'} className={`${styles.propertyBox}`}>
            
            {showHomeTownForm&&
            <FormWithOneInput showForm={changeShowHomeTownForm} 
            arg1={'placeLived'}
            arg2={'hometown'}
            arg3={'homeTownName'}
            placeholder={'HomeTown'}/>}
            {!showHomeTownForm&&<div className={styles.aroundWorkPlaceBox}>
            {(hometown.homeTownName||user.username!==activeUserProfile)&&<div className={styles.aroundImage}>
                <img src = {`${process.env.NEXT_PUBLIC_HOST}/img/hometown.png`}>
                </img>
                </div>}
                <div className={styles.workPlaceBox}>
                    <div className={styles.workPlaceString}>
                    {hometown.homeTownName&&(hometown.audience==='public'||
                user.username===activeUserProfile||
                (hometown.audience==='friends'&&isFriendStatus(activeUserProfile)))?<>
                        <span className={styles.string1}>
                            {`${hometown.homeTownName}`}</span>
                        <span  className={styles.string2}>Hometown</span>
                        </>:
                            !showHomeTownForm&&!about.placeLived.hometown.homeTownName&&user.username===activeUserProfile?
                            <div onClick={()=>changeShowHomeTownForm(true)} className={`${styles.addImgAndString}`}>
                            <img className={styles.addImg} src ={`${process.env.NEXT_PUBLIC_HOST}/img/add.png`}>
                            </img>
                            <span className={styles.addString}>Add a hometown</span>
                            </div>
         :<span className={styles.notToShowStrig}>
                        No Place to show
                        </span> }
                    </div>
                   {hometown.homeTownName&&user.username===activeUserProfile&&<div className={styles.aroundEditDropdownContainer}>
                        <div className={styles.editDropdownContainer }>
                        <span type='button' data-toggle="tooltip" data-placement="bottom" title={hometown.audience} 
                     className={styles.aroundAudienceIcon}><img width='16' height='16'
                    src={`${process.env.NEXT_PUBLIC_HOST}/img/audience/${hometown.audience}.png`}></img></span>
                    
                    <span  type='button' onClick={()=>changeShowEditHomeTownDropdown(true)}
                     className={styles.editDropdownIcon}><img width='20' height='20'
                    src={`${process.env.NEXT_PUBLIC_HOST}/img/moreIconPng.png`}></img></span>
                    </div>
    
                     {showEditHomeTownDropdown&&
                     <div className={styles.aroundEditDropdown}>
                     <div className={`flex-coloumn 
                  align-items-center ${styles.editDropdown}`}>
                   
                  <button  onClick={()=>changeShowHomeTownForm(true)} className={`btn d-flex justify-content-start
                  align-items-center ${styles.dropButtons}`}>
                      <img className={`${styles.dropButtonIcon}`} 
                      src ={`${process.env.NEXT_PUBLIC_HOST}/img/edit.svg`}/>
                  Edit hometown</button>
              
                  <button onClick={removeHomeTown} className={`btn d-flex justify-content-start
                  align-items-center ${styles.dropButtons}`}>
                      <img  className={`${styles.dropButtonIcon}`} 
                      src ={`${process.env.NEXT_PUBLIC_HOST}/img/delete.svg`}/>
               Delete hometown
                  </button>
               </div>
                  </div>}
                    </div>}
                   </div>
                </div>}
                
                {/* {!showHomeTownForm&&!about.placeLived.hometown.homeTownName&&<div onClick={()=>changeShowHomeTownForm(true)} className={`${styles.addImgAndString}`}>
                 <img className={styles.addImg} src ={`${process.env.NEXT_PUBLIC_HOST}/img/add.png`}>
                 </img>
                 <span className={styles.addString}>Add a hometown</span>
                 </div>
                } */}
                </div>
            </div>);  }
     
   
export default PlaceLived;