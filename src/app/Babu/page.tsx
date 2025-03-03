"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import jobs from "../../Data/data.json";

function Babu() {
  const [acceptedJobs, setAcceptedJobs] = useState<string[]>([]);

  // Function to accept a job
  const handleAcceptJob = (job: string) => {
    if (!acceptedJobs.includes(job)) {
      setAcceptedJobs((prev) => [...prev, job]);
      toast.success(`${job} accepted successfully!`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8 mt-[50px]">
        <h1 className="text-3xl font-bold mb-6 text-center">Babu Dashboard</h1>

        {/* Tabs for Jobs */}
        <Tabs defaultValue="jobs-avail">
          <TabsList className="bg-white p-2 rounded-lg shadow-md flex gap-4">
            {/* Jobs Available Tab with Count Badge */}
            <TabsTrigger value="jobs-avail" className="relative">
              Jobs Available
              {jobs.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {jobs.length}
                </span>
              )}
            </TabsTrigger>

            {/* Jobs Accepted Tab */}
            <TabsTrigger value="jobs-accepted">Jobs Accepted</TabsTrigger>
          </TabsList>

          {/* Available Jobs List */}
          <TabsContent value="jobs-avail">
            <ul className="space-y-4">
              {jobs.map((job, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
                  <span className="font-semibold">{job.services}</span>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handleAcceptJob(job.services)}
                      disabled={acceptedJobs.includes(job.services)}
                    >
                      {acceptedJobs.includes(job.services) ? "Accepted" : "Accept"}
                    </Button>
                    <Button variant="outline">Ignore</Button>
                  </div>
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* Accepted Jobs List */}
          <TabsContent value="jobs-accepted">
            {acceptedJobs.length > 0 ? (
              <ul className="space-y-4">
                {acceptedJobs.map((job, index) => (
                  <li key={index} className="bg-green-100 p-4 rounded-lg shadow text-center font-semibold">
                    {job} - Accepted ✅
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
