import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";


const Navbar = () => {
    const [ isuserAuthenticated , setIsUserAuthenticated ] = useState(false) ;
  return (
    <div className="bg-white w-full py-2 px-12 flex justify-between ">
      <div className="flex  justify-between items-center gap-5 px-2">
        <h1 className="text-2xl font-bold ">
          {" "}
          Job <span className="text-[#F83002]">Portal</span>
        </h1>
      </div>
      <div className="gap-5 flex ">
        <ul className="text-sm flex items-center gap-5 px-2">
          <li>Home</li>
          <li>Jobs</li>
          <li>Browse</li>
        </ul>
        {
            !isuserAuthenticated ? ( <div className="flex justify-evenly items-center gap-4">
                  <Button variant="outline"><Link to={"/auth/signin"}>Sign In</Link></Button>
                  <Button variant=""><Link to={"/auth/signup"}>Sign Up</Link></Button>

            </div>
            ):( <Popover>
                <PopoverTrigger asChild>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="bg-white p-4 rounded-lg shadow-md w-70 mr-5">
                  <div className="flex space-x-4 items-center">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
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
                      <Button variant="link"  >View Profile</Button>
                      </div>
                      <div className="flex gap-2">
                      <LogOut/>
                      <Button variant="link">Log Out</Button>
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
