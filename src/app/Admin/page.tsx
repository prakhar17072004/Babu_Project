import Navbar from '@/components/Navbar'
import React from 'react'

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
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Symbol</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Tournament</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allImages.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.symbol}</td>
                <td className="border border-gray-300 p-2">
                  {item.category || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {item.tournament || "N/A"}
                </td>
                <td className="border border-gray-300 p-2 flex justify-center space-x-2">
                  <button
                    onClick={() => setPreviewModal(item)}
                    className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-500"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setEditModal(item)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-400"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => copyToClipboard(item.url)}
                    className="bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-500"
                  >
                    Copy URL
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

         </div>
    </>
    
  )
}

export default Admin