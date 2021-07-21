import UserContext from "../utils/userContext";
import { React, Component } from "react";
import http from "../utils/http";

class Store extends Component {
 
  handleCropProfilePhoto=(cropProfilePhoto)=>{
    const data = {...this.state};
    data.cropProfilePhoto=cropProfilePhoto;
    this.setState(data);

  }

  handleCoverPhoto=(item)=>{
    
    const data = {...this.state};
    data.coverPhoto=item;
    this.setState(data);
   
  }



  handleUser = (owner,profilePhoto,cropProfilePhoto,coverPhoto) => {
    const state = { ...this.state };

    state.user = owner;
    state.profilePhoto=profilePhoto;
    state.cropProfilePhoto=cropProfilePhoto;
    state.coverPhoto=coverPhoto
    this.setState(state);
    // console.log(this.state);
  };


handleProfileUser=(profileOwner,profileDp,cropProfileDp,coverPhoto)=>{
const data = {...this.state};

data.profileUser=profileOwner;
data.profileUserCropDp=cropProfileDp;
data.profileUserCoverPhoto=coverPhoto;
data.profileUserDp=profileDp;
this.setState(data);
}



handleProfileUserAndId=(item)=>{
  const data = {...this.state}
  data.profileUserId=item._id;
  data.profileUser=item;
  this.setState(data);
}

handleProfileUserCoverAndDp=(profileDp,cropDp,cover)=>{
  const data = {...this.state};
  data.profileUserCropDp=cropDp;
data.profileUserCoverPhoto=cover;
data.profileUserDp=profileDp;
this.setState(data);
}

handleRelationWithProfileUser=(item)=>{
  const data = {...this.state};
  data.relationWithProfileUser=item;
  this.setState(data);
}



handleFriendsNotification=(item)=>{
  const data = {...this.state};
  data.friendsNotification=item;
  this.setState(data);
}


handleRequestReceived=(item)=>{
  const data = {...this.state};
  data.requestReceived=item;
  this.setState(data);
}

handleAcceptedByOther=(item)=>{
  const data = {...this.state};
  data.acceptedByOther=item;
  this.setState(data);
}

handleIndivAcceptedByOther=async(username)=>{
  const data = {...this.state};
  const obj = data.acceptedByOther.find((friend)=>{
return friend.username===username
  })
if(obj){
obj.seen=true;
this.setState(data);
try {
  const result = await http.post("http://localhost:3000/api/friendRequestApi/changeStatusOfReqs",
{username:this.state.user.username,acceptedUsername:username})
} catch (e) {
  console.log(e.message)
}

}

}


handleIndivReceivedReq=async(username)=>{
  const data = {...this.state};
  const obj = data.requestReceived.find((reqs)=>{
return reqs.username===username
  })
if(obj){
console.log('it reached here successfully');
obj.seen=true;
this.setState(data);
try {
  const result = await http.post("http://localhost:3000/api/friendRequestApi/changeStatusOfReqs",
{username:this.state.user.username,receivedUsername:username})
console.log(result);

} catch (e) {
  console.log(e.message)
}

}



}

handleAddFriendKeyInRecReq=async(username,action)=>{
  const data = {...this.state}

  const obj  = data.requestReceived.find((reqs)=>{
  reqs.username===username&&action==='friend'&&(reqs.friends=true);
  reqs.username===username&&action==='removed'&&(reqs.removed=true);
  })
  this.setState(data);
}

handleActiveReq=(username)=>{
  const data = {...this.state};
  //remove active from others
  data.requestReceived.find((reqs)=>{
    reqs.active&&(reqs.active=false);
  })
  data.acceptedByOther.find((reqs)=>{
    reqs.active&&(reqs.active=false);
  })

  //add active to clicked one

  data.requestReceived.find((reqs)=>{
    reqs.username===username&&(reqs.active=true)
  })
  data.acceptedByOther.find((reqs)=>{
    reqs.username===username&&(reqs.active=true)
  })

  this.setState(data);
}


// handleProfileUserCropDp=(item)=>{
//   const data = {}
// }
// handleProfileUserCoverPhoto=(item)=>{}


handleActiveUserProfile=(item)=>{
  const data  = {...this.state};
  data.activeUserProfile=item;
  this.setState(data);
}





  state = {
    profileUser:{},
    profileUserDp:{},
    profileUserCropDp:{},
    profileUserCoverPhoto:"",
    profileUserId:"",
    relationWithProfileUser:{},
    user: {},
    cropProfilePhoto:{},
    profilePhoto:{},
    coverPhoto:"",
    friendsNotification:{count:0,},
    requestReceived:[],
    acceptedByOther:[],
    activeUserProfile:"",

  
     updateActiveUserProfile:this.handleActiveUserProfile,
    updateUser: this.handleUser,
    updateCropProfilePhoto:this.handleCropProfilePhoto,
    updateCoverPhoto:this.handleCoverPhoto,
    updateFriendsNotification:this.handleFriendsNotification,
updateProfileUserAndId:this.handleProfileUserAndId,
updateProfileUserCoverAndDp:this.handleProfileUserCoverAndDp,
    updateProfileUser:this.handleProfileUser,
    updateRelationWithProfileUser:this.handleRelationWithProfileUser,
    updateRequestReceived:this.handleRequestReceived,
    updateAcceptedByOther:this.handleAcceptedByOther,
    updateIndivAcceptedByOther:this.handleIndivAcceptedByOther,
    updateIndivReceivedReq:this.handleIndivReceivedReq,
  acceptOrDeleteReqs:this.handleAddFriendKeyInRecReq,
  updateActiveReq:this.handleActiveReq,
    // updateProfileUserCropDp:this.handleProfileUserCropDp,
    // updateProfileUserCoverPhoto:this.handleProfileUserCoverPhoto

  };
  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default Store;
