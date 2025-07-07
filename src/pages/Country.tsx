import { useNavigate } from "react-router-dom";

const countries = [
  { name: "India", code: "in" },
  { name: "United States", code: "us" },
  { name: "United Kingdom", code: "gb" },
  { name: "Canada", code: "ca" },
  { name: "Australia", code: "au" },
  { name: "Germany", code: "de" },
  { name: "France", code: "fr" },
  { name: "Japan", code: "jp" },
  { name: "China", code: "cn" },
  { name: "Brazil", code: "br" },
];

export default function Country() {
  const navigate = useNavigate();

  const handleCountrySelect = (countryCode: string) => {
    navigate(`/home?country=${countryCode}`);
  };

  return (
    <div className="p-4 pt-20 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-700">
        Select a Country
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country) => (
          <button
            key={country.code}
            onClick={() => handleCountrySelect(country.code)}
            className="bg-white rounded-lg shadow hover:shadow-xl transition p-4 text-center text-gray-800 font-semibold hover:bg-blue-50"
          >
            {country.name}
          </button>
        ))}
      </div>
    </div>
  );
}
