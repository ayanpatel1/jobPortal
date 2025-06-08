import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => { 
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(()=>{ 
        console.log('called');
        const filteredJobs = allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    },[allAdminJobs,searchJobByText])

    return (
  <div className="border rounded-lg overflow-hidden shadow-sm">
    <Table>
      <TableCaption className="text-gray-500 mt-2">A list of your recently posted jobs</TableCaption>
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead className="font-medium text-gray-700">Company Name</TableHead>
          <TableHead className="font-medium text-gray-700">Role</TableHead>
          <TableHead className="font-medium text-gray-700">Posted Date</TableHead>
          <TableHead className="text-right font-medium text-gray-700">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filterJobs?.map((job) => (
          <TableRow key={job._id} className="hover:bg-gray-50 transition-colors">
            <TableCell className="font-medium">{job?.company?.name}</TableCell>
            <TableCell>{job?.title}</TableCell>
            <TableCell>
              {new Date(job?.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </TableCell>
            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger className="p-2 rounded-full hover:bg-gray-100">
                  <MoreHorizontal className="h-4 w-4 text-gray-500" />
                </PopoverTrigger>
                <PopoverContent className="w-40 p-2 space-y-2">
                  <div 
                    onClick={() => navigate(`/admin/companies/${job._id}`)} 
                    className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
                  >
                    <Edit2 className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">Edit</span>
                  </div>
                  <div 
                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                    className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
                  >
                    <Eye className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">Applicants</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)
}

export default AdminJobsTable



