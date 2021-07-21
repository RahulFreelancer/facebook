
import { useContext, useEffect, useState } from 'react';
import styles from '../../../CssModules/about.module.css';
import SelectAudience from '../../../utils/audienceModel';
import LightStoreContext from '../../../utils/lightStoreContext';
import UserContext from '../../../utils/userContext';

const WorkForm = ({changeShowWorkForm}) => {
const {myAudience,updateMyAudience,about,updateAboutProperty}=useContext(LightStoreContext);
const {user}=useContext(UserContext);


const [form,changeForm]=useState({company:'',position:'',city:'',audience:''});
useEffect(()=>{
  
        if(about.workAndEdu&&about.workAndEdu.work&&about.workAndEdu.work.audience){
            updateMyAudience(about.workAndEdu.work.audience);
        }
        else(updateMyAudience('public'))
 
    if(about.workAndEdu&&about.workAndEdu.work&&about.workAndEdu.work.company){
        const data = {...form};
     data.company=about.workAndEdu.work.company;
     data.position=about.workAndEdu.work.position;
     data.city=about.workAndEdu.work.city;
     changeForm(data);
    }
  
 },[about])



const cancelForm=(e)=>{e.preventDefault();
    changeShowWorkForm(false);
}
const saveForm=(e)=>{e.preventDefault()
    const data = {...form};
 data.audience=myAudience;
 updateAboutProperty(user.username,data,'workAndEdu','work');

    changeShowWorkForm(false);
}

const handleFormChange=({currentTarget:input})=>{
    const data = {...form};

    input.value=input.value.split(" ").map((n)=>{return n[0]&&n[0].toUpperCase()+n.substring(1)}).join(" ");
  
    data[input.name]=input.value;

changeForm(data);


}


    return ( <><SelectAudience/>
    <form className={styles.workForm}>
        <input type='text' name='company' onChange={handleFormChange} value={form.company} className={styles.textInput} placeholder='Company'>
        </input>
        <input type='text' name='position' onChange={handleFormChange} value = {form.position}className={styles.textInput} placeholder='Position'>
        </input>
        <input type='text' name='city' onChange={handleFormChange} value={form.city} className={styles.textInput}placeholder='City/Town'>
        </input>
        <div className={styles.bottomBox}>
        <label type = 'button' data-toggle="modal" data-target="#audienceModal" htmlFor='audience'className={`${styles.allButtonStyle} ${styles.greyButton}`}
        >
           {myAudience==='public'&&<div className={styles.audienceStringAndIcon}>
               <img className = {styles.audienceButtonIcon} src = {`${process.env.NEXT_PUBLIC_HOST}/img/audience/public.png`}></img>
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
        <button disabled={form.company&&form.position&&form.city?false:true}
        onClick={saveForm} 
        className={`btn ${styles.allButtonStyle} ${styles.blueButton}`}>Save</button>
        </div>
        </div>
        
    </form></>  );
}



export default WorkForm;