import React, { useState } from "react";
import CustomInput from "../CustomInput/CustomInput";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CustomDropDown from "../CustomDropDown/CustomDropDown";
import CustomFileInput from "../CustomFileInput/CustomFileInput";
import { useDispatch } from "react-redux";
import { handleUserSignUpAction } from "@/store/userSlice/userSlice";
import { toast } from "sonner";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      phoneNumber: "",
      profilePic: "",
    },
    mode: "all",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleUserSignUp = async (data) => {
    const formdata = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "profilePic") {
        formdata.append(key, data[key][0]);
      } else {
        formdata.append(key, data[key]);
      }
    });

    setSubmitting(true);
    try {
      const response = await dispatch(handleUserSignUpAction(formdata));

      if (response.payload.status) {
        toast.success(response.payload.message);
        setSubmitting(false);
        navigate("/");
      } else {
        toast.error(response.payload.message);
        setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };
  return (
    <div className="w-1/2 mx-auto min-w-[250px] py-5 px-6 border bg-white rounded-lg">
      <div className="py-2">
        <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
      </div>
      <form
        action=""
        className="py-2"
        onSubmit={handleSubmit(handleUserSignUp)}
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
          label="password"
          type="password"
          name="password"
          errors={errors}
          placeholder="Enter Password"
          register={register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
              message: "enter a strong password",
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
        <CustomDropDown
          control={control}
          setValue={setValue}
          errors={errors}
          name={"role"}
          label={"role"}
          register={register("role", {
            required: {
              value: true,
              message: "user role required",
            },
          })}
          placeholder={"select user role"}
          dropDownOptions={[
            { id: 1, label: "Student", value: "student" },
            { id: 2, label: "Recruiter", value: "recruiter" },
          ]}
        />
        <CustomFileInput
          errors={errors}
          name={"profilePic"}
          label={"upload profile image"}
          register={register("profilePic", {
            required: {
              value: true,
              message: "profile image is required",
            },
          })}
        />
        <div className="formButtons  lg:px-[150px] my-10 flex  flex-col">
          <Button>
            {submitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {submitting ? "please wait ..." : "Sign In"}
          </Button>
          <div className="flex px-4 my-4 text-[10px] justify-center ">
            <p className="text-gray-500 ">
              already have an account ? <span className="text-white"> as</span>{" "}
            </p>
            <Link to="/auth/signin" className="text-blue-500 ">
              {" "}
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
