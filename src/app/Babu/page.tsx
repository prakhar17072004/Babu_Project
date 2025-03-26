"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import jobs from "../../Data/data.json";
import clientData from "../../Data/babu.json";

interface Job {
  services: string;
  clientId: number;
}

interface Client {
  id: number;
  name: string;
  mobile_no: string;
  Email: string;
  details: string;
}

interface AcceptedJob {
  service: string;
  client: Client;
}

interface Message {
  sender: "babu" | "user";
  text: string;
}

function Babu() {
  const [acceptedJobs, setAcceptedJobs] = useState<AcceptedJob[]>([]);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<{ [key: string]: Message[] }>({});
  const [messageInput, setMessageInput] = useState("");

  // Function to accept a job
  const handleAcceptJob = (job: Job) => {
    const client = clientData.find((c) => Number(c.id) === job.clientId);
  
    if (client && !acceptedJobs.some((j) => j.service === job.services)) {
      setAcceptedJobs((prev) => [
        ...prev,
        { service: job.services, client: { ...client, id: Number(client.id) } },
      ]);
      toast.success(`${job.services} accepted successfully!`);
    }
  };

  // Function to handle sending messages
  const handleSendMessage = () => {
    if (selectedChat && messageInput.trim() !== "") {
      setChatMessages((prev) => ({
        ...prev,
        [selectedChat]: [
          ...(prev[selectedChat] || []),
          { sender: "babu", text: messageInput },
          { sender: "user", text: "Okay, noted!" },
        ],
      }));
      setMessageInput(""); // Clear input field
    }
  };

  // If a chat is selected, show chat UI
  if (selectedChat) {
    const currentJob = acceptedJobs.find((job) => job.service === selectedChat);
    const babuInfo = { name: "Babu Ji", mobile: "9876543210" }; // Hardcoded Babu info

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between border-b pb-4 mt-[4%]">
            <div>
              <Button onClick={() => setSelectedChat(null)}>⬅ Back</Button>
              <h1 className="text-xl font-semibold"> {selectedChat}</h1>
              <p>Babu Name: {babuInfo.name}</p>
              <p>Babu Mobile: {babuInfo.mobile}</p>
            </div>
            {currentJob && (
              <div>
                <p>Client Name: {currentJob.client.name}</p>
                <p>Client Mobile: {currentJob.client.mobile_no}</p>
              </div>
            )}
          </div>

          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-2">
            {chatMessages[selectedChat]?.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "babu" ? "justify-start" : "justify-end"}`}>
                <div className={`p-3 rounded-lg max-w-xs ${msg.sender === "babu" ? "bg-gray-200" : "bg-blue-200"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="flex gap-2 p-4 border-t">
            <Input
              id="message"
              placeholder="Type a message..."
              className="flex-1"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
              Send
            </Button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8 mt-[50px]">
        <Tabs defaultValue="jobs-avail">
          <TabsList className="bg-white p-2 rounded-lg shadow-md flex gap-4">
            <TabsTrigger value="jobs-avail" className="relative">
              Jobs Available
              {jobs.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {jobs.length}
                </span>
              )}
            </TabsTrigger>

            <TabsTrigger value="jobs-accepted" className="relative">
              Jobs Accepted
              {acceptedJobs.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {acceptedJobs.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Available Jobs List */}
          <TabsContent value="jobs-avail">
            <ul className="space-y-4">
              {jobs.map((job, index) => {
                const client = clientData.find((c) => c.id === job.clientId);

                return (
                  <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{job.services}</span>
                      <Button
                        variant="outline"
                        onClick={() => setExpandedJob(expandedJob === job.services ? null : job.services)}
                      >
                        {expandedJob === job.services ? "Hide" : "More"}
                      </Button>
                    </div>

                    {expandedJob === job.services && client && (
                      <div className="mt-4 bg-white p-4 rounded-lg shadow">
                        <p><strong>Name:</strong> {client.name}</p>
                        <p><strong>Mobile:</strong> {client.mobile_no}</p>
                        <p><strong>Email:</strong> {client.Email}</p>
                        <p><strong>Details:</strong> {client.details}</p>

                        <div className="mt-4 flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => handleAcceptJob(job)}
                            disabled={acceptedJobs.some((j) => j.service === job.services)}
                          >
                            {acceptedJobs.some((j) => j.service === job.services) ? "Accepted" : "Accept"}
                          </Button>
                          <Button variant="outline" onClick={() => setExpandedJob(null)}>
                            Ignore
                          </Button>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </TabsContent>

          {/* Accepted Jobs List */}
          <TabsContent value="jobs-accepted">
            {acceptedJobs.length > 0 ? (
              <ul className="space-y-4">
                {acceptedJobs.map((job, index) => (
                  <li key={index} className="bg-green-100 p-4 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-semibold">{job.service} - Accepted ✅</p>
                      <Button variant="outline" onClick={() => setSelectedChat(job.service)}>Chat</Button>
                    </div>
                    <div className="mt-2 text-gray-700">
                      <p><strong>Name:</strong> {job.client.name}</p>
                      <p><strong>Mobile:</strong> {job.client.mobile_no}</p>
                      <p><strong>Email:</strong> {job.client.Email}</p>
                      <p><strong>Details:</strong> {job.client.details}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center">No jobs accepted yet.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Babu;
