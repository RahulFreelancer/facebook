import { useContext, useEffect, useState } from 'react';
import styles from '../../../CssModules/about.module.css';
import SelectAudience from '../../../utils/audienceModel';
import LightStoreContext from '../../../utils/lightStoreContext';
import UserContext from '../../../utils/userContext';

const BirthdayForm = ({showForm,arg1}) => {
const {myAudience,updateMyAudience,about,updateAboutProperty}=useContext(LightStoreContext);
const {user}=useContext(UserContext);


const [form,changeForm]=useState({dob:{day:"",month:"",year:""},audience:''});
useEffect(()=>{
  
        if(about.contactAndBasicInfo&&about.contactAndBasicInfo.dob&&about.contactAndBasicInfo.dob.audience){
            updateMyAudience(about.contactAndBasicInfo.dob.audience);
        }
        // else(updateMyAudience('public'))
 
    if(about.userBasicInfo){
        const data = {...form};
   data.dob.day=about.userBasicInfo.dob.day;
   data.dob.month=about.userBasicInfo.dob.month;
   data.dob.year=about.userBasicInfo.dob.year;
    
     changeForm(data);
    }
  
 },[about])



const cancelForm=(e)=>{e.preventDefault();
    showForm(false);
}
const saveForm=(e)=>{e.preventDefault()

 updateAboutProperty(user.username,{audience:myAudience},'contactAndBasicInfo','dob');
// update dob to user also 
    showForm(false);
}

const handleFormChange=({currentTarget:input})=>{
    const data = {...form};

    // input.value=input.value.split(" ").map((n)=>{return n[0]&&n[0].toUpperCase()+n.substring(1)}).join(" ");
    data.dob[input.name]=input.value;

changeForm(data);


}


    return ( <><SelectAudience/>
    <form className={styles.workForm}>
    
        <div className={styles.bottomBox}>
        <label type = 'button' data-toggle="modal" data-target="#audienceModal"
         htmlFor='audience'className={`${styles.allButtonStyle} 
         ${styles.greyButton}`}
        >
           {myAudience==='public'&&<div className={styles.audienceStringAndIcon}>
               <img className = {styles.audienceButtonIcon} 
               src = {`${process.env.NEXT_PUBLIC_HOST}/img/audience/public.png`}>

               </img>
           <span>Public</span></div>}
           
           {myAudience==='friends'&&<div className={styles.audienceStringAndIcon}>
               <img className = {styles.audienceButtonIcon} src = {`${process.env.NEXT_PUBLIC_HOST}/img/audience/friends.png`}></img>
           <span>Friends</span></div>}
                
           {myAudience==='onlyMe'&&<div className={styles.audienceStringAndIcon}>
               <img className = {styles.audienceButtonIcon} src = {`${process.env.NEXT_PUBLIC_HOST}/img/audience/onlyMe.png`}></img>
           <span>Only me</span></div>}
        </label>
        <input  type ='hidden' name='audience' value={form.audience} id='audience'  ></input>
       <div className={styles.saveAndCanelButtonBox}>
        <button
         onClick={cancelForm} 
        className={`${styles.allButtonStyle} ${styles.greyButton}`}>Cancel</button>
        <button 
        onClick={saveForm} 
        className={`btn ${styles.allButtonStyle} ${styles.blueButton}`}>Save</button>
        </div>
        </div>
        
    </form></>  );
}



export default BirthdayForm;