let adrese = window.location.hash
adrese = decodeURI(adrese)
adrese = adrese.replace("#", "")
adrese = adrese.split(",")
let niks = adrese[0]

document.querySelector(".virsraksts").innerHTML = niks + " - spēle sākas!"

window.addEventListener('load', function(){
    let pogaGeneret = document.getElementById('generet');
    let select = document.getElementById('izvele');

    pogaGeneret.addEventListener('click', async function(){
        let izvele = select.options[select.selectedIndex].value;    
        let saite = "/generet/" + niks + "/" + izvele;        
        let atbilde = await fetch(saite);
        let atbildeJson = await atbilde.json()

        spelesLaukums();

        console.log(atbildeJson);
        document.getElementById("vards").innerHTML = atbildeJson.vards;
        document.getElementById("result").innerHTML = atbildeJson.hints;
    })
})

function spelesLaukums() {
    let laukums = document.getElementById('spele');

    laukums.innerHTML = "<h2>Sajauktais vārds:<div id='vards'></div></h2><input type='text' id='atbilde'/><br><h3><a id='parb'' onclick = 'parbaudit()' > Pārbaudīt</a ></h3>";

}

async function parbaudit() {
    let vards = document.getElementById('atbilde').value;
    let saite = "/parbaudit/" + niks + "/" + vards;   
    let atbilde = await fetch(saite);
    let atbildeJson = await atbilde.json()
    
    alert(atbildeJson.rezultats);

    if(atbildeJson.status == "1"){
        document.getElementById("vards").innerHTML = "";
        document.getElementById("result").innerHTML = "";
        document.getElementById('atbilde').value = "";
    }

}
