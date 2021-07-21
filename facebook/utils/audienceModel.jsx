import { useContext } from 'react';
import styles from '../CssModules/audienceModel.module.css'
import LightStoreContext from './lightStoreContext';

const SelectAudience = () => {
  const {myAudience,updateMyAudience}=useContext(LightStoreContext)
    return ( <div className="modal fade" style={{zIndex:'10000000'}} id="audienceModal" tabIndex="-1" role="dialog"  aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <span className={`modal-title} ${styles.modalHeader}`}>Select audience</span>
          <button type="button" className="close" id={styles.closeModelButton} data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className={styles.aroundAllAudienceOption}>
         
         {/* public */}
          <div id='public' data-dismiss="modal"
           onClick={()=>updateMyAudience('public')} className={`${styles.audienceOptionBox} 
          ${myAudience==='public'&& styles.activeBox}`}>
            <div className={styles.aroundAudienceIcon}>
              <img src={`${process.env.NEXT_PUBLIC_HOST}/img/audience/public.png`}></img>
            </div>
            <div className={styles.audienceOptionStringAndRadio}>
              <div className={styles.audienceOptionString}>
                <span className={styles.stringOne}>Public</span>
                <span className={styles.stringTwo}>Anyone on or off Facebook</span>
              </div>
              <span>{myAudience==='public'? 
              <img src={`${process.env.NEXT_PUBLIC_HOST}/img/filledCircle.png`}>

              </img>:
              <img src={`${process.env.NEXT_PUBLIC_HOST}/img/circle.png`}></img>}
              </span>
            </div>
          </div>


          {/* friends */}
          <div id='friends' data-dismiss="modal" 
          onClick={()=>updateMyAudience('friends')}
          className={`${styles.audienceOptionBox}
            ${myAudience==='friends'&& styles.activeBox}`}>
          <div className={styles.aroundAudienceIcon}>
          <img src={`${process.env.NEXT_PUBLIC_HOST}/img/audience/friends.png`}></img>
          </div>
            <div  className={styles.audienceOptionStringAndRadio}>
            <div className={styles.audienceOptionString}>
                <span className={styles.stringOne}>Friends</span>
                <span className={styles.stringTwo}>Your friends on Facebook</span>
              </div>
              <span>{myAudience==='friends'? 
              <img src={`${process.env.NEXT_PUBLIC_HOST}/img/filledCircle.png`}>

              </img>:
              <img src={`${process.env.NEXT_PUBLIC_HOST}/img/circle.png`}></img>}
              </span>
            </div>
          </div>

          {/* onlyMe */}
          <div id='onlyMe' data-dismiss="modal" 
          onClick={()=>updateMyAudience('onlyMe')}className={`${styles.audienceOptionBox}
            ${myAudience==='onlyMe'&& styles.activeBox}`}>
          <div className={styles.aroundAudienceIcon}>
          <img src={`${process.env.NEXT_PUBLIC_HOST}/img/audience/onlyMe.png`}></img>
          </div>
            <div className={styles.audienceOptionStringAndRadio}>
            <div className={styles.audienceOptionString}>
                <span className={styles.stringOne}>Only me</span>
              </div>
              <span>{myAudience==='onlyMe'? 
              <img src={`${process.env.NEXT_PUBLIC_HOST}/img/filledCircle.png`}>

              </img>:
              <img src={`${process.env.NEXT_PUBLIC_HOST}/img/circle.png`}></img>}
              </span>
            </div>
          </div>
          </div>
    
        </div>
       
      </div>
    </div>
  </div> );
}
 
export default SelectAudience;