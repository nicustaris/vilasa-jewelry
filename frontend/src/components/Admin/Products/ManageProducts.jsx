import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  deleteProduct,
  getProducts,
} from "../../../store/product/productSlice";

const ManageProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  console.log(products);
  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-2xl font-medium">Manage Products</h1>
      <div className="flex items-start space-x-2 m-2">
        {isLoading ? (
          <em>Loading...</em>
        ) : (
          products?.map((product) => (
            <div
              key={product?._id}
              className="flex flex-col border border-gray-200 p-2"
            >
              <p>Name {product?.name}</p>
              <p>Stock {product?.stock}</p>
              <p>
                Created at {new Date(product?.createdAt).toLocaleDateString()}
              </p>
              <div className="space-x-2">
                <Link to="/">
                  <button className="bg-blue-500 p-1 rounded-sm text-white">
                    Update
                  </button>
                </Link>
                <button
                  className="bg-red-500 p-1 rounded-sm text-white"
                  onClick={() => dispatch(deleteProduct(product._id))}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
