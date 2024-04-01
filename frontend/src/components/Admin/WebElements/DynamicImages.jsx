import React, { useState } from "react";
import {
  deleteDynamicImages,
  updateDynamicImages,
} from "../../../store/webelements/webElementsSlice";

const DynamicImages = ({ item, dispatch }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [updateUrl, setUpdateUrl] = useState(item.url);

  const handleUpdate = () => {
    setIsEditable(false);
    dispatch(
      updateDynamicImages({ id: item._id, updatedData: { url: updateUrl } })
    );
  };

  return (
    <div key={item._id} className="flex justify-between">
      <img className="w-10 h-auto mr-2" src={item?.imageUrl} />
      <input
        className={`w-full ${
          isEditable ? "border border-green-500 rounded-sm" : ""
        }`}
        type="text"
        value={updateUrl}
        onChange={(e) => setUpdateUrl(e.target.value)}
      />
      <div className="flex">
        {!isEditable ? (
          <button onClick={() => setIsEditable(true)}>Update&nbsp;</button>
        ) : (
          <button onClick={() => handleUpdate()}>Confirm&nbsp;</button>
        )}
        <button onClick={() => dispatch(deleteDynamicImages(item._id))}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DynamicImages;
