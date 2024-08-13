import {Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Container  from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const url = "http://127.0.0.1:8000/api/user/login" ;
  const [email , setEmail] = useState('') ;
  const [password , setPassword] = useState('') ;
  const [errorMessage , setErrorMessage] = useState('');

  const values = {
    "email" : email ,
    "password" : password
  }
  const submit = async() =>{
    const res = await fetch(url , {
      method : "POST",
      headers:{
        "Content-Type":"application/json"
      } ,
      body :JSON.stringify(values)
    });
    const data = await res.json() ;
    if(data.status === 200){
      console.log(data);
      localStorage.setItem('token' , data.token)
      localStorage.setItem('userID' , data.user.id);
      window.location.href = '/' ;
    }else{
      const errorMessage = data.message ;
      setErrorMessage(errorMessage);
    }
    
  }
  return (
    <Container >
    <Form className='col-lg-6 m-auto col-md-8 col-sm-12 bg-dark text-light mt-5 p-5 rounded-5' onSubmit={(e) =>{e.preventDefault()}} >
    <h3 className='text-center text-primary mb-5'>Login to your account</h3>
      <h5 className='text-danger text-center'>{errorMessage}</h5>
      <Form.Group className="mb-3 " controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  onChange={(e) =>setPassword(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={submit}>
        Login
      </Button>
      <span className='d-block mt-4'>Don't have account yet ? <Link to="/register">Register Now</Link></span>
    </Form>
    </Container>
  );
}

export default Login;