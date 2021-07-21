import Login from "../components/login";
import { applySession } from "next-iron-session";
import cookieInfo from '../utils/cookie'

function home() {
  return (
    <>
      <div
        className="  main border "
        style={{ height: "700px", background: "#f0f2f5" }}
      >
        <div className="container mt-5  ">
          <div className="row justify-content-around ">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps({ req, res }) {
  await applySession(req, res, cookieInfo);
  const users = req.session.get("user") ? req.session.get("user") : false;
  if (users) {
    res.setHeader("location", "/home");
    res.statusCode = 302;
    res.end();
  }

  return { props: { users } };
}
export default home;
