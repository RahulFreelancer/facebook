import { applySession } from "next-iron-session";
import cookieInfo from "../../utils/cookie";

export default async (req, res) => {
  await applySession(req, res, cookieInfo);

  if (req.session && req.session.get("user")) {
    req.session.destroy();
    return res.send("logged out");
  }
  res.setHeader("location", "/");
  res.statusCode = 302;
  res.end();
  //   return res.status(401).send("not-authorized");
};
