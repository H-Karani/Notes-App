const fs = require('fs')
const chalk =require('chalk')
const getNotes = function(){
    return "Your notes...."
}
const addNote = function(title, noteContent){
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note){
        return note.title === title
    })
    if(duplicateNotes.length === 0){
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
const saveNote = function(notes){
    notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}
const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
        
    }catch(error){
        return []
    }
}

const removeNote = function(title){
     const notes = loadNotes()
     const noteToKeep = notes.filter(function(note){
         return note.title !== title
    })    
    if(noteToKeep.length < notes.length){
        saveNote(noteToKeep)        
        console.log(chalk.green.inverse(`Note ${title} removed`))
             
       
    }else{
        console.log(chalk.red.inverse(`No note named ${title}  removed`)) 
               
    }
    

}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}