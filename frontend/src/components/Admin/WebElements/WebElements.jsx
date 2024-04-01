import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDynamicImages,
  createElementUrl,
  deleteElementUrl,
  getDynamicImages,
  getElementsUrl,
} from "../../../store/webelements/webElementsSlice";
import DynamicImages from "./DynamicImages";
import ElementsUrl from "./ElementsUrl";

const WebElements = () => {
  const [url, setUrl] = useState("");
  const [showUrls, setShowUrls] = useState(false);

  const [file, setFile] = useState(null);
  const [selectedUrl, setSelectedUrl] = useState();
  const [group, setGroup] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { elementsUrl, dynamicImages } = useSelector(
    (state) => state.webelements
  );

  useEffect(() => {
    // Dispatch
    dispatch(getElementsUrl());
    dispatch(getDynamicImages());
  }, [dispatch]);

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (url.trim() === "") {
      setError("URL cannot be empty");
    } else {
      // Dispatch
      dispatch(createElementUrl({ url }));
      setUrl("");
      setError("");
    }
  };

  const handleImage = (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setFile(reader.result);
    };

    reader.onerror = (error) => {
      console.log("File reading error:", error);
    };

    reader.readAsDataURL(image);
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    dispatch(createDynamicImages({ file, url: selectedUrl, group }));
  };

  return (
    <div className="flex flex-col w-full h-screen p-3">
      <div className="flex">
        <div className="w-[50%] border border-gray-300 p-3 mr-2">
          <form
            className="flex flex-col items-start"
            onSubmit={handleUrlSubmit}
          >
            {error && <p className="text-red-600">{error}</p>}
            <input
              type="text"
              name="url"
              className="border border-gray-300 rounded-md p-2"
              placeholder="URL"
              onChange={(e) => setUrl(e.target.value)}
            />
            <button className="bg-blue-500 rounded-md p-2 text-white mt-3">
              Add url
            </button>
          </form>
          <div>
            <button
              className="bg-yellow-500 rounded-md p-2 text-white mt-3"
              onClick={() => setShowUrls(!showUrls)}
            >
              View Url
            </button>
            {showUrls &&
              elementsUrl?.map((element) => (
                <ElementsUrl
                  key={element._id}
                  element={element}
                  dispatch={dispatch}
                />
              ))}
          </div>
        </div>
        <div className="w-[50%] flex flex-col items-start border p-5">
          <form onSubmit={handleImageSubmit}>
            <input
              type="file"
              name="file"
              onChange={(e) => handleImage(e)}
              encType="multipart/form-data"
            />
            <p>Group</p>
            <select
              className="border"
              name="group"
              onChange={(e) => setGroup(e.target.value)}
            >
              <option>Please select</option>
              <option>Carousel</option>
              <option>Gallery</option>
              <option>Header</option>
            </select>

            <select
              className="border border-gray-300 rounded-md p-2 w-full"
              name="elementUrl"
              onChange={(e) => setSelectedUrl(e.target.value)}
            >
              <option>Please select</option>
              {elementsUrl?.map((element, id) => (
                <option key={id} value={element.url}>
                  {element.url}
                </option>
              ))}
            </select>

            <button className="bg-blue-500 rounded-md p-2 text-white mt-3">
              Add image
            </button>
          </form>
        </div>
      </div>
      <div className="mt-10 flex border border-gray-300 p-3">
        <div className="flex flex-col w-full space-y-2">
          {dynamicImages?.map((item) => (
            <DynamicImages key={item._id} item={item} dispatch={dispatch} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebElements;
