import React from 'react'
import JobsCard from './JobsCard'
import Sidebar from '../Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import { getAllJobs } from '@/store/jobSlice/jobSlice'

const Jobs = () => {
  const allJobs = useSelector(getAllJobs) ;
  
    const filtersArray = [
        {
            id: 1,
            label:"Location",
            value:["Pune" ,"Mumbai","Delhi","Banglore","Hydrabad"]
        },
        {
            id: 2,
            label:"Industry",
            value:["Frontend Developer" ,"Bacend Developer","Fullstack Developer"]
        },
        {
            id: 3,
            label:"Experience",
            value:["0-3 years" ,"3-6 years","6-10 years"]
        },
        {
            id: 4,
            label:"Job Type",
            value:["Full Time" ,"Part Time","Intern"]
        },
        {
            id: 5,
            label:"Salary",
            value:["0-50000" ,"50000-100000","100000-200000"]
        },

    ]
    
  return (
    <div className='h-[100vh] flex  '>
      <div className="sidebar w-[25%] max-w-[250px]  overflow-y-auto my-4  py-4">
      <Sidebar   filtersarray={filtersArray}></Sidebar>
      </div>
      <div className="jobscontainer flex-1 overflow-y-auto   px-4 py-4 grid grid-cols-3  gap-5 my-4">
      {
       allJobs ? allJobs.map((job, index) => (
        <div className="">
          <JobsCard key={index} job={job}/>
        </div>
            
            )) : <div>No Jobs Available</div>
      }
      
      </div>

      
    </div>
  )
}

export default Jobs
