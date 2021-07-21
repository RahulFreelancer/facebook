import { Input, Radio, Select } from "../utils/formGenerator";
import * as yup from "yup";
import { Component } from "react";
import http from "../utils/http";
import styles from '../CssModules/registrationLogin.module.css'

class Registeration extends Component {
  state = {
    data: {fname:'',sname:'',email:'',password:'',cpassword:'',
     day: 1, month: "January", year: 2020 },
    errors: {},
    errClass: {},
    screenLoadingState:false,
  };

  schemaObj = {
    fname: yup.string().required().min(3).max(20).label("First name"),
    sname: yup.string().required().max(20).label("Surname"),
    email: yup.string().required().email().label("Email"),
    password: yup.string().required().min(8).label("password"),
    cpassword: yup.string().label("Confirm password"),
    year: yup.number().required().max(2015).label("Date of birth"),

    gender: yup.string().required().label("Gender"),
  };

  schema = yup.object().shape(this.schemaObj);

  doSubmit = async () => {
    ///
    const store= {...this.state};
    store.screenLoadingState=true;
    this.setState(store);
    
    // console.log(this.state.data);

    try {
      const result = await http.post(
        "http://localhost:3000/api/register",
        this.state.data
      );
      // console.log(result);
      window.location = "/home";
      store.screenLoadingState=false;
      this.setState(store);
      // result.data.details;
    } catch (e) {
      if (e.response && e.response.status === 403) {
        return console.log(e.response.data);
      }

      if (e.response && e.response.status === 400) {
        const errors = {};
        e.response.data.details.map((item) => {
          errors[item.path] = item.message;
        });
        return this.setState({ errors });
      }
      if (e.response && e.response.status === 501) {
        console.log(e.response.data);
      }
    }
  };

  submitValidation = async () => {
    try {
      const option = { abortEarly: false };
      await this.schema.validate(this.state.data, option);
      this.doSubmit();
    } catch (error) {
      console.log(error);
      const errors = {};
      error.inner.map((item) => {
        errors[item.path] = item.message;
      });
      this.setState({ errors });
    }
  };

  handleForm = (e) => {
    e.preventDefault();
    this.submitValidation();
  };

