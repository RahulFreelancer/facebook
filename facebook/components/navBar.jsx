import Link from "next/link";
import { useRouter } from "next/router";
import UserContext from "../utils/userContext";
import { useContext, useEffect, useRef, useState } from "react";
import styles from '../CssModules/userProfile.module.css';
import LightStoreContext from "../utils/lightStoreContext";

const Nav = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const {totalFriends}=useContext(LightStoreContext);
  const { userProfile} = router.query;
  const aboveNavRef=useRef();
  const [stickyNav,changeStickyNav]=useState(false);

  


useEffect(()=>{
window.addEventListener('scroll',handleScrollingEvent);
return ()=>{
  window.removeEventListener('scroll',handleScrollingEvent);
}
},[])
  
const handleScrollingEvent=()=>{

if(aboveNavRef.current){
  const aboveNavRefOffset = aboveNavRef.current.getBoundingClientRect();
  const  top = aboveNavRefOffset.top
  
 top<81&&(changeStickyNav(true))
top>50&&(changeStickyNav(false))
}  

}


  const isNavLinkActive=(definedRoute)=>{
    // let fullPath = router.asPath.split('/');
    const lastRoute = router.asPath.split('/').pop();
    const firstStringOfLastRoute=lastRoute.split('_').shift();
  
  return definedRoute===firstStringOfLastRoute?true:null
  }



  return (
    <>
<div ref={aboveNavRef}></div>
<div className={styles.mainOfStickySecondNav}>
    <div  className={`${stickyNav&&styles.stickSecondNavToTop} 
    ${styles.aroundMainSecondNavBarContainer}`}>
     
    <div draggable="false" className={`d-flex justify-content-between 
    ${styles.aroundMainSecondNavBar}`}>
     
      <nav draggable="false" className={`${styles.mainSecondNavBar} navbar 
       navbar-expand-lg navbar-light `}>
          
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div draggable="false" className="collapse navbar-collapse" id="navbarNav">
          <div draggable="false" className="navbar-nav">
            <Link href={`/${user.username}/posts`} as ={`/${user.username}`} className='' id="l" replace>
              <a
                className={ `${styles.mainNavItems}
                 ${(((userProfile[1] =='posts')||!userProfile[1])  && ` nav-item nav-link ${styles.navItemActive}`) ||
                  `nav-item nav-link ${styles.navItems}`}`
                }
              >
                Posts
              </a>
            </Link>

            <Link href={`${user.username}/about`} 
            id="?about=1" replace>
              <a
                className={`${styles.mainNavItems}
                  ${(isNavLinkActive('about')  && ` nav-item nav-link ${styles.navItemActive}`) ||
                  `nav-item nav-link ${styles.navItems}`}`
                }
              >
                About
              </a>
            </Link>

            <Link
              href={`${user.username}/photos`}
              id="?photos=1"
              replace
            >
              <a
                className={`${styles.mainNavItems}
                  ${(userProfile[1] === "photos" && ` nav-item nav-link ${styles.navItemActive}`) ||
                  `nav-item nav-link ${styles.navItems}`}`
                }
              >
                Photos
              </a>
            </Link>

            <Link
              href={`${user.username}/friends`}
              id="?friends=1"
              replace
            >
              <a
                className={`  ${styles.friendNavButton} ${styles.mainNavItems}
                  ${(userProfile[1] === "friends" &&
                  ` nav-item nav-link ${styles.navItemActive}`) ||
                  `nav-item nav-link ${styles.navItems}`}`
                }
              >
                Friends {totalFriends>0&&totalFriends}
              </a>
            </Link>

            <Link
              href={`${user.username}/videos`}
              id="?videos=1"
              replace
            >
              <a
                className={`${styles.mainNavItems}
                  ${(userProfile[1]=== "videos" &&
                  ` nav-item nav-link ${styles.navItemActive}`) ||
                  `nav-item nav-link ${styles.navItems}` }`               }
              >
         Videos
              </a>
            </Link>

          </div>
        </div>
        
      </nav>
     
      <div className={`d-flex justify-content-end align-items-center ${styles.secondNavBarActions}`}>
<button className={`btn d-flex justify-content-center align-items-center ${styles.editProfile}`}>
<img className= {`${styles.editProfileIcon}`}height="14px" width= 
  '14px' src="http://localhost:3000/img/Edit.svg"></img>
  Edit Profile
</button>
<button className={`btn d-flex justify-content-center align-items-center ${styles.secondRightSideIcons}`}>
  <img className= {`${styles.viewIcon}`}height="20px" width= 
  '20px' src="http://localhost:3000/img/viewas.svg"></img>
  </button>
<button className={`btn d-flex justify-content-center align-items-center
 ${styles.secondRightSideIcons}`}>
<img className= {`${styles.searchIcon}`}height="20px" width= 
  '20px' src="http://localhost:3000/img/search.svg"></img>
</button>


<button className={`btn  d-flex justify-content-center align-items-center
 ${styles.secondRightSideIcons}`}>
<img className= {`${styles.moreIcon}`}height="20px" width= 
  '20px' src="http://localhost:3000/img/more.svg"></img>
</button>
</div>
</div>
</div>
      </div>
   
    </>
  );
};

export default Nav;
