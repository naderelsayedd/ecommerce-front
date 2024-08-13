import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

function Register() {
  const url = "http://127.0.0.1:8000/api/user/register" ;

  const [name , setName] = useState('') ;
  const [email , setEmail] = useState('') ;
  const [password, setPassword] = useState('');
  const [passwordConfirm , setPasswordConfirme] = useState('') ;

  const values = {
    "name" : name , 
    "email" : email ,
    "password" : password ,
    "password_confirmation" : passwordConfirm
  }

  const submit = async () =>{
      const res = await fetch(url , {
        method : "POST" ,
        headers:{
          'Content-Type' : 'application/json',
        } ,
        body : JSON.stringify(values) 
      }) ;
      window.location.href = '/login'
      return res.json() ;
  }

  return (
    <Form className='col-lg-6 m-auto col-md-8 col-sm-12 bg-dark text-light p-5 mt-3 mb-3 rounded-5' onSubmit={(e) =>e.preventDefault()}>
        <h3 className='text-center text-primary mb-3'>Create new account</h3>
      <Form.Group className="mb-3">
        <Form.Label htmlFor='name'>Full Name</Form.Label>
        <Form.Control type="text" id='name' placeholder="Enter Full Name" onChange={(e) =>setName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor='email'>Email address</Form.Label>
        <Form.Control type="email" id="email" placeholder="Enter email" onChange={(e) =>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label htmlFor='password'>Password</Form.Label>
        <Form.Control type="password" id="password" placeholder="Password" onChange={(e) =>setPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor='passwordConfirm'>Password Confirmation</Form.Label>
        <Form.Control type="password" id="passwordConfirm" placeholder="Password Confirmation" onChange={(e) =>setPasswordConfirme(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={submit}>
        Submit
      </Button>
      <span className='d-block mt-3'>Already have account ? <Link to="/login">Login</Link></span>
    </Form>
  );
}

export default Register;