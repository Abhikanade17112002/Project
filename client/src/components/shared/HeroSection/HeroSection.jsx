import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';


const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center w-full'>
            <div className='flex flex-col gap-5 my-10'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] text-sm font-bold'>No. 1 Job Hunt Website</span>
                <h1 className='text-4xl font-semibold'>Search, Apply and <br /> Get Your <span className='text-[#6A38C2]'>Dream Job</span></h1>
                <p className='text-gray-400 text-[14px]' >Explore thousands of opportunities. Connect with top employers and take the next step in your career today!</p>
                <div className='flex w-[40%]  shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full '

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full  bg-[#6A38C2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection