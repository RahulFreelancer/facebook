import { symbol } from "joi";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styles from '../CssModules/about.module.css';

const AboutSkeleton = ({keyArray}) => {
    return ( <div className={`${styles.workAndEducationContainer}`}>

    <div className={`${styles.propertyBox}`}>
       {/* <Skeleton width={100}  className = {`${styles.workAndEduHeadings}`}></Skeleton>
   */}
        

       {keyArray.map((item)=>(
           
           <div style={{marginBottom:"20px"}} key={item} className={styles.aroundWorkPlaceBox}>
           <Skeleton height={50} width={50} circle={true} ></Skeleton>
           <div className={styles.workPlaceBox}>
               <div className={styles.workPlaceString}>
                   <span className={styles.string1}>
                   <Skeleton width={250} height={20}></Skeleton>
                   </span>
                   <span  className={styles.string2}>
                   <Skeleton width={150} height={15}></Skeleton>
                       </span>
               </div>
               <div className={styles.aroundEditDropdownContainer}>
                   <div className={styles.editDropdownContainer }>
                   <Skeleton width={30} height={30} circle={true}></Skeleton>
               
               </div>
               </div>
              </div>
           </div>))}
       
      
        
        
        
   


</div>
</div>

       )}
 
export default AboutSkeleton;