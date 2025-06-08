




import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const navigate = useNavigate();

    return (
        <div className='max-w-7xl mx-auto px-4 py-16'>
            <div className='text-center mb-12'>
                <h1 className='text-4xl font-bold text-gray-800 mb-3'>
                    <span className='text-blue-600'>Latest & Top </span> 
                    Job Openings
                </h1>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Browse through our most recent and popular job listings from top companies
                </p>
            </div>

            {allJobs.length <= 0 ? (
                <div className='text-center py-12 bg-gray-50 rounded-xl'>
                    <p className='text-gray-500 mb-4'>No job openings available at the moment</p>
                    <Button 
                        variant="outline" 
                        className='border-blue-600 text-blue-600 hover:bg-blue-50'
                        onClick={() => navigate('/jobs')}
                    >
                        Browse All Jobs
                    </Button>
                </div>
            ) : (
                <>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {allJobs.slice(0, 6).map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))}
                    </div>
                    <div className='text-center mt-10'>
                        <Button 
                            onClick={() => navigate('/jobs')} 
                            className='bg-blue-600 hover:bg-blue-700 px-8 py-6 rounded-full text-lg'
                        >
                            View All Job Openings
                            <ArrowRight className='ml-2 h-5 w-5' />
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}

export default LatestJobs