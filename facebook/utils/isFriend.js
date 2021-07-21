import { useContext } from "react";
import LightStoreContext from "./lightStoreContext";


const FriendFunctions = () => {
   const {userFriends} = useContext(LightStoreContext)

   const isFriendStatus=(activeUsername)=>{

    const isPresentFriend= userFriends.find((friend)=>friend.username===activeUsername);
    console.log(isPresentFriend);
    return isPresentFriend?true:false;

   }
  
   return [isFriendStatus]
    
}
export default FriendFunctions;