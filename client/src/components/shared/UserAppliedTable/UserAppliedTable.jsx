import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { getUserInfo } from '@/store/userSlice/userSlice'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'


const UserAppliedTable = () => {

    const [ allAppliedJobs , setAllAppliedJobs ] = useState([]) ;
    const userId = useSelector(getUserInfo)?._id ;
    console.log('====================================');
    console.log(userId,"USER ID");
    console.log('====================================');

    const handleFetchAllUserApplications = async () =>{
        try {
            const response = await axios.get(
                "http://localhost:3000/api/application/get",
                {
                  withCredentials: true,
                  headers: {
                    "Content-Type": "application/json",
                  },
                })

                console.log('====================================');
                console.log(response);
                console.log('====================================');
                if( response.data.status)
                {   setAllAppliedJobs(response.data.application)
                    
                }
                else
                {
                    toast.error(response.data.message) ;
                }
        } catch (error) {
            
        }
    } ;


    useEffect(()=>{
      handleFetchAllUserApplications();
    },[])
  
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow >
                        <TableHead >Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs?.length <= 0 ? <span>You haven't applied any job yet.</span> : allAppliedJobs?.map((appliedJob) => (
                            <TableRow key={appliedJob?._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.companyName}</TableCell>
                                <TableCell className="flex justify-center items-center" >  <div className={`px-2 py-1  ${appliedJob.status === "accepted" ? "bg-green-500 text-white font-bold rounded-xl" : appliedJob.status === "pending" ? "bg-gray-500 text-white font-bold rounded-xl" : "bg-red-400 text-white font-bold rounded-xl"}  `}>{appliedJob?.status}</div></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default UserAppliedTable