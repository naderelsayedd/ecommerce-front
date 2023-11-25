import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';
import { IoLogOutSharp } from "react-icons/io5";


export default function Profile() {
  const [orders , setOrders] = useState([]);
    const hasToken = localStorage.getItem('token') ;
    const id = localStorage.getItem('userID');
    const url =`http://127.0.0.1:8000/api/orders/userShow/${id}` ;
    const logout = () => {
        localStorage.removeItem('token') ;
        localStorage.removeItem('userID');
        window.location.href = '/login';
    }

    const getUserOrders = async () => {
      const res = await fetch(url , {
        method : "GET" , 
        headers : {
          Authorization : `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      }) ;
      const data =await res.json();
      // console.log(data);
      setOrders(data)
    }

    const deleteFromCart = (orderID) =>{
        const res = fetch (  `http://127.0.0.1:8000/api/orders/delete/${orderID}` , {
          method : "DELETE" ,
          headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`,
            'Content-Type' : "application/json"
          }
        })
        getUserOrders();
    }
    useEffect(() =>{
      getUserOrders();
    } , [])

    const totalPrice = orders.reduce((acc , orders) => acc  + orders.discount , 0);
  return (
    <div className='container pt-5 pb-5'>
        <Button variant='danger' className='mt-5 logout' title='logout' onClick={logout}> <IoLogOutSharp /></Button>
    {
       hasToken ? (
          <div>
            {
              orders.length > 0 ? (
                <div className='text-center'>
                <h3 className='mt-5'>Your Orders</h3>
                <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th> Name</th>
                          <th>Price</th>
                          <th>Image</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        orders && orders.map((item , index) => {
                          return(
                            <tr key={item.orderID}>
                              <td>{index+1}</td>
                              <td>{item.NAME}</td>
                              <td><span className='text-decoration-line-through text-danger'>{item.price}</span> <span className='text-primary me-5'>{item.discount} LE</span></td>
                              <td className='cart-img'>
                                  <img src={`http://127.0.0.1:8000/upload/products/${item.image}`} alt={item.NAME}/>
                              </td>
                              <td><Button variant='danger' onClick={() =>deleteFromCart(item.orderID)}><MdDeleteForever /></Button></td>
                            </tr>
                          )
                        })
                      }
                      </tbody>
                      <tfoot>
                        <tr>
                            <td colSpan={2}>Total Price</td>
                            <td colSpan={3}>{totalPrice} LE</td>
                        </tr>
                      </tfoot>
            </Table>
            </div>
              ) :(
                <p className='text-center'>No Order Yet!</p>
              )
            }
            
          </div>
       ) : (
        <p>login</p>
       ) 
    }
    </div>
  )
}
