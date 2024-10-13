import React from 'react'
import LatestJobCards from './LatestJobsCards';
import {  useSelector } from 'react-redux';
import { getAllJobs } from '@/store/jobSlice/jobSlice';



const LatestJobs = () => {
    const allJobs = useSelector(getAllJobs) ;
    console.log(allJobs,"ALLJOBS");
    


   
    return (
        <div className='max-w-7xl mx-auto my-20 px-6'>
            <h1 className='md:text-4xl text-xl  font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <div className='grid md:grid-cols-3 gap-4 my-5 sm:grid-cols-2'>
                {
                  allJobs ?  allJobs?.slice(0,6).map((job,index) => <LatestJobCards key={job?._id} job={job}/>) : <div>No Jobs Available </div>
                }
            </div>
        </div>
    )
}

export default LatestJobs