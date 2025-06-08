import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { FileText, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/contant';
import axios from 'axios';


const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post("https://jobportal-1-qfkx.onrender.com/api/v1/application/status/${id}/update`, { status });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <Table>
            <TableCaption className="text-gray-500 mt-2">List of recent applicants</TableCaption>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-medium text-gray-700">Full Name</TableHead>
                <TableHead className="font-medium text-gray-700">Email</TableHead>
                <TableHead className="font-medium text-gray-700">Contact</TableHead>
                <TableHead className="font-medium text-gray-700">Resume</TableHead>
                <TableHead className="font-medium text-gray-700">Applied Date</TableHead>
                <TableHead className="text-right font-medium text-gray-700">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants?.applications?.map((item) => (
                <TableRow key={item._id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-medium">{item?.applicant?.fullname}</TableCell>
                  <TableCell>{item?.applicant?.email}</TableCell>
                  <TableCell>{item?.applicant?.phoneNumber || 'N/A'}</TableCell>
                  <TableCell>
                    {item.applicant?.profile?.resume ? (
                      <a 
                        className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                        href={item?.applicant?.profile?.resume} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-4 w-4" />
                        {item?.applicant?.profile?.resumeOriginalName}
                      </a>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(item?.applicant?.createdAt).toLocaleDateString('en-US', {
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
                      <PopoverContent className="w-40 p-2 space-y-1">
                        {shortlistingStatus.map((status, index) => (
                          <div 
                            key={index} 
                            onClick={() => statusHandler(status, item?._id)}
                            className="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer text-sm"
                          >
                            <span>{status}</span>
                          </div>
                        ))}
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

export default ApplicantsTable
