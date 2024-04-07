import React, { useState } from "react";
import { deleteBrand, updateBrand } from "../../../store/brands/brandsSlice";
import { useDispatch } from "react-redux";

const BrandItem = ({ brand }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updatedItem, setUpdatedItem] = useState({});
  const dispatch = useDispatch();

  const handleItemUpdate = (e) => {
    const { name, value } = e.target;
    setUpdatedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleBrandUpdate = (brand) => {
    setIsUpdate(true);
    setUpdatedItem(brand);
  };

  const brandSubmit = () => {
    dispatch(updateBrand({ id: 112, updatedItem }));
    setIsUpdate(false);
  };

  const handleDeleteBrand = (brandId) => {
    if (!brandId) return;
    dispatch(deleteBrand(brandId));
  };

  return (
    <div className="border border-gray-200 w-full p-2">
      {isUpdate ? (
        <>
          <input
            type="text"
            value={updatedItem.title || brand.title}
            name="title"
            onChange={(e) => handleItemUpdate(e)}
            className="border border-gray-200"
          />
          <input
            type="text"
            value={updatedItem.description || brand.description}
            name="description"
            onChange={(e) => handleItemUpdate(e)}
            className="border border-gray-200"
          />
          <input
            type="text"
            value={updatedItem.picture || brand.picture}
            name="picture"
            onChange={(e) => handleItemUpdate(e)}
            className="border border-gray-200"
          />
          <div className="space-x-2">
            <button
              onClick={() => brandSubmit()}
              className="p-2 bg-blue-500 rounded-sm text-white"
            >
              Confirm
            </button>
            <button
              onClick={() => handleDeleteBrand(brand._id)}
              className="p-2 bg-red-500 rounded-sm text-white"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p>{brand.title}</p>
          <p>{brand.description}</p>
          <p>{brand.picture}</p>
          <div className="space-x-2">
            <button
              onClick={() =>
                handleBrandUpdate({
                  title: brand.title,
                  description: brand.description,
                  picture: brand.picture,
                })
              }
              className="p-2 bg-blue-500 rounded-sm text-white"
            >
              Update
            </button>
            <button
              onClick={() => handleDeleteBrand(brand._id)}
              className="p-2 bg-red-500 rounded-sm text-white"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BrandItem;
