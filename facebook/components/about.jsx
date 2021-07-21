import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect,} from 'react';
import styles from '../CssModules/about.module.css'
import ContactAndBasicInfo from './aboutNavComponents/contactAndBasicInfo';
import Details from './aboutNavComponents/details';
import FamilyAndRel from './aboutNavComponents/familyAndRel';
import Overview from './aboutNavComponents/overview';
import PlaceLived from './aboutNavComponents/placeLived';
import WorkAndEducation from './aboutNavComponents/workAndEducation';

const About = () => {

// const {user,activeUserProfile}=useContext(UserContext);

const router = useRouter();

  



 
  

useEffect(()=>{
  document.documentElement.scrollTop=400;
},[]);


  


const isActive=(definedRoute)=>{

  let fullPath = router.asPath.split('/');
  let lastRoute = router.asPath.split('/').pop();
 
return definedRoute===lastRoute?true:null
}

const getPathToLink=(lastString)=>{
  let fullPath = router.asPath.split('/');
  const lastRoute=  router.asPath.split('/').pop();
  const indexOfLastRoute = fullPath.indexOf(lastRoute);
 fullPath[indexOfLastRoute]=lastString;
 return fullPath.join('/');

}









  return <div id='aboutContainer' className={`${styles.aboutMainBox}`}>

    <div className={`${styles.aboutNavBar}`}>
      <Link scroll={false} href={getPathToLink('about')}><a className={`${styles.aboutNavHeading}`}>About</a></Link>
      <Link scroll={false} href={`${getPathToLink('about_overview')}`}>
        <a  className={`${styles.aboutNavItems} ${(
         (isActive('about_overview')||isActive('about'))
        &&styles.aboutNavItemsActive)
          ||styles.aboutNavItemsHover}`}>Overview</a></Link>
      <Link scroll={false} href={getPathToLink('about_work_And_edu')} >
        <a  className={`${styles.aboutNavItems} ${(isActive('about_work_And_edu')
        &&styles.aboutNavItemsActive)
      ||styles.aboutNavItemsHover}`}>Work and education</a></Link>
      <Link scroll={false} href={getPathToLink('about_place_lived')}>
        <a  className={`${styles.aboutNavItems} ${(isActive('about_place_lived')
        &&styles.aboutNavItemsActive)
          ||styles.aboutNavItemsHover}`}>Place lived</a></Link>
      <Link scroll={false} href={getPathToLink('about_contact_and_info')}>
        <a  className={`${styles.aboutNavItems} ${(isActive('about_contact_and_info')
        &&styles.aboutNavItemsActive)
          ||styles.aboutNavItemsHover}`}>Contact and basic info</a></Link>
      <Link scroll={false} href={getPathToLink('about_family_and_rel')}>
        <a  className={`${styles.aboutNavItems} ${(isActive('about_family_and_rel')
        &&styles.aboutNavItemsActive)
          ||styles.aboutNavItemsHover}`}>Family and relationships</a></Link>
      <Link scroll={false} href={getPathToLink('about_details')}>
        <a  className={`${styles.aboutNavItems} ${(isActive('about_details')
        &&styles.aboutNavItemsActive)
          ||styles.aboutNavItemsHover}`}>Details</a></Link>
    </div>
    <div className={`${styles.aboutData}`}>
{(isActive('about_overview')||isActive('about'))&&<Overview/>}
      {isActive('about_work_And_edu')&&<WorkAndEducation/>}
      {isActive('about_place_lived')&&<PlaceLived/>}
      {isActive('about_contact_and_info')&&<ContactAndBasicInfo/>}
      {isActive('about_family_and_rel')&&<FamilyAndRel/>}
      {isActive('about_details')&&<Details/>}
    </div>

  </div>;
};

export default About;
