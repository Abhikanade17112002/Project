import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/store/userSlice/userSlice";
import daysAgo from "@/utils/daysAgo";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
const JobDetails = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasApllicantApplied, setHasApplicantApplied] = useState(null);
  const userInfo = useSelector(getUserInfo);
  const applied = true;
  const fetchSingleJobById = async (jobId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/job/get/${jobId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setJob(response.data.job);
      return response.data.job;
    } catch (error) {
      console.log("Error While Fetching A Single Job By Id ", error);
    } finally {
     setLoading(false); 
    }
  };
  const { id: jobId } = useParams();
  const findApplication = (appicantId, applications = []) => {



    if (applications.length === 0) {
      return false;
    } else {
      const response = applications.find((applicant) => {
        if (applicant.applicant === appicantId) {
          return true;
        } else {
          return false;
        }
      });
      return response;
    }
  };

  const handleApplyToJob = async (userId , jobId ) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/application/apply/${jobId}`
        , {
              
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              },
              }
      )




      if( response.data.status )
      {  

   

       fetchSingleJobById(job?._id).then((response)=>{
        if (userInfo) {
          setHasApplicantApplied(
            findApplication(userInfo?._id, response.applications)
          )
        }
       }) ;

        


      }
      else{
        alert("Application Failed");
      }
    } catch (error) {
      console.log("Error While Applying To Job ", error);
    }
  };
  useEffect(() => {
    fetchSingleJobById(jobId).then((response) => {

      console.log(userInfo, response);

      if (userInfo) {
        setHasApplicantApplied(
          findApplication(userInfo?._id, response.applications)
        );
      }
    });
  }, [jobId]);

  return loading ? (
    <Loader/>
  ) : (
    <div className="h-[100vh] overflow-y-auto max-w-7xl mx-auto py-2 my-4 px-4 ">
      <div className="flex justify-between px-2 gap-2 my-4">
        <div className=" gap-2">
          <h1 className="text-sm font-bold md:text-3xl">{job?.title} </h1>
          <div className="text-[10px] font-bold underline text-muted-foreground ">
            created {daysAgo(job?.createdAt)}
          </div>
          <div className="flex items-center gap-2 mt-4 ">
            <Badge className={"text-blue-700 font-bold text-[8px]"} variant="ghost">
              {job?.position} Positions
            </Badge>
            <Badge className={"text-[#F83002] font-bold text-[8px]"} variant="ghost">
              {job?.jobType}
            </Badge>
            <Badge className={"text-[#7209b7] font-bold text-[8px]"} variant="ghost">
              {job?.salary} LPA
            </Badge>
          </div>
        </div>
        <div className=" flex justify-center items-center">
          <Button
            onClick={() => {
              handleApplyToJob(userInfo?._id,  job?._id);
            }}
            disabled={hasApllicantApplied}
            className={`md:text-sm text-[8px] ${
              applied ? "bg-green-600 cursor-not-allowed" : "bg-black"
            } disable`}
          >
            {hasApllicantApplied ? "Applied 😀" : "Apply Now 🙂"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col text-[10px] md:text-sm">
        <h1 className="font-bold underline">Job Details</h1>
        <div className="my-4">
          <h1 className="font-bold my-1">
            Role:{" "}
            <span className="pl-4 font-normal text-gray-800">{job?.title}</span>
          </h1>
          <h1 className="font-bold my-1">
            Location:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {job?.location}{" "}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Description:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {job?.description}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {job?.experienceLevel} Years
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {job?.salary}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {job?.applications?.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {job?.createdAt?.split("T")[0]}{" "}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
