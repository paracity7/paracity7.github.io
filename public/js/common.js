function setCookie(key, value, expiry) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

function googleTranslateElementInit() {
    setCookie('googtrans', '/kr/vi', 1);
    new google.translate.TranslateElement({
        pageLanguage: 'kr'
    }, 'google_translate_element');
}

function onLoadPage(maxChap) {
    createDropDown(maxChap);
    readTextFile();
    disableButtonPrevNext();
}

function toggleButton() {
    var div = document.getElementById('set-new-chap');
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'block';
    }
}

function getPreviousChap() {
    var currentChapValue = Number(document.getElementById("chap_list").value);
    disableButtonPrevNext();
    if (currentChapValue) {
        var prevChap = (Number(currentChapValue) - 1);
        prevChap = pad(prevChap, 3);
        if (prevChap > 0) {
            changeChap(prevChap);
            document.getElementById("chap_list").value = prevChap;
        }

        disableButtonPrevNext();
    }
}

function getNextChap() {
    var currentChapValue = Number(document.getElementById("chap_list").value);
    if (currentChapValue >= 0) {
        var nextChap = (Number(currentChapValue) + 1);
        nextChap = pad(nextChap, 3);
        var maxChap = document.getElementById("chap_list").length -1 ;
        if (nextChap <= maxChap) {
            changeChap(nextChap);
            document.getElementById("chap_list").value = nextChap;
        }
        disableButtonPrevNext();
    }
}

function disableButtonPrevNext() {
    var currentChapValue = Number(document.getElementById("chap_list").value);
    var maxChap = document.getElementById("chap_list").length - 1;
    document.getElementById("prev_chap").disabled = currentChapValue <= 1;

    document.getElementById("next_chap").disabled = currentChapValue >= maxChap;
}

function createDropDown(maxChap) {
    var elm = document.getElementById('chap_list'),
        df = document.createDocumentFragment();

    elm.innerHTML = "";
    var defaultOp = document.createElement('option');
    defaultOp.value = "";
    defaultOp.appendChild(document.createTextNode("Select Chapter"));
    df.appendChild(defaultOp)

    var currentSourceLanguage = document.getElementById('change_source_language').value
    var dir = "chap/" + currentSourceLanguage;

    for (var i = 1; i <= maxChap; i++) {
        var fullNum = pad(i, 3);
        var option = document.createElement('option');
        option.value = fullNum;
        option.appendChild(document.createTextNode("Chapter " + fullNum));
        df.appendChild(option);
    }
    elm.appendChild(df);
}

function pad(n, length) {
    var len = length - (''+n).length;
    return (len > 0 ? new Array(++len).join('0') : '') + n
}

function changeChap(currentChapValue) {
    var currentSourceLanguage = document.getElementById('change_source_language').value
    var file = "chap/" + currentSourceLanguage + "/" + currentChapValue + ".txt";
    document.getElementById('tbMain').innerHTML = null;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                document.getElementById('tbMain').innerHTML = rawFile.responseText;
            }
        }
    }
    document.getElementById('title-chap').innerHTML = "Solo Farming - Chap " + currentChapValue;
    window.scrollTo({top: 0});
    rawFile.send(null);
}

function readTextFile() {
    var currentChapValue = Number(document.getElementById("chap_list").value);
    disableButtonPrevNext();
    if (currentChapValue) {
        changeChap(pad(currentChapValue, 3));
    }
}

function goToChap() {
    var chap = Number(document.getElementById("go_to_chap").value);
    chap = pad(chap, 3);
    changeChap(chap);
    document.getElementById("chap_list").value = chap;
}