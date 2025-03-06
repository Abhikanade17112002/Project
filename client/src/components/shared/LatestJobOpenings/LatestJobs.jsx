import React from "react";
import LatestJobCards from "./LatestJobsCards";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "@/store/jobSlice/jobSlice";
import { getUserInfo } from "@/store/userSlice/userSlice";
import { Link } from "react-router-dom";
Link
const LatestJobs = () => {
  const allJobs = useSelector(getAllJobs);
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);
  console.log("USER INFO FROM HERE ", userInfo);

  return (
    <div className="max-w-7xl mx-auto my-20 px-6">
      <div className="md:text-4xl text-xl py-6 font-bold flex ">
        <div className="text-[#6A38C2] mx-2 py-3">Latest & Top </div>{" "}
        <div className="flex items-center">Job Openings</div>
        <div className="flex items-center">
        {userInfo && userInfo?.role === "student" ? (
          <div className="mx-4 flex items-center">
            <button className="bg-green-100 md:text-[8px] text-[7px]  text-xs  py-1  px-4 rounded-xl text-red-500">
              <Link to="/recommand">
              Recommend
              </Link>
             
            </button>
          </div>
        ) : null}
        </div>
        
      </div>

      <div className="grid md:grid-cols-3 gap-4 my-5 sm:grid-cols-2">
        {allJobs ? (
          allJobs
            ?.slice(0, 6)
            .map((job, index) => <LatestJobCards key={job?._id} job={job} />)
        ) : (
          <div>No Jobs Available </div>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
