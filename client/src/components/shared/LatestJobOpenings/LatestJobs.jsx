import React from 'react'
import LatestJobCards from './LatestJobsCards';
import {  useSelector } from 'react-redux';
import { getAllJobs } from '@/store/jobSlice/jobSlice';



const LatestJobs = () => {
    const allJobs = useSelector(getAllJobs) ;


   
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                  allJobs ?  allJobs?.slice(0,6).map((job,index) => <LatestJobCards key={job?._id} job={job}/>) : <div>No Jobs Available </div>
                }
            </div>
        </div>
    )
}

export default LatestJobs