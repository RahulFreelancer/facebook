import { useContext, useEffect, useState } from "react";
import LightStoreContext from "../../utils/lightStoreContext";
import UserContext from "../../utils/userContext";
import styles from '../../CssModules/about.module.css';
import DetailForm from "./forms/addDetailForm";
import AboutSkeleton from "../../utils/aboutSkeleton";
import FriendFunctions from "../../utils/isFriend";
const Details = () => {
                const {user,activeUserProfile}=useContext(UserContext);
                const {about,updateAbout,myAudience, 
                    updateMyAudience,updateAboutProperty} = useContext(LightStoreContext);
            const [showDetailForm,changeShowDetailForm]=useState(false);
            
            const [showEditDropdown,changeShowEditDropdown]=useState(false)
            const [isFriendStatus] = FriendFunctions();
            
         
            
            
            useEffect(()=>{
                 
               showEditDropdown&&document.addEventListener('click',removeShowEditDropdown)
                return()=>{document.removeEventListener('click',removeShowEditDropdown)}
            },[showEditDropdown])
            
            const removeShowEditDropdown=()=>{
                changeShowEditDropdown(false)
            }
            
            
            
            
            
            
            
            
            
            
            const removeDetail=()=>{
                const data ={detailString:'',audience:''}
                updateAboutProperty(user.username,data,'details','aboutProfileUser');
                changeShowDetailForm(false);
            }
            
     
        
            
            
            
        if(!about.details){return <AboutSkeleton keyArray={[4,5,6]}/>}
        const {aboutProfileUser}=about.details;
                return ( <div className={`${styles.workAndEducationContainer}`}>
            
                    <div id={'aboutProfileUser'} className={`${styles.propertyBox}`}>
                        <span className={styles.workAndEduHeadings}>About You</span>
                        {showDetailForm&&<DetailForm
                         showForm={changeShowDetailForm} 
                         arg1={'details'}
                         arg2={'aboutProfileUser'}
                         arg3={'detailString'}
                         placeholder={'Describe yourself'}/>}
                        {!showDetailForm&&
                        <div className={`${styles.aroundWorkPlaceBox} `}>
                            
                        <div style={{margin:0}} className={styles.workPlaceBox}>
                        {aboutProfileUser.detailString&&(aboutProfileUser.audience==='public'||
                user.username===activeUserProfile||
                (aboutProfileUser.audience==='friends'&&isFriendStatus(activeUserProfile)))?<>
                                <span 
                                style={{fontSize:"15px"}}
                                > {`${about.details.aboutProfileUser.detailString}`}
                                    </span>
                                    </>:
                          
                          (!showDetailForm&&!about.details.aboutProfileUser.detailString&&user.username===activeUserProfile)?
                          <div  onClick={()=>changeShowDetailForm(true)} className={`${styles.addImgAndString}`}>
                          <img className={styles.addImg} src ={`${process.env.NEXT_PUBLIC_HOST}/img/add.png`}>
                          </img>
                          <span className={styles.addString}>Write some details about yourself</span>
                         </div>:<span className={styles.notToShowStrig}>
                        Nothing to show
                        </span> }
                            
                      
                            {aboutProfileUser.detailString&&user.username===activeUserProfile&&<div className={styles.aroundEditDropdownContainer}>
                                <div className={styles.editDropdownContainer }>
                                <span type='button' data-toggle="tooltip" data-placement="bottom" title={aboutProfileUser.audience} 
                             className={styles.aroundAudienceIcon}><img width='16' height='16'
                            src={`${process.env.NEXT_PUBLIC_HOST}/img/audience/${aboutProfileUser.audience}.png`}></img></span>
                            
                            <span  type='button' onClick={()=>changeShowEditDropdown(true)}
                             className={styles.editDropdownIcon}><img width='20' height='20'
                            src={`${process.env.NEXT_PUBLIC_HOST}/img/moreIconPng.png`}></img></span>
                            </div>
            
                             {showEditDropdown&&
                             <div className={styles.aroundEditDropdown}>
                             <div className={`flex-coloumn 
                          align-items-center ${styles.editDropdown}`}>
                           
                          <button  onClick={()=>changeShowDetailForm(true)} className={`btn d-flex justify-content-start
                          align-items-center ${styles.dropButtons}`}>
                              <img className={`${styles.dropButtonIcon}`} 
                              src ={`${process.env.NEXT_PUBLIC_HOST}/img/edit.svg`}/>
                          Edit detail</button>
                      
                          <button onClick={removeDetail} className={`btn d-flex justify-content-start
                          align-items-center ${styles.dropButtons}`}>
                              <img  className={`${styles.dropButtonIcon}`} 
                              src ={`${process.env.NEXT_PUBLIC_HOST}/img/delete.svg`}/>
                       Delete detail
                          </button>
                       </div>
                          </div>}
                            </div>}
                           
                        </div>
                        </div>}
                        
                        {/* {(!showDetailForm&&!about.details.aboutProfileUser.detailString)&&<div  onClick={()=>changeShowDetailForm(true)} className={`${styles.addImgAndString}`}>
                         <img className={styles.addImg} src ={`${process.env.NEXT_PUBLIC_HOST}/img/add.png`}>
                         </img>
                         <span className={styles.addString}>Write some details about yourself</span>
                        </div>} */}
                    </div></div>)}
    
     


 
export default Details;