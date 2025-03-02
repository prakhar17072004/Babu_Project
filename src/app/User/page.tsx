"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import servicesData from "../../Data/data.json";
import user from "../../Data/user.json";
function User() {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({ username: "", mobile: "" });
  const [appliedServices, setAppliedServices] = useState<string[]>([]);

  // List of services
  // const services = [
  //   "Rent Agreement",
  //   "Allowance Agreement",
  //   "House Agreement",
  //   "Challan Agreement",
  //   "Property Agreement",
  //   "Vehicle Lease",
  //   "Employment Contract",
  //   "Business Agreement",
  // ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Limit mobile number to 10 characters
    if (name === "mobile" && value.length > 10) return;

    setFormData({ ...formData, [name]: value });
  };

  // Reset the form
  const resetForm = () => {
    setFormData({ username: "", mobile: "" });
  };

  const handleSubmit = () => {
    if (!formData.username || !formData.mobile) {
      toast.error("Please fill the details");
      return;
    }

    toast.success(`${selectedService} Form submitted successfully!`);
    
    // Store the submitted service
    if (selectedService) {
      setAppliedServices((prev) => [...prev, selectedService]);
    }

    resetForm();
    setOpen(false);
  };

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8 mt-[50px]">
        <h1 className="text-3xl font-bold mb-6 text-center">User Dashboard</h1>

        {/* Tabs for Services */}
        <Tabs defaultValue="services-avail">
          <TabsList className=" bg-white p-2 rounded-lg shadow-md">
            <TabsTrigger value="services-avail">Services Available</TabsTrigger>
            <TabsTrigger value="services-apply">Applied Services</TabsTrigger>
          </TabsList>

          {/* Available Services List */}
          <TabsContent value="services-avail">
            
              <ul className="space-y-4">
                {servicesData.map((service, index) => (
                  <li key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
                    <span className="font-semibold">{service.services}</span>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedService(service.services);
                        setOpen(true);
                      }}
                    >
                      Apply
                    </Button>
                  </li>
                ))}
              </ul>
            
          </TabsContent>

          {/* Applied Services List */}
          <TabsContent value="services-apply">
            
              {appliedServices.length > 0 ? (
                <ul className="space-y-4">
                  {appliedServices.map((service, index) => (
                    <li key={index} className=" flex justify-between items-center bg-green-100 p-4 rounded-lg shadow text-center font-semibold">
                      {service} - Applied
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center">No services applied yet.</p>
              )}
            
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for {selectedService}</DialogTitle>
          </DialogHeader>
          {user.map((data, index) => (
  <div className="space-y-4" key={index}>
    {/* Username Field - Pre-filled and Disabled */}
    <div>
      <Label htmlFor="username">Username</Label>
      <Input 
        id="username" 
        name="username" 
        type="text" 
        value={formData.username} 
        disabled 
        className="bg-gray-200 cursor-not-allowed"
      />
    </div>

    {/* Mobile Number Field - Pre-filled and Disabled */}
    <div>
      <Label htmlFor="mobile">Mobile No.</Label>
      <Input 
        id="mobile" 
        name="mobile" 
        type="number" 
        value={formData.mobile} 
        disabled 
        className="bg-gray-200 cursor-not-allowed"
      />
    </div>

    {/* Document Type Field - Non-editable */}
    <div>
      <Label htmlFor="documentType">Document Type</Label>
      <Input 
        id="documentType" 
        name="documentType" 
        type="text" 
        value={selectedService} 
        disabled 
        className="bg-gray-200 cursor-not-allowed"
      />
    </div>
  </div>
))}

          

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default User;
