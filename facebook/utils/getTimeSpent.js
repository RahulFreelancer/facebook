import { useEffect, useState } from "react";

const GetTimeSpent = () => {
    const [currentTime,changeCurrentTime]=useState(Date.parse(new Date())/1000/60);
    useEffect(() => {setTimeout(()=>changeCurrentTime(Date.parse(new Date())/1000/60), 59000 )
},[currentTime]);
const getTimeSpent=(current,acceptedDate)=>{
    const  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const difference  = Math.floor(current-(Date.parse(acceptedDate)/1000/60));
  
    if(difference<1){ return 'Just now' }
     if(difference>=60&&difference<1440){
       return Math.floor(difference/60) + ' hrs ago'
     }
  
  
     if(difference>=1440){
    const date =  new Date(acceptedDate).getDate();
    const month= months[new Date(acceptedDate).getMonth()]
    const year =new Date(acceptedDate).getFullYear();
    const time =new Date(acceptedDate).toLocaleTimeString();
    return `${date+' '+month+' '+year} at ${time}`
     }
     return difference+' min ago'
  
  }







    return ([currentTime,changeCurrentTime,getTimeSpent]);
}
 
export default GetTimeSpent;