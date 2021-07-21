import { useContext, useEffect, useState } from 'react';
import styles from '../../../CssModules/about.module.css';
import SelectAudience from '../../../utils/audienceModel';
import LightStoreContext from '../../../utils/lightStoreContext';
import UserContext from '../../../utils/userContext';

const HighSchoolForm= ({changeShowHighSchoolForm}) => {
const {myAudience,updateMyAudience,about,updateAboutProperty}=useContext(LightStoreContext);
const {user}=useContext(UserContext);


const [form,changeForm]=useState({name:'',audience:'',graduated:''});
const [isGraduated,changeIsGraduated]=useState(true);
useEffect(()=>{
  
        if(about.workAndEdu&&about.workAndEdu.highSchool&&about.workAndEdu.highSchool.audience){
            updateMyAudience(about.workAndEdu.highSchool.audience);
        }
        else(updateMyAudience('public'))
 
    if(about.workAndEdu&&about.workAndEdu.highSchool&&about.workAndEdu.highSchool.name){
        const data = {...form};
     data.name=about.workAndEdu.highSchool.name;
     data.graduated=about.workAndEdu.highSchool.graduated;
     changeForm(data);
    }
  
 },[about])



const cancelForm=(e)=>{e.preventDefault();
    changeShowHighSchoolForm(false);
}
const saveForm=(e)=>{e.preventDefault()
    const data = {...form};
 data.audience=myAudience;


 updateAboutProperty(user.username,data,'workAndEdu','highSchool');

    changeShowHighSchoolForm(false);
}

const handleFormChange=({currentTarget:input})=>{
    if(input.name==='graduated'){
        isGraduated?changeIsGraduated(false):changeIsGraduated(true);
    }
 
  
  input.value=input.value.split(" ").map((n)=>{return n[0]&&n[0].toUpperCase()+n.substring(1)}).join(" ")
  
    //    input.value = newValue.join(" ");
    
  
    const data = {...form};
    data[input.name]=input.value;

changeForm(data);


}


    return ( <><SelectAudience/>
    <form className={styles.workForm}>
        <input type='text' name='name' onChange={handleFormChange} value={form.name} className={styles.textInput} placeholder='Name of School With City'>
        </input>      
        <div className={styles.bottomBox}>
        <div className='d-flex align-items-center'>
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
        <div className='ml-5'>
        <input onChange={handleFormChange} name='graduated' 
        class="form-check-input" type="checkbox" 
   value={(isGraduated&&'graduation')||''} id="defaultCheck1" checked={form.graduated?true:false} ></input>
  <label type ='button' class="form-check-label" for="defaultCheck1">
  <strong>Graduated</strong>
  </label></div>
        </div>
       <div className={styles.saveAndCanelButtonBox}>
        <button
         onClick={cancelForm} 
        className={`${styles.allButtonStyle} ${styles.greyButton}`}>Cancel</button>
        <button disabled={form.name?false:true}
        onClick={saveForm} 
        className={`btn ${styles.allButtonStyle} ${styles.blueButton}`}>Save</button>
        </div>
        </div>
        
    </form></>  );
}



export default HighSchoolForm;