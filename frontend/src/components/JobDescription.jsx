



import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { setSingleJob } from '@/redux/jobSlice'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/contant'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { Briefcase, MapPin, Clock, DollarSign, User, Calendar, FileText } from 'lucide-react'
import { motion } from 'framer-motion'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'

const JobDescription = () => {
    const { singleJob } = useSelector(state => state.job)
    const { user } = useSelector(state => state.auth)
    const [isApplied, setIsApplied] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()

    const applyJobHandler = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(`https://jobportal-1-qfkx.onrender.com/api/v1/application/apply/${jobId}`, { withCredentials: true })
            
            if (res.data.success) {
                setIsApplied(true)
                const updatedSingleJob = {
                    ...singleJob, 
                    applications: [...singleJob.applications, { applicant: user?._id }]
                }
                dispatch(setSingleJob(updatedSingleJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "Failed to apply for the job")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`https://jobportal-1-qfkx.onrender.com/api/v1/job/get/${jobId}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(
                        res.data.job.applications.some(
                            application => application.applicant === user?._id
                        )
                    )
                }
            } catch (error) {
                console.error(error)
                toast.error("Failed to fetch job details")
            }
        }
        fetchSingleJob()
    }, [jobId, dispatch, user?._id])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
        <div className='max-w-4xl mx-auto my-10 px-4'>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='bg-white rounded-xl shadow-md p-8'
            >
                {/* Company Header */}
                <div className='flex items-start gap-4 mb-6'>
                    <Avatar className='h-16 w-16 border border-gray-200'>
                        <AvatarImage src={singleJob?.company?.logo} alt={singleJob?.company?.name} />       
                        <AvatarFallback className='bg-blue-100 text-blue-600 font-medium'>
                            {singleJob?.company?.name?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className='text-2xl font-bold text-gray-900'>{singleJob?.title}</h1>
                        <p className='text-lg text-gray-600'>{singleJob?.company?.name}</p>
                    </div>
                </div>

                {/* Job Meta */}
                <div className='flex flex-wrap items-center gap-3 mb-8'>
                    <Badge className='bg-blue-100 text-blue-700 hover:bg-blue-100 px-3 py-1'>
                        <Briefcase className='h-4 w-4 mr-2' />
                        {singleJob?.position} Position{singleJob?.position > 1 ? 's' : ''}
                    </Badge>
                    <Badge className='bg-green-100 text-green-700 hover:bg-green-100 px-3 py-1'>
                        <Clock className='h-4 w-4 mr-2' />
                        {singleJob?.jobtype}
                    </Badge>
                    <Badge className='bg-purple-100 text-purple-700 hover:bg-purple-100 px-3 py-1'>
                        <DollarSign className='h-4 w-4 mr-2' />
                        {singleJob?.salary} LPA
                    </Badge>
                </div>

                {/* Apply Button */}
                <div className='flex justify-end mb-8'>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied || isLoading}
                            className={`px-8 py-6 text-lg rounded-xl ${isApplied
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Applying...
                                </>
                            ) : isApplied ? (
                                "Already Applied"
                            ) : (
                                "Apply Now"
                            )}
                        </Button>
                    </motion.div>
                </div>

                {/* Job Details */}
                <div className='space-y-6'>
                    <h2 className='text-xl font-bold text-gray-800 border-b pb-2 flex items-center gap-2'>
                        <FileText className='h-5 w-5 text-blue-600' />
                        Job Description
                    </h2>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='flex items-start gap-4'>
                            <div className='p-2 bg-blue-50 rounded-full'>
                                <Briefcase className='h-5 w-5 text-blue-600' />
                            </div>
                            <div>
                                <h3 className='font-semibold text-gray-700'>Role</h3>
                                <p className='text-gray-600'>{singleJob?.title}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-4'>
                            <div className='p-2 bg-blue-50 rounded-full'>
                                <MapPin className='h-5 w-5 text-blue-600' />
                            </div>
                            <div>
                                <h3 className='font-semibold text-gray-700'>Location</h3>
                                <p className='text-gray-600'>{singleJob?.location || 'Not specified'}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-4'>
                            <div className='p-2 bg-blue-50 rounded-full'>
                                <User className='h-5 w-5 text-blue-600' />
                            </div>
                            <div>
                                <h3 className='font-semibold text-gray-700'>Experience</h3>
                                <p className='text-gray-600'>{singleJob?.experienceLevel || '0'} years</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-4'>
                            <div className='p-2 bg-blue-50 rounded-full'>
                                <DollarSign className='h-5 w-5 text-blue-600' />
                            </div>
                            <div>
                                <h3 className='font-semibold text-gray-700'>Salary</h3>
                                <p className='text-gray-600'>{singleJob?.salary} LPA</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-4'>
                            <div className='p-2 bg-blue-50 rounded-full'>
                                <User className='h-5 w-5 text-blue-600' />
                            </div>
                            <div>
                                <h3 className='font-semibold text-gray-700'>Applicants</h3>
                                <p className='text-gray-600'>{singleJob?.applications?.length || '0'}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-4'>
                            <div className='p-2 bg-blue-50 rounded-full'>
                                <Calendar className='h-5 w-5 text-blue-600' />
                            </div>
                            <div>
                                <h3 className='font-semibold text-gray-700'>Posted Date</h3>
                                <p className='text-gray-600'>{singleJob?.createdAt ? formatDate(singleJob.createdAt) : 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className='mt-6'>
                        <h3 className='font-semibold text-gray-700 mb-2'>Full Description</h3>
                        <p className='text-gray-600 whitespace-pre-line'>{singleJob?.description}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default JobDescription
