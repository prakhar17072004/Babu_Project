import React from 'react'
import Navbar from '@/components/Navbar'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Form from "@/components/ui/form"



function User() {
  return (
    <div>
        <Navbar/>
   <div className='className="min-h-screen bg-gray-50 p-8'>
   <h1 className="text-3xl font-bold mb-6">User Services</h1>
   <Tabs defaultValue="account" className="">
  <TabsList>
    <TabsTrigger value="account" >Services Available</TabsTrigger>
    <TabsTrigger value="password">Apply services</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <ul>
      <li >Rent Agreement
        <span className='ml-8'>
              <Button variant="outline">Apply</Button>
        </span>

      </li>
      <li >Rent Agreement
        <span className='ml-8'>
              <Button variant="outline">Apply</Button>
        </span>

      </li>
      <li >Rent Agreement
        <span className='ml-8'>
              <Button variant="outline">Apply</Button>
        </span>

      </li>
      <li >Rent Agreement
        <span className='ml-8'>
              <Button variant="outline">Apply</Button>
                <Form/>
        </span>

      </li>

    </ul>
  </TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>
   </div>
    </div>
  )
}

export default User