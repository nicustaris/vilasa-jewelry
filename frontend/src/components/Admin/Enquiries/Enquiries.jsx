import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiries } from "../../../store/enquiries/enquiriesSlice";

const Enquiries = () => {
  const dispatch = useDispatch();

  const { enquiries, isLoading, isError, message } = useSelector(
    (state) => state.enquiries
  );

  console.log(enquiries);

  useEffect(() => {
    dispatch(getEnquiries());
  }, []);

  return <div className="h-screen"></div>;
};

export default Enquiries;
