"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function Location() {
  const [location, setLocation] = useState("Delhi"); // Default location

  const locations = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"];

  return (
    <nav className="  p-4 flex justify-between items-center">
     

      {/* Location Dropdown */}
<Select onValueChange={(value) => setLocation(value)} defaultValue={location}>
  <SelectTrigger className="w-[180px] border rounded-lg p-2 flex items-center">
    <SelectValue placeholder="Select Location" />
  </SelectTrigger>
  <SelectContent>
    {locations.map((loc, index) => (
      <SelectItem key={index} value={loc}>
        <div className="flex items-center gap-2">
          {/* Indian Flag Image */}
          <img src="https://flagcdn.com/w40/in.png" alt="India Flag" className="rounded-sm" />
          <span>{loc}</span>
        </div>
      </SelectItem>
    ))}
  </SelectContent>
</Select>

      {/* User Profile / Login Button */}
      
    </nav>
  );
}

export default Location;
