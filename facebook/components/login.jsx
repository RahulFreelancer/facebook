import { Input } from "../utils/formGenerator";
import Registration from "./registration";
import { useState } from "react";
import http from "../utils/http";
import styles from '../CssModules/registrationLogin.module.css'

const Login = () => {
  const api = process.env.NEXT_PUBLIC_API;
  // console.log(api);
  const [data, setData] = useState({ lemail: "", lpassword: "" });
  const [errors, setErrors] = useState({});
  const [screenLoadingStateLogin,changeLoadingStateLogin]=useState(false);

  const handleChange = ({ currentTarget: input }) => {
    const stateData = { ...data };
    stateData[input.name] = input.value;
    setData(stateData);
  };

  const handleForm = (e) => {
    e.preventDefault();
    doSubmit();
  };

  const doSubmit = async () => {
    changeLoadingStateLogin(true)
    try {
      const result = await http.post(
        `${process.env.NEXT_PUBLIC_API}/login`,
        data
      );
      changeLoadingStateLogin(false);
      window.location = "/home";
    } catch (e) {
      changeLoadingStateLogin(false);
      if (e.response.status === 401) {
        return setErrors({ lemail: e.response.data });
      }
      if (e.response.status === 400) {
        return setErrors({ lpassword: e.response.data });
      }
      return console.log(e.response.data);
    }
  };
  return (
    <>
         {screenLoadingStateLogin&&
     <div id={`${styles.coverSpinRegis}`}>
   
</div>}
      <Registration />
      <div className="col-4">
        {" "}
        <h1>Facebook</h1>
        <h4>Recent Logins</h4>
      </div>
      <div className="col-xs-6 col-s-6 col-md-4 ">
        <div className="bg-white p-3 rounded shadow">
          <form onSubmit={handleForm}>
            <Input
              fieldType="input"
              type="email"
              name="lemail"
              id="lemail"
              placeholder="Email address or phone number"
              autocomplete="on"
              classname="form-control"
              onchange={handleChange}
              value={data.lemail}
              error={errors.lemail}
            />

            <Input
              fieldType="input"
              type="password"
              name="lpassword"
              id="lpassword"
              placeholder="Password"
              autocomplete="off"
              classname="form-control"
              onchange={handleChange}
              value={data.lpassword}
              error={errors.lpassword}
            />
            <Input
              fieldType="button"
              id="login"
              btnclass="btn btn-primary btn-lg  font-weight-bolder "
              btnName="Log In"
            />

            <div className=" row mt-2 align-items-center justify-content-center">
              <a href="#forgotPassword text-primary">Forgotten password?</a>
            </div>

            <hr></hr>
            <div className=" row p-3 justify-content-center">
              <button
                type="button"
                className="col-12-sm btn btn-lg bg-dark rounded text-white "
                style={{ fontFamily: "arial" }}
                data-toggle="modal"
                data-target="#register"
              >
                <small className=" font-weight-bolder">
                  Create New Account
                </small>
              </button>
            </div>
          </form>
        </div>
        <div className=" row p-3 justify-content-center ">
          <a href=" #createPage ">Create a Page</a>
          &nbsp;for a celebrity, band or business.
        </div>
      </div>
    </>
  );
};
export default Login;
