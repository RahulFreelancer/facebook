

import { useControlled } from '@material-ui/core';
import { useContext, useState } from 'react';
import styles from '../../../CssModules/about.module.css';
import LightStoreContext from '../../../utils/lightStoreContext';
import UserContext from "../../../utils/userContext";


const GenderForm = ({showForm,arg1}) => {
const {user}=useContext(UserContext)
const {updateUserGender}=useContext(LightStoreContext);
const [form,changeForm]=useState({gender:"",genderPronounce:""})
const [showCustomGender,changeCustomGender]=useState(false);
const [customGenderDropButtonString,changeCustomGenderDropButtonString ]=useState("");
    
const cancelForm=(e)=>{e.preventDefault();
    showForm(false);
}
const saveForm=(e)=>{
    e.preventDefault()
   updateUserGender(user.username,form);
//  data.audience=myAudience;
//  updateAboutProperty(user.username,data,arg1,arg2);

    showForm(false);
}

const handleFormChange=({currentTarget:input})=>{
    const data = {...form};
console.log(data);
    input.value=input.value.split(" ").map((n)=>{return n[0]&&n[0].toUpperCase()+n.substring(1)}).join(" ");
  
    data[input.name]=input.value;

changeForm(data);


}

const updateGenderPronounce=(pronounceGender,string)=>{
    const data = {...form};
    console.log(data);
        data.genderPronounce=pronounceGender;
    changeForm(data);
    changeCustomGenderDropButtonString(string);
    
}
const disableSaveButton=()=>{
 return !showCustomGender?(form.gender?false:true):(form.genderPronounce?false:true)
}

    return ( <>
    <form className={styles.workForm}>
        {/* <input type='text' name={arg3}
         onChange={handleFormChange} value={form[arg3]} 
         className={styles.textInput} 
        placeholder={placeholder}>
        </input> */}
<div className={styles.aroundSelectGender}>

<label  onClick={()=>{changeCustomGender(false);updateGenderPronounce("","")}}  className={` ${styles.radioInput}`} htmlFor="male">
   <span className={styles.label}>Male</span>
  <input onChange={handleFormChange} type="radio" name="gender"
   id="male" value="male" ></input>
  </label>





<label onClick={()=>{changeCustomGender(false);updateGenderPronounce("","")}}  className={` ${styles.radioInput}`}  htmlFor="female">
  <span className={styles.label}>Female</span>
  <input onChange={handleFormChange} type="radio" name="gender"
   id="female" value="female"></input>
  </label>




<label onClick={()=>changeCustomGender(true)}  className={` ${styles.radioInput}`}  htmlFor="custom">
<span className={styles.label}>Custom</span>
<input  onChange={handleFormChange} type="radio" name="gender"
   id="custom" value="" ></input>
  </label>

</div>

{showCustomGender&&<><div className={`dropdown 
${styles.aroundCustomGenderDrop}`}>
  <div className={`${styles.customGenderDropButton} `} 
  type="button" id="dropdownMenuButton" data-toggle="dropdown" 
  aria-haspopup="true" aria-expanded="false">
   {customGenderDropButtonString||"Select your pronoun"}
   <span className="dropdown-toggle" 
   data-toggle="dropdown" aria-haspopup="true" 
   aria-expanded="false"></span>
  </div>
  <div className={`dropdown-menu ${styles.customGenderDropMenu} `} >
    <span type='button' className={styles.customGenderDropHeading}>Select your pronoun</span>

    <span onClick={()=>updateGenderPronounce('she',`She:"Wish her a happy birthday!"`)} 
    type='button' className={` ${styles.customGenderDropItem}`} >
        She:"Wish her a happy birthday!"</span>
    <span onClick={()=>updateGenderPronounce('he',`He:"Wish him a happy birthday!"`)} type='button' 
    className={` ${styles.customGenderDropItem}`} >
        He:"Wish him a happy birthday!"</span>
      

  </div>
</div>
<input className={`${styles.textInput} ${styles.genderTextInput}`} type='text' name='gender' onChange={handleFormChange} 
placeholder='Gender(optional)'></input>
</>}
        <div className={styles.bottomBox}>
        <button type = 'button' disabled 
        className={`btn ${styles.allButtonStyle} ${styles.greyButton}`}
        >
          <span className={styles.audienceStringAndIcon}>
               <img className = {styles.audienceButtonIcon} src = {`${process.env.NEXT_PUBLIC_HOST}/img/audience/public.png`}></img>
           <span>Public</span></span>
        </button>

       <div className={styles.saveAndCanelButtonBox}>
        <button
         onClick={cancelForm} 
        className={`${styles.allButtonStyle} ${styles.greyButton}`}>Cancel</button>
        <button disabled={disableSaveButton()}
        onClick={saveForm} 
        className={`btn ${styles.allButtonStyle} ${styles.blueButton}`}>Save</button>
        </div>
        </div>
        
    </form></>  );

}
 
export default GenderForm;