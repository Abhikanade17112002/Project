import React, { useState } from 'react'
import CustomInput from '../CustomInput/CustomInput'
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { set, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import CustomDropDown from '../CustomDropDown/CustomDropDown'
import { useDispatch } from 'react-redux'
import { handleUserSignInAction } from '@/store/userSlice/userSlice'
import { toast } from 'sonner'

const SignIn = () => {
  const dispatch = useDispatch() ;
  const navigate = useNavigate() ;
  const { register, handleSubmit, formState:{errors} ,setValue ,control} = useForm({
    defaultValues: {
      email: '',
      password: '',
      role:''
      },
      mode:"all"
  }) ;

  const [ submitting , setSubmitting ] = useState(false) ;
  const handleUserSignIn = async (data) =>{
   console.log(data);
   setSubmitting(true)
   try {
    const response = await dispatch(handleUserSignInAction(data)) ;
    console.log(response,"asasasas");
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
   
  }
  return (
    <div className='w-1/2 mx-auto min-w-[250px] py-5 px-6 border bg-white rounded-lg' >
      <div className="py-2">
        <h1 className='text-2xl font-bold text-center mb-4'>Sign In
          </h1>
      </div>
      <form action="" className='py-2' onSubmit={handleSubmit(handleUserSignIn)}>
      <CustomInput 
    label="Email"
    type='email'
    name="email"
    errors={errors}
    placeholder='Enter Email'
    
    register={register("email",{
      required: {
        value: true,
        message: 'Email is required'
        },
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message:"enter a valid email"
        }
    })}

    />
       <CustomInput 
      
    label="password"
    type='password'
    name="password"
    errors={errors}
    placeholder='Enter Password'
    register={register("password",{
      required: {
        value: true,
        message: 'Password is required'
        },
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
          message:"enter a strong password"
        }
    })}

    />
    <CustomDropDown 
     control={control}
    setValue={setValue}
    errors={errors}
    name={"role"}
    label={"role"}
    register={register("role",{
      required: {
        value:true,
        message:"user role required"
      }

    })}
    placeholder={"select user role"}
    dropDownOptions={[{id:1,
      label:"Student",
      value:"student"},
      {id:2,
        label:"Recruiter",
        value:"recruiter"},
    ]}
    
    />
    <div className="formButtons  lg:px-[150px] my-10 flex  flex-col">
    <Button   >
      {
        submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null 
      }
      {
        submitting ? "please wait ..." : "Sign In" 
      }
      
    </Button>
    <div className="flex px-4 my-4 text-[10px] justify-center ">
      <p className="text-gray-500 ">Don't have an account? <span className='text-white'>  as</span>  </p>
      <Link to="/auth/signup" className="text-blue-500 ">  Sign Up</Link>

    </div>
    </div>
      
      </form>
   
    </div>
  )
}

export default SignIn
