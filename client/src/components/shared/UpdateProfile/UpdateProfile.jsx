import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import CustomFileInput from "../CustomFileInput/CustomFileInput";
import CustomInput from "../CustomInput/CustomInput";
import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";
import { handleUserUpdateProfileAction } from "../../../store/userSlice/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const UpdateProfile = ({ openUpdateProfile, setOpenUpdateProfile }) => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      skills: "",
      profilePic: "",
      userResume: "",
      phoneNumber: "",
      bio: "",
    },
    mode: "all",
  });

  const handleUpdateProfile = async (data) => {
    const formdata = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "resume" || key === "profilePic") {
        formdata.append(key, data[key][0]);
      } else {
        formdata.append(key, data[key]);
      }
    });

    setSubmitting((prevState) => !prevState);
    try {
      const response = await dispatch(handleUserUpdateProfileAction(formdata));
      if (response.payload.status) {
        toast.success(response.payload.message);
        setSubmitting((prevState) => !prevState);
        setOpenUpdateProfile((prevState) => !prevState);
      } else {
        toast.error(response.payload.message);
        setSubmitting((prevState) => !prevState);
      }
    } catch (error) {
      console.log(error);
      setSubmitting((prevState) => !prevState);
    }
  };
  return (
    <div>
      <Dialog open={openUpdateProfile}>
        <DialogContent
          onInteractOutside={() => setOpenUpdateProfile(false)}
          className="h-[700px] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <form
              onSubmit={handleSubmit(handleUpdateProfile)}
              encType="multipart/form-data"
            >
              <CustomInput
                label="First Name"
                type="text"
                name="firstName"
                errors={errors}
                placeholder="Enter First Name"
                register={register("firstName", {
                  required: {
                    value: true,
                    message: "first name is required",
                  },
                })}
              />
              <CustomInput
                label="Last Name"
                type="text"
                name="lastName"
                errors={errors}
                placeholder="Enter Last Name"
                register={register("lastName", {
                  required: {
                    value: true,
                    message: "last name is required",
                  },
                })}
              />
              <CustomInput
                label="Email"
                type="email"
                name="email"
                errors={errors}
                placeholder="Enter Email"
                register={register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "enter a valid email",
                  },
                })}
              />
              <CustomInput
                label="Phone Number"
                type="text"
                name="phoneNumber"
                errors={errors}
                placeholder="Enter Phone Number"
                register={register("phoneNumber", {
                  required: {
                    value: true,
                    message: "Phone Number is required",
                  },
                })}
              />
              <CustomInput
                label="User Bio"
                type="text"
                name="bio"
                errors={errors}
                placeholder="Enter user bio"
                register={register("bio", {
                  required: {
                    value: true,
                    message: "bio is required",
                  },
                })}
              />
              <CustomInput
                label="User Skills"
                type="text"
                name="skills"
                errors={errors}
                placeholder="Enter user skills ( comma separated ) "
                register={register("skills", {
                  required: {
                    value: true,
                    message: "skills are required",
                  },
                })}
              />
              <CustomFileInput
                errors={errors}
                name={"resume"}
                label={"upload user resume"}
                register={register("resume", {
                  required: {
                    value: true,
                    message: "user resume  is required",
                  },
                })}
              />
              <CustomFileInput
                errors={errors}
                name={"profilePic"}
                label={"upload Profile Pic"}
                register={register("profilePic", {
                  required: {
                    value: true,
                    message: "user resume  is required",
                  },
                })}
              />
              <div className="formButtons   my-10 flex  flex-col">
                <Button>
                  {submitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {submitting ? "please wait ..." : "Update"}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfile;
