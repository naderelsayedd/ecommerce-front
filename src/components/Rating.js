import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

export default function Rating() {
  const {id}  = useParams() ;
  const reviewsURL = `http://127.0.0.1:8000/api/reviews/${id}` ;
  const getReviews = async () => {
    const res = await fetch(reviewsURL , {
      method : 'GET' , 
      headers : {
        "Content-Type" : "application/json", 
        Authorization :  `Bearer ${localStorage.getItem("token")}`
    }
    }) ;

    const data = res.json() ;
    console.log(data.data);
  }

  useEffect(() => {
    getReviews();
  } , [])
  return (
    <div>
      
    </div>
  )
}
