let adrese = window.location.hash
adrese = decodeURI(adrese)
adrese = adrese.replace("#", "")
adrese = adrese.split(",")
let niks = adrese[0]

let ienakosaisJiksons = "";
document.querySelector(".virsraksts").innerHTML = niks + " - spēle sākas!"
console.log(adrese)

let vards = "";
let vards2 = "";

let vardi4 = ['koks', 'kāja', 'labs', 'lini', 'logs', 'daba', 'dēls', 'egle', 'ezis', 'gads', 'gods', 'govs', 'dēle', "kaza", "maza", "ķeza", "roka", "alus", "māsa", "māte", "tēvs", "kaps", "āzis", "pupa", "odze"];
let vardi5 = ['kaķis', 'kakls', 'kalns', 'kauls', 'kļava', 'krūms', 'lācis', 'laiks', 'laime', 'laiva', 'lapsa', 'lauks', 'liepa', 'dzīve', 'ezers', 'šķēle', "žurka", "burka", "biete"];
let vardi6 = ['karogs', 'kleita', 'kalējs', 'komats', 'krekls', 'krēsls', 'kurmis', 'kurpes', 'krūtis', 'labība', 'lietus', 'nedēļa', 'laipns', "dibens", "zibens", "klaips"]
let vardi7 = ['kadiķis', 'Kurzeme', 'Latgale', 'Vidzeme', 'Zemgale', 'nākotne', 'pasaule', 'pirksts', 'pērkons', 'pilsēta', 'rietumi', 'smiltis', 'sudrabs']
let vardi8 = ['kukainis', 'liktenis', 'pīlādzis', 'taurenis', 'uzdevums', 'vecāmāte', 'zīdainis', 'zemnieks', 'zvaigzne', 'folklora', 'dzimtene', 'dzeltens']
let vardi9 = ['gliemezis', 'dzirnavas', 'draudzība', 'dzejnieks', 'biezpiens', 'mīlestība', 'patiesība', 'pavasaris', 'skolotājs', 'zvejnieks', 'zvirbulis']
let vardi10 = ['kartupelis', 'lakstīgala', 'varavīksne', 'basketbols', 'rakstnieks', 'Lieldienas', 'strēlnieks', 'valodnieks'];

let ieprVards = "";
let ieprVards2 = "";
let ieprVards3 = "";
let fvardi = "";
let failaNosaukums = "";
function generet() {
    let select = document.getElementById('izvele');
    let izvele = select.options[select.selectedIndex].value;
    let vardi = "";
    let vvdrdsObj = Object

    if (izvele == 4) {
        vardi = vardi4;
        fvardi = "vardi4";
    } else if (izvele == 5) {
        vardi = vardi5;
        fvardi = "vardi5";
    } else if (izvele == 6) {
        vardi = vardi6;
        fvardi = "vardi6";
    } else if (izvele == 7) {
        vardi = vardi7;
        fvardi = "vardi7";
    } else if (izvele == 8) {
        vardi = vardi8;
        fvardi = "vardi8";
    } else if (izvele == 9) {
        vardi = vardi9;
        fvardi = "vardi9";
    } else if (izvele == 10) {
        vardi = vardi10;
        fvardi = "vardi10";
    }
    // šis ir no apakšas

    let randomNr = getRandomInt(vardi.length - 1);


    vards = vardi[randomNr];

    while (ieprVards == vards && ieprVards2 == vards && ieprVards3 == vards) { //Ja iepriekšējais minētais vārds sakrīt ar šo
        randomNr = getRandomInt(vardi.length - 1);
        vards = vardi[randomNr];;
    }

    // šis ir no apakšas

    // 


    // Šeit ielādējam datus no vardu faila

    failaNosaukums = "/vardi/" + izvele;
    console.log(failaNosaukums)

    async function fetchTest() {
        let response = await fetch(failaNosaukums);
        let responseText = await getTextFromStream(response.body);

        ienakosaisJiksons = responseText;

        const obj = JSON.parse(ienakosaisJiksons);
        document.getElementById("result").innerHTML = "Hints: " + obj.vardiFaila[randomNr].hints;
        //document.getElementById('result').innerHTML = responseText;
    }

    async function getTextFromStream(readableStream) {
        let reader = readableStream.getReader();
        let utf8Decoder = new TextDecoder();
        let nextChunk;

        let resultStr = '';

        while (!(nextChunk = await reader.read()).done) {
            let partialData = nextChunk.value;
            resultStr += utf8Decoder.decode(partialData);
        }

        return resultStr;
    }

    (async () => {
        await fetchTest();
    })();



    // Šeit beidzas ielāde
    spelesLaukums();

    // let randomNr = getRandomInt(vardi.length - 1);
    // random šeit
    vards2 = sajaukt(vards);

    while (vards2 == vards) { // Ja sajauktais vārds sakrīt ar minamo vārdu
        vards2 = sajaukt(vards);
    }


    document.getElementById("vards").innerHTML = vards2;

}
function sajaukt(jVards) {
    var arr = jVards.split('');           // Convert String to array
    var n = arr.length;              // Length of the array

    for (var i = 0; i < n - 1; ++i) {
        var j = getRandomInt(n);       // Get random of [0, n-1]

        var temp = arr[i];             // Swap arr[i] and arr[j]
        arr[i] = arr[j];
        arr[j] = temp;
    }

    s = arr.join('');                // Convert Array to string
    return s;                        // Return shuffled string
}

function getRandomInt(n) {
    return Math.floor(Math.random() * n);
}

function spelesLaukums() {
    let laukums = document.getElementById('spele');

    laukums.innerHTML = "<h2>Sajauktais vārds:<div id='vards'></div></h2><input type='text' id='atbilde'/><br><h3><a id='parb'' onclick = 'parbaudit()' > Pārbaudīt</a ></h3>";

}

function parbaudit() {
    let atbilde = document.getElementById('atbilde').value;
    atbilde = atbilde.toLowerCase();
    vards = vards.toLowerCase();
    if (atbilde == vards) {
        alert('Apsveicu pareizi!');
        ieprVards3 = ieprVards2
        ieprVards2 = ieprVards;
        ieprVards = vards;
        generet();
    } else {
        alert('Mēģini vēlreiz');
    }
}
