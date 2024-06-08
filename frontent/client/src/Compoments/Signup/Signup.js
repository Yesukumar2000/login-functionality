import React, { useRef, useState } from "react";
import './Signup.css';
import { Link } from "react-router-dom";


function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();
 let [profilePic,setProfilePic]=useState('./images/noimagepic.png');

  let onSignup = async () => {
    let myHeader = new Headers();
    myHeader.append("content-type", "application/json");
    let dataToSend = {
      fristName: firstNameInputRef.current.value,
      lastName: lastNameInputRef.current.value,
      age: ageInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      mobile: mobileNoInputRef.current.value,
      profilePic: profilePicInputRef.current.value,
    };
    let reqOptions = {
      method: "POST",
      headers: myHeader,
      body: JSON.stringify(dataToSend),
    };
    let JSONData = await fetch("http://localhost:7999/register", reqOptions);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
    console.log(JSOData);
  };
   let OnSignupUsingURLE = async()=>{
    let myHeader = new Headers();
      myHeader.append("content-type", "application/x-www-form-urlencoded");

      let dataToSend = new URLSearchParams();
      dataToSend.append("firstName", firstNameInputRef.current.value);
      dataToSend.append("lastName", lastNameInputRef.current.value);
      dataToSend.append("age",ageInputRef.current.value);
      dataToSend.append("email",emailInputRef.current.value);
      dataToSend.append("password",passwordInputRef.current.value);
      dataToSend.append("mobileNo",mobileNoInputRef.current.value);
      dataToSend.append("profilePic",profilePicInputRef.current.value);

    let reqOptions = {
      method: "POST",
      headers: myHeader,
      body: dataToSend,
    };
    let JSONData = await fetch("http://localhost:7999/register", reqOptions);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
    console.log(JSOData);
   }
   let OnSignupUsingFD =async()=>{
    let dataToSend = new FormData();

    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age",ageInputRef.current.value);
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);
    dataToSend.append("mobileNo",mobileNoInputRef.current.value);
    for(let i =0;i<profilePicInputRef.current.files.length;i++){
      dataToSend.append("profilePic",profilePicInputRef.current.files[i])
    }
    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };
    let JSONData = await fetch("http://localhost:7999/register", reqOptions);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
    console.log(JSOData);
   }
  return (
    <div >
      <form>
        <h2> Employee Form</h2>
        <div>
          <label>Frist Name</label>
          <input ref={firstNameInputRef}  type="text" placeholder="Fristname" ></input>
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lastNameInputRef}  type="text" placeholder="Surname" ></input>
        </div>
        <div>
          <label>Age</label>
          <input ref={ageInputRef} type="number" placeholder="Age" ></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}  type="email" placeholder="Email" />
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef} type="text" placeholder="password"></input>
        </div>
        <div>
          <label>Mobile No</label>
          <input ref={mobileNoInputRef} type="number" placeholder="9100000000"></input>
        </div>
        <div>
          <label>Profile Pic(file size limit-225kb only)</label>
          <input ref={profilePicInputRef}  type="file" placeholder="path"  
          onChange={(eo)=>{
                let selectedPicPath =URL.createObjectURL(eo.target.files[0]);
               setProfilePic(selectedPicPath);
              }
          }
          ></input>
          <br></br>
          <br></br>
          <img src={profilePic} className="profilePic" alt="profile"/>
        </div>
        <div>
          <div>
          <button type="button"  
          onClick={()=>{
            onSignup();
          }}
          >
            Sign Up (JSON)
          </button>
          </div>
          <div>
          <button type="button"  onClick={()=>{
            OnSignupUsingURLE();
          }}>
            Sign Up (url Encodeed)
          </button>

          </div>
          <div>
          <button type="button" 
           onClick={()=>{
            OnSignupUsingFD();
           }}
           >
            Sign Up (form Data)
          </button>
          </div>
        </div>
      </form>
      <Link to='/'>Login</Link>
      
    </div>
  );
}

export default Signup;
