import React from 'react';
import UserForm from './components/userForm';
import UserTable from './components/userTable';
import { useState ,useEffect} from 'react';
import axios from 'axios';
export default function App() {
  let [formData, setFormData] = useState({ name: '', email: "", phone: '', message: "" })
   const [users, setUsers] = useState([]);
   
   let baseUrl =import.meta.env.VITE_BASE_URL;
   useEffect(() => {

        displayUser()
    }, [])

    async function displayUser() {
        try {
            let result = await axios.get(`${baseUrl}/api/`)
            console.log(result)
            setUsers(result.data.users)

        }
        catch (err) {
            console.log(err)
        }
    }
  return (
    <>
      <div className='py-2 bg-blue-400 text-2xl font-bold text-center'>
        Admin Panel
      </div>

      {/* Responsive Flexbox Container */}
      <div className='flex flex-col lg:flex-row p-4 gap-4'>
        {/* UserForm: full width on small, 1/3 on large */}
        <div className='w-full lg:w-1/3'>
          <UserForm formData={formData} setFormData={setFormData} displayUser={displayUser}/>
        </div>

        {/* UserTable: full width on small, 2/3 on large */}
        <div className='w-full lg:w-2/3'>
          <UserTable formData={formData} setFormData={setFormData} users={users} setUsers={setUsers} displayUser={displayUser}/>
        </div>
      </div>
    </>
  );
}
