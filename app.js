const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')



//Customize yargs version
yargs.version('1.1.0')
//Create command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            description: 'Note title',
            demandOption: true,
            type: 'string'
        },

        noteContent: {
            description:"Note content",
            demandOption: true,
            type:'string'
        }

    },
    handler: function(argv){
       notes.addNote(argv.title,argv.noteContent)
    }
})

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            description: "Note title",
            demandOption: true,
            type: 'string'

        }
    },
    handler: function (argv){
        notes.removeNote(argv.title)
    }

})

//Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function(){
        console.log("Reading the note")
    }
})

//Create list command
yargs.command({
    command:'list',
    describe: "Listing note",
    handler: function(){
        console.log("Listing a note")
    }
})

yargs.parse();




