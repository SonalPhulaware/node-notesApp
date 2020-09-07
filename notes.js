const fs = require('fs');
const chalk = require('chalk');
const { title } = require('process');

debugger

const listNotes = () => {
    console.log(chalk.blue.inverse("\n\t Your Notes....\n"));

    const notes = loadNotes();

    notes.forEach(note => {
        console.log(chalk.magenta.inverse("\t"+note.title));
    });
    
};



const addNotes = (title,body)=> {
    const notes = loadNotes(); 

    const duplicatesNote =  notes.filter((note) => note.title === title );

    if(duplicatesNote.length == 0){
        notes.push({
            title:title,
            body:body
        });
        saveNotes(notes);
        console.log("Notes Saved Suceessfully!");
    }else{
        console.log("Already Exists!");
    }
}

saveNotes=(notes) => fs.writeFileSync("notes.json",JSON.stringify(notes)); 

loadNotes = () => {
    try{
        const DataBuffer = fs.readFileSync("notes.json");
        const dataJson = DataBuffer.toString();
        return JSON.parse(dataJson);
    }catch{
        return [];
    }
    
}

const removeNotes = (title)=>{

    const notes = loadNotes();
    let flag=0;
    for(let i=0;i<notes.length;i++){
        if(notes[i].title === title)
        {
            notes.splice(i,1);
            flag=1;
            break;
        }
    }
    if(flag==1){
        saveNotes(notes);
        console.log(chalk.green.inverse("Successfully removed"));
    }else{
        console.log(chalk.red.inverse("Not Found!"));
    }
    

}

const getNotes= (title) => {
    const notes = loadNotes();
    const searchNote = notes.find((note) =>  title === note.title );
    if(searchNote)
    {
        console.log(chalk.blue.inverse("\n"+searchNote.title));
        console.log(chalk.white.inverse("\n"+searchNote.body));
    }
    else{
        console.log(chalk.red.inverse("Note Not Found"));
    }
}
module.exports = {
    getNotes:getNotes,
    addNotes:addNotes,
    removeNotes:removeNotes,
    getNotes:getNotes,
    listNotes:listNotes
}