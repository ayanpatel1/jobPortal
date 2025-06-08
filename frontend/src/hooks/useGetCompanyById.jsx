import { setSingleCompany } from '@/redux/companySlice'
import { setAllJobs } from '@/redux/jobSlice'
import { COMPANY_API_END_POINT} from '@/utils/contant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch} from 'react-redux'

const useGetCompanyById = (comapanyId) => {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const fatchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${comapanyId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fatchSingleCompany();
    },[comapanyId,dispatch])
}

export default useGetCompanyById