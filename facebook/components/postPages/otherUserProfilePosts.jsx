import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import LightStoreContext from "../../utils/lightStoreContext";
import UserContext from "../../utils/userContext";
import Posts from "../posts";


const OtherUserProfilePosts = () => {
    const {user}=useContext(UserContext);
   const {updateMyPosts} =useContext(LightStoreContext)
   const {otherUserProfile} = useRouter().query;

const router = useRouter();
   useEffect(()=>{
    const username=otherUserProfile&&otherUserProfile[0];
 updateMyPosts(username,'otherUserProfile');
   },[router.query])
//    if(postsToShow.length>0){return <>...loading..</>}
    return ( <><Posts pageNameProp={'otherUserProfile'} /></> );
}
 
export default OtherUserProfilePosts;