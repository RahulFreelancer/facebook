import FormWithOneInput from "./forms/addPlaceLIvedForm";
import { useContext, useEffect, useState } from "react";
import LightStoreContext from "../../utils/lightStoreContext";
import UserContext from "../../utils/userContext";
import styles from '../../CssModules/about.module.css';
import GenderForm from "./forms/updateGenderForm";
import BirthdayForm from "./forms/updateBirthdayForm";
import AboutSkeleton from "../../utils/aboutSkeleton";
import FriendFunctions from "../../utils/isFriend";

 
const ContactAndBasicInfo = () => {
            const {user,activeUserProfile}=useContext(UserContext);
            const {about,updateAbout,myAudience, 
                updateMyAudience,updateAboutProperty} = useContext(LightStoreContext);
        const [showAddressForm,changeShowAddressForm]=useState(false);
        const [showLanguageForm,changeShowLanguageForm]=useState(false);
        const [showGenderForm,changeShowGenderForm]=useState(false);
        const [showBirthdayForm,changeShowBirthdayForm]=useState(false);
    
        
        const [showEditDropdown,changeShowEditDropdown]=useState(false)
        const [showEditLanguageDropdown,changeShowEditLanguageDropdown]=useState(false)
        const [showEditGenderDropdown,changeShowEditGenderDropdown]=useState(false)
        const [showEditBirthdayDropdown,changeShowEditBirthdayDropdown]=useState(false)
        const [isFriendStatus] = FriendFunctions();
        
        
        
        useEffect(()=>{
             
           showEditDropdown&&document.addEventListener('click',removeShowEditDropdown)
            return()=>{document.removeEventListener('click',removeShowEditDropdown)}
        },[showEditDropdown])
        
        const removeShowEditDropdown=()=>{
            changeShowEditDropdown(false)
        }
        
        useEffect(()=>{
             
            showEditLanguageDropdown&&document.addEventListener('click',removeShowHomeTownDropdown)
             return()=>{document.removeEventListener('click',removeShowHomeTownDropdown)}
         },[showEditLanguageDropdown])
         
         const removeShowHomeTownDropdown=()=>{
             changeShowEditLanguageDropdown(false)
         }

         useEffect(()=>{
             
           showEditGenderDropdown&&document.addEventListener('click',removeShowGenderDropdown)
             return()=>{document.removeEventListener('click',removeShowGenderDropdown)}
         },[showEditGenderDropdown])
         
         const removeShowGenderDropdown=()=>{
             changeShowEditGenderDropdown(false)
         }

         useEffect(()=>{
             
        showEditBirthdayDropdown&&document.addEventListener('click',removeShowBirthdayDropdown)
              return()=>{document.removeEventListener('click',removeShowBirthdayDropdown)}
          },[showEditBirthdayDropdown])
          
          const removeShowBirthdayDropdown=()=>{
              changeShowEditBirthdayDropdown(false)
          }
        
        
        
        
        
        
        
        
        
        const removeAddress=()=>{
            const data ={contactAddress:'',audience:''}
            updateAboutProperty(user.username,data,'contactAndBasicInfo','address');
            changeShowAddressForm(false);
        }
        
        const removeLanguage=()=>{
            const data ={myLanguages:'',audience:''}
            updateAboutProperty(user.username,data,'contactAndBasicInfo','language');
            changeShowLanguageForm(false);
        }
    
        
      
        
    if(!about.contactAndBasicInfo){return <AboutSkeleton keyArray={[1,2,3]}/>}
    const {address,language,}=about.contactAndBasicInfo;
    const {gender,genderPronounce,dob}=about.userBasicInfo;

    const genderString=()=>{
        const stringOne=`'He:"Wish him a happy birthday!"`
        const stringTwo=`She:"Wish her a happy birthday!"`
      
if(gender&&genderPronounce){
    return genderPronounce==='she'?  <> <strong>{gender}</strong> {stringTwo}</>:
   <> <strong>{gender}</strong> {stringOne}</>
}

if(genderPronounce){
    return genderPronounce==='she'?stringTwo:stringOne;
}

if(gender){
    return gender;
}

    }
    
            return ( <div className={`${styles.workAndEducationContainer}`}>
        
                <div id={'address'} className={`${styles.propertyBox}`}>
                    <span className={styles.workAndEduHeadings}>Contact info</span>
                    {showAddressForm&&<FormWithOneInput
                     showForm={changeShowAddressForm} 
                     arg1={'contactAndBasicInfo'}
                     arg2={'address'}
                     arg3={'contactAddress'}
                     placeholder={'Your Contact Address With ZIP/POSTAL code'}/>}
                    {!showAddressForm&&
                    <div className={styles.aroundWorkPlaceBox}>
                         {(address.contactAddress||user.username!==activeUserProfile)&&<div className={styles.aroundImage}>
                        <img src = {`${process.env.NEXT_PUBLIC_HOST}/img/address.png`}>
                        </img>
                        </div>}
                    <div className={styles.workPlaceBox}>
                        <div className={styles.workPlaceString}>
                            
                {address.contactAddress&&(address.audience==='public'||
                user.username===activeUserProfile||
                (address.audience==='friends'&&isFriendStatus(activeUserProfile)))?<>
                            <span className={styles.string1}>
   {`${about.contactAndBasicInfo.address.contactAddress}`}</span>
                            <span  className={styles.string2}>Contact Address
                            </span>
                            </>:
                          
                          (!showAddressForm&&!about.contactAndBasicInfo.address.contactAddress&&user.username===activeUserProfile)?
                          <div  onClick={()=>changeShowAddressForm(true)} className={`${styles.addImgAndString}`}>
                          <img className={styles.addImg} src ={`${process.env.NEXT_PUBLIC_HOST}/img/add.png`}>
                          </img>
                          <span className={styles.addString}>Add Contact Address</span>
                         </div>:<span className={styles.notToShowStrig}>
                        No Contact to show
                        </span> }
                        </div>
                        {address.contactAddress&&user.username===activeUserProfile&&<div className={styles.aroundEditDropdownContainer}>
                            <div className={styles.editDropdownContainer }>
                            <span type='button' data-toggle="tooltip" data-placement="bottom" title={address.audience} 
                         className={styles.aroundAudienceIcon}><img width='16' height='16'
                        src={`${process.env.NEXT_PUBLIC_HOST}/img/audience/${address.audience}.png`}></img></span>
                        
                        <span  type='button' onClick={()=>changeShowEditDropdown(true)}
                         className={styles.editDropdownIcon}><img width='20' height='20'
                        src={`${process.env.NEXT_PUBLIC_HOST}/img/moreIconPng.png`}></img></span>
                        </div>
        
                         {showEditDropdown&&
                         <div className={styles.aroundEditDropdown}>
                         <div className={`flex-coloumn 
                      align-items-center ${styles.editDropdown}`}>
                       
                      <button  onClick={()=>changeShowAddressForm(true)} className={`btn d-flex justify-content-start
                      align-items-center ${styles.dropButtons}`}>
                          <img className={`${styles.dropButtonIcon}`} 
                          src ={`${process.env.NEXT_PUBLIC_HOST}/img/edit.svg`}/>
                      Edit Current City</button>
                  
                      <button onClick={removeAddress} className={`btn d-flex justify-content-start
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
                    
                    {/* {(!showAddressForm&&!about.contactAndBasicInfo.address.contactAddress)&&<div  onClick={()=>changeShowAddressForm(true)} className={`${styles.addImgAndString}`}>
                     <img className={styles.addImg} src ={`${process.env.NEXT_PUBLIC_HOST}/img/add.png`}>
                     </img>
                     <span className={styles.addString}>Add Contact Address</span>
                    </div>} */}
                </div>
        
        
        
        
                {/* language */}
                <div id={'language'} className={`${styles.propertyBox}`}>
                <span className={styles.workAndEduHeadings}>Basic info</span>
                {showLanguageForm&&
                <FormWithOneInput showForm={changeShowLanguageForm} 
                arg1={'contactAndBasicInfo'}
                arg2={'language'}
                arg3={'myLanguages'}
                placeholder={'Add one or more language seperated by space'}/>}
                {!showLanguageForm&&<div className={styles.aroundWorkPlaceBox}>
                {(language.myLanguages||user.username!==activeUserProfile)&&<div className={styles.aroundImage}>
                    <img src = {`${process.env.NEXT_PUBLIC_HOST}/img/language.png`}>
                    </img>
                    </div>}
                    <div className={styles.workPlaceBox}>
                        <div className={styles.workPlaceString}>
                        {language.myLanguages&&(language.audience==='public'||
                user.username===activeUserProfile||
                (language.audience==='friends'&&isFriendStatus(activeUserProfile)))?<>
                            <span className={styles.string1}>
                                {`${language.myLanguages}`}</span>
                            <span  className={styles.string2}>Languages</span>
                            </>:
                          
                          !showLanguageForm&&!about.contactAndBasicInfo.language.myLanguages&&user.username===activeUserProfile?
                          <div onClick={()=>changeShowLanguageForm(true)} className={`${styles.addImgAndString}`}>
                          <img className={styles.addImg} src ={`${process.env.NEXT_PUBLIC_HOST}/img/add.png`}>
                          </img>
                          <span className={styles.addString}>Add a language</span>
                          </div>:<span className={styles.notToShowStrig}>
                        No language to show
                        </span> }
                        </div>
                        {language.myLanguages&&user.username===activeUserProfile&&<div className={styles.aroundEditDropdownContainer}>
                            <div className={styles.editDropdownContainer }>
                            <span type='button' data-toggle="tooltip" data-placement="bottom" title={language.audience} 
                         className={styles.aroundAudienceIcon}><img width='16' height='16'
                        src={`${process.env.NEXT_PUBLIC_HOST}/img/audience/${language.audience}.png`}></img></span>
                        
                        <span  type='button' onClick={()=>changeShowEditLanguageDropdown(true)}
                         className={styles.editDropdownIcon}><img width='20' height='20'
                        src={`${process.env.NEXT_PUBLIC_HOST}/img/moreIconPng.png`}></img></span>
                        </div>
        
                         {showEditLanguageDropdown&&
                         <div className={styles.aroundEditDropdown}>
                         <div className={`flex-coloumn 
                      align-items-center ${styles.editDropdown}`}>
                       
                      <button  onClick={()=>changeShowLanguageForm(true)} className={`btn d-flex justify-content-start
                      align-items-center ${styles.dropButtons}`}>
                          <img className={`${styles.dropButtonIcon}`} 
                          src ={`${process.env.NEXT_PUBLIC_HOST}/img/edit.svg`}/>
                      Edit language</button>
                  
                      <button onClick={removeLanguage} className={`btn d-flex justify-content-start
                      align-items-center ${styles.dropButtons}`}>
                          <img  className={`${styles.dropButtonIcon}`} 
                          src ={`${process.env.NEXT_PUBLIC_HOST}/img/delete.svg`}/>
                   Delete language
                      </button>
                   </div>
                      </div>}
                        </div>}
                       </div>
                    </div>}
                    
                    {/* {!showLanguageForm&&!about.contactAndBasicInfo.language.myLanguages&&<div onClick={()=>changeShowLanguageForm(true)} className={`${styles.addImgAndString}`}>
                     <img className={styles.addImg} src ={`${process.env.NEXT_PUBLIC_HOST}/img/add.png`}>
                     </img>
                     <span className={styles.addString}>Add a language</span>
                     </div>
                    } */}
                    </div>

{/* gender */}

<div id={'gender'} className={`${styles.propertyBox}`}>
                {/* <span className={styles.workAndEduHeadings}>Gender</span> */}
                {showGenderForm&&
                <GenderForm showForm={changeShowGenderForm} 
                arg1={'gender'}
                placeholder={'Gender'}/>
                }
                {!showGenderForm&&(gender||genderPronounce)
                    &&<div className={styles.aroundWorkPlaceBox}>
                    <img src = {`${process.env.NEXT_PUBLIC_HOST}/img/gender.png`}>
    
                    </img>
                    <div className={styles.workPlaceBox}>
                        <div className={styles.workPlaceString}>
                            <span className={styles.string1}>

      {genderString()}
      </span>
                            <span  className={styles.string2}>Gender</span>
                        </div>
                        {user.username===activeUserProfile&&<div className={styles.aroundEditDropdownContainer}>
                            <div className={styles.editDropdownContainer }>
                            <span type='button' data-toggle="tooltip" data-placement="bottom" title={'public'} 
                         className={styles.aroundAudienceIcon}><img width='16' height='16'
                        src={`${process.env.NEXT_PUBLIC_HOST}/img/audience/public.png`}></img></span>
                        
                        <span  type='button' onClick={()=>changeShowEditGenderDropdown(true)}
                         className={styles.editDropdownIcon}><img width='20' height='20'
                        src={`${process.env.NEXT_PUBLIC_HOST}/img/moreIconPng.png`}></img></span>
                        </div>
        
                         {showEditGenderDropdown&&
                         <div className={styles.aroundEditDropdown}>
                         <div className={`flex-coloumn 
                      align-items-center ${styles.editDropdown}`}>
                       
                      <button  onClick={()=>changeShowGenderForm(true)} className={`btn d-flex justify-content-start
                      align-items-center ${styles.dropButtons}`}>
                          <img className={`${styles.dropButtonIcon}`} 
                          src ={`${process.env.NEXT_PUBLIC_HOST}/img/edit.svg`}/>
                      Edit Gender</button>
                  
                   
                   </div>
                      </div>}
                        </div>}
                       </div>
                    </div>}
                    </div>

{/* dob */}


<div id={'birthday'} className={`${styles.propertyBox}`}>
                {/* <span className={styles.workAndEduHeadings}>Gender</span> */}
                {showBirthdayForm&&
                <BirthdayForm showForm={changeShowBirthdayForm} 
                arg1={'gender'}
              />
                }
                {!showBirthdayForm&&(dob)
                    &&<div className={styles.aroundWorkPlaceBox}>
                    <img src = {`${process.env.NEXT_PUBLIC_HOST}/img/birthday.png`}>
    
                    </img>
                    <div className={styles.workPlaceBox}>
                        <div className={styles.workPlaceString}>
                        {(dob.audience==='public'||
                user.username===activeUserProfile||
                (dob.audience==='friends'&&isFriendStatus(activeUserProfile)))?<>
                            <span className={styles.string1}>

      {`${dob.day} ${dob.month} ${dob.year}`}
      </span>
                            <span  className={styles.string2}>Birthday</span>
                            </>:
                          
                   <span className={styles.notToShowStrig}>
                        Nothing to show
                        </span> }
                        </div>
                        {user.username===activeUserProfile&&<div className={styles.aroundEditDropdownContainer}>
                            <div className={styles.editDropdownContainer }>
                            <span type='button' data-toggle="tooltip" data-placement="bottom" 
                            title={about.contactAndBasicInfo.dob.audience} 
                         className={styles.aroundAudienceIcon}><img width='16' height='16'
                        src={`${process.env.NEXT_PUBLIC_HOST}/img/audience/${about.contactAndBasicInfo.dob.audience}.png`}></img></span>
                        
                        <span  type='button'  onClick={()=>changeShowEditBirthdayDropdown(true)}
                         className={styles.editDropdownIcon}><img width='20' height='20'
                        src={`${process.env.NEXT_PUBLIC_HOST}/img/moreIconPng.png`}></img></span>
                        </div>
        
                         {showEditBirthdayDropdown&&
                         <div className={styles.aroundEditDropdown}>
                         <div className={`flex-coloumn 
                      align-items-center ${styles.editDropdown}`}>
                       
                      <button  onClick={()=>changeShowBirthdayForm(true)} className={`btn d-flex justify-content-start
                      align-items-center ${styles.dropButtons}`}>
                          <img className={`${styles.dropButtonIcon}`} 
                          src ={`${process.env.NEXT_PUBLIC_HOST}/img/edit.svg`}/>
                      Edit Birthday</button>
                  
                   
                   </div>
                      </div>}
                        </div>}
                       </div>
                    </div>}
                    </div>



                </div>);  }
         


 
export default ContactAndBasicInfo;