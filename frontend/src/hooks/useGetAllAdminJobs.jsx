import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/contant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get("https://jobportal-1-qfkx.onrender.com/api/v1/job/getadminjobs",{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    },[])
}

export default useGetAllAdminJobs
