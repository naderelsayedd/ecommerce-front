import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { FaCartPlus } from "react-icons/fa";
import Swal from 'sweetalert2';


export default function Details() {
    const [product ,setProduct] = useState() ;
    const [reviews , setReviews] = useState() ;
    const [comment , setComment] = useState();
    const { id } = useParams() ;
    const userid = localStorage.getItem('userID');
    

    // values to post comments 
    const values = {
        'userid'  : localStorage.getItem('userID') ,
        'id' : id ,
        'comment' : comment ,
        'rate' : 0
    }
    const detailsURL = `http://127.0.0.1:8000/api/products/${id}`;
    const reviewsURL = `http://127.0.0.1:8000/api/reviews/${id}` ;
    const rateURL = `http://127.0.0.1:8000/api/reviews/store` ;
    const ordersURL = "http://127.0.0.1:8000/api/orders/create" ;


    const getProduct = async () => {
        const res = await fetch(detailsURL , {
            method : 'GET' , 
            headers : {
                "Content-Type" : "application/json", 
                Authorization :  `Bearer ${localStorage.getItem("token")}`
            }
        }) ;
        const data =await res.json()
        setProduct(data.data)
        // console.log(data.data);
    }

    const postReview = async () => {
        let res = await fetch(rateURL , {
            method : "POST" , 
            headers  : {
                "Content-Type" : "application/json",
                Authorization :  `Bearer ${localStorage.getItem("token")}`,
            } ,
            body : JSON.stringify(values)
        });
        console.log(res);
        window.location.reload()
    }
    const getReviews = async () => {
        const res = await fetch (reviewsURL , {
            method : "GET" , 
            headers : {
                "Content-Type" : "application/json", 
                Authorization :  `Bearer ${localStorage.getItem("token")}`
            }
        }) ;
        const review =await res.json() ;
        // console.log(review);
        setReviews(review) ;
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
            title: "Items added to your cart",
            showConfirmButton: false,
            timer: 2000
          });
      }
    useEffect(() => {
        getProduct();
        getReviews()
    } , [])
  return (
    <div className='container'>
    {
        product ? (
            <div className='row bg-dark-subtle text-dark mt-5 p-5 rounded-3'>
                <div className='col-md-6 col-lg-4 mb-5 overflow-hidden details-img'>
                    <img src={`http://127.0.0.1:8000/upload/products/${product.image}`} alt={product.productName}/>
                </div>
                <div className='col-md-6 col-lg-6'>
                    <h3>{product.productName}</h3>
                    <p className='text-dark'>{product.catName}</p>
                    <span className='text-decoration-line-through text-danger'>{product.price}</span> <span className='text-primary ms-2'>{product.discount} LE</span>
                    <p>{product.description}</p>
                    <p>{product.rate}</p>
                    <span className='d-block mb-2'>Items Left : {product.stock}</span>
                    <Button onClick={() =>addToCart(product.productID)}>Add To Cart <FaCartPlus /></Button>
                </div>
                <div>
                <hr />
                    <h5 className='mb-5 mt-4'>Customer Reviews : </h5>
                        <form className='form mb-4 p-3 rounded-3 bg-secondary' method='post' onSubmit={(e) =>e.preventDefault()}>
                            <input type='text' placeholder='Write a comment ' className='form-control mb-2' onChange={(e) => setComment(e.target.value)}/>
                            <input type='submit' className='btn btn-primary' onClick={postReview}/>
                        </form>
                        {
                            reviews && reviews.map((item) => {
                                return (
                                    <div key={item.rateID} className='col-12 alert alert-primary'>
                                    <span>{item.userName} :  {item.comment} </span>
                                    <span className='d-block'>{item.date}</span>
                                        
                                    </div>
                                )
                            })
                        }
                    </div>
            </div>
        ) : (
            <div className="text-danger text-capitalize text-center sheild d-flex justify-content-center align-items-center">
            <div className="loader">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            <div className="bar4"></div>
            <div className="bar5"></div>
            <div className="bar6"></div>
            <div className="bar7"></div>
            <div className="bar8"></div>
            <div className="bar9"></div>
            <div className="bar10"></div>
            <div className="bar11"></div>
            <div className="bar12"></div>
        </div>
            </div>
        )
    }
    </div>
  )
}
