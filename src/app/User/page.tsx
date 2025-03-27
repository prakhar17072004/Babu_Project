"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import servicesData from "../../Data/data.json";

function User() {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [appliedServices, setAppliedServices] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    babu_name: "",
  });

  useEffect(() => {
    fetchAppliedServices();
  }, []);

  const fetchAppliedServices = async () => {
    try {
      const response = await fetch("/api/appliedservices");
      const data = await response.json();
      setAppliedServices(data.services);
    } catch (error) {
      console.error("Error fetching applied services:", error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.mobile) {
      toast.error("Please fill in the details.");
      return;
    }

    if (selectedService) {
      try {
        const response = await fetch("/api/appliedservices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceName: selectedService,
            userName: formData.username,
            userMobile: formData.mobile,
            babuName: "Default Babu", // Update if needed
            babuMobile: "9876543210",
          }),
        });

        if (response.ok) {
          toast.success(`${selectedService} Form submitted successfully!`);
          fetchAppliedServices();
        } else {
          toast.error("Failed to apply service.");
        }
      } catch (error) {
        console.error("Error applying service:", error);
      }
    }

    setOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8 mt-[50px]">
        <Tabs defaultValue="services-avail">
          <TabsList className="bg-white p-2 rounded-lg shadow-md">
            <TabsTrigger value="services-avail">Services Available</TabsTrigger>
            <TabsTrigger value="services-apply">Applied Services</TabsTrigger>
          </TabsList>

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
                    disabled={appliedServices.some((applied) => applied.serviceName === service.services)}
                  >
                    {appliedServices.some((applied) => applied.serviceName === service.services) ? "Applied" : "Apply"}
                  </Button>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="services-apply">
            {appliedServices.length > 0 ? (
              <ul className="space-y-4">
                {appliedServices.map((service, index) => (
                  <li key={index} className="flex justify-between items-center bg-green-100 p-4 rounded-lg shadow">
                    {service.serviceName} - Applied
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center">No services applied yet.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Apply for {selectedService}</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Name</Label>
                <Input id="username" type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className="bg-gray-200" />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile No.</Label>
                <Input id="mobile" type="text" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/, "") })} className="bg-gray-200" />
              </div>
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
