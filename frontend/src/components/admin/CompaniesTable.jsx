import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])
    return (
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <Table>
            <TableCaption className="text-gray-500 mt-2">List of recently registered companies</TableCaption>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-medium text-gray-700">Logo</TableHead>
                <TableHead className="font-medium text-gray-700">Name</TableHead>
                <TableHead className="font-medium text-gray-700">Registered Date</TableHead>
                <TableHead className="text-right font-medium text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterCompany?.map((company) => (
                <TableRow key={company._id} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <Avatar className="border border-gray-200">
                      <AvatarImage src={company.logo} alt={company.name} />
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>
                    {new Date(company.createdAt).toLocaleDateString('en-US', {
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
                      <PopoverContent className="w-32 p-2">
                        <div 
                          onClick={() => navigate(`/admin/companies/${company._id}`)} 
                          className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
                        >
                          <Edit2 className="h-4 w-4 text-gray-600" />
                          <span className="text-sm">Edit</span>
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

export default CompaniesTable