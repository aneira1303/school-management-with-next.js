import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch("/api/getSchools")
      .then((res) => res.json())
      .then((data) => setSchools(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Schools</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {schools.map((school) => (
          <div key={school.id} className="shadow-lg rounded-lg p-4 bg-white">
            <img src={school.image} alt={school.name} className="w-full h-40 object-cover rounded-lg" />
            <h3 className="text-lg font-semibold mt-2">{school.name}</h3>
            <p className="text-gray-600">{school.address}, {school.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
