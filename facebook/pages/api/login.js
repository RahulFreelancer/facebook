import sanitizeHtml from "sanitize-html";
import Users from "../../dbModel/apiRegister";
import database from "../../utils/dbConnect";
import bcrypt from "bcrypt";
import { withIronSession } from "next-iron-session";
import cookieInfo from "../../utils/cookie";

const validation = (user) => {
  user.lemail = sanitizeHtml(user.lemail).trim().toLowerCase();
  user.lpassword = sanitizeHtml(user.lpassword);
};

async function Login(req, res) {
  console.log(req.session.get("user"));
  console.log(req.session.get());
  //making connection  to database

  database.connect();

  //validation
  validation(req.body);
  //email checking
  let user;
  try {
    //database call
    user = await Users.findOne({ email: req.body.lemail });
    if (!user) {
      return res
        .status(401)
        .send("No account is found with this email or password");
    }
  } catch (error) {
    console.log(
      "Can not check for email because there is no connection to the databse"
    );
    return res.status(501).send("Internal Server Error Occurred hui h");
  }

  //email is registered so now check for password
  const comparePass = await bcrypt.compare(req.body.lpassword, user.password);
  if (comparePass) {
    req.session.set("user", user);
    await req.session.save();

    return res.send(`${user} authentication successfull`);
  }

  return res
    .status(400)
    .send(`Incorrect password for ${user.fname} ${user.sname}`);
}

export default withIronSession(Login, cookieInfo);
