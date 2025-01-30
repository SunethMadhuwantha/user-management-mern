import React from "react";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import Nav from "../Nav/Nav";

function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_1ou1thm", "template_40pafoo", form.current, {
        publicKey: "K37RmEmrT-GEpbeDV",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          alert("Success!");
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("Failed to send email.");
        }
      );
  };

  return (
    <div>
      <Nav />
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label><br />
        <input type="text" name="from_name" /><br />
        <label>Email</label><br />
        <input type="email" name="user_email" /><br />
        <label>Message</label><br />
        <textarea name="message" /><br />
        <button type="submit" value="Send" >send</button>
      </form>
    </div>
  );
}
export default ContactUs;
