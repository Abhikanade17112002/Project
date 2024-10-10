import { Avatar } from "@/components/ui/avatar";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Bookmark } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const JobsCard = ({job}) => {
  return (
    <Link to={`${job._id}`}>
    <div className="min-h-[300px]  w-full hover:shadow-gray-600 border border-gray-100 shadow-lg px-3 py-6 shadow-gray-400 rounded-lg  text-sm flex flex-col justify-evenly">
      <div className="flex justify-between">
        <h6>2 days ago ..</h6>
        <Button
          variant="outlined"
          className="border rounded-full p-0"
          size="icon"
        >
          <Bookmark />
        </Button>
      </div>
      <div className="flex ">
        <Button variant="outlined flex">
          <Avatar>
            <AvatarImage
              src="https://imgs.search.brave.com/GSzrTpE_O6AKEHbSx2ikXd1CnxDIUcCBBXkTKub7Pbo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzA4LzIzLzQx/LzM2MF9GXzEwODIz/NDE2N18xd08yMHRa/NXlVMWF1Y1BMZ3Vn/RG5qZ0w3aWJOY1hr/VS5qcGc"
              className="bg-white"
            />
          </Avatar>
        </Button>
        <div className=" font-bold">
          <h5 className="text-md">{job.company.name}</h5>
          <h6 className="text-[10px] text-gray-500">Country</h6>
        </div>
      </div>
      <div className="my-2 py-2 ">
        <h2 className="font-semibold">{job.title}</h2>
        <p className="text-muted-foreground">
         {job.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
         {job.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {job.salary} LPA
        </Badge>
      </div>

    </div></Link>
    
  );
};

export default JobsCard;
