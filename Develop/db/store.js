const util = require("util")
const fs = require("fs")
const uuid = require("uuid/v1")
const readFileAsync =  util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class Store {
    read() {
        return readFileAsync("./Develop/db/db.json", "utf8")
    }

    write(note){
        return writeFileAsync("./Develop/db/db.json", JSON.stringify(note))
    }

    getNotes(){
        return this.read().then(notes => {
            let parsednotes;
            try {
                parsednotes = [].concat(JSON.parse(notes))
            } catch(err) {
                parsednotes = []
            }
            return parsednotes
        })
    } 
    
    addNote(note){
        // const title = note.title
        // const text = note.text
        const { title, text } = note

        if (!title || !text) {
            throw new Error("You must have title and text!")
        }

        const newNote = {
            title,
            text,
            id: uuid()
        }

        return this.getNotes()

                .then(notes => [...notes, newNote])
                .then(updatedNotes => this.write(updatedNotes))
                .then( () => newNote)
    }

    // removeNote(id) {
    //     return this.getNotes()
    //         .then((notes) => notes.filter((note) => note.id !== id))
    //         .then((filterNotes) => this.write(filteredNotes));
    // }

    remove(id) {
        return this.getNotes()
        .then(notes => notes.filter(note => note.id !== id))
        .then(filteredNotes => this.write(filteredNotes))
    }
}

module.exports = new Store()