import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styles from '../CssModules/allFriendsOfUser.module.css';

const FriendSkeleton = ({keyArray}) => {
    return (<div  className={`${styles.friendsList}`}>
    {keyArray.map((friend)=>{
     
    return <div key={friend} className={`${styles.friendBox}`}>
    
  <span><Skeleton width={100}  className = {`${styles.friendProfilePhoto}`}></Skeleton>
   </span>
  
    <span className={`${styles.friendNameLink} }` }>
    <Skeleton width={120} height={35
    }></Skeleton>
                </span>
         
              {/* <div className={styles.aroundRequestButtons}> */}
 <Skeleton height={30} width={80}  className={`${styles.requestButtons}`}></Skeleton>
      {/* </div> */}
  
    </div>}
  
    )}
      
    </div>  );
}
 
export default FriendSkeleton;