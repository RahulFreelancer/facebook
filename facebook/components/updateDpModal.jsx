import { useContext, useEffect, useState } from "react";
import http from "../utils/http";
import styles from '../CssModules/updateDpModal.module.css';
import CropDp from "./cropDp";

import CloseCropDp from "./closeCropDpConfirm";
import UserContext from "../utils/userContext";


const UpdateDpModal = (props) => {

  const [data, changeData] = useState({});
  const [dpPreview, changeDpPreview] = useState(null);
//   const [imgUrl, changeUrl] = useState("");
const [finalCroppedDp,changeFinalCroppedDp]=useState({});
// const [finalCroppedDpUrl,changeFinalCroppedDpUrl]=useState(null);
const [screenLoading,changeScreenLoading]=useState(false);
const { updateCropProfilePhoto}= useContext(UserContext);
useEffect(()=>{
 



data.photu&&jQuery(".updateDpModal").modal('hide');
data.photu&&changeScreenLoading(true);
data.photu&& setTimeout(() => {
  changeScreenLoading(false)
jQuery("#cropDpModal").modal('show');
}, 2000);

 

 data.photu&&jQuery("#cropDpModal").on('hide.bs.modal',handleHideCropDpModal)
 return()=>{  jQuery('#cropDpModal').off("hide.bs.modal");}
 
 
},[data])

const handleHideCropDpModal =(e)=>{
e.preventDefault();
jQuery("#closeCropDpModal").modal('show');
}

  const handleChange = ({ currentTarget: input }) => {

  
    const mainData = {...data};
    if (input.files) { 
      
      mainData[input.name] = input.files;
      const src = URL.createObjectURL(input.files[0])
       changeData(mainData);
       changeDpPreview(src);
    }

    // console.log(input.)
    data[input.name] = input.value;
    changeData(mainData);
   
  };
  const handleForm = async (crop) => {
    changeScreenLoading(true);
    // e.preventDefault();
    // console.log(data);
    let formData = new FormData();
    formData.append("photu", data.photu[0]);
    formData.append("cropPhotu", crop);
    

    try {
      const result = await http.post(
        "http://localhost:3000/api/postProfile/profilePhoto",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      
  const updatePhoto = await http.get("http://localhost:3000/api/getProfile/cropProfilePhoto");
  updateCropProfilePhoto({cropImg:updatePhoto.data});
handleDiscardChangeButton();

      // changeUrl(result.data);
    
    } catch (e) {
      console.log(e);
    }
  };

const handleDiscardChangeButton=()=>{
  jQuery('#cropDpModal').off("hide.bs.modal");
  jQuery("#cropDpModal").modal('hide');
jQuery("#fileUpload").val('');
changeData({});
changeDpPreview(null);
changeScreenLoading(false);
 }
 
 
 const handleCancelCropDp=()=>{
   handleDiscardChangeButton();
   jQuery(".updateDpModal").modal('show');
 }


 const HandlecropAndUploadDp =async(crop,src)=>{

   const {name,lastModified,type} = data.photu[0]
   const image = await new Image();
   changeFinalCroppedDp({});
  //  changeFinalCroppedDpUrl(null);
image.src=src;
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 250
  canvas.height = 250

  ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      canvas.width,
      canvas.height
  )
 
  
  canvas.toBlob(async(blob)=>{
    const file = new File([blob],name,
      {lastModified,type});
      // const src = URL.createObjectURL(file)
      // changeFinalCroppedDpUrl(src);
      changeFinalCroppedDp({newPhotu:file});
      await handleForm(file);

  })
  
 }


    return (  <>
     {screenLoading&&
     <div id={`${styles.coverSpin}`}>
   
</div>
}
    <CropDp src={dpPreview} cancelCropDp={handleCancelCropDp} 
    cropAndUploadDp={HandlecropAndUploadDp}  show={screenLoading}/>
    <CloseCropDp discardAllChanges={handleDiscardChangeButton}/>
                
    <div
          className= {`modal fade updateDpModal`}
          id="updateDpModal"
          tabIndex="-1"
          role="dialog"
          // data-backdrop={()=>{return 'static'}}
          // data-keyboard="false"
     
        >
          
          <div className="modal-dialog modal-lg"  role="document">
            <div className="modal-content">
              <div className='modal-header'>
              <div className=" d-flex justify-content-center w-100">
             <h4  style={{ fontFamily: "arial" }}
                  className="modal-title font-weight-bolder ">
            Update profile photo </h4>
</div>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                 
                >
                  <span aria-hidden="true">&times;</span>
                </button></div>
              
              <div className="modal-body" >
 
              <div className="d-flex flex-column align-items-center justify-content-center">
          {/* <img
            src={`/api/getProfile/profilePhoto?${imgUrl   }`
          }
          height='100' width='100'
            className="mr-5"
          /> */}

          <form  onSubmit={handleForm}>
           
              <label type='button' 
              id ={`${styles.fileUploadButton}`} 
              htmlFor='fileUpload'> <strong id= {`${styles.plusSymbol}`}>+ 
              </strong> Upload photo</label>
            <input type="file" name="photu" id='fileUpload' 
              onChange={handleChange}  style={{display:'none'}}></input>
            {/* <input type="submit"></input> */}
          </form>
          <h2>or</h2>
        </div>
              <h5>Select from profile pictures</h5>
                <div className={`${styles.imgContainer} d-flex w-100 flex-wrap justify-content-center`}>
                
                  {props.allProfilePhotosList&&props.allProfilePhotosList.map((photo)=>{
              
                    
                      return <img className={styles.myUploadedPhoto} style={{margin:"0.5em"}} key={photo} src={`/api/getProfile/getAllProfilePhotos?imgPath=${photo}`}
                     />;
                
                  }
                    
                     
                  )}
                  
                </div>
              
              
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>

    </>);
}
 
export default UpdateDpModal;