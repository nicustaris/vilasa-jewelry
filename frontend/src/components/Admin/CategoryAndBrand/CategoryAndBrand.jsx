import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../../../store/categories/categoriesSlice";

const CategoryAndBrand = () => {
  const [categoryName, setCategoryName] = useState("");
  const [updateStates, setIsUpdateStates] = useState({});
  const { categories, isLoading, message } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleToggleUpdate = (categoryId) => {
    setIsUpdateStates((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  };

  console.log(updateStates);

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory(categoryName));
  };

  return (
    <div className="w-full h-screen p-3 grid grid-cols-2">
      <div className="p-2">
        <div className="flex flex-col items-start border border-gray-300 p-3">
          <h2>Add Categories</h2>
          <form
            className="flex flex-col space-y-2"
            onSubmit={handleCategorySubmit}
          >
            {message && <em>{message}</em>}
            <input
              type="text"
              className="border border-gray-400 rounded-sm"
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
            <button className="p-2 bg-blue-500 rounded-sm text-white">
              Add category
            </button>
          </form>
        </div>
        <div className="border border-gray-200 p-2 mt-2">
          {isLoading ? (
            <em>Loading...</em>
          ) : (
            categories?.map((category) => (
              <div
                key={category._id}
                className="flex justify-between border border-gray-200 p-2"
              >
                <p>{category.title}</p>
                <div className="space-x-2">
                  {updateStates[category._id] ? (
                    <button>Confirm</button>
                  ) : (
                    <button onClick={() => handleToggleUpdate(category._id)}>
                      Update
                    </button>
                  )}

                  <button
                    onClick={() => dispatch(deleteCategory(category._id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="p-2">2</div>
    </div>
  );
};

export default CategoryAndBrand;
