import Person from "./Person"

const Persons = ({personsToShow, eliminatePerson}) => {
    return (
        <ul>
        {personsToShow.map((person) => (
          <Person key={person.id} person={person} eliminatePerson={() => eliminatePerson(person.id)} />
        ))}
      </ul>
    )
}

export default Persons