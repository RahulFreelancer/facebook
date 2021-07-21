import { useEffect, useRef } from "react";

import $ from 'jquery';

const Drop = () => {
let dropRef = useRef(null);
    useEffect(()=>{
        $('#dro').on('show.bs.dropdown', function(e) {
            console.log('sdf');
              console.log(e.target);
          })
    })
    return ( 
    <div class="dropd" id='dro'  ref={node => (dropRef = node)} >
    <button id="dLabel" class="btn btn-primary" type="button" data-toggle="dropdown" >
        Dropdown trigger
        <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
        <li><a href="#">someitem</a></li>
    </ul>
</div> );
}
 
export default Drop;