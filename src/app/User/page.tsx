"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import servicesData from "../../Data/data.json";
import { Send } from "lucide-react";

function User() {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [appliedServices, setAppliedServices] = useState<any[]>([]);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [activeTab, setActiveTab] = useState("services-apply"); // Ensure "Applied Services" is active on back
  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    details: "",
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
      toast.error("Please fill in all details.");
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
            userDetails: formData.details,
            babuName: "Default Babu",
            babuMobile: "9876543210",
          }),
        });

        if (response.ok) {
          toast.success(`${selectedService} applied successfully!`);
          fetchAppliedServices();
          setOpen(false);
          setFormData({ username: "", mobile: "", details: "" });
        } else {
          toast.error("Failed to apply for service.");
        }
      } catch (error) {
        console.error("Error applying service:", error);
      }
    }
  };

  // Open chat for an applied service
  const handleOpenChat = (service: any) => {
    setSelectedChat(service);
    setMessages([
      { sender: "user", text: "Hello, I need help with this service." },
      { sender: "babu", text: "Sure! How can I assist you?" },
    ]);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (messageInput.trim() === "") return;

    setMessages([...messages, { sender: "user", text: messageInput }]);
    setMessageInput("");

    // Simulating a reply after 1 second
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "babu", text: "Okay, let me check that for you." }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {selectedChat ? (
        // WhatsApp-Style Chat UI
        <div className="flex flex-col h-screen bg-white shadow-md">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 bg-slate-950 text-white mt-[4%]">
            <div>
            <button
              onClick={() => {
                setSelectedChat(null);
                setActiveTab("services-apply"); // Ensure it goes back to "Applied Services"
              }}
              className="text-white bg-gray-700 px-3 py-1 rounded-lg hover:bg-gray-600"
            >
              Back
            </button>
            <div>
              <h2 className="text-lg font-semibold">{selectedChat.serviceName}</h2>
              <p className="text-sm">UserName: {selectedChat.userName}</p>
              <p className="text-sm">Mobile: {selectedChat.userMobile}</p>
            </div>

            </div>
            
            <div className="text-right">
              <p className="text-sm">Status: {selectedChat.status}</p>
              <p className="text-sm">BabuName: {selectedChat.babuName}</p>
              <p className="text-sm">Mobile: {selectedChat.babuMobile}</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-xs p-3 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-green-500 text-white ml-auto"
                    : "bg-white text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-white flex items-center gap-2 border-t">
            <Input
              type="text"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      ) : (
        // Services UI
        <div className="p-8 mt-[50px]">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
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
      )}
    </div>
  );
}

export default User;
