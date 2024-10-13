import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { getAdminCreatedCompaniesAction, getAllCompanies } from '@/store/companySlice/companySlice';
import { toast } from 'sonner';
import { Delete, Edit2, MoreHorizontal, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Avatar , AvatarImage} from '@/components/ui/avatar'
import { Popover , PopoverContent , PopoverTrigger } from '@/components/ui/popover'

const CompaniesTable = ({setSearchParam,searchParam}) => {
    const [ companies , setCompanies] = useState([]) ;
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(searchParam);
    

    
    useEffect(()=>{
        dispatch(getAdminCreatedCompaniesAction())
        .then((response)=>{

            if( response.payload.status)
            {  
               setCompanies(response.payload.companies) ; 
            

            }
            else{
                toast.error(response.payload.message);
                    
            }
        });
    },[]);



    

   
    
    return (
        <div className="max-w-7xl mx-auto">
            <Table variant="outline" className="table text-[10px]">
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-center' >Logo</TableHead>
                        <TableHead className='text-center' >Name</TableHead>
                        <TableHead className='text-center' >Website</TableHead>
                        <TableHead className='text-center' >Email</TableHead>
                        <TableHead className='text-center' >Contact</TableHead>
                        <TableHead className='text-center' >Registered At</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        companies
                        .filter((company)=>company.companyName.toLowerCase().includes(searchParam.toLowerCase()))
                        .map((company) => (
                            <tr>
                                <TableCell className='text-center' >
                                    <Avatar>
                                        <AvatarImage src={company?.companyLogo}/>
                                    </Avatar>
                                </TableCell  >
                                <TableCell className='text-center' >{company.companyName}</TableCell>
                                <TableCell className='text-center' ><a href={company?.companyWebsite} className='text-blue-700' target='blank'>{company.companyWebsite}</a></TableCell>
                                <TableCell className='text-center' >{company.companyEmail}</TableCell>
                                <TableCell className='text-center' >{company.companyContact}</TableCell>
                                <TableCell className='text-center' >{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-15 h-15">
                                            <div onClick={()=> navigate(`/admin/company/${company._id}`)} className='flex items-center gap-2 cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span className='text-sm'>Edit</span>
                                            </div>
                                            
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable