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
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [appliedServices, setAppliedServices] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
  });

  useEffect(() => {
    fetchAppliedServices();
  }, []);

  // Fetch applied services from the database
  const fetchAppliedServices = async () => {
    try {
      const response = await fetch("/api/appliedservices");
      const data = await response.json();
      setAppliedServices(data.services);
    } catch (error) {
      console.error("Error fetching applied services:", error);
    }
  };

  // Apply for a service
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
            babuName: "Default Babu", // This should ideally be assigned dynamically
            babuMobile: "9876543210",
          }),
        });

        if (response.ok) {
          toast.success(`${selectedService} applied successfully!`);
          fetchAppliedServices();
          setOpen(false);
        } else {
          toast.error("Failed to apply service.");
        }
      } catch (error) {
        console.error("Error applying service:", error);
      }
    }
  };

  // Open chat for an applied service
  const handleOpenChat = (service: any) => {
    setSelectedChat(service);
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

          {/* Available Services - From JSON */}
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

          {/* Applied Services - From Database */}
          <TabsContent value="services-apply">
            {appliedServices.length > 0 ? (
              <ul className="space-y-4">
                {appliedServices.map((service, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-green-100 p-4 rounded-lg shadow cursor-pointer"
                    onClick={() => handleOpenChat(service)}
                  >
                    {service.serviceName} - {service.status}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center">No services applied yet.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal for Applying a Service */}
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

      {/* Chat Box Modal */}
      {selectedChat && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg ">
            <h2 className="text-lg font-bold mb-4"> {selectedChat.serviceName}</h2>
            <div className="flex justify-between">
              <div className="text-left">
                {/* <p><strong>Service:</strong> {selectedChat.serviceName}</p> */}
                <p><strong>User:</strong> {selectedChat.userName}</p>
                <p><strong>Mobile:</strong> {selectedChat.userMobile}</p>
              </div>
              <div className="text-right">
                <p><strong>Status:</strong> {selectedChat.status}</p>
                <p><strong>Babu:</strong> {selectedChat.babuName}</p>
                <p><strong>Mobile:</strong> {selectedChat.babuMobile}</p>
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="message">Message</Label>
              <Input
                id="message"
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="bg-gray-200"
              />
            </div>
            
            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline" onClick={() => setSelectedChat(null)}>Close</Button>
              <Button>Send</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
