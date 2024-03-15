import React from "react";

import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";
import Input from "./../Input/Input";

const AddProduct = () => {
  return (
    <div className="w-full h-full p-10 bg-gray-100">
      <h1 className="text-2xl font-bold">Dashboard / Add new product</h1>
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
    </div>
  );
};

export default AddProduct;
