"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

function User() {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({ username: "", mobile: "" });

  // List of services
  const services = [
    "Rent Agreement",
    "Allowance Agreement",
    "House Agreement",
    "Challan Agreement",
    "Property Agreement",
    "Property Agreement",
    "Property Agreement",
    "Property Agreement",
    "Property Agreement"
  ];

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
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-6">User Services</h1>

        {/* Tabs for Services */}
        <Tabs defaultValue="services-avail">
          <TabsList>
            <TabsTrigger value="services-avail">Services Available</TabsTrigger>
            <TabsTrigger value="services-apply">Apply Services</TabsTrigger>
          </TabsList>

          {/* Available Services List */}
          <TabsContent value="services-avail">
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index} className="flex justify-between items-center bg-white p-4 shadow rounded-lg">
                  <span className="font-semibold">{service}</span>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedService(service);
                      setOpen(true);
                    }}
                  >
                    Apply
                  </Button>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="services-apply">Change your password here.</TabsContent>
        </Tabs>
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for {selectedService}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" type="text" value={formData.username} onChange={handleChange} placeholder="Enter your name" />
            </div>

            <div>
              <Label htmlFor="mobile">Mobile No.</Label>
              <Input id="mobile" name="mobile" type="number" value={formData.mobile} onChange={handleChange} placeholder="Enter your mobile number" />
            </div>
          </div>

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
