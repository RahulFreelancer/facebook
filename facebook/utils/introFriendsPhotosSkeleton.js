import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styles from '../CssModules/allDetailOfUser.module.css';
import PostSkeleton from "./postSkeleton";


const IntroFriendsPhotosSkeleton = () => {
    return ( <>
       
        {/* first main box */}
    
        <div className={`${styles.firstBoxOfMainBox}`}>
        <div className={`${styles.relationQueryBox} `}>
            <div className={`${styles.addFriendString}`}>
            <Skeleton style={{borderRadius:'20px', marginBottom:'5px'}} width={250} height={20} ></Skeleton>
            
              
            </div>
            <div className={styles.aroundRequestButton}>
            <Skeleton style={{borderRadius:'20px'}} width={120} height={15} ></Skeleton> 
            </div>
        </div>
        </div>
        
    
          
                    {/* second main box */}
                <div className={`${styles.secondBoxOfMainBox}`}>
                <div className={`${styles.infoPhotosFriends} `}>
        
        {/* intro */}
        <div >
           <div  className={`${styles.commonOfInfoPhotosFriends} 
                ${styles.infoContainer}`}>
        
                    <div className={`${styles.aroundHeadingOfThreeBox}`}>
                        <div className={`${styles.headingOfThreeBox}`}>    
                        <div  className={`${styles.mainHeadingBox}`}>
                        <span>Intro</span>
                        
                                </div>  
                         </div>
                    </div>
                    <div className={styles.introDetailBoxWithEditButton}>
                        {<div id={'workBox'}  className={`${styles.aboutPropertyBox}`}>
                        
                        <div className={`${styles.propertyImg}`}>
                        <Skeleton  width={30} height={30} circle={true} ></Skeleton> 
                    </div>
                    <div className={`${styles.propertyString}`}>
                        <Skeleton  style={{borderRadius:'20px'}} width={110} height={15} ></Skeleton> 
                        </div>
                        </div>}
                       
                        {<div id={'universityBox'}  className={`${styles.aboutPropertyBox}`}>
                        <div className={`${styles.propertyImg}`}>
                        <Skeleton  width={30} height={30} circle={true} ></Skeleton> 
                    </div>
                    <div className={`${styles.propertyString}`}>
                        <Skeleton  style={{borderRadius:'20px'}} width={110} height={15} ></Skeleton> 
                        </div>
                        </div>}
        
                      
                        {<div id={'highSchoolBox'}  className={`${styles.aboutPropertyBox}`}>
                        <div className={`${styles.propertyImg}`}>
                        <Skeleton  width={30} height={30} circle={true} ></Skeleton> 
                    </div>
                    <div className={`${styles.propertyString}`}>
                        <Skeleton  style={{borderRadius:'20px'}} width={110} height={15} ></Skeleton> 
                        </div>
                        </div>}
        
                        {<div id={'currentBox'}  className={`${styles.aboutPropertyBox}`}>
                        <div className={`${styles.propertyImg}`}>
                        <Skeleton  width={30} height={30} circle={true} ></Skeleton> 
                    </div>  
                    <div className={`${styles.propertyString}`}>
                        <Skeleton  style={{borderRadius:'20px'}} width={110} height={15} ></Skeleton> 
                        </div>
                        </div>}
        
        
                        {<div id={'hometownBox'}  className={`${styles.aboutPropertyBox}`}>
                        <div className={`${styles.propertyImg}`}>
                        <Skeleton  width={30} height={30} circle={true} ></Skeleton> 
                    </div>
                    <div className={`${styles.propertyString}`}>
                        <Skeleton  style={{borderRadius:'20px'}} width={110} height={15} ></Skeleton> 
                        </div>
                        </div>}
        
       
        
        
        
                    </div>
                    </div>
        
        
        
                     {/*photos  */}
                <div className={`${styles.commonOfInfoPhotosFriends} 
                ${styles.photosContainer}`}>
                    
                    <div className={`${styles.aroundHeadingOfThreeBox}`}>
                    <div className={`${styles.headingOfThreeBox}`}>    
                    <div  className={`${styles.mainHeadingBox}`}>
                    <span>Photos</span>
                         <div>                  
                        <Skeleton style={{borderRadius:'20px'}}   width={70} height={13}  ></Skeleton> 
                    </div>
                                </div>  
                        
                         </div>
                    </div>
                    </div> 
        
                    {/* friends */}
                <div className={`${styles.commonOfInfoPhotosFriends} 
                ${styles.friendsContainer}`}>
                    <div className={`${styles.aroundHeadingOfThreeBox}`}>
                    <div className={`${styles.headingOfThreeBox}`}>
                        <div  className={`${styles.mainHeadingBox}`}>
                        <span>Friends</span>
                         <div><Skeleton style={{borderRadius:'20px'}}   width={70} height={13}  ></Skeleton> </div>
                                </div>  
                       
                        <div className={`${styles.mainHeadingBox}`}></div>    
                         </div>
                    </div>
        
                    <div className={`${styles.introAllFriendsFirstBox}`}>
                    <div className={`${styles.introAllFriendsSecondBox}`}>
                    <div className={`${styles.introAllFriendsThirdBox}`}>
                        {[89,3,902,23223,32303323,32323,3231,131].map((friend)=>
                         <div key={friend} className={`${styles.actualFriendBox}`}>
                         <div type='button' className={`${styles.friendDp}`}>
                         <Skeleton   width={100} height={90}  ></Skeleton> 
                           
                         </div>
                         <div  className={`${styles.friendName}`}>
                         <Skeleton style={{borderRadius:'20px'}} width={90} height={14} ></Skeleton> 
                         </div>
                         
                     </div>)
                           
                        }
                        
                        </div>
                        </div>
                    </div>
                    
        
        
                    </div> 
                    </div>
                    </div> 
                 <div className={`${styles.allPosts}`}>
                 
                 <div className={`${styles.postsContainer}`}>
                <PostSkeleton postProp={[9238,9201,783]}/>
                     </div> 
                 </div>
                 </div>
        
                
                </> )
}
 
export default IntroFriendsPhotosSkeleton;