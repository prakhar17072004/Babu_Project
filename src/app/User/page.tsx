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
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
  });

  const [appliedServices, setAppliedServices] = useState<{ 
    serviceName: string; 
    messages: { sender: "user" | "babu"; text: string }[] 
  }[]>([]);

  // Set user data when component mounts
  useEffect(() => {
    if (userData.length > 0) {
      setFormData({
        username: userData[0].name || "",
        mobile: userData[0].mobile_no || "",
      });
    }
  }, []);

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
      setAppliedServices((prev) => [
        ...prev,
        { serviceName: selectedService, messages: [] }, // Initialize with empty messages
      ]);
      toast.success(`${selectedService} Form submitted successfully!`);
    }

    resetForm();
    setOpen(false);
  };

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  const handleOpenChat = (serviceName: string) => {
    setSelectedChat(serviceName);
    setChatOpen(true);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8 mt-[50px]">
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
                    disabled={appliedServices.some((applied) => applied.serviceName === service.services)}
                  >
                    {appliedServices.some((applied) => applied.serviceName === service.services) ? "Applied" : "Apply"}
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
                  <li
                    key={index}
                    onClick={() => handleOpenChat(service.serviceName)}
                    className="flex justify-between items-center bg-green-100 p-4 rounded-lg shadow cursor-pointer text-center font-semibold"
                  >
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

      {/* Apply Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for {selectedService}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Name</Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="mobile">Mobile No.</Label>
              <Input
                id="mobile"
                type="text"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/, "") })}
                className="bg-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="details">Details</Label>
              <Input id="details" type="text" placeholder="Enter the details.." className="bg-gray-200" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Chat Modal */}
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chat for {selectedChat}</DialogTitle>
          </DialogHeader>
          <div className="max-h-96 overflow-y-auto p-4 space-y-2">
            {appliedServices.find((s) => s.serviceName === selectedChat)?.messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`p-2 rounded-lg max-w-xs ${msg.sender === "user" ? "bg-blue-200" : "bg-gray-200"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              id="message"
              placeholder="Type a message..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
                  setAppliedServices((prev) =>
                    prev.map((service) =>
                      service.serviceName === selectedChat
                        ? { ...service, messages: [...service.messages, { sender: "user", text: e.currentTarget.value }] }
                        : service
                    )
                  );
                  e.currentTarget.value = "";
                }
              }}
            />
            <Button onClick={() => {
              setAppliedServices((prev) =>
                prev.map((service) =>
                  service.serviceName === selectedChat
                    ? { ...service, messages: [...service.messages, { sender: "babu", text: "Okay, noted!" }] }
                    : service
                )
              );
            }}>
              Send
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default User;
