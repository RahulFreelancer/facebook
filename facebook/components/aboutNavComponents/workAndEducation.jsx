import { useContext, useEffect, useState } from "react";
import LightStoreContext from "../../utils/lightStoreContext";
import UserContext from "../../utils/userContext";
import styles from '../../CssModules/about.module.css';
import WorkForm from "./forms/addWorkForm";
import UniversityForm from "./forms/addUniversityForm";
import HighSchoolForm from "./forms/addHighSchoolForm";
import AboutSkeleton from "../../utils/aboutSkeleton";
import FriendFunctions from "../../utils/isFriend";


const WorkAndEducation = () => {
 
    const {user,activeUserProfile}=useContext(UserContext);
    const {about,updateAbout,myAudience, updateMyAudience,updateAboutProperty} = useContext(LightStoreContext);

    const [showWorkForm,changeShowWorkForm]=useState(false);
const [showUniversityForm,changeShowUniversityForm]=useState(false);
const [showHighSchoolForm,changeShowHighSchoolForm]=useState(false);


const [showEditDropdown,changeShowEditDropdown]=useState(false)
const [showEditUniversityDropdown,changeShowEditUniversityDropdown]=useState(false)
const [showEditHighSchoolDropdown,changeShowEditHighSchoolDropdown]=useState(false)
const [isFriendStatus] = FriendFunctions();


useEffect(()=>{
     
   showEditDropdown&&document.addEventListener('click',removeShowEditDropdown)
    return()=>{document.removeEventListener('click',removeShowEditDropdown)}
},[showEditDropdown])

const removeShowEditDropdown=()=>{
    changeShowEditDropdown(false)
}

useEffect(()=>{
     
    showEditUniversityDropdown&&document.addEventListener('click',removeShowEditUniversityDropdown)
     return()=>{document.removeEventListener('click',removeShowEditUniversityDropdown)}
 },[showEditUniversityDropdown])
 
 const removeShowEditUniversityDropdown=()=>{
     changeShowEditUniversityDropdown(false)
 }

 useEffect(()=>{
     
    showEditHighSchoolDropdown&&document.addEventListener('click',removeShowEditHighSchoolDropdown)
     return()=>{document.removeEventListener('click',removeShowEditHighSchoolDropdown)}
 },[showEditHighSchoolDropdown])
 
 const removeShowEditHighSchoolDropdown=()=>{
     changeShowEditHighSchoolDropdown(false)
 }







const removeWorkplace=()=>{
    const data ={company:'',position:'',city:'',audience:''}
    updateAboutProperty(user.username,data,'workAndEdu','work');
    changeShowWorkForm(false);
}

const removeUniversity=()=>{
    const data ={name:'',course:'',degree:'',audience:'',graduated:''}
    updateAboutProperty(user.username,data,'workAndEdu','university');
    changeShowUniversityForm(false);
}

const removeHighSchool=()=>{
    const data ={name:'',audience:'',graduated:''}
    updateAboutProperty(user.username,data,'workAndEdu','highSchool');
    changeShowHighSchoolForm(false);
}




if(!about.workAndEdu){return <AboutSkeleton  keyArray={[43,56,60]}/>}
const {work,university,highSchool}=about.workAndEdu;

    return ( <div className={`${styles.workAndEducationContainer}`}>

        <div id={'work'} className={`${styles.propertyBox}`}>
            <span className={styles.workAndEduHeadings}>Work</span>
            {showWorkForm&&<WorkForm changeShowWorkForm={changeShowWorkForm}/>}
            {!showWorkForm&&
            <div className={styles.aroundWorkPlaceBox}>
               {(work.company||user.username!==activeUserProfile)&&<div className={styles.aroundImage}>
                <img src = {`${process.env.NEXT_PUBLIC_HOST}/img/work.png`}></img>
                </div>}
            <div className={styles.workPlaceBox}>
                <div className={styles.workPlaceString}>
  
                {work.company&&(work.audience==='public'||
                user.username===activeUserProfile||
                (work.audience==='friends'&&isFriendStatus(activeUserProfile)))?<>
                <span className={styles.string1}>
                  {`${about.workAndEdu.work.position} at ${about.workAndEdu.work.company}`}
                  </span>
                    <span  className={styles.string2}>{about.workAndEdu.work.city}
                    </span></>:
                          
            (!showWorkForm&&!about.workAndEdu.work.company)&&user.username===activeUserProfile?
            <div  onClick={()=>changeShowWorkForm(true)} className={`${styles.addImgAndString}`}>
            <img className={styles.addImg} src ={`${process.env.NEXT_PUBLIC_HOST}/img/add.png`}>
            </img>
            <span className={styles.addString}>Add a workplace</span>
           </div>:<span className={styles.notToShowStrig}>
                        No Workplaces to show
                        </span> }
                </div>
                {work.company&&user.username===activeUserProfile&&<div className={styles.aroundEditDropdownContainer}>
                    <div className={styles.editDropdownContainer }>
                    <span type='button' data-toggle="tooltip" data-placement="bottom" title={work.audience} 
                 className={styles.aroundAudienceIcon}><img width='16' height='16'
                src={`${process.env.NEXT_PUBLIC_HOST}/img/audience/${work.audience}.png`}></img></span>
                
                {user.username===activeUserProfile&&<span  type='button' onClick={()=>changeShowEditDropdown(true)}
                 className={styles.editDropdownIcon}><img width='20' height='20'
                src={`${process.env.NEXT_PUBLIC_HOST}/img/moreIconPng.png`}></img></span>}
                </div>

                 {showEditDropdown&&
                 <div className={styles.aroundEditDropdown}>
                 <div className={`flex-coloumn 
              align-items-center ${styles.editDropdown}`}>
               
              <button  onClick={()=>changeShowWorkForm(true)} className={`btn d-flex justify-content-start
              align-items-center ${styles.dropButtons}`}>
                  <img className={`${styles.dropButtonIcon}`} 
                  src ={`${process.env.NEXT_PUBLIC_HOST}/img/edit.svg`}/>
              Edit Workplace</button>
          
              <button onClick={removeWorkplace} className={`btn d-flex justify-content-start
              align-items-center ${styles.dropButtons}`}>
                  <img  className={`${styles.dropButtonIcon}`} 
                  src ={`${process.env.NEXT_PUBLIC_HOST}/img/delete.svg`}/>
           Delete Workplace
              </button>
           </div>
              </div>}
                </div>}
               
            </div>
            </div>}

        </div>




        {/* university */}
        <div id={'university'} className={`${styles.propertyBox}`}>
        <span className={styles.workAndEduHeadings}>University</span>
        
        {showUniversityForm&&
        <UniversityForm changeShowUniversityForm={changeShowUniversityForm}/>}
            {!showUniversityForm&&
            <div className={styles.aroundWorkPlaceBox}>
             {(university.name||user.username!==activeUserProfile)&&<div className={styles.aroundImage}>
            <img src = {`${process.env.NEXT_PUBLIC_HOST}/img/university.png`}></img></div>}
            <div className={styles.workPlaceBox}>
                <div className={styles.workPlaceString}>

                {university.name&&(university.audience==='public'||
                user.username===activeUserProfile||
                (university.audience==='friends'&&isFriendStatus(activeUserProfile)))?<>
                    <span className={styles.string1}>
                        {`${university.graduated?'Studied' :'Studies'} ${about.workAndEdu.university.course}
                         at ${about.workAndEdu.university.name} `}</span>
                    <span  className={styles.string2}>
                        {`${about.workAndEdu.university.degree} `}</span></>:
                        (!showUniversityForm&&!about.workAndEdu.university.name)&&user.username===activeUserProfile?
                        <div onClick={()=>changeShowUniversityForm(true)} className={`${styles.addImgAndString}`}>
                         <img className={styles.addImg} src ={`${process.env.NEXT_PUBLIC_HOST}/img/add.png`}>
                         </img>
                         <span className={styles.addString}>Add a university</span>
                        </div>:<span className={styles.notToShowStrig}>
                                      No University to show
                                      </span> }
                </div>
                {university.name&&user.username===activeUserProfile&&<div className={styles.aroundEditDropdownContainer}>
                    <div className={styles.editDropdownContainer }>
                    <span type='button' data-toggle="tooltip" data-placement="bottom" title={university.audience} 
                 className={styles.aroundAudienceIcon}><img width='16' height='16'
                src={`${process.env.NEXT_PUBLIC_HOST}/img/audience/${university.audience}.png`}></img></span>
                
                <span  type='button' onClick={()=>changeShowEditUniversityDropdown(true)}
                 className={styles.editDropdownIcon}><img width='20' height='20'
                src={`${process.env.NEXT_PUBLIC_HOST}/img/moreIconPng.png`}></img></span>
                </div>

                 {showEditUniversityDropdown&&
                 <div className={styles.aroundEditDropdown}>
                 <div className={`flex-coloumn 
              align-items-center ${styles.editDropdown}`}>
               
              <button  onClick={()=>changeShowUniversityForm(true)} className={`btn d-flex justify-content-start
              align-items-center ${styles.dropButtons}`}>
                  <img className={`${styles.dropButtonIcon}`} 
                  src ={`${process.env.NEXT_PUBLIC_HOST}/img/edit.svg`}/>
              Edit University</button>
          
              <button onClick={removeUniversity} className={`btn d-flex justify-content-start
              align-items-center ${styles.dropButtons}`}>
                  <img  className={`${styles.dropButtonIcon}`} 
                  src ={`${process.env.NEXT_PUBLIC_HOST}/img/delete.svg`}/>
           Delete University
              </button>
           </div>
              </div>}
                </div>}
               </div>
            </div>}
            
            
        </div>




{/* highSchool */}
        <div id = {'highSchool'} className={`${styles.propertyBox}`}>
        <span className={styles.workAndEduHeadings}>High School</span>

        {showHighSchoolForm&&
        <HighSchoolForm changeShowHighSchoolForm={changeShowHighSchoolForm}/>}
            {!showHighSchoolForm&&
            <div className={styles.aroundWorkPlaceBox}>
                  {(highSchool.name||user.username!==activeUserProfile)&&<div className={styles.aroundImage}>
            <img src = {`${process.env.NEXT_PUBLIC_HOST}/img/highSchool.png`}></img>
            </div>}
            <div className={styles.workPlaceBox}>
                <div className={styles.workPlaceString}>
                {highSchool.name&&(highSchool.audience==='public'||
                user.username===activeUserProfile||
                (highSchool.audience==='friends'&&isFriendStatus(activeUserProfile)))?<>
                    <span className={styles.string1}>
                        {`${highSchool.graduated?'Went to' :'Goes to'} ${about.workAndEdu.highSchool.name}
                         `}</span>
                          </>:  (!showHighSchoolForm&&!about.workAndEdu.highSchool.name&&user.username===activeUserProfile)?
                          <div onClick={()=>{changeShowHighSchoolForm(true)}} className={`${styles.addImgAndString}`}>
             <img className={styles.addImg} src ={`${process.env.NEXT_PUBLIC_HOST}/img/add.png`}>
             </img>
             <span className={styles.addString}>Add a High School</span>
            </div>:<span className={styles.notToShowStrig}>
                                      No High School to show
                                      </span> }

                </div>
                {highSchool.name&&user.username===activeUserProfile&&<div className={styles.aroundEditDropdownContainer}>
                    <div className={styles.editDropdownContainer }>
                    <span type='button' data-toggle="tooltip" data-placement="bottom" title={highSchool.audience} 
                 className={styles.aroundAudienceIcon}><img width='16' height='16'
                src={`${process.env.NEXT_PUBLIC_HOST}/img/audience/${highSchool.audience}.png`}></img></span>
                
                <span  type='button' onClick={()=>changeShowEditHighSchoolDropdown(true)}
                 className={styles.editDropdownIcon}><img width='20' height='20'
                src={`${process.env.NEXT_PUBLIC_HOST}/img/moreIconPng.png`}></img></span>
                </div>

                 {showEditHighSchoolDropdown&&
                 <div className={styles.aroundEditDropdown}>
                 <div className={`flex-coloumn 
              align-items-center ${styles.editDropdown}`}>
               
              <button  onClick={()=>changeShowHighSchoolForm(true)} className={`btn d-flex justify-content-start
              align-items-center ${styles.dropButtons}`}>
                  <img className={`${styles.dropButtonIcon}`} 
                  src ={`${process.env.NEXT_PUBLIC_HOST}/img/edit.svg`}/>
              Edit High School</button>
          
              <button onClick={removeHighSchool} className={`btn d-flex justify-content-start
              align-items-center ${styles.dropButtons}`}>
                  <img  className={`${styles.dropButtonIcon}`} 
                  src ={`${process.env.NEXT_PUBLIC_HOST}/img/delete.svg`}/>
           Delete High School
              </button>
           </div>
              </div>}
                </div>}
               </div>
            </div>
}
        {/* {(!showHighSchoolForm&&!about.workAndEdu.highSchool.name)&&<div onClick={()=>{changeShowHighSchoolForm(true)}} className={`${styles.addImgAndString}`}>
             <img className={styles.addImg} src ={`${process.env.NEXT_PUBLIC_HOST}/img/add.png`}>
             </img>
             <span className={styles.addString}>Add a High School</span>
            </div>} */}
        </div>

    </div> );

}
 
export default WorkAndEducation;