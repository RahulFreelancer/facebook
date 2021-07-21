import { useContext, useEffect } from "react";
import LightStoreContext from "../../utils/lightStoreContext";
import ThirdStoreContext from "../../utils/thirdStoreContext";
import UserContext from "../../utils/userContext";
import Posts from "../posts";

const NewsFeed = () => {
    const {user}=useContext(UserContext);
    const {updateLatestFeedObjects,latestFeedObjects}=useContext(ThirdStoreContext);
  const {updateAllPostsForHome}=useContext(LightStoreContext);
  
    useEffect(()=>{
user.username&&updateLatestFeedObjects(user.username);
    },[user])
useEffect(()=>{
  console.log(latestFeedObjects);
        updateAllPostsForHome(latestFeedObjects,user.username);
  

},[latestFeedObjects])

// if(postsToShow.length>0){return <>...loading..</>}
    return ( <Posts pageNameProp={'newsFeed'}/> );
}
 
export default NewsFeed;