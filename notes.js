const fs = require('fs')
const chalk=require('chalk')

const addNote = function (title, body) {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter(function (note) {
    //     return note.title === title
    // })
    //the above function will search till end even if the duplicate note is found
    //using find method, the function stops searching when we get a match 
    //find function returns defined if the condition is true
    const duplicateNotes=notes.find((note)=>note.title===title);

    // if (duplicateNotes.length === 0)
     if(!duplicateNotes)//if (duplicateNotes==undefined)
    {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log('New note added!');
    } else {
        console.log('Note title taken!')
    }
}

const removeNote=function(title){
    const notes=loadNotes();
    notes.filter(function(note){
        if(note.title===title)
        {
            const index=notes.indexOf(title);
            notes.splice(index,1);
            saveNotes(notes);
            console.log(chalk.green('note removed with title: '+title));
    
        }
        else
        {
            console.log(chalk.red('note with title: "'+title+'" does not exist'));
        }
    })
    /*
    //Alternate method
           const notes=loadNotes();
           const notesToKeep=notes.filter(function(note){
               //returns note whose title doesnt match to give title
               return note.title!==title;
           });
           saveNotes(notesToKeep);
           if(notes.length>notesToKeep.length)
           {
               console.log('note removed');
           }
           else
           {
               console.log('note not found!!');
           }
     */
}

const listNote=function(){
    const notes=loadNotes();
    console.log(chalk.blue('Your Notes are....'));
    notes.forEach(function(note){
         console.log(chalk.blue(note.title));
    })
}

const readNote=function(title){
    const notes=loadNotes();
    const findNote=notes.find((note)=>note.title===title);
    if(findNote!=undefined)
    {
        console.log(chalk.inverse(findNote.title));
        console.log(findNote.body);
    }
    else
    {
        console.log(chalk.red.inverse('oops! No note found'));
    }
}

const findnote=function(title)
{
    const notes=loadNotes();
    const note_title=notes.find((note)=>{
        return note.title==title;
    })

    if(note_title)
    console.log(title+" found!!");
    else
    console.log(`${title} is not present`);
}
const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote:removeNote,
    listNote:listNote,
    readNote:readNote,
    findnote:findnote
}