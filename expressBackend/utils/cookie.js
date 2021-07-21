const config = require('config');
const cookieInfo = {
  cookieName: "prince",
  password: config.get('SESS_PASS') ,
  cookieOptions: {
    httpOnly: true,
    secure: false,
    // sameSite:"none"
    
  
  },
};
 module.exports = cookieInfo;
