import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from "@mantine/core";

function Products() {
  const [products, setProducts] = useState([]);
  const [rating, setRating] = useState(0);
  const [opened, setOpened] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [selectedProduct, setSelectedProduct] = useState();

  const handleStarClick = (selectedRating, selectedProd) => {
    setRating(selectedRating);
    setSelectedProduct(selectedProd)
    setOpened(true);
  };

  const submitRating = async () =>{
    try {
        await axios.post("http://localhost:3000/reviews", {
          name: name,
          email: email,
          product_name: selectedProduct,
          rating: rating
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    console.log(products);
  }, []);

  return (
    <div className="bg-cover bg-center h-screen bg-[url('Assets/images/Rectangle.png')] flex flex-col items-center justify-center p-4 md:p-8">
      <div className="text-white text-center mb-8">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 text-black mt-10">
          VIEW OUR PRODUCTS
        </h1>
        <p className="text-sm md:text-lg text-black">
          Lorem Ipsum has been the industry's standard the dummy text ever Lorem
          Ipsum has been the industry's standard. dummy text ever.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {products &&
          products.map((product) => (
            <div
              key={product.id}
              className={`mx-2 md:mx-4 bg-orange-200 rounded-lg p-4 md:p-6 w-full md:w-80 flex-shrink-0 ${
                product.id % 2 == 1 && "border-2 border-dashed border-red-900"
              }`}
            >
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">
                {product.name}
              </h2>
              <p className="text-sm md:text-base text-gray-700 mb-4">
                {product.details}
              </p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6 ml-2 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 8a1 1 0 011 1v8a1 1 0 01-1 1H6a1 1 0 01-1-1v-8a1 1 0 011-1h12zm-1 8V9H7v7h10z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M2 5a2 2 0 012-2h3.586a1 1 0 01.707.293l8 8a1 1 0 01.293.707V15a2 2 0 01-2 2H4a2 2 0 01-2-2V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base md:text-lg font-semibold">
                    ${product.price}
                  </span>
                </div>
                <div className="flex">
                  <div>
                    <div>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => handleStarClick(star, product.name)}
                          style={{
                            cursor: "pointer",
                            color: star <= rating && selectedProduct==product.name ? "gold" : "gray",
                          }}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <button className={`${product.id%2==1?'bg-red-600  text-white':'text-red-600  bg-white border border-red-600 '} text-center px-3 md:px-4 py-2 md:py-3 `}>
                Show Details
              </button>
            </div>
          ))}
      </div>
      <Modal
        opened={opened}
        onClose={() => {
          setRating(0);
          setOpened(false);
        }}
        title={`Rate the product ${selectedProduct}`}
        centered
      >
        
       {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => setRating(star)}
                          style={{
                            cursor: "pointer",
                            color: star <= rating ? "gold" : "gray",
                          }}
                        >
                          &#9733;
                        </span>
                      ))}
        <Input type="text" placeholder="Your Name" onChange={(e)=>setName(e.target.value)}/>
        <Input type="Email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className="mt-4"/>
        <Button onClick={submitRating} className="bg-red-800 mt-4">Submit</Button>
      </Modal>
    </div>
  );
}

export default Products;
