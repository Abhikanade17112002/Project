import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  getAdminCreatedCompaniesAction,
  getAllCompanies,
} from "@/store/companySlice/companySlice";
import { toast, Toaster } from "sonner";
import { Delete, Edit2, MoreHorizontal, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";



// filter((company) =>
//     company.companyName
//       .toLowerCase()
//       .includes(searchParam?.toLowerCase())
//   )


const AdminJobsTable = ({ setSearchParam, searchParam }) => {
  const [adminJobs, setAdminJobs] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(searchParam,"Sp");

  const handleGetAdminCreatedJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/job/admin", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

 

      if( response.data.status)
      {
          setAdminJobs(response.data.jobs) ;
      }
      else
      {
          toast.error(response.data.message) ;
      }
    } catch (error) {
      console.log("====================================");
      console.log("Something went wrong in fetching all user jobs", error);
      console.log("====================================");
    }
  };

  useEffect(() => {handleGetAdminCreatedJobs()}, []);


  console.log('====================================');
  console.log("RESPONSE FROM GET ALL JOBYS BY USER",adminJobs);
  console.log('====================================');

  return (
    <div className=" mx-auto ">
      <Table variant="outline" className=" table ">
        <TableCaption>A list of your recent posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Company</TableHead>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Description</TableHead>
            <TableHead className="text-center">Job Type</TableHead>
            <TableHead className="text-center">Positions</TableHead>
            <TableHead className="text-center">location</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminJobs
            .filter((job)=>job.title.toLowerCase().includes(searchParam.toLowerCase())).map((job) => (
              <tr className=" ">
                <TableCell className=" flex justify-center items-center ">
                  <Avatar className="">
                    <AvatarImage src={job?.company?.companyLogo} />
                  </Avatar>
                </TableCell>
                <TableCell className="text-center ">
                  {job?.title}
                </TableCell>
                <TableCell className="text-left  ">
                 
                    {job.description}
                  
                </TableCell>
                <TableCell className="text-center">
                  {job.jobType}
                </TableCell>
                <TableCell className="text-center">
                  {job.position}
                </TableCell>
                <TableCell className="text-center">
                  {job.location}
                </TableCell>
                <TableCell className="text-right cursor-pointer flex justify-center">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-15 h-15">
                      <div
                        onClick={() =>
                          navigate(`/admin/company/${company._id}`)
                        }
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span className="text-sm">Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
