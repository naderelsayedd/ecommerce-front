import React, { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const hasToken = localStorage.getItem('token');
  const url = "http://127.0.0.1:8000/api/products";

  const getProducts = async () => {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const response = await res.json();
      console.log(response);
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      // You can add more error handling logic here, like displaying an error message to the user
    }
  };

  useEffect(() => {
    if (hasToken) {
      getProducts();
    }
  }, [hasToken]);

  console.log(hasToken ? "ok" : "no");

  return (
    <div className='text-center'>
      {hasToken ? (
        <div className='container'>
          <div className='row'>
            {products.map(product => (
              <div key={product.id}>
                <h5>{product.name}</h5>
                <p>{product.description}</p>
                {/* Add more fields as needed */}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h3 className='text-center text-danger'>Login to view content</h3>
      )}
    </div>
  );
}
