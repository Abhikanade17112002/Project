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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ApplicantsTable = ({ searchParam }) => {
  const [applicants, setApplicants] = useState([]);
  const { jobId } = useParams();
  const [position, setPosition] = React.useState("bottom");

  const handleJobApplicants = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/application/job/${jobId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.status) {
        setApplicants(response.data.job.applications);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Something went wrong in fetching all user jobs", error);
    }
  };
  const handleUpdateAplicationsStatus = async (status, applicationId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/application/status/${applicationId}/update`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.status) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(
        "Something Went Wong While Updating Application Status",
        error
      );
    }
  };

  useEffect(() => {
    handleJobApplicants();
  }, []);

  return (
    <div className=" mx-auto ">
      <Table className="text-[10px] sm:text-sm">
        <TableCaption>
          A list of your recent posted Jobs Applications
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Profile</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Skills</TableHead>
            <TableHead className="text-center">Bio</TableHead>
            <TableHead className="text-center">Resume</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        {/*  */}
        <TableBody>
          {applicants
            ?.filter((application) =>
              application?.applicant?.firstName
                ?.toLowerCase()
                ?.includes(searchParam?.toLowerCase())
            )
            .map((application) => (
              <tr className="  items-center">
                <TableCell className="  flex justify-center">
                  <Avatar className="">
                    <AvatarImage
                      src={application?.applicant?.profile?.profilePhoto}
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="text-center ">
                  {application?.applicant?.firstName}
                </TableCell>
                <TableCell className="text-center ">
                  {application?.applicant?.profile?.skills}
                </TableCell>
                <TableCell className="text-center">
                  {application?.applicant?.profile?.bio}
                </TableCell>
                <TableCell className="text-center">
                  <a
                    href={application?.applicant?.profile?.resume}
                    className="text-blue-700 font-bold cursor-pointer"
                    target="_blank"
                    rel="noopener
                    noreferrer"
                  >
                    Link
                  </a>
                </TableCell>
                <TableCell className="text-center ">
                  {application?.applicant?.email}
                </TableCell>
                <TableCell className="text-center cursor-pointer flex-1 justify-center items-center h-full">
                  <DropdownMenu className="p-0 m-0 h-full">
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-[10px] sm:text-sm"
                      >
                        Status
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-30">
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={position}
                        onValueChange={setPosition}
                      >
                        <DropdownMenuRadioItem
                          className="text-[10px] sm:text-sm"
                          value="reject"
                          onClick={() =>
                            handleUpdateAplicationsStatus(
                              "rejected",
                              application._id
                            )
                          }
                        >
                          Reject
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          className="text-[10px] sm:text-sm"
                          value="pending"
                          onClick={() =>
                            handleUpdateAplicationsStatus(
                              "pending",
                              application._id
                            )
                          }
                        >
                          Pending
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          className="text-[10px] sm:text-sm"
                          value="accept"
                          onClick={() =>
                            handleUpdateAplicationsStatus(
                              "accepted",
                              application._id
                            )
                          }
                        >
                          Accept
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
