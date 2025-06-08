

import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, FileText, Award, Briefcase } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdatedProfileDialog from './UpdatedProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { motion } from 'framer-motion'

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden mb-8"
        >
          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-28 w-28 border-2 border-blue-100">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                </Avatar>
                <div>
                  <h1 className="font-bold text-2xl text-gray-800">{user?.fullname}</h1>
                  <p className="text-gray-600 mt-1">{user?.profile?.bio || "No bio added"}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {user?.profile?.skills?.length > 0 ? (
                      user.profile.skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-3 py-1"
                        >
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">No skills added</span>
                    )}
                  </div>
                </div>
              </div>
              
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button 
                  onClick={() => setOpen(true)} 
                  variant="outline" 
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 gap-2"
                >
                  <Pen size={16} />
                  Edit Profile
                </Button>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <Label className="text-gray-500">Email</Label>
                    <p className="text-gray-800">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <Contact className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <Label className="text-gray-500">Phone</Label>
                    <p className="text-gray-800">{user?.phoneNumber || "Not provided"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <Label className="text-gray-500">Experience</Label>
                    <p className="text-gray-800">
                      {user?.profile?.experience || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <Award className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <Label className="text-gray-500">Education</Label>
                    <p className="text-gray-800">
                      {user?.profile?.education || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-full">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <Label className="text-gray-500">Resume</Label>
                  {user?.profile?.resume ? (
                    <a 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      href={user.profile.resume} 
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      {user.profile.resumeOriginalName}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <span className="text-gray-400">No resume uploaded</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Applied Jobs Section */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Briefcase className="text-blue-600" size={20} />
              Applied Jobs
            </h2>
          </div>
          <div className="p-4">
            <AppliedJobTable />
          </div>
        </div>
      </div>

      <UpdatedProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile