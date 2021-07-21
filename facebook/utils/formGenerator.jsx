export function Input(props) {
  const {
    name,
    fieldType,
    type,
    id,
    placeholder,
    autocomplete,
    btnclass,
    btnName,
    onchange,
    value,
    classname,
    error,
    
  } = props;
  if (fieldType === "input") {
    return (
      <>
        <div className="form-group">
          <input
            name={name}
            type={type}
            className={classname}
            id={id}
            placeholder={placeholder}
            autoComplete={autocomplete}
            onChange={onchange}
            required={false}
            value={value}
            onClick={onchange}
          ></input>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </>
    );
  }

  if (fieldType === "button") {
    return (
      <>
        <button style={{ width: "100%" }} id={id} className={btnclass}>
          {btnName}
        </button>
      </>
    );
  }
}

export const Select = (props) => {
  const { name, fieldType, onchange, id, value, classname } = props;
  const createYear = () => {
    let years = [];
    for (let year = 2020; year > 1950; year--) {
      years.push(year);
    }
    return years;
  };

  if (fieldType === "selectDate") {
    let optionArray = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
    ];
    return (
      <>
        <div className="form-group">
          <select
            className={classname}
            onChange={onchange}
            id={id}
            name={name}
            value={value}
          >
            {optionArray.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }
  if (fieldType === "selectMonth") {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
      <>
        <div className="form-group">
          <select
            className={classname}
            onChange={onchange}
            id={id}
            name={name}
            value={value}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }

  if (fieldType === "selectYear") {
    return (
      <>
        <div className="form-group">
          <select
            className={classname}
            onChange={onchange}
            id={id}
            name={name}
            value={value}
            onClick={onchange}
          >
            {createYear().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }
};

export const Radio = (props) => {
  const { type, id, placeholder, onchange, value, classname } = props;
  return (
    <>
      <div className="form-check row ">
        <div className=" border" style={{ width: "90%" }}>
          <label className="form-check-label col-6 " htmlFor={id}>
            {placeholder}
          </label>
          <input
            className={classname + " form-check-input col-6 "}
            type={type}
            name="gender"
            id={id}
            onChange={onchange}
            value={value}
          ></input>
        </div>
      </div>
    </>
  );
};
