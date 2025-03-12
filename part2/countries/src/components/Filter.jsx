import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./Country";

const Filter = ({ filterResult }) => {
  const [countryData, setCountryData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [tooManyMatches, setTooManyMatches] = useState(false);
  const [isList, setIsList] = useState(false);

  function isString(value) {
    return typeof value === "string";
  }

  useEffect(() => {
    if (filterResult) {
      setSelectedCountry(null);
      if (isString(filterResult)) {
        const name = filterResult;
        axios
          .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
          .then((response) => {
            setCountryData(response.data);
            setTooManyMatches(false);
            setIsList(false);
          });
      } else if (Array.isArray(filterResult)) {
        setTooManyMatches(false);
        setCountryData(filterResult);
        setIsList(true);
      } else {
        setIsList(false);
        setCountryData(null);
        setTooManyMatches(true);
      }
    } else {
      setTooManyMatches(false);
      setIsList(false);
      setCountryData(null);
    }
  }, [filterResult]);

  const handleClick = (countryName) => {
    axios
      .get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`
      )
      .then((response) => {
        setSelectedCountry(response.data);
        setTooManyMatches(false);
        setIsList(false);
      });
  };
  if (tooManyMatches) {
    return <p>Too many matches, specify another filter</p>;
  } else if (isList && countryData) {
    return (
      <div>
        {countryData.map((country) => (
          <ul key={country.cca3}>
            <li>
              {country.name.common}{" "}
              <button onClick={() => handleClick(country.name.common)}>
                Show
              </button>
            </li>
          </ul>
        ))}
      </div>
    );
  } else if (selectedCountry) {
    return <Country countryData={selectedCountry} />;
  } else if (countryData) {
    return <Country countryData={countryData} />;
  } else {
    return null;
  }
};

export default Filter;