  onChangeValidation = async ({ currentTarget: input }) => {
    // console.log("invoke onchangevalidation");
    //entering data into state
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });

    //validating inputs against defined yup schema
    let obj = { [input.name]: input.value };
    const schema = yup
      .object()
      .shape({ [input.name]: this.schemaObj[input.name] });

    //exception validation for confirm password
    if (input.name === "cpassword") {
      const errors = { ...this.state.errors };
      if (input.value === this.state.data.password) {
        delete errors[input.name];
        this.setState({ errors });
      } else {
        errors[input.name] = "Both password must match";
        this.setState({ errors });
      }
    } else if (input.name === "day" || input.name === "month") {
    } else {
      try {
        const result = await schema.validate(obj);
        const errors = { ...this.state.errors };
        const errClass = { ...this.state.errClass };

        delete errors[input.name];
        delete errClass[input.name];
        this.setState({ errors, errClass });
      } catch (e) {
        let classname = "form-control border border-danger ";
        if (input.name === "gender") {
          classname = "form-check-input col-6";
        }
        const errors = { ...this.state.errors };
        const errClass = { ...this.state.errClass };
        errors[input.name] = e.message;
        errClass[input.name] = classname;
        this.setState({ errors, errClass });
        // console.log(e.message);
      }
    }
  };

  closeForm = () => {
    return this.setState({
      data: {
        day: 1,
        month: "January",
        year: 2020,
        fname: "",
        sname: "",
        email: "",
        password: "",
        cpassword: "",
        gender: this.state.data.gender,
      },
      errors: {},
      errClass: {},
    });
  };

  render() {
    return (
      <>
      {this.state.screenLoadingState&&
     <div id={`${styles.coverSpinRegis}`}>
   
</div>}
        <div
          className=" modal modal-md fade"
          id="register"
          tabIndex="-1"
          role="dialog"
          data-backdrop="static"
          data-keyboard="false"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h2
                  style={{ fontFamily: "arial" }}
                  className="modal-title font-weight-bolder"
                  id="exampleModalLongTitle"
                >
                  Sign Up
                  <div
                    style={{ fontSize: "0.5em", fontWeight: 500 }}
                    className="text-secondary"
                  >
                    It's quick and easy.
                  </div>
                </h2>

                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.closeForm}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.handleForm}>
                  <div className="row">
                    <div className="col-6">
                      <Input
                        name="fname"
                        fieldType="input"
                        type="text"
                        id="fname"
                        placeholder="First Name"
                        autocomplete="off"
                        onchange={this.onChangeValidation}
                        value={this.state.data.fname}
                        classname={this.state.errClass.fname || "form-control"}
                        error={this.state.errors.fname}
                      />
                    </div>

                    <div className="col-6">
                      <Input
                        name="sname"
                        fieldType="input"
                        type="text"
                        id="sname"
                        placeholder="Surname"
                        autocomplete="off"
                        onchange={this.onChangeValidation}
                        value={this.state.data.sname}
                        classname={this.state.errClass.sname || "form-control"}
                        error={this.state.errors.sname}
                      />
                    </div>
                  </div>
                  <Input
                    name="email"
                    fieldType="input"
                    type="text"
                    id="email"
                    placeholder="Email address or phone number"
                    autocomplete="off"
                    onchange={this.onChangeValidation}
                    value={this.state.data.email}
                    classname={this.state.errClass.email || "form-control"}
                    error={this.state.errors.email}
                  />
                  <Input
                    name="password"
                    fieldType="input"
                    type="password"
                    id="password"
                    placeholder="Password"
                    autocomplete="off"
                    onchange={this.onChangeValidation}
                    value={this.state.data.password}
                    classname={this.state.errClass.password || "form-control"}
                    error={this.state.errors.password}
                  />

                  <Input
                    name="cpassword"
                    fieldType="input"
                    type="password"
                    id="cpassword"
                    placeholder="Confirm Password"
                    autocomplete="off"
                    onchange={this.onChangeValidation}
                    value={this.state.data.cpassword}
                    classname={this.state.errClass.cpassword || "form-control"}
                    error={this.state.errors.cpassword}
                  />
                  <div>
                    <div
                      style={{ color: "#606770", fontSize: "0.9em" }}
                      className="dob"
                    >
                      Date of birth
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <Select
                          name="day"
                          fieldType="selectDate"
                          onchange={this.onChangeValidation}
                          id="day"
                          value={this.state.data.day}
                          classname={this.state.errClass.year || "form-control"}
                        />
                      </div>
                      <div className="col-4">
                        <Select
                          name="month"
                          fieldType="selectMonth"
                          onchange={this.onChangeValidation}
                          id="month"
                          value={this.state.data.month}
                          classname={this.state.errClass.year || "form-control"}
                        />
                      </div>
                      <div className="col-4">
                        <Select
                          name="year"
                          fieldType="selectYear"
                          onchange={this.onChangeValidation}
                          id="year"
                          value={this.state.data.year}
                          classname={this.state.errClass.year || "form-control"}
                          error={this.state.errors.year}
                        />
                      </div>
                    </div>
                  </div>
                  {this.state.errors.year && (
                    <div className="alert alert-danger">
                      {this.state.errors.year}
                    </div>
                  )}
                  <div>
                    <div
                      style={{ color: "#606770", fontSize: "0.9em" }}
                      className="gender"
                    >
                      Gender
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <Radio
                          type="radio"
                          id="male"
                          placeholder="Male"
                          onchange={this.onChangeValidation}
                          value="male"
                          classname={
                            this.state.errClass.gender ||
                            " form-check-input col-6 "
                          }
                          error={this.state.errors.gender}
                        />
                      </div>
                      <div className="col-4 ">
                        <Radio
                          type="radio"
                          id="female"
                          placeholder="Female"
                          onchange={this.onChangeValidation}
                          value="female"
                          classname={
                            this.state.errClass.gender ||
                            " form-check-input col-6 "
                          }
                          error={this.state.errors.gender}
                        />
                      </div>
                      <div className="col-4 ">
                        <Radio
                          type="radio"
                          id="custom"
                          placeholder="Custom"
                          onchange={this.onChangeValidation}
                          value="Custom"
                          classname={
                            this.state.errClass.gender ||
                            " form-check-input col-6 "
                          }
                          error={this.state.errors.gender}
                        />
                      </div>
                    </div>
                    {this.state.errors.gender && (
                      <div className="alert alert-danger">
                        {this.state.errors.gender}
                      </div>
                    )}
                  </div>

                  <div className=" row mt-3 align-items-center justify-content-center">
                    <div className="col-4">
                      <Input
                        fieldType="button"
                        id="signupButton"
                        btnclass="btn btn-success btn-md font-weight-bolder"
                        btnName="Sign Up"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Registeration;
