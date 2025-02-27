"use client";

import { useState } from "react";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import locations from "../Data/Location.json";

function Location() {
  const [location, setLocation] = useState(locations[0]); // Default location
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  // Filter locations based on search term
  const filteredLocations = locations.filter((loc) =>
    loc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <nav className="p-4 flex justify-between items-center">
      {/* Location Dropdown */}
      <Select onValueChange={(value) => setLocation(value)} defaultValue={location}>
        <SelectTrigger className="w-[200px] border rounded-lg p-2 flex items-center">
          <SelectValue placeholder="Select Location" />
        </SelectTrigger>

        <SelectContent className="w-[220px]">
          {/* Search Input */}
          <div className="p-2">
            <Input 
              type="text"
              placeholder="Search city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          {/* List of Cities */}
          {filteredLocations.length > 0 ? (
            filteredLocations.map((loc, index) => (
              <SelectItem key={index} value={loc}>
                <div className="flex items-center gap-2">
                  {/* Indian Flag Image */}
                  <img src="https://flagcdn.com/w40/in.png" alt="India Flag" className=" rounded-sm" />
                  <span>{loc}</span>
                </div>
              </SelectItem>
            ))
          ) : (
            <p className="p-2 text-gray-500">No results found</p>
          )}
        </SelectContent>
      </Select>
    </nav>
  );
}

export default Location;
