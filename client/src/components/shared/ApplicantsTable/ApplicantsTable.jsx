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
import { useContext } from "react";
import { socketcontext } from "@/context/socketConext";
import { getUserInfo } from "@/store/userSlice/userSlice";
import { useSelector } from "react-redux";

const ApplicantsTable = ({ searchParam }) => {
  const [applicants, setApplicants] = useState([]);
  const { jobId } = useParams();
  const [position, setPosition] = React.useState("bottom");
  const {socket} = useContext(socketcontext);
  const userInfo = useSelector(getUserInfo);
  const [ description , setDescription ] = useState(null) ;
  const [scoredApplicants , setScoredApplicants ] = useState([]);
  const [updatedScoredApplicants , setUpdatedScoredApplicants ] = useState([]);
// console.log(applicants[0].applicant.profile.resume,"Applicants");


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
       
        setDescription(response.data.job.description);
        console.log(response.data.job.description);
        
        setApplicants(response.data.job.applications);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Something went wrong in fetching all user jobs", error);
    }
  };
  const handleUpdateAplicationsStatus = async (status, applicationId,applicantId) => {
    try {

      if(socket){
         socket.emit("update-appilcation-status",{"socketId":socket?.id, status,applicantId,applicationId});
      }
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
  

  console.log("Updated Scored",updatedScoredApplicants);
  
 useEffect(()=>{

  console.log(applicants,scoredApplicants);
  
  const updatedApplications = applicants.map(application => {
    const scoreObj = scoredApplicants.find(scoreApp => scoreApp.user_id === application.applicant._id);
    console.log(scoreObj);
    
    return { ...application, score: scoreObj ? scoreObj.score : null };
});


// console.log("UPDATED",updatedApplications);

  setUpdatedScoredApplicants(updatedApplications);
  
  
 } , [scoredApplicants.length])
  


  useEffect(() => {
    handleJobApplicants();
  }, []);

  useEffect(()=>{
    if( description != null){
      getResumeScore();
    }
    
  },[description])


  const getResumeScore = async () =>{
    try {

        
      const filtertedData = applicants.map((application)=>{
          return {
            "user_id":application?.applicant?._id ,
            "url":application?.applicant?.profile?.resume

          }
      })

      
      
      const response = await axios.post("http://localhost:3000/api/features/test2",{"job_description":description ,
        "resumes":filtertedData
      },{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })


      // console.log("THIS RESPONSE ",response.data.data.results);
      setScoredApplicants(response.data.data.results);
      
    } catch (error) {
      console.log("Some Thing Went Wong In The Gettint Reume Score Analysis",error);
      
      
    }
  }
// console.log(applicants,"appications");



const help = (  array ) =>{
  const sortedArray = array.sort((a, b) => {
    // Handle cases where score is null
    if (a.score === null) return 1;
    if (b.score === null) return -1;
    return b.score - a.score;
  });
  return (sortedArray
    ?.filter((application) =>
      application?.applicant?.firstName
        ?.toLowerCase()
        ?.includes(searchParam?.toLowerCase())
    )
    .map((application, index) => (
    
      <tr className="  items-center" key={index}>
  
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
        <TableCell>
          {application?.score}
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
                      application._id,
                      application?.applicant?._id
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
                      application._id,
                      application?.applicant?._id
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
                      application._id,
                      application?.applicant?._id
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
    )))
}

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
            {
              updatedScoredApplicants.length > 0  && updatedScoredApplicants[0]?.score &&<TableHead className="text-center">score</TableHead>
            }
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        {/*  */}
        <TableBody>
          {/* {   applicants
            ?.filter((application) =>
              application?.applicant?.firstName
                ?.toLowerCase()
                ?.includes(searchParam?.toLowerCase())
            )
            .map((application, index) => (
            
              <tr className="  items-center" key={index}>
                {console.log(application,"&&&&&")
                }
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
                <TableCell>
                  {application.score}
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
                              application._id,
                              application?.applicant?._id
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
                              application._id,
                              application?.applicant?._id
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
                              application._id,
                              application?.applicant?._id
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
            ))} */
            
             updatedScoredApplicants.length > 0 ?  help(updatedScoredApplicants)  :  help(applicants)
            
            }
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
