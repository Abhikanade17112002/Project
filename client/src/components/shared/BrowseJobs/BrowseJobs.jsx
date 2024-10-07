import React from 'react'
import JobsCard from '../Jobs/JobsCard';
import { Link } from 'react-router-dom';

const BrowseJobs = () => {
    const browseResult = [1,2,3,4,5,6,7,8,9] ;
  return (
    <div className='max-w-7xl mx-auto  py-4 my-2 px-6 rounded-lg shadow-xl h-[100vh] overflow-y-auto'>
     <div className="my-4">
        <h3 className='text-sm font-bold'>Search Results :- {browseResult.length}</h3>
     </div>
     <div className="grid grid-cols-3 gap-5 my-10">
     {
        browseResult.map((job,index)=>(
            <JobsCard key={index} job={job} />
        ))
     }
     </div>
     
    </div>
  )
}

export default BrowseJobs
