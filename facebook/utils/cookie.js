const cookieInfo = {
  cookieName: "prince",
  password: process.env.SESS_PASS,
  cookieOptions: {
    httpOnly: true,
    secure: false,
    // sameSite:"none"
  },
};
export default cookieInfo;
