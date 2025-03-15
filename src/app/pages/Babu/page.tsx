"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import jobs from "../../../Data/data.json";
import clientData from "../../../Data/babu.json";

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

function Babu() {
  const [acceptedJobs, setAcceptedJobs] = useState<AcceptedJob[]>([]);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  // Function to accept a job
  const handleAcceptJob = (job: Job) => {
    const client = clientData.find((c) => Number(c.id) === job.clientId); // Ensure type consistency
  
    if (client && !acceptedJobs.some((j) => j.service === job.services)) {
      setAcceptedJobs((prev) => [
        ...prev,
        { service: job.services, client: { ...client, id: Number(client.id) } }, // Convert id to number
      ]);
      toast.success(`${job.services} accepted successfully!`);
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8 mt-[50px]">
        {/* <h1 className="text-3xl font-bold mb-6 text-center">Babu Dashboard</h1> */}

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
                const client = clientData.find((c) => c.id === job.clientId); // Fetch client details

                return (
                  <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold ">{job.services}</span>
                      <Button
                      
                        variant="outline"
                        onClick={() => setExpandedJob(expandedJob === job.services ? null : job.services)}
                      >
                        {expandedJob === job.services ? "Hide" : "More"}
                      </Button>
                    </div>

                    {/* Show client details when expanded */}
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
                    <p className="text-lg font-semibold">{job.service} - Accepted ✅</p>
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
