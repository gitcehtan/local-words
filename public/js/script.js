const form = document.getElementsByTagName('form')[0];
const word = document.getElementById('word');
const meaning = document.getElementById('meaning');
const errorWord = document.getElementById('word-error');

let dataToSend = {
    word,
    meaning,
    synonyms,
    antonyms,
    example
};


const handleWord = async (e) => {
    e.preventDefault();
    console.log("Button clicked ",word.value, meaning.value)
    if(word.value !="" && meaning.value != ""){
      dataToSend = {
        word: word.value,
        meaning: meaning.value,
        synonyms: synonyms.value,
        antonyms: antonyms.value,
        example: example.value
      }
   
     const errors = await sendData(dataToSend);
    
     if(errors?.word){
      errorWord.innerText = errors.word;
     }
    }

    word.value = "";
    meaning.value = "";
    synonyms.value = "";
    antonyms.value = "";
    example.value = "";

    // e.word.value = "";
    // e.meaning.value = "";
    // e.synonyms.value = "";
    // e.antonyms.value = "";
    // e.example.value = "";
}

form.addEventListener('submit', handleWord);



// Example data to send

  
  // Function to send data to the server
  async function sendData(data) {
    let errors ={};

      try {
          const response = await fetch('http://localhost:3000/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
                },
              body: JSON.stringify(data)
                
            });
          
      if (response.ok) {
        const responseData = await response.text();
        console.log('Server response:', responseData);
        // errors = JSON.parse(responseData);
        errors = responseData;
        return errors;
        
      } else {
        // console.error('Server error:', response.statusText);
        console.log(errors);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }
  
  // Call the function to send data
 
  