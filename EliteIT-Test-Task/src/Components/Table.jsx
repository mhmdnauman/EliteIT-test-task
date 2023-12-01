import axios from "axios";
import React, { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 10;

function Table() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/reviews/all');
        setData(response.data.reviews);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    console.log(data);
  }, []);

  const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisibleButtons = 3;

    for (let i = 1; i <= totalPages; i++) {
      if (totalPages > maxVisibleButtons) {
        if (
          i === currentPage ||
          i === 1 ||
          i === totalPages ||
          (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === i
                  ? "bg-red-800 text-white"
                  : "bg-white border-solid text-black"
              }`}
            >
              {i}
            </button>
          );
        } else if (
          (i === currentPage - 2 && currentPage !== 4) ||
          (i === currentPage + 2 && currentPage !== totalPages - 3)
        ) {
          pageNumbers.push(
            <span key={i} className="px-3 py-1 mx-1">
              ...
            </span>
          );
        }
      } else {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === i
                ? "bg-red-800 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {i}
          </button>
        );
      }
    }

    return pageNumbers;
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="container mx-auto bg-white relative p-10 z-0 -mt-10 ml-10 mr-10">
      <h1 className="mt-4 mb-4 text-4xl sm:text-6xl lg:text-4xl tracking-tight leading-tight">
        LIST OF PRODUCTS
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full sm:w-full md:w-auto border-none">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Product Name</th>
              <th className="px-6 py-3 text-left">Rating (In stars)</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="border-none border-gray-200">
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.product_name}</td>
                <td className="px-6 py-4">{`⭐`.repeat(item.rating)}</td>
                <td className="px-6 py-4">
                  <button className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    View Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 ">
        <div className="flex justify-center sm:justify-start">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "opacity-60 bg-gray-100 cursor-not-allowed"
                : "bg-gray-100 hover:bg-red-800 text-black"
            }`}
          >
            Prev
          </button>
          {renderPageNumbers()}
          <button
            onClick={nextPage}
            disabled={indexOfLastItem >= data?.length}
            className={`px-4 py-2 rounded ${
              indexOfLastItem >= data?.length
                ? "opacity-60 bg-gray-300 cursor-not-allowed"
                : "bg-gray-100 hover:bg-red-800 text-black"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table;
