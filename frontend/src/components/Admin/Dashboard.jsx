import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";

import AddProduct from "./Products/AddProduct";
import Enquiries from "./Enquiries/Enquiries";
import EnquiryDetails from "./Enquiries/EnquiryDetails";

const Dashboard = () => {
  return (
    <div className="flex w-full h-full">
      <div className="w-[20%] min-w-[200px] flex flex-col text-white bg-slate-700">
        <h1 className="text-xl font-bold m-5 mx-auto">VJ Panel</h1>
        <Sidebar />
      </div>
      <div className="w-[80%]">
        <Routes>
          <Route path="/products/add-product" element={<AddProduct />} />
          <Route path="/enquiries" element={<Enquiries />} />
          <Route path="/enquiries/:id" element={<EnquiryDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
