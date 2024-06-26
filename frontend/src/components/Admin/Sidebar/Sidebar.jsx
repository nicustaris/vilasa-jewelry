import React, { useState } from "react";

import SidebarLinks from "./SidebarLinks";

import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";
import { BsQuestionSquare } from "react-icons/bs";
import { MdWeb } from "react-icons/md";

import { MdOutlineCategory } from "react-icons/md";
import { MdBorderStyle } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";

const Sidebar = () => {
  const navItems = [
    {
      icon: <MdOutlineDashboardCustomize size={20} />,
      label: "Dashboard",
      ref: "/admin",
      isExtended: null,
    },
    {
      icon: <MdOutlineArticle size={20} />,
      label: "Products",
      isExtended: true,
      extended: [
        {
          name: "Add new product",
          ref: "/admin/products/add-product",
        },
        {
          name: "Manage Products",
          ref: "/admin/products/manage-products",
        },
      ],
    },
    {
      icon: <MdOutlineArticle size={20} />,
      label: "Category and Brand",
      ref: "/admin/products/category-and-brand",
      isExtended: null,
    },
    {
      icon: <BsQuestionSquare size={20} />,
      label: "Enquiries",
      ref: "/admin/enquiries",
      isExtended: null,
    },
    {
      icon: <MdWeb size={20} />,
      label: "Web Elements",
      ref: "/admin/web-elements",
      isExtended: null,
    },
    // {
    //   icon: <MdOutlineCategory size={20} />,
    //   label: "Categories",
    //   ref: "/admin/categories",
    //   isExtended: true,
    //   extended: [
    //     "Add new category",
    //     "Update existing category",
    //     "Delete existing category",
    //   ],
    // },
    // {
    //   icon: <MdBorderStyle size={20} />,
    //   label: "Orders",
    //   ref: "/admin/categories",
    //   isExtended: true,
    //   extended: [
    //     "Add new order",
    //     "Update existing order",
    //     "Delete existing order",
    //   ],
    // },
    // {
    //   icon: <CiDiscount1 size={20} />,
    //   label: "Coupons",
    //   ref: "/admin/categories",
    //   isExtended: true,
    //   extended: [
    //     "Add new copuon",
    //     "Update existing copuon",
    //     "Delete existing order",
    //   ],
    // },
  ];
  return (
    <div className="flex flex-col m-8">
      {navItems.map((item, index) => {
        return <SidebarLinks key={index} item={item} />;
      })}
    </div>
  );
};

export default Sidebar;
