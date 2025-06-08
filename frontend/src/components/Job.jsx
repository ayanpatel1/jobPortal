

import React from 'react';
import { Button } from './ui/button';
import { Bookmark, MapPin, Briefcase, Clock, DollarSign } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFuction = (mangodbTime) => {
        const createdAt = new Date(mangodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime.getTime() - createdAt.getTime();
        const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        
        if (daysAgo === 0) return "Today";
        if (daysAgo === 1) return "Yesterday";
        return `${daysAgo} days ago`;
    }

    return (
        <motion.div 
            className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            whileHover={{ y: -5 }}
        >
            <div className='flex items-center justify-between mb-4'>
                <Badge variant="outline" className="text-gray-600 bg-gray-50">
                    {daysAgoFuction(job?.createdAt)}
                </Badge>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-full"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Add save functionality here
                    }}
                >
                    <Bookmark className="h-5 w-5" />
                </Button>
            </div>

            <div className='flex items-start gap-4 mb-6'>
                <Avatar className="h-14 w-14 border border-gray-200">
                    <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                        {job?.company?.name?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h1 className='font-bold text-lg text-gray-800'>{job?.company?.name}</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job?.location || "India"}</span>
                    </div>
                </div>
            </div>

            <div className='mb-6'>
                <h1 className='font-bold text-xl text-gray-900 mb-2'>{job?.title}</h1>
                <p className='text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mb-6'>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-3 py-1">
                    <Briefcase className="h-3.5 w-3.5 mr-1" />
                    {job?.position} Position{job?.position > 1 ? 's' : ''}
                </Badge>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 px-3 py-1">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {job?.jobtype}
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 px-3 py-1">
                    <DollarSign className="h-3.5 w-3.5 mr-1" />
                    {job?.salary}
                </Badge>
            </div>

            <div className='flex items-center gap-3'>
                <Button 
                    onClick={() => navigate(`/description/${job?._id}`)} 
                    variant="outline" 
                    className="flex-1 h-11 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                >
                    View Details
                </Button>
                <Button 
                    className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white"
                >
                    Save for Later
                </Button>
            </div>
        </motion.div>
    );
};

export default Job;