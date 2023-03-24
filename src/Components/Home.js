import React, { useEffect, useState } from "react";
import "../App.css"

function Home() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState([]);
  const [isedit, setIsedit] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const gettask = JSON.parse(localStorage.getItem("localdata"));
    if (gettask) {
      setUserData(gettask);
    }
  }, []);

  function resetfield() {
    setFname("");
    setLname("");
    setEmail("");
    setPassword("");
  }

  function handlesubmit(e) {
    e.preventDefault();
    const data = {
      fname,
      lname,
      email,
      password,
    };
    if (fname === "" || lname === "" || email === "" || password === "") {
      alert("please input all field");
    } else {
      if (isedit) {
        let arr = userData;
        for (let i = 0; i < arr.length; i++) {
          if (i === index) {
            arr[i] = data;
            setIndex("");
            resetfield();
          }
        }
        localStorage.setItem("localdata", JSON.stringify([...arr]));
        // setUserData([...arr]);
        setIsedit(false);
      } else {
        setUserData([...userData, data]);
        localStorage.setItem("localdata", JSON.stringify([...userData, data]));
        console.log(data);
        resetfield();
      }
    }
  }
  const onEdit = (item, index) => {
    //    const users =userData[index];
    //    console.log("users",users)
    setFname(item.fname);
    setLname(item.lname);
    setEmail(item.email);
    setPassword(item.password);
    setIsedit(true);
    setIndex(index);
  };

  const onDelete = (index) => {
    if (window.confirm("are you sure")) {
      const row = userData;
      row.splice(index, 1);
      // console.log(row)
      setUserData([...row]);
      localStorage.setItem("localdata", JSON.stringify([...row]));
      // userData.splice(index,1)
      // setUserData([...userData])
      // localStorage.setItem("localdata", JSON.stringify([...userData]))
    }
  };
  return (
    <div>
    <div className="div">
      <form className="form">
        <label>First Name :</label>
        <br />
        <input
          type="text"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          placeholder="Enter Your  Firstname...."
        />
        <br />
        <br />
        <label>Last Name :</label>
        <br />
        <input
          type="text"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          placeholder="Enter Your  Lastname...."
        />
        <br />
        <br />
        <label>Email:</label>
        <br />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email...."
        />
        <br />
        <br />
        <label>Password :</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Your Password...."
        />
        <br />
        <br />
        <button onClick={handlesubmit} className='submit-btn'>{isedit ? "Update" : "Submit"}</button>
      </form>
      </div>
      <br />
      <div className="table">
      <table className="customers">
        <tbody>
          <tr>

            <th>Sr No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>

          {userData.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.fname}</td>
                <td>{item.lname}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>
                  <button className="edit-btn" onClick={() => onEdit(item, index)}>Edit</button>
                  <button className="delete-btn" onClick={() => onDelete(index)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}
export default Home;
