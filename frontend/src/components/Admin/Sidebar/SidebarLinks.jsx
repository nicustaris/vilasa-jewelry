import React, { useState } from "react";
import { Link } from "react-router-dom";

import { RiArrowUpSLine } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";

const SidebarLinks = ({ item }) => {
  const { icon, label, ref, isExtended, extended } = item;
  const [isSubCategoryExpanded, setIsSubCategoryExpanded] = useState(false);

  return (
    <>
      <div className="flex items-center w-auto cursor-pointer transition duration-300 ease-in-out hover:bg-gray-800 pr-3">
        <div className="flex w-full items-center space-x-4 p-3">
          <span>{icon}</span>
          {!isExtended ? (
            <Link to={ref}>
              <span>{label}</span>
            </Link>
          ) : (
            <span>{label}</span>
          )}
        </div>

        {isExtended ? (
          !isSubCategoryExpanded ? (
            <RiArrowDownSLine
              onClick={() => setIsSubCategoryExpanded(!isSubCategoryExpanded)}
              size={20}
            />
          ) : (
            <RiArrowUpSLine
              onClick={() => setIsSubCategoryExpanded(!isSubCategoryExpanded)}
              size={20}
            />
          )
        ) : null}
      </div>

      <div
        className={`overflow-hidden transition-max-height duration-500 ${
          isSubCategoryExpanded ? "max-h-full" : "max-h-0"
        }`}
      >
        {isSubCategoryExpanded && (
          <div className="flex flex-col">
            {extended?.map((subcategory, index) => (
              <span className="ml-12" key={index}>
                <Link
                  to={subcategory.ref}
                  className="flex py-2 px-2 transition duration-300 ease-in-out hover:bg-gray-800"
                >
                  {subcategory.name}
                </Link>
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SidebarLinks;
