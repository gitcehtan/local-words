const innerContainer = document.getElementById('innerContainer');

const getData = async (date) => {

    
    const data = await fetch(`http://213.210.36.56:3000/words/${date}`);
    const json = await data.json();
    console.log(json);

    return json;

    


}
document.onload

async function showData(date){
    innerContainer.innerHTML = ``;
    let response;
    if(date != null)
    {
         response = await getData(date);
    }else{
         const d = new Date().toISOString().replace('Z', '+00:00');;
         response = await getData(d);

    }

    
    response.map((data)=>{
        let content = `
                <div id="box">
                    <div id="word"><b>Word</b> : ${data.word}</div>
                    <div id="meaning"><b>Meaning</b> : ${data.meaning}</div>
                    <div id="synonyms"><b>Synonyms</b> : ${data.synonyms}</div>
                    <div id="antonyms"><b>Antonyms</b> : ${data.antonyms}</div>
                    <div id="example"><b>Example</b> : ${data.example}</div>
                </div>  
    `;
    let p = document.createElement('p');
    p.innerHTML = content;

    innerContainer.appendChild(p);
  });
}
document.getElementById("dateInput").addEventListener("change", function() {
    let input = this.value;
    let dateEntered = new Date(input).toISOString().replace('Z', '+00:00');

    showData(dateEntered);

});

// let dateEntered = new Date().toISOString().replace('Z', '+00:00');

// console.log("Todays Date ",dateEntered);

// showData(dateEntered);