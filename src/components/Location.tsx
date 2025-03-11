"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import locations from "../Data/Location.json";

function Location() {
  const [location, setLocation] = useState(locations[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null); // Explicit type

  const filteredLocations = locations.filter((loc) =>
    loc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (inputRef.current) {
      (inputRef.current as HTMLInputElement).focus(); // Type assertion
    }
  }, [searchTerm]);

  return (
    <nav className="p-4 flex justify-between items-center">
      <Select onValueChange={(value) => setLocation(value)} defaultValue={location}>
        <SelectTrigger className="w-[200px] border rounded-lg p-2 flex items-center">
          <SelectValue placeholder="Select Location" />
        </SelectTrigger>
        <SelectContent className="w-[220px]">
          <div className="p-2 sticky top-0 bg-white z-10">
            <Input 
              type="text"
              placeholder="Search city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full text-black placeholder-gray-500 focus:outline-none"
              ref={inputRef}
            />
          </div>
          <div className="max-h-60 overflow-auto">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc, index) => (
                <SelectItem key={index} value={loc}>
                  <div className="flex items-center gap-2">
                    <img src="https://flagcdn.com/w40/in.png" alt="India Flag" className="rounded-sm" />
                    <span>{loc}</span>
                  </div>
                </SelectItem>
              ))
            ) : (
              <p className="p-2 text-gray-500">No results found</p>
            )}
          </div>
        </SelectContent>
      </Select>
    </nav>
  );
}

export default Location;