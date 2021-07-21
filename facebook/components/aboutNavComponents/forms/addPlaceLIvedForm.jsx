import { useContext, useEffect, useState } from 'react';
import styles from '../../../CssModules/about.module.css';
import SelectAudience from '../../../utils/audienceModel';
import LightStoreContext from '../../../utils/lightStoreContext';
import UserContext from '../../../utils/userContext';

const FormWithOneInput = ({showForm,arg1,arg2,arg3,placeholder}) => {
const {myAudience,updateMyAudience,about,updateAboutProperty}=useContext(LightStoreContext);
const {user}=useContext(UserContext);


const [form,changeForm]=useState({[arg3]:'',audience:''});
useEffect(()=>{
  
        if(about[arg1]&&about[arg1][arg2]&&about[arg1][arg2].audience){
            updateMyAudience(about[arg1][arg2].audience);
        }
        else(updateMyAudience('public'))
 
    if(about[arg1]&&about[arg1][arg2]&&about[arg1][arg2][arg3]){
        const data = {...form};
     data[arg3]=about[arg1][arg2][arg3];
    
     changeForm(data);
    }
  
 },[about])



const cancelForm=(e)=>{e.preventDefault();
    showForm(false);
}
const saveForm=(e)=>{e.preventDefault()
    const data = {...form};
 data.audience=myAudience;
 updateAboutProperty(user.username,data,arg1,arg2);

    showForm(false);
}

const handleFormChange=({currentTarget:input})=>{
    const data = {...form};

    input.value=input.value.split(" ").map((n)=>{return n[0]&&n[0].toUpperCase()+n.substring(1)}).join(" ");
  
    data[input.name]=input.value;

changeForm(data);


}


    return ( <><SelectAudience/>
    <form className={styles.workForm}>
        <input type='text' name={arg3}
         onChange={handleFormChange} value={form[arg3]} 
         className={styles.textInput} 
        placeholder={placeholder}>
        </input>
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
        <button disabled={form[arg3]?false:true}
        onClick={saveForm} 
        className={`btn ${styles.allButtonStyle} ${styles.blueButton}`}>Save</button>
        </div>
        </div>
        
    </form></>  );
}



export default FormWithOneInput;