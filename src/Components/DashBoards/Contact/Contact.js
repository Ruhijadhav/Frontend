import React, { useState } from "react";
import './contact.css';

function Contact() {
  const url = process.env.REACT_APP_BACKEND;
  const [recipient, setRecipient] = useState("Alumni");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await fetch(`${url}/mail/sendEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `${token}` 
        },
        body: JSON.stringify({ user: recipient, message })
      });
      const data = await response.json();
      console.log("Response:", data);
      setRecipient("Alumni");
      setMessage("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="contact">
      <h2>Send Mail to Users</h2>
      <div className="recipient">
        <label htmlFor="recipient">Recipient:</label>
        <select id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)}>
          <option value="Alumni">Alumni</option>
          <option value="Student">Student</option>
          <option value="Teachers">Teachers</option>
          <option value="All">All</option>
        </select>
      </div>
      <label htmlFor="message">Message:</label>
      <textarea id="message" rows={12} cols={70} value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={(e)=>{handleSubmit(e)}}>Submit</button>
    </div>
  );
}

export default Contact;
