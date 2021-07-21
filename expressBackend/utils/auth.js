// const nextIronSession=require('next-iron-session');
const cookieInfo = require('../utils/cookie');
const config = require('config');



   const auth=  async(req,res,next)=>{
       
    // await nextIronSession.applySession(req,res,cookieInfo);
   if(req.headers.auth!==config.get('token')){
      return res.status(400).send('opps its not a valid webpage')
   }
else{next();}

};

      



module.exports=auth;