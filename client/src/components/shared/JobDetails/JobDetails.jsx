import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id: jobId } = useParams();
  const applied = true;
  const signleJob = {}
  
  return (
    <div className="h-[100vh] overflow-y-auto max-w-7xl mx-auto py-2 my-4">
      <div className="flex justify-between px-4 my-4">
        <div className="">
          <h1>Job Title</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {" "}
              {"position"}
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="ghost">
              {"type"}
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              {"salary"}LPA
            </Badge>
          </div>
        </div>
        <div className=" flex justify-center items-center">
          <Button  disabled={applied} className={`${ applied ? "bg-green-600 cursor-not-allowed" : "bg-black"} disable`} >{ applied ? "Applied 😀" : "Apply Now 🙂"}</Button>
        </div>
        
      </div>
      <div className="flex flex-col text-sm">
          <h1>Job Details</h1>
          <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{signleJob?.title || "Front End Developer"}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{signleJob?.location} || "Pune"</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{signleJob?.description}|| Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos adipisci quam est nemo officiis veniam quos eaque nam, qui doloremque ducimus quod explicabo. Facilis laudantium nemo quibusdam repudiandae corporis quis!</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{signleJob?.experience}|| 3 yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{signleJob?.salary}|| 12 LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{signleJob?.applications?.length}|| 5</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{signleJob?.createdAt?.split("T")[0]} || Ok</span></h1>
            </div>
        </div>
    </div>
  );
};

export default JobDetails;
