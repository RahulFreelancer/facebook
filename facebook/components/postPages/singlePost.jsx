import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import LightStoreContext from "../../utils/lightStoreContext";
import UserContext from "../../utils/userContext";
import Posts from "../posts";


const SinglePost = () => {
//     const {user,activeUserProfile}=useContext(UserContext);
//    const {updateMyPosts,updateMyPostsToShow,postsToShow} =useContext(LightStoreContext)
//    const router = useRouter();


    return ( <><Posts pageNameProp={'singlePost'} /></> );
}
 
export default SinglePost;