import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuthenticated, getUserInfo, handleUserSignOutAction } from "@/store/userSlice/userSlice" ;
import { toast } from "sonner";


const Navbar = () => {
   const user =  useSelector(getUserInfo);
   const isAuthenticated = useSelector(getIsAuthenticated);
   const dispatch = useDispatch();
   const navigate = useNavigate() ;

   

   
  return (
    <div className="bg-white w-full py-2 px-12 flex justify-between ">
      <div className="flex  justify-between items-center gap-5 px-2">
        <Link to={"/"}>
        <h1 className="text-2xl font-bold ">
          {" "}
          Job <span className="text-[#F83002]">Portal</span>
        </h1>
        </Link>
        
      </div>
      <div className="gap-5 flex ">
        <ul className="text-sm flex items-center gap-5 px-2   ">
          <li> <Link to={"/"}>Home</Link></li>
          <li><Link to={ user?.role === "student" ? "/jobs" : "/admin/jobs"}>Jobs</Link></li>
          <li><Link to={"/jobs/browse"}>Browse</Link></li>
        </ul>
        {
           !isAuthenticated?  ( <div className="flex justify-evenly items-center gap-4">
                  <Button variant="outline"><Link to={"/auth/signin"}>Sign In</Link></Button>
                  <Button variant=""><Link to={"/auth/signup"}>Sign Up</Link></Button>

            </div>
            ):( <Popover>
                <PopoverTrigger asChild>
                  <Avatar>
                    <AvatarImage src={ user?.profile?.profilePhoto|| "https://github.com/shadcn.png"} alt="@shadcn" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="bg-white p-4 rounded-lg shadow-md w-70 mr-5">
                  <div className="flex space-x-4 items-center">
                    <Avatar>
                      <AvatarImage
                        src={ user?.profile?.profilePhoto|| "https://github.com/shadcn.png"}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div className="text-sm  ">
                      <h5 className="font-bold">Abhishek Kande</h5>
                      <p className="text-muted-foreground " > Lorem ipsum dolor sit amet.</p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 px-2 " >
                      <div className="flex gap-2">
                     < User2 />
                      <Button variant="link"> <Link to={"/user/profile"} >View Profile</Link></Button>
                      </div>
                      <div className="flex gap-2">
                      <LogOut/>
                      <Button  onClick={()=>{dispatch(handleUserSignOutAction()).then((response)=>{
                        try {
                          if( response.payload.status)
                          {
                               toast.success(response.payload.message) ;
                               navigate("/") ;
                          }
                          else
                          {
                            toast.success(response.payload.message) ;
                          }
                        } catch (error) {
                          
                        }
                      })
                        console.log("pressed");
                        

                      }}  variant="link">Log Out</Button>
                      </div>
                  </div>
                </PopoverContent>
              </Popover>) 
        }
       
      </div>
    </div>
  );
};

export default Navbar;
