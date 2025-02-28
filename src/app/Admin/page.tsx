import Navbar from '@/components/Navbar'
import React from 'react'
import document from "../../Data/services.json"

function Admin() {
  return (
    <>
         <Navbar/>
        <div className="bg-white shadow-md rounded-lg p-6 mx-auto mt-[5%]">
        
        <h2 className="ext-3xl font-bold mb-6 text-center">Admin Dashboard</h2>
        <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Client Name</th>
              <th className="border border-gray-300 p-2">Babu Name</th>
              <th className="border border-gray-300 p-2">Document Type</th>
              <th className="border border-gray-300 p-2">Client MobileNo.</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          {/* <tbody>
             {document.map((doc,id)=>(
              <tr key={id}>
                <td>{doc}</td>
              </tr>
             ))}
          </tbody> */}
            
        </table>
      </div>

         </div>
    </>
    
  )
}

export default Admin