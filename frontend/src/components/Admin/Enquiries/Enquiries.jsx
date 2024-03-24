import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiries } from "../../../store/enquiries/enquiriesSlice";
import { Link } from "react-router-dom";

const Enquiries = () => {
  const dispatch = useDispatch();

  const { enquiries, isLoading, isError, message } = useSelector(
    (state) => state.enquiries
  );

  useEffect(() => {
    dispatch(getEnquiries());
  }, []);

  return (
    <div className="h-screen">
      {enquiries &&
        enquiries?.map((enquire, _id) => (
          <Link key={enquire._id} to={`/admin/enquiries/${enquire._id}`}>
            <div className="border-b p-5">
              <h1>{enquire.subject}</h1>
              <span>{enquire.message}</span>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Enquiries;
