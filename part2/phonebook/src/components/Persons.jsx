import Person from "./Person";

const Persons = ({ search, persons }) => {
  return (
    <div>
      {search
        ? persons
            .filter((person) =>
              person.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((person) => <Person key={person.id} person={person} />)
        : persons.map((person) => <Person key={person.id} person={person} />)}
    </div>
  );
};

export default Persons;
