import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../../store/categories/categoriesSlice";

const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [updatingCategory, setUpdatingCategory] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const { categories, isLoading, message } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    dispatch(createCategory(categoryName));
  };

  const handleCategoryUpdate = (category, title) => {
    setUpdatingCategory(category);
    setUpdatedTitle(title);
  };

  const handleCategorySubmit = () => {
    if (!updatedTitle.trim()) return;
    setUpdatingCategory(null);

    dispatch(
      updateCategory({
        newCategory: updatedTitle,
        categoryId: updatingCategory,
      })
    );
  };
  return (
    <>
      <div className="flex flex-col items-start border border-gray-300 p-3">
        <h2>Add Categories</h2>
        <form className="flex flex-col space-y-2" onSubmit={handleAddCategory}>
          {message && <em>{message}</em>}
          <p>Title</p>
          <input
            type="text"
            value={categoryName}
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
          <div className="p-2">
            {categories?.map((category) => (
              <div
                key={category._id}
                className="flex justify-between border border-gray-200 m-2 p-2"
              >
                {updatingCategory === category._id ? (
                  <>
                    <input
                      type="text"
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                      className="border border-red-400 rounded-sm"
                    />
                    <div className="space-x-2">
                      <button
                        onClick={() => handleCategorySubmit(category._id)}
                      >
                        Confirm
                      </button>
                      <button>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    {category.title}
                    <div className="space-x-2">
                      <button
                        onClick={() =>
                          handleCategoryUpdate(category._id, category.title)
                        }
                      >
                        Update
                      </button>
                      <button
                        onClick={() => dispatch(deleteCategory(category._id))}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Category;
