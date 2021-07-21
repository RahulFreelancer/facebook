import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import LightStoreContext from "../../utils/lightStoreContext";
import UserContext from "../../utils/userContext";
import Posts from "../posts";


const UserProfilePosts = () => {
    const {user,activeUserProfile}=useContext(UserContext);
   const {updateMyPosts} =useContext(LightStoreContext)
   const router = useRouter();

   useEffect(()=>{
updateMyPosts(user.username,'userProfile');
   },[router.query])
//    if(postsToShow.length>0){return <>...loading..</>}
    return ( <><Posts pageNameProp={'userProfile'} /></> );
}
 
export default UserProfilePosts;