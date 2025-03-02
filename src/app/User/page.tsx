"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import servicesData from "../../Data/data.json";
import userData from "../../Data/user.json";

function User() {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [appliedServices, setAppliedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
  });

  // Set user data when component mounts
  useEffect(() => {
    if (userData.length > 0) {
      setFormData({
        username: userData[0].name || "",
        mobile: userData[0].mobile_no || "",
      });
    }
  }, [userData]);

  // Reset the form when modal is closed
  const resetForm = () => {
    setSelectedService(null);
  };

  const handleSubmit = () => {
    if (!formData.username || !formData.mobile) {
      toast.error("Please fill in the details.");
      return;
    }

    if (selectedService) {
      setAppliedServices((prev) => [...prev, selectedService]);
      toast.success(`${selectedService} Form submitted successfully!`);
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
          <TabsList className="bg-white p-2 rounded-lg shadow-md">
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
                    disabled={appliedServices.includes(service.services)}
                  >
                    {appliedServices.includes(service.services) ? "Applied" : "Apply"}
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
                  <li key={index} className="flex justify-between items-center bg-green-100 p-4 rounded-lg shadow text-center font-semibold">
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
          <div className="space-y-4">
            {/* Username Field - Pre-filled and Editable */}
            <div>
              <Label htmlFor="username">Name</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-gray-200"
              />
            </div>

            {/* Mobile Number Field - Pre-filled and Editable */}
            <div>
              <Label htmlFor="mobile">Mobile No.</Label>
              <Input
                id="mobile"
                name="mobile"
                type="text"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/, "") })}
                className="bg-gray-200"
              />
            </div>

            {/* Document Type Field - Non-editable */}
            <div>
              <Label htmlFor="documentType">Details</Label>
              <Input id="documentType" name="documentType" type="text" placeholder="Enter the details.."  className="bg-gray-200" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default User;
