import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const nameExist = persons.some((person) => person.name === newName);

    if (nameExist) {
      if (newNumber !== "") {
        const confirmUpdate = window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one`
        );
        if (confirmUpdate) {
          const updatedPerson = persons.find((p) => p.name === newName);
          updatedPerson.number = newNumber;
          personService
            .update(updatedPerson.id, updatedPerson)
            .then((returnPerson) => {
              setPersons(
                persons.map((p) =>
                  p.id !== updatedPerson.id ? p : returnPerson
                )
              );
            });
          setNewName("");
          setNewNumber("");
          return;
        }
      }

      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }

    personService.create(personObject).then((returnPerson) => {
      setPersons(persons.concat(returnPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    const confirmDelete = window.confirm(`Delete ${person.name}?`);

    if (person && confirmDelete) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons filter={filter} persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
