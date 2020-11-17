const fs = require('fs')
const chalk =require('chalk')
const { serialize } = require('v8')
const getNotes = () => {
    return "Your notes...."
}
const addNote = (title, noteContent) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter( (note) => {
    //     return note.title === title
    // })

    const duplicateNotes = notes.find((note) => note.title === title)

    debugger

    if(!duplicateNotes){
        notes.push({
            title: title,
            noteContent: noteContent            
        })
        saveNote(notes)
        console.log(chalk.green.inverse("New note added!"))
    }else {
        console.log(chalk.red.inverse("Note name taken!"))
    } 
}
const saveNote = (notes) => {
    notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
        
    }catch(error){
        return []
    }
}
const removeNote = (title) => {
     const notes = loadNotes()
     const noteToKeep = notes.filter((note) => note.title !== title)    
    if(noteToKeep.length < notes.length){
        saveNote(noteToKeep)        
        console.log(chalk.green.inverse(`Note ${title} removed`))            
       
    }else{
        console.log(chalk.red.inverse(`No note named ${title}  removed`))                
    } 

}
const lisNotes = () => {
    const notes = loadNotes();
    console.log(chalk.italic.green("Your notes...."))
    notes.forEach(note => {
        console.log(note.title)
                
    })   
}
const readNote = (title) => {
    const notes = loadNotes()
    const searchNote =notes.find((note) => note.title === title )
        if(searchNote){
            console.log(chalk.blue(`Content for ${note.title} is..`))
            console.log(note.noteContent)
        }else{
            console.log(chalk.inverse.red("Your note is unavailable"))
        }
    
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    lisNotes: lisNotes,
    readNote: readNote
}