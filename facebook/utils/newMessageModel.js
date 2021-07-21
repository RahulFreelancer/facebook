import { useContext, useEffect } from "react";
import LightStoreContext from "./lightStoreContext";
import styles from "../CssModules/newMessageModel.module.css";
import ThirdStoreContext from "./thirdStoreContext";
import UserContext from "./userContext";
import { useRouter } from "next/router";

const NewMessage = () => {
    const {user}=useContext(UserContext);
   const {userFriends,updateUserFriends} = useContext(LightStoreContext)
   const router = useRouter()
   const {activeChatBoxes,addChatBoxes,removeChatBoxes}= useContext(ThirdStoreContext)
   useEffect(()=>{
       user.username&&userFriends.length===0&&updateUserFriends(user.username);
   },[user,router.query])

   return ( <div className="modal fade" id="friendListModal" tabIndex="-1" role="dialog"  aria-hidden="true">
    <div className={`modal-dialog ${styles.topBoxOfFriendListModel}`} role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Choose from your friends</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
        <div className={styles.friendListContainer}>
        {userFriends.map((friend)=> <div  key={friend.username} style={{display:"flex",alignItems:"center"}}>   
        <div data-dismiss="modal" onClick={()=>addChatBoxes(user.username,friend)} className={styles.friendMsgButton}>
        <span>Message</span>
                </div><div  className={styles.friendBox}>
        <div className={styles.friendDp}>
            <img src={`${process.env.NEXT_PUBLIC_API}/getProfilePic?username=${friend.username}`}
            ></img>
            </div>
            <div className={styles.friendNameAndMsgButton}>
            <div className={styles.friendName}>
        <span>{friend.userInfo.fname + ' '+friend.userInfo.sname}</span>
                </div>
         
            </div>
        </div>
        </div>)}
           </div>
     
        </div>
        <div className="modal-footer">
        
        </div>
      </div>
    </div>
  </div>  );
}
 
export default NewMessage;