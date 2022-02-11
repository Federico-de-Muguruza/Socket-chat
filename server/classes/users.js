
class User {

    constructor() {
        this.persons = [];
    }

    addPerson(id, name, room) {
        const person = {id, name, room};

        this.persons.push(person);

        return this.persons;
    }

    getPerson(id) {
        const person = this.persons.filter(p => p.id === id)[0];
        return person;
    } 

    allPersons() {
        return this.persons;
    }

    getPersonsByRoom(room) {
        const persons = this.persons.filter(p => p.room === room);
        return persons;
    }

    deletePerson(id) {
        const deletedPerson = this.getPerson(id);
        this.persons = this.persons.filter(p => p.id != deletedPerson.id);
        return deletedPerson;
    }

}

module.exports = User;