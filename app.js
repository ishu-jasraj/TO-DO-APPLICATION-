//var chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.addNote(argv.title, argv.body)
    }
})

//create find command
yargs.command(
   {  
       command:'find',
       describe:"to find a note title presence in file",
     builder:
     {
         title:
         {
         demandOption:true,
         type:'string'
        }
     },
     handler:function(argv)
     {
         notes.findnote(argv.title);
     }
    }
)

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
           title:{
               describe:'title of note to be removed',
               demandOption:true,
               type:'string'
           }
    },
    handler (argv) {
        console.log('Removing the note')
        notes.removeNote(argv.title);
    }
})

// Create list command
yargs.command({
    command: 'list',
    //describe: we are going to list titles of all the notes present in file
    describe: 'List your notes',
    //using shorthand method 
    handler () {
        console.log('Listing out all notes')
        notes.listNote();
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder:{
          title:{
              describe:'note title whose body has to be read',
              demandOption:true,
              type:'string'
          }
    },
    handler: function (argv) {
        console.log('Reading a note')
        notes.readNote(argv.title);
    }
})

yargs.parse()
