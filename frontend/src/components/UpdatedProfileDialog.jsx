import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, User, Mail, Phone, FileText, BookOpen, Aperture } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '@/utils/contant'
import { toast } from 'sonner'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { motion } from 'framer-motion'

const UpdatedProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(', ') || "",
    file: null
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  }

  const SubmitHandler = async (e) => {
    e.preventDefault();
    
    // Validate skills format
    if (input.skills && !/^[a-zA-Z, ]+$/.test(input.skills)) {
      toast.error("Skills should be comma-separated values (e.g., React, JavaScript)");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      
      if (res?.data?.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Profile updated successfully!");
        setOpen(false);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white rounded-lg shadow-xl sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Update Your Profile
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={SubmitHandler} className="space-y-4">
          <div className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullname" className="flex items-center gap-2 text-gray-700">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="john@example.com"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="flex items-center gap-2 text-gray-700">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="+1 234 567 890"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio" className="flex items-center gap-2 text-gray-700">
                <BookOpen className="h-4 w-4" />
                Bio
              </Label>
              <Input
                id="bio"
                name="bio"
                type="text"
                value={input.bio}
                onChange={changeEventHandler}
                placeholder="Tell us about yourself"
              />
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <Label htmlFor="skills" className="flex items-center gap-2 text-gray-700">
                <Aperture className="h-4 w-4" />
                Skills (comma separated)
              </Label>
              <Input
                id="skills"
                name="skills"
                type="text"
                value={input.skills}
                onChange={changeEventHandler}
                placeholder="React, JavaScript, CSS"
              />
            </div>

            {/* Resume */}
            <div className="space-y-2">
              <Label htmlFor="file" className="flex items-center gap-2 text-gray-700">
                <FileText className="h-4 w-4" />
                Update Resume (PDF)
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={changeFileHandler}
                className="file:text-sm file:font-medium file:text-blue-600 hover:file:bg-blue-50"
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            {loading ? (
              <Button className="w-full" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Profile...
              </Button>
            ) : (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </motion.div>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdatedProfileDialog