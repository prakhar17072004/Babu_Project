"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

function Babu() {
  const [acceptedJobs, setAcceptedJobs] = useState<string[]>([]);
  const [availableJobs, setAvailableJobs] = useState<string[]>([]);

  // Load applied services from local storage to display as available jobs
  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("appliedServices") || "[]");
    setAvailableJobs(storedJobs);
  }, []);

  // Accept a job
  const handleAcceptJob = (job: string) => {
    if (!acceptedJobs.includes(job)) {
      setAcceptedJobs((prev) => [...prev, job]);

      // Remove from Available Jobs
      setAvailableJobs((prev) => prev.filter(j => j !== job));

      toast.success(`${job} accepted successfully!`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8 mt-[50px]">
        <h1 className="text-3xl font-bold mb-6 text-center">Babu Dashboard</h1>

        <Tabs defaultValue="jobs-avail">
          <TabsList className="bg-white p-2 rounded-lg shadow-md">
            <TabsTrigger value="jobs-avail">Jobs Available</TabsTrigger>
            <TabsTrigger value="jobs-accepted">Jobs Accepted</TabsTrigger>
          </TabsList>

          {/* Available Jobs */}
          <TabsContent value="jobs-avail">
            <ul className="space-y-4">
              {availableJobs.length > 0 ? (
                availableJobs.map((job, index) => (
                  <li key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
                    <span className="font-semibold">{job}</span>
                    <Button variant="outline" onClick={() => handleAcceptJob(job)}>
                      Accept
                    </Button>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-center">No jobs available.</p>
              )}
            </ul>
          </TabsContent>

          {/* Accepted Jobs */}
          <TabsContent value="jobs-accepted">
            {acceptedJobs.length > 0 ? (
              acceptedJobs.map((job, index) => (
                <li key={index} className="bg-green-100 p-4 rounded-lg shadow text-center font-semibold">
                  {job} - Accepted ✅
                </li>
              ))
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
