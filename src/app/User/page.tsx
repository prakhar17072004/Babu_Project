"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import servicesData from "../../Data/data.json";
import userData from "../../Data/data.json";

function User() {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    babu_name:"",
  });

  const [appliedServices, setAppliedServices] = useState<{
    serviceName: string;
    messages: { sender: "user" | "babu"; text: string }[];
    status: string; // Added status field
  }[]>([]);

  useEffect(() => {
    if (userData.length > 0) {
      setFormData({
        username: userData[0].name || "",
        mobile: userData[0].mobile_no || "",
        babu_name:userData[0].babu_name|| "",
      });
    }
  }, []);

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
        { serviceName: selectedService, messages: [], status: "Pending" }, // Initial status
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

  const sendMessage = () => {
    if (!messageInput.trim()) return;

    setAppliedServices((prev) =>
      prev.map((service) =>
        service.serviceName === selectedChat
          ? {
              ...service,
              messages: [
                ...service.messages,
                { sender: "user", text: messageInput },
                { sender: "babu", text: "Okay, noted!" },
              ],
            }
          : service
      )
    );
    setMessageInput("");
  };

  if (selectedChat) {
    const currentService = appliedServices.find((s) => s.serviceName === selectedChat);

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between border-b pb-4 mt-10">
            <div >
              <Button onClick={() => setSelectedChat(null)}>⬅ Back</Button>
              <h1 className="text-xl font-semibold">{selectedChat}</h1>
              <p>Name: {formData.username}</p>
              <p>Mobile: {formData.mobile}</p>
            </div>
            <div className="mt-[2%]">
              <p>Status: {currentService?.status || "Unknown"}</p>
              <p>Babu Name: {formData.babu_name}</p>
              <p>Babu Mobile: 9876543210</p>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-2">
            {currentService?.messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    msg.sender === "user" ? "bg-blue-200" : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 p-4 border-t">
            <Input
              id="message"
              placeholder="Type a message..."
              className="flex-1"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </div>
      </div>
    );
  }

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
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow"
                >
                  <span className="font-semibold">{service.services}</span>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedService(service.services);
                      setOpen(true);
                    }}
                    disabled={appliedServices.some(
                      (applied) => applied.serviceName === service.services
                    )}
                  >
                    {appliedServices.some(
                      (applied) => applied.serviceName === service.services
                    )
                      ? "Applied"
                      : "Apply"}
                  </Button>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="services-apply">
            {appliedServices.length > 0 ? (
              <ul className="space-y-4">
                {appliedServices.map((service, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedChat(service.serviceName)}
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

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Apply for {selectedService}</h2>
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
            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;