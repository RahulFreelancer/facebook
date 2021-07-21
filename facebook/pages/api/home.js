import { applySession } from "next-iron-session";
import cookieInfo from "../../utils/cookie";



export default async function handler(req, res, session) {
  await applySession(req, res, cookieInfo);
  console.log("api hit by home");
  const user = req.session.get("user");
  console.log(user, "kaam karta h ");
  res.send({ user });
}
