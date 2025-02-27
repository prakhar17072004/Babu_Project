'use client'
import {useState} from 'react'
import Navbar from '@/components/Navbar'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



function User() {
const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ username: "", mobile: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    setOpen(false); // Close modal after submit
  };
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
    <li>
      Rent Agreement
      <span className="ml-8">
        <Button variant="outline" onClick={() => setOpen(true)}>
          Apply
        </Button>
      </span>
  </li>
  <li>
      Allownace Agreement
      <span className="ml-8">
        <Button variant="outline" onClick={() => setOpen(true)}>
          Apply
        </Button>
      </span>
  </li>
  <li>
    House Agreement
      <span className="ml-8">
        <Button variant="outline" onClick={() => setOpen(true)}>
          Apply
        </Button>
      </span>
  </li>
  <li>
    Challen Agreement
      <span className="ml-8">
        <Button variant="outline" onClick={() => setOpen(true)}>
          Apply
        </Button>
      </span>
  </li>
  

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for Rent Agreement</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username"  type='text' value={formData.username} onChange={handleChange} placeholder="Enter your name" />
            </div>

            <div>
              <Label htmlFor="mobile">Mobile No.</Label>
              <Input id="mobile" name="mobile" type='number' value={formData.mobile} onChange={handleChange} placeholder="Enter your mobile number" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    

    </ul>
  </TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>
   </div>
    </div>
  )
}

export default User