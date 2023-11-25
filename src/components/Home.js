import React, { useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import { Link, json } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";
import Swal from 'sweetalert2';
import Slider from './Slider';


export default function Home() {
  const hasToken = localStorage.getItem('token');
  const [products , setProducts] = useState([]) ;
  const ordersURL = "http://127.0.0.1:8000/api/orders/create" ;
  const url = "http://127.0.0.1:8000/api/products" ;
  const userid = localStorage.getItem('userID');
  // cart values  

  const getProducts = async() =>{
    try {
    const res = await fetch(url , {
      method : 'GET' ,
      headers:{
        Authorization : `Bearer ${localStorage.getItem("token")}` ,
        'Content-Type': 'application/json'
      }
    }) ;
    
    if(!res.ok){
      throw new Error(`Failed to fetch products : ${res.status}`)
    }
    const response =await res.json() ;
    // console.log(response);
    setProducts(response.data) ;
  }
  catch(error){
    console.log(`failed to fetch products : ${error.status}`);
  }
  } 

  const addToCart = (productID) => {
    const res = fetch (ordersURL , {
      method : "POST" , 
      headers : {
        Authorization : `Bearer ${localStorage.getItem("token")}` ,
        "Content-Type" : "application/json" 
      } ,
      body : JSON.stringify({
        productID : productID ,
        id : userid ,
        address : "000000000000" 
      })
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Product added to your cart",
      showConfirmButton: false,
      timer: 1000
    });
  }
  useEffect(() => {
    getProducts()
  } , []) ;

  // console.log(hasToken ? "ok" : "no");
  return (
    <div className='text-center box'>
      {
        hasToken ? (
        <div className=' container-fluid'>
          <Slider products={products}/>
          <div className='container '>
            <div className='row mt-3'>
            {
              products.map((item) => {
                return (
                  <div className='col-md-6 col-lg-4  mb-4' key={item.productID}>
                    <div className='card'>
                    <Link to={`/details/${item.productID}`}> 
                      <div className='card-img mt-5'>
                        <img src={`http://127.0.0.1:8000/upload/products/${item.fileExt}`} alt={item.productName}/>
                      </div>
                    </Link>
                      <div className='card-body'>
                        <h5>{item.productName}</h5>
                        <span className='text-decoration-line-through text-danger'>{item.price}</span><span className='text-primary'>  {item.discount} LE</span>
                        <span className='d-block mb-2'>{item.stock} Items Left</span>
                        <Button onClick={() => addToCart(item.productID)}>Add to cart <FaCartPlus /></Button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            </div>
          </div>
        </div>  
        ) : (
          <div className='d-flex justify-content-center align-items-center sheild'>
              {
                window.location.href= '/login' 
              }
          </div>
        )
      }
    </div>
  );
}
