import React, { useState } from "react";
import { Contact, Mail, Pen } from "lucide-react";
import { useSelector } from "react-redux";
// import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { getUserInfo } from "@/store/userSlice/userSlice";
import UserAppliedTable from "../UserAppliedTable/UserAppliedTable";
import UpdateProfile from "../UpdateProfile/UpdateProfile";

const isResume = true;
const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector(getUserInfo);
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);

  return (
    <div className="h-[100vh] overflow-y-auto text-[8px] sm:text-sm">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto ||
                  "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                }
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className=" sm:text-xl  text-[12px] font-bold ">
                {user?.firstName} {user?.lastName}
              </h1>
              <p>{user?.profile?.bio  || "bio" } </p>
            </div>
          </div>
          <Button
            onClick={() => {
              setOpen(true);
              setOpenUpdateProfile(true);
            }}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5 flex gap-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email || "useremail@gmail.com"}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber || "+91 0000000000"}</span>
          </div>
        </div>
        <div className="my-5 sm:max-w-[50%] ">
          <h1>Skills</h1>
          <div className="flex items-center gap-1 flex-wrap  t ">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index} className="text-[8px] sm:text-sm">{item}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName ||
                "Resume "}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl">
          <h1 className="font-bold text-lg my-5">Applied Jobs</h1>

          <UserAppliedTable />
        </div>
      </div>
      <UpdateProfile
        openUpdateProfile={openUpdateProfile}
        setOpenUpdateProfile={setOpenUpdateProfile}
      />
    </div>
  );
};



export default UserProfile;
