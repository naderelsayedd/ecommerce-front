import React from 'react'
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <div>
        <div className='bg-dark text-light p-1 text-center footer fixed-bottom'>
            <div className='container copy'>
              <p className='m-2'>Made With <FaHeart className='text-danger m-2'/> By Nader ELsayed</p>
            </div>
        </div>
    </div>
  )
}
