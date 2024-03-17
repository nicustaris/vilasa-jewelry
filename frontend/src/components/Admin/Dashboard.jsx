import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./Products/AddProduct";

const Dashboard = () => {
  return (
    <div className="flex w-full h-screen">
      <div className="w-[20%] min-w-[200px] flex flex-col bg-slate-700 text-white">
        <h1 className="text-xl font-bold m-5 mx-auto">VJ Panel</h1>
        <Sidebar />
      </div>
      <div className="w-[80%]">
        <Routes>
          <Route path="/products/add-product" element={<AddProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
