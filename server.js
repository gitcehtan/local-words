const express = require("express");
const path = require("path");
require('dotenv').config()
const mongoose = require("mongoose");
const Word = require("./models/word.js");
const app = express();
const cors = require("cors");

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());

// Adding the data to the database

const InsertWordData = async (data) => {
    let errors = {word: "", meaning: ""};
    try {
      
        await Word.insertMany(data);
      console.log("Dummy data inserted successfully");
    } catch (err) {
      
      if(err.code === 11000){
        
        errors.word = `${data.word} already exists in wordlist`;
        return errors;
        }
      else{
        console.log(err);
      }

    }
}



// database connection
const dbURI = process.env.MongoDB_URI;
const PORT = process.env.PORT;


mongoose.connect(dbURI)
  .then((result) => app.listen(PORT,()=> {console.log(`Server running on http://213.210.36.56:3000`);}))
  .catch((err) => console.log(err));



app.post('/', async (req, res) => {
    const receivedData = req.body;
    console.log('Received Agya  data: ', receivedData);
  
    // Do something with the received data...
    const response =  await InsertWordData(receivedData);
 
    res.send(response);
  });


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,"./public/index.html"));
})
app.get('/wordlist', (req,res) => {
    res.sendFile(path.join(__dirname,"./public/wordlist.html"));
})

app.get('/words/:id', async(req,res) => {

  let date = req.params.id;

  
//  2024-08-08T14:36:09.024+00:00

// console.log("Backend : ",date.substring(0,10));

date = date.substring(0,10);

const startDate = new Date(date);
const endDate = new Date(date);
endDate.setDate(endDate.getDate() + 1);
endDate.setTime(endDate.getTime() - 1);

// console.log("Start Date ",startDate);
// console.log("End Date ",endDate);


  const data = await Word.find({ 
    createdAt: {
      $gte: startDate,
      $lte: endDate
    }
}).sort({createdAt: -1, updatedAt: -1 });




  res.send(data);
})
