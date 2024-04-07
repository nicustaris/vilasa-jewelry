import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrand, getBrands } from "../../../store/brands/brandsSlice";
import BrandItem from "./BrandItem";

const Brands = () => {
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const { brands, isLoading, message } = useSelector((state) => state.brands);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  console.log(brands);

  const handleImage = (e) => {};

  const handleAddBrand = (e) => {
    e.preventDefault();
    if (!brandName.trim()) return;
    dispatch(createBrand({ title: brandName, description, picture: image }));
  };

  return (
    <>
      <div className="flex flex-col items-start border border-gray-300 p-3">
        <h2>Add Brands</h2>
        <form className="flex flex-col space-y-2" onSubmit={handleAddBrand}>
          {message && message.type === "getError" && (
            <em>{message?.message}</em>
          )}
          <p>Title</p>
          <input
            type="text"
            value={brandName}
            className="border border-gray-400 rounded-sm"
            onChange={(e) => setBrandName(e.target.value)}
            required
          />
          <p>Description</p>
          <textarea
            type="text"
            value={description}
            className="border border-gray-400 rounded-sm"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {/* Further works need here as backend expect URL string 
         But not handles immage upload to cloudinary. */}
          <p>Img URL</p>
          <input
            type="text"
            onChange={(e) => setImage(e.target.value)}
            className="border border-gray-400 rounded-sm"
          />
          <button className="p-2 bg-blue-500 rounded-sm text-white">
            Add brand
          </button>
        </form>
      </div>
      <div className="flex flex-col w-full items-start border border-gray-300 p-3">
        {isLoading ? (
          <em>Loading...</em>
        ) : (
          <>
            {message && message?.type === "updateError" && (
              <em>{message?.message}</em>
            )}
            {brands?.map((brand) => (
              <BrandItem key={brand._id} brand={brand} dispatch={dispatch} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Brands;
