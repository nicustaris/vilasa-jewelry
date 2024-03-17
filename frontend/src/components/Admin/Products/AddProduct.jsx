import React, { useState, useEffect } from "react";
import axios from "axios";

import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";
import Input from "./../Input/Input";

import apiClient from "../../../utils/api-client.js";
import { useCookies } from "react-cookie";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    discount: 60,
    name: "oxidise jewelry test jjjj",
    description: "this is a test oxidise jewelry test Description",
    highlights: ["jewelry"],
    specifications: [
      {
        title: "1234864",
        description: "WJDHCF",
      },
      {
        title: "1234655",
        description: "654445",
      },
    ],
    price: 300,
    cuttedPrice: 1350,
    images: ["C:\\Users\\nicol\\OneDrive\\Desktop\\personas1.png"],
    category: "65e8d28ac52885f6c1324fbb",
    stock: 6,
    warranty: 0,
    ratings: 0,
    numOfReviews: 0,
  });

  const [cookiesToken] = useCookies(["token"]);

  // Access specific cookie value
  const token = cookiesToken.token;
  console.log("PRODUCT PAGE TOKEN", token);

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Retrieve token from cookies
      const tokenCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));
      const token = tokenCookie ? tokenCookie.split("=")[1] : null;

      // Check if token is available
      if (!token) {
        console.error("Token not found. Please log in.");
        return;
      }

      // Make POST request with product data
      const response = await axios
        .post(
          "http://localhost:5000/api/vilasa-v1/vproduct/products",
          productData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              // "Access-Control-Allow-Origin": "*",
            }, // Send cookies with the request
          }
        )
        .then((response) => {
          // Handle response
          console.log(response);
        })
        .catch((error) => {
          // Handle errors
        });

      // await apiClient.post("/vilasa-v1/vproduct/products", productData);
    } catch (error) {
      console.error("Error2:", error);
    }
  };

  return (
    <div className="w-full h-full p-10 bg-gray-100">
      <h1 className="text-2xl font-bold">Dashboard / Add new product</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 mt-10">
          <div className="col-span-3 w-auto px-3">
            <div className="">
              <h3 className="font-medium">Jewelry Title</h3>
              <Input>Jewelry Title</Input>
            </div>
            <div className="mt-5">
              <h3 className="font-medium">Description</h3>
              <textarea
                rows={4}
                className="w-full rounded-md p-3 text-sm mt-2"
                placeholder="Description"
              ></textarea>
            </div>
            <div className="flex mt-5">
              <div className="w-[33.3%]">
                <h3 className="font-medium">Category</h3>
                <select className="p-3 rounded-md mt-2 text-sm text-gray-400">
                  <option value="">Select category</option>
                  <option value="cat1">Category 1</option>
                  <option value="cat2">Category 2</option>
                </select>
              </div>
              <div className="w-[33.3%]">
                <h3 className="font-medium">Brand</h3>
                <select className="p-3 rounded-md mt-2 text-sm text-gray-400">
                  <option value="">Select brand</option>
                  <option value="cat1">Brand 1</option>
                  <option value="cat2">Brand 2</option>
                </select>
              </div>
              <div className="w-[33.3%]">
                <h3 className="font-medium">Stock</h3>
                <Input>Stock</Input>
              </div>
            </div>
            <div className="mt-5">
              <button className="bg-gray-500 p-3 rounded-md text-white font-medium">
                Confirm
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 hover:bg-gray-200 border-dashed rounded-lg cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <MdOutlineCloudUpload size={45} />
                <p className="mb-2 text-sm">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs">SVG, PNG, JPG or JPEG.</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
