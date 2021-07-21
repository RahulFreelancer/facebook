import { applySession } from "next-iron-session";
import Posts from "../../../dbModel/apiPosts";
import cookieInfo from "../../../utils/cookie";
import database from "../../../utils/dbConnect";
import multer from 'multer';
import fs from 'fs';


database.connect();
export const config = {
    api: {
      bodyParser: false,
      externalResolver:true,
    },
  };

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let dir = `./mediaOfAllUsers/${req.session.get("user")._id}/postData`
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir,{recursive:true});
      }
      cb(null, dir);
    },
    filename: function (req, file, cb) {
    
      cb(
        null,
       req.body.fileName
      );
    },
  });






export default async (req, res) => {
    await applySession(req, res, cookieInfo);
    if (!req.session || !req.session.get("user")) {
      return res.status(403).send("unathorized");
    }


const {username}=req.query;

      const upload = multer({ storage,onError:function(err,next)
        {console.log(err)}
      });

      try {
        let user = await Posts.findOne({username});
    
    

        upload.fields([{ name: 'image' },{ name: 'video' },{name:'fileName'}])
        (req, res, async (err) => {
      
          const {postId,fileType,fileOrder}=req.body;
          console.log(req.body);
          const {image,video}=req.files;
          try {
           
           user.posts.find((post)=>{
             if(!post.media){post.media={}}
             if(post.postId===postId){

               if(image){
                 console.log('image is there')
                 
             post.media[fileOrder]={path:image[0].path,fileType,fileOrder}
               }
               if(video){
                console.log('video is there')
                post.media[fileOrder]={path:video[0].path,fileType,fileOrder}
               }
           
             }}  )
         const newPost = new Posts(user);
         const result = await newPost.save();
        //  console.log(result);
         let mypost = result.posts.find((post)=>{return post.postId===postId})
         let totalUploaded = Object.keys(mypost.media).length;
         console.log(totalUploaded);
          return res.send(totalUploaded);

      
           // res.end();c
         } catch (error) {
           res.end();
             console.log(error.message);
         }
        })

    

      } catch (error) {
        console.log(error.message)
        return res.status(501).send('internal server error')
      }
     


    

  

}