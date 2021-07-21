import { useEffect, useRef, useState } from "react";

const UseInfiniteScroll = (callback) => {
const [isFetching, setIsFetching] =useState(false);
const scrollRef = useRef(false);



useEffect(()=>{
    if(!isFetching)return;
    
callback();
},[isFetching])


useEffect(()=>{
    window.addEventListener('scroll',handleScroll);
    return  ()=>{window.removeEventListener('scroll',handleScroll)}
},[]);


const handleScroll=()=>{
 
if(scrollRef.current==true){return}

  if ((window.innerHeight + document.documentElement.scrollTop) < document.documentElement.offsetHeight/1.5) 
  return;

  setIsFetching(true);
}

    return ( [isFetching,setIsFetching,scrollRef] );
}
 
export default UseInfiniteScroll;