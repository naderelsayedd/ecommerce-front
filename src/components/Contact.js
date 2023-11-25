import Button from 'react-bootstrap/Button';
import { IoIosSend } from "react-icons/io";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

function Contact() {
    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
        'service_gfnwbxr',
        'template_yve1nsi', 
        form.current, 
        'UPJp1YBX6styxE8OH')
      e.target.reset() ;
      Swal.fire({
        position: "center",
        icon: "success",
        title: "We Have Received Your Message",
        showConfirmButton: false,
        timer: 2000
      });
  };
  return (
    <div className='container'>
        <h3 className='text-center mt-4 mb-4'>Contact Us</h3>
        <form className='form col-6 m-auto bg-dark p-4 rounded-5 text-light mb-5' ref={form} onSubmit={sendEmail}>
            <div className='form-group'>
                <label htmlFor='name'>Your Name : </label>
                <input type='text' placeholder='Your Name' className='form-control mt-3' id='name' name='name' required/>
            </div>
            <div className='form-group mt-3'>
                <label htmlFor='phone'>Your Phone  : </label>
                <input type='number' placeholder='Your phone' className='form-control mt-3' id='phone' name='phone' required/>
            </div>
            <div className='form-group mt-3'>
                <label htmlFor='email'>Your Email : </label>
                <input type='email' placeholder='Your Email' className='form-control mt-3' id='email' name='email' required/>
            </div>

            <div className='form-group mt-3'>
                <label htmlFor='message'>Your Message : </label>
                <textarea className='form-control mt-3' placeholder='Your Message...' id='message' name='message' required></textarea>
            </div>

            <div className='form-group mt-3'>
                <Button type='submit'>Send Message <IoIosSend /></Button>
            </div>
        </form>
    </div>
  );
}

export default Contact;