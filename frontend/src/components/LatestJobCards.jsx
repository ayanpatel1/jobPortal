



import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, MapPin, Clock, DollarSign } from 'lucide-react'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    
    return (
        <motion.div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='p-6 rounded-xl bg-white border border-gray-200 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300'
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
        >
            <div className='flex items-start justify-between'>
                <div>
                    <div className='flex items-center gap-2 mb-1'>
                        <Building2 className='h-4 w-4 text-blue-600' />
                        <h1 className='font-semibold text-lg text-gray-800'>{job?.company?.name}</h1>
                    </div>
                    <div className='flex items-center gap-2 text-sm text-gray-500 mb-4'>
                        <MapPin className='h-3.5 w-3.5' />
                        <span>{job?.location || 'India'}</span>
                    </div>
                </div>
                <div className='bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium'>
                    {new Date(job?.createdAt).toLocaleDateString()}
                </div>
            </div>

            <div className='mb-4'>
                <h1 className='font-bold text-xl text-gray-900 mb-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className='bg-blue-100 text-blue-700 hover:bg-blue-100 px-3 py-1'>
                    <Clock className='h-3.5 w-3.5 mr-1' />
                    {job?.jobtype}
                </Badge>
                <Badge className='bg-green-100 text-green-700 hover:bg-green-100 px-3 py-1'>
                    <DollarSign className='h-3.5 w-3.5 mr-1' />
                    {job?.salary} LPA
                </Badge>
                <Badge className='bg-purple-100 text-purple-700 hover:bg-purple-100 px-3 py-1'>
                    {job?.position} Position{job?.position > 1 ? 's' : ''}
                </Badge>
                {job?.skills?.slice(0, 2).map((skill, index) => (
                    <Badge key={index} variant="outline" className='text-gray-600 border-gray-300'>
                        {skill}
                    </Badge>
                ))}
            </div>
        </motion.div>
    )
}

export default LatestJobCards