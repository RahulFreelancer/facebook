const CloseCropDp = (props) => {
    return ( <div id="closeCropDpModal" style = {{ backgroundColor: "rgb(0,0,0)",
    backgroundColor: "rgba(0,0,0,0.4)"}}data-backdrop="true" className="modal fade" tabIndex="-1" role="dialog">
    <div className="modal-dialog modal-md modal-dialog-centered" role="document" >
      <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Discard changes</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        <div className="modal-body">
          <p>Are you sure that you want to discard your changes?</p>
        </div>
        <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-primary" data-dismiss='modal' onClick={props.discardAllChanges}>Discard</button>
      </div>
      </div>
    </div>
  </div>  );
}
 
export default CloseCropDp;