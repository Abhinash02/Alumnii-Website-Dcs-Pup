import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import facultyData from "../data/facultyData.json";

const FacultyTeachers = () => {
  const [faculty, setFaculty] = useState(facultyData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFaculty, setFilteredFaculty] = useState(facultyData);
  const [expandedBio, setExpandedBio] = useState({});
  const [selectedDesignation, setSelectedDesignation] = useState("All");

  const designations = [
    "All",
    ...new Set(facultyData.map((teacher) => teacher.Designation)),
  ];

  useEffect(() => {
    let results = faculty;

    if (searchTerm.trim() !== "") {
      results = results.filter(
        (teacher) =>
          teacher.name &&
          teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDesignation !== "All") {
      results = results.filter(
        (teacher) => teacher.Designation === selectedDesignation
      );
    }

    setFilteredFaculty(results);
  }, [searchTerm, selectedDesignation, faculty]);

  const toggleBio = (id) => {
    setExpandedBio((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Faculty</h1>

      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col md:flex-row justify-center gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch
            className="absolute left-3 top-2.5 text-gray-400"
            size={20}
          />
        </div>

        {/* Designation Filter */}
        <select
          className="w-full md:w-1/4 border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedDesignation}
          onChange={(e) => setSelectedDesignation(e.target.value)}
        >
          {designations.map((designation, index) => (
            <option key={index} value={designation}>
              {designation}
            </option>
          ))}
        </select>
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:px-20">
        {filteredFaculty.map((teacher) => (
          <div
            key={teacher.id}
            className="border border-[#D1D5DB] rounded-lg overflow-hidden shadow-lg transition-transform hover:shadow-xl hover:scale-105"
          >
            <div className="p-6 flex flex-col sm:flex-row gap-4">
              <img
                src={teacher.image || "/default-profile.png"}
                alt={teacher.name || "Profile"}
                className="w-40 h-40 object-cover mx-auto sm:mx-0"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">
                  {teacher.name || "No Name"}
                </h2>
                <p className="text-[#4868EC]">{teacher.title || ""}</p>
                <p className="text-[#4B5563] text-sm">
                  Department: {teacher.department || "N/A"}
                </p>
                <p className="text-[#4B5563] text-sm">
                  Designation: {teacher.Designation || "N/A"}
                </p>

                {/* Areas of Expertise */}
                {teacher.expertise && teacher.expertise.length > 0 && (
                  <div className="mt-2">
                    <h3 className="text-sm font-medium">Areas of Expertise:</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {teacher.expertise.map((area, index) => (
                        <span
                          key={index}
                          className="bg-[#DBEAFE] text-[#1E40AF] text-xs px-2 py-1 rounded"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bio */}
                <div className="mt-3 text-sm">
                  <p className="text-[#4B5563]">
                    {teacher.bio
                      ? expandedBio[teacher.id]
                        ? teacher.bio
                        : `${teacher.bio.substring(0, 80)}...`
                      : "No bio available"}
                  </p>
                  {teacher.bio && teacher.bio.length > 80 && (
                    <button
                      className="text-[#4868EC] hover:underline text-sm mt-1"
                      onClick={() => toggleBio(teacher.id)}
                    >
                      {expandedBio[teacher.id] ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>

                {/* Contact */}
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm">
                    <span className="font-medium">Email:</span>{" "}
                    {teacher.email || "N/A"}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Phone:</span>{" "}
                    {teacher.phone || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFaculty.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No faculty members found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default FacultyTeachers;
