import Weather from "./Weather";

const Country = ({ countryData }) => {
  const languages = Object.values(countryData.languages);
  return (
    <div>
      <h2>{countryData.name.common}</h2>
      <p>Capital: {countryData.capital[0]}</p>
      <p>Area: {countryData.area}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img
        src={countryData.flags.png}
        alt={countryData.flags.alt}
        style={{
          border: "0.5px solid lightgrey",
        }}
      />
      <Weather capital={countryData.capital[0]} />
    </div>
  );
};

export default Country;
