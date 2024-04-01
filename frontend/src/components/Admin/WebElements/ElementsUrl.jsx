import React, { useState } from "react";
import {
  deleteElementUrl,
  updateElementUrl,
} from "../../../store/webelements/webElementsSlice";

const ElementsUrl = ({ element, dispatch }) => {
  const [urlValue, setUrlValue] = useState(element.url);
  const [isEditable, setIsEditable] = useState(false);

  const handleUrlChange = () => {
    setIsEditable(false);
    dispatch(updateElementUrl({ elementId: element._id, newUrl: urlValue }));
  };

  return (
    <div>
      <input
        type="text"
        value={urlValue}
        onChange={(e) => setUrlValue(e.target.value)}
        // readOnly={isEditable ? true : false}
      />
      {isEditable ? (
        <button onClick={() => handleUrlChange()}>Confirm &nbsp;</button>
      ) : (
        <button onClick={() => setIsEditable(true)}>Update &nbsp;</button>
      )}
      <button onClick={() => dispatch(deleteElementUrl(element._id))}>
        Delete
      </button>
    </div>
  );
};

export default ElementsUrl;
