import { useContext } from 'react';
import CreatePost from '../components/postsComponent/createPost';
import styles from '../CssModules/createPostOtherFormat.module.css'
import UserContext from './userContext';

const CreatePostOtherFormat = () => {
    const {user}=useContext(UserContext)
    return ( <>
    <CreatePost/>
    <div data-toggle="modal" data-target="#createPostModal"  className={styles.containerCreatePost}>
        <div className={styles.dpAndTextContainer}>
            <div className={styles.dpOfCreater}>
                <img src={`${process.env.NEXT_PUBLIC_API}/getProfilePic?username=${user.username}`}></img>
            </div>
            <div className={styles.textAreaForCaption}>
                <span>What's on your mind, {user.fname}?</span>
            </div>
        </div>
        <div className={styles.photoAndVideoSelectContainer}>
            <div className={styles.aroundPhotoAndVideoSelect}>
            <div className={styles.photoAndVideoSelect}>
               <div className={styles.addPhotoAndVideoIcon}><i></i></div>
                    <span>Photo/Video</span>

            </div></div>

        </div>

    </div></> );
}
 
export default CreatePostOtherFormat;