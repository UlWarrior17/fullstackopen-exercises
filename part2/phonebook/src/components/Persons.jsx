import Person from "./Person";

const Persons = ({ filter, persons, deletePerson }) => {
  return (
    <div>
      {filter
        ? persons
            .filter((person) =>
              person.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((person) => (
              <div key={person.id}>
                <Person person={person} />
              </div>
            ))
        : persons.map((person) => (
            <div key={person.id}>
              <Person person={person} deletePerson={deletePerson}/>
            </div>
          ))}
    </div>
  );
};

export default Persons;
