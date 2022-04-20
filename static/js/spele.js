let adrese = window.location.hash
adrese = decodeURI(adrese)
adrese = adrese.replace("#", "")
adrese = adrese.split(",")
let niks = adrese[0]

document.querySelector(".virsraksts").innerHTML = niks + " - spēle sākas!"

window.addEventListener('load', function () {
    let pogaGeneret = document.getElementById('generet');
    let select = document.getElementById('izvele');

    pogaGeneret.addEventListener('click', async function () {
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

    if (atbildeJson.status == "1") {
        document.getElementById("vards").innerHTML = "";
        document.getElementById("result").innerHTML = "";
        document.getElementById('atbilde').value = "";
    }

}


function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('pulkstenis').innerHTML = h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}
var i = 0;
function move() {
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var width = 1;
        var id = setInterval(frame, 360);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
                alert('Tava spēle ir beigusies!');
                window.location = "/rekordisti";
            } else {
                width++;
                elem.style.width = width + "%";
                elem.innerHTML = width + "%";
            }
        }
    }
}

