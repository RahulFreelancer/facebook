

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styles from '../CssModules/posts.module.css';




const PostSkeleton = ({postProp}) => {
    return ( <div>{postProp.map((post)=>
        <div key={post}  className={styles.aroundPostContainer}>
      <div className ={styles.postContainer}>
       
        {/* post head */}
      <div className={styles.aroundPostHead}>
      <div className={styles.postHead}>
      <div className={styles.postOwnerDp}>
      <Skeleton width={45} height={45} circle={true}></Skeleton>
      
      
      
      </div>
      {/* postHead Caption of post */}
      <div style={{marginTop:'5px'}} className={styles.postOwnerNameTimeSpentAndAudience}>
        <div className={styles.postOwnerName}>
        <Skeleton style={{borderRadius:'20px'}} width={112} height={14} ></Skeleton>
      
        </div>
        <div  style={{marginTop:'2px'}} className={styles.timeSpendAndAudience}>
        <Skeleton style={{borderRadius:'30px'}} width={125} height={13} ></Skeleton>
        
        </div>
      </div>
      {/* postHead edit Box */}
     
      </div>
     
      </div>
      
      
      
      {/*post Photo*/}
      <div style={{display:'block',width:'100%',height:'280px'}}>

     </div>
      
      
      {/* post Like and commment box */}
      
      <div className={styles.aroundLikeAndComment}>
      
      {/* like and comment count and button box */}
        <div className={styles.aroundWhoLikedAndCommentAndButtons}>
          <div className={styles.aroundLikeAndCommentButtons}>
          <div  className={styles.likeAndCommentButtons}>
         
         
          <div style={{textAlign:'center'}} className={styles.aroundCommonToReactionButtonsContainer }>
          
          <Skeleton style={{borderRadius:'30px'}} width={100} height={14} ></Skeleton>
            
            </div>


            <div style={{textAlign:'center'}} className={styles.aroundCommonToReactionButtonsContainer }>
            
            <Skeleton style={{borderRadius:'30px'}} width={100} height={14} ></Skeleton>
            </div>
      
            
            <div style={{textAlign:'center'}} className={styles.aroundCommonToReactionButtonsContainer }>
              
              <Skeleton style={{borderRadius:'30px'}} width={100} height={14} ></Skeleton>
 
            </div>
            </div>
            </div>
      
        </div>
      
  
      </div>
      
      </div>
        </div>)}</div> );
}
 
export default PostSkeleton;