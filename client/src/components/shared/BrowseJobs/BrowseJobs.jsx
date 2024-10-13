import React, { useState } from 'react'
import JobsCard from '../Jobs/JobsCard';
import { Link, useParams } from 'react-router-dom';
import { getAllJobs } from '@/store/jobSlice/jobSlice';
import { useSelector } from 'react-redux';

const BrowseJobs = () => {
  const [ jobs , setJobs ] = useState([]) ;
  let { query } = useParams() ;
  const allJobs = useSelector(getAllJobs);
  if( query == ":query")
  {
    query = "" ;
  }

  console.log('====================================');
  console.log(query.trim());
  console.log('====================================');


    
  return (
    <div className='max-w-7xl mx-auto  py-4 my-2 px-6 rounded-lg shadow-xl h-[100vh] overflow-y-auto'>
     <div className="my-4">
     
     </div>
     <div className="grid grid-cols-3 gap-5 my-10">
     {
        allJobs.filter((job)=>job.title.toLowerCase().includes(query.toLowerCase())).map((job,index)=>(
            <JobsCard key={index} job={job} />
        ))
     }
     </div>
     
    </div>
  )
}

export default BrowseJobs
