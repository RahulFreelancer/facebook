import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import styles from '../../CssModules/mainNavBarComponents.module.css'
import http from '../../utils/http';
import LightStoreContext from '../../utils/lightStoreContext';
import ThirdStoreContext from '../../utils/thirdStoreContext';
import UseInfiniteScroll from '../../utils/useInfiniteScroll';
import UserContext from '../../utils/userContext';

const SettingDropdown = () => {
    const {user}=useContext(UserContext);
    const router = useRouter();

    const logout = async () => {
        try {
          const result = await http.get(`${process.env.NEXT_PUBLIC_API}/logout`);
          console.log(result);
          window.location = "/";
        } catch (error) {
          console.log(error.response.data);
        }
      };
    


    if(!user.username){return <>loading...</>}
    return ( <div
        className={` ${styles.dropdownBox}`}  >
        <div className={`${styles.dropdownBoxOne}`}>
        <div className={`${styles.dropdownBoxTwo}`}>
        <div className={`${styles.dropdownBoxThree}`}>

            {/* profile link */}
            <div className={styles.profileLinkOne}>
            <div onClick={()=>router.push(`/${user.username}`)} className={styles.profileLinkTwo}>
{/* profile dp */}
<div className={styles.profileLinkDp}>
<div className={styles.profileLinkDpOne}>
<svg aria-hidden="true"  data-visualcompletion="ignore-dynamic" role="none" 
style={{height: 60, width: 60}}>
  <mask id="profileLinkDp">
    <circle  cx="30" cy="30" r='30'
    fill="white"
  ></circle>
    </mask>
    <g mask="url(#profileLinkDp)">
      <image x="0" y="0" height="100%" preserveAspectRatio="xMidYMid slice" 
      width="100%"
       xlinkHref= {`${process.env.NEXT_PUBLIC_API}/getProfilePic?username=${user.username}`}
       style={{height: 60, width: 60}}>
        </image><circle className={styles.profileLinkDpAvatar}  cx="30" cy="30" r="30">
          </circle>
          </g>
          </svg>
</div>
</div>

{/* profileLink username */}
<div className={styles.profileLinkUsername}>
<div className={styles.profileLinkUsernameOne}>

<div className={styles.aroundUsernameString}>
<span className={styles.usernameString}>{user.fname+' '+user.sname}</span>
</div>
<div className={styles.aroundUsernameString}> 
<span className={styles.extraString}>See your profile</span>
</div>
    </div>
</div>

                </div>
            </div>

            <hr className={styles.hrLine}></hr>
            <div className={styles.aroundSettingDropButton}>
            <div onClick={()=>router.push('/setting')} className={styles.settingDropButton}>
            <div className={styles.settingDropButtonOne}>
            
            <div className={styles.settingDropButtonIcon}>
            <div className={styles.settingDropButtonIconOne}>
                <i className={styles.settingIcon}></i>
                </div>
                </div>
                
                <div className={styles.settingDropButtonStringAndIcon}>
                <div className={styles.settingDropButtonString}>
                    <span>{`Setting & privacy`}</span>
                    </div>

                    <div className={styles.settingDropButtonEndIcon}>
                    <i className={styles.endIcon}></i>
                    </div>
                </div>


                </div>
            </div>
            </div>

{/* logout button */}

<div className={styles.aroundSettingDropButton}>
            <div  onClick={logout} className={styles.settingDropButton}>
            <div className={styles.settingDropButtonOne}>
            
            <div className={styles.settingDropButtonIcon}>
            <div className={styles.settingDropButtonIconOne}>
                <i className={styles.logoutIcon}></i>
                </div>
                </div>
                
                <div className={styles.settingDropButtonStringAndIcon}>
                <div className={styles.settingDropButtonString}>
                    <span>Logout</span>
                    </div>

                    {/* <div className={styles.settingDropButtonEndIcon}>
                    <i className={styles.endIcon}></i>
                    </div> */}
                </div>


                </div>
            </div>
            </div>

            </div> 
            </div> 
            </div> 
            </div> 
            );
}
 
export default SettingDropdown;