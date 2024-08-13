import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/a11y';
import { Navigation , Pagination , Scrollbar  , Autoplay , A11y} from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function Slider(props) {
  const products = props.products.slice(0 , 5) ;
  return (
    <Swiper
      modules={[Navigation , Pagination , Scrollbar , Autoplay , A11y]} 
      spaceBetween={10}
      slidesPerView={1}
      autoplay = {{
        delay : 3000 , 
        disableOnInteraction : false ,
        reverseDirection : true
      }} 
      pagination = {{
        clickable : true
      }}
      navigation
      // onSlideChange={() =>console.log('slide changed')}
      // onSwiper={(swiper) => console.log(swiper)}
      a11y={true}

    >
      {
        products.map((item) => {
          return(
            <SwiperSlide key={item.productID}>
              <Link to={`/details/${item.productID}`} className="text-black">
              <div className='row rounded-5'>
                  <div className='col-md-4'><img src={`http://127.0.0.1:8000/upload/products/${item.fileExt}`}  alt={products.productName}/></div>
                  <div className='col-md-8 mt-4 mini'>
                      <h1>{item.productName}</h1>
                      <p>{item.desc}</p>
                      <span className='text-danger text-decoration-line-through me-2'>{item.price}</span><span className='text-info'>{item.discount} LE;</span>
                  </div>
              </div>
              </Link>
            </SwiperSlide>
          )
        })
      }
    </Swiper>
  )
}
