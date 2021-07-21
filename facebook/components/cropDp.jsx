import {useState,useCallback, useEffect } from "react";
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/lab/Slider'
import styles from '../CssModules/cropDp.module.css';


const CropDp = (props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPx, setCroppedAreaPx] = useState({})
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea,croppedAreaPixels);
    setCroppedAreaPx(croppedAreaPixels);

    // console.log(croppedArea, croppedAreaPixels)
  }, [])
  useEffect(()=>{
    
    !props.src&&
    handleCropSizeAndZoom();
  },[props.src])


  const handleCropSizeAndZoom=()=>{
    setZoom(1),
    setCrop({x:0,y:0})
  }



    return (  <div id="cropDpModal"  className={`modal cropDpModal `} tabIndex="-1" role="dialog">
    <div className="modal-dialog modal-lg"  role="document" >
      <div className="modal-content">
        <div className="modal-header">
        <div className=" d-flex justify-content-center w-100">
             <h5  style={{ fontFamily: "arial" }}
                  className="modal-title font-weight-bolder ">
            Update profile picture </h5>
            
</div>

          <button type="button" className="close" data-dismiss= 'modal' aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <hr></hr>
       
       
        <div className={`modal-body ${styles.modalHeight}`}>
{!props.show&&<div className={styles.cropContainer}
>
<Cropper 
          image={props.src&&props.src}
          crop={crop}
          zoom={zoom}
          cropShape="round"
          showGrid={false}
          aspect={1}
          showGrid={false}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
    
         
        />
        </div>}
        <div className={styles.controls}>
        <Slider
          value={zoom}
          min={1}
          max={3}
          
          aria-labelledby="Zoom"
          onChange={(e, zoom) => setZoom(zoom)}
          classes={{ container: styles.slider }}
        // className={styles.slider}
         
        />
      </div>

    </div>
  
   
     
        

        <div className="modal-footer">
        <button className='btn btn-secondary' 
        onClick={props.cancelCropDp}>Cancel</button>
        <button className='btn btn-primary' 
        onClick={()=>props.cropAndUploadDp(croppedAreaPx,props.src)}>Save</button>
         
        </div>
      </div>
    </div>
  </div>);
}
 
export default CropDp;


