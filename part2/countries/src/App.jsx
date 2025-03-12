import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";

const App = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountriesData(response.data);
      });
  }, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleFilterResult = (value) => {
    if (value) {
      const result = countriesData.filter((countries) =>
        countries.name.common.toLowerCase().includes(value.toLowerCase())
      );

      if (result.length === 1) {
        return result[0].name.common;
      } else if (result.length > 10) {
        return true;
      } else {
        return result;
      }
    }
    return null;
  };

  return (
    <div>
      <h1>Countries Information</h1>
      Find Countries <input value={filter} onChange={handleFilter} />
      <Filter filterResult={handleFilterResult(filter)} />
    </div>
  );
};

export default App;
