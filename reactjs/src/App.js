import './App.css';
import './index.css';

// Importing modules
import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {

// usetstate for storing and retrieving wallet details
const [data, setdata] = useState({
  address: "",
  firstName: "",
  lastName: "",
  emailAddress: "",
  message: "",
  etherAmount: "",
});

// Button handler button for handling a
// request event for metamask
const btnhandler = () => {

  // Asking if metamask is already present or not
  if (window.ethereum) {

    // res[0] for fetching a first wallet
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((res) => accountChangeHandler(res[0]));
  } else {
    alert("install metamask extension!!");
  }
};

// getbalance function for getting a balance in
// a right format with help of ethers
const getbalance = (address) => {

  // Requesting balance method
  window.ethereum
  .request({
    method: "eth_getBalance",
    params: [address, "latest"]
  })
  .then((balance) => {
    // Setting balance
    setdata({
    Balance: ethers.utils.formatEther(balance),
    });
  });
};

// Function for getting handling all events
const accountChangeHandler = (account) => {
  // Setting an address data
  setdata({
    address: account,
  });
  console.log(account);
};

// onChange Handler function
// with event parameter
const getFirstName = (event)=>{
  // show the user input value to console
  const fName = event.target.value;
  setdata({ 
    firstName: fName,
  });
  console.log(fName);
};

const getLastName = (event)=>{
  // show the user input value to console
  const lName = event.target.value;
  setdata({ 
    lastName: lName,
  });
  console.log(lName);
};

const getEmailAddress = (event)=>{
  // show the user input value to console
  const eAddress = event.target.value;
  setdata({ 
    emailAddress: eAddress,
  });
  console.log(eAddress);
};

const getMessage = (event)=>{
  // show the user input value to console
  const tmessage = event.target.value;
  setdata({
    message: tmessage,
  });
  console.log(tmessage);
};

const getEtherAmount = (event)=>{
  // show the user input value to console
  const eAmount = event.target.value;
  setdata({
    eAmount: eAmount,
  });
  console.log(eAmount);
};

return (
  <div className="App">
  	{/* Calling all values which we
  	have stored in usestate */}
        <div>
		 <h1> Transfer Ether Reward to Your Friend </h1> 
        </div> 
    	<div>
  		<label>First Name</label><br/>
  		<input type="text" onChange={getFirstName} />
  	</div>
        <div>
		<label>Last Name</label><br />
  		<input type="text" onChange={getLastName} />
  	</div>
	<div>
		<label>Email Address</label><br />
	  	<input type="text" onChange={getEmailAddress} />
  	</div>
	<div>
		<label>Message</label><br/>
  		<input type="text" onChange={getMessage} />
  	</div>
	<div>
		<label>Trasfer Ether Amount</label><br />
  		<input type="text" onChange={getEtherAmount} />
      	</div>
	<div>
      	  <Card className="text-center">
   	 	<Card.Body>
    			<Button onClick={btnhandler} variant="primary">
      				Transfer
    			</Button>
    		</Card.Body>
  	  </Card>
	</div>
  </div>
);
}

export default App;

