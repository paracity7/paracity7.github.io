let dataFromGoogleSheets = "";

//fetch the data
fetch(sheet_csv)
    .then(function(response){return response.text();})
    .then(function(data){
        dataFromGoogleSheets = data;
        arr2tbl(parseData(data));
    });

function search(nameKey, keyOfName){
    document.querySelector(idTable).innerHTML= "";
    const data = dataFromGoogleSheets;
    if (data !== "") {
        let myArray = parseData(data);
        let searchData = myArray.filter(obj => {
            return Object.values(obj).some((val, key) =>{
                if (key === keyOfName) { // key of book name
                    return val.includes(nameKey)
                }
            })
        });
        arr2tbl(searchData);
    }
}

function arr2tbl(array){
    let tableString = "<thead class=\"thead-dark\"><tr>"
    if (array.length === 0) {
        tableString += "Không có kết quả</tr></thead>"
    } else {
        for (let column in array[0]) {
            switch (column) {
                //case urlEditResponse:
                    //tableString += `<th>Edit</th>`
                    //break;
                case bookName:
                case volume:
                case bookShelf:
                    tableString += `<th>${column}</th>`
                    break;
                default:
                    break;
            }
        }
        tableString += "</tr></thead><tbody>"

        array.forEach(element => {
            tableString += "<tr>"
            for (let prop in element) {
                switch (prop) {
                    //case urlEditResponse:
                        //if (element[prop] !== "") {
                            //tableString += `<td><a href="${element[prop]}" target="_blank">Edit</a></td>`
                        //} else {
                            //tableString += `<td>Edit</td>`
                        //}
                        //break;
                    case bookName:
                    case volume:
                    case bookShelf:
                        tableString += `<td>${element[prop]}</td>`
                        break;
                    default:
                        break;
                }
            }
            tableString += "</tr></tbody>"
        });
    }
    document.querySelector(idTable).innerHTML = tableString;
}

//parse the data
function parseData(data){
    return  Papa.parse(data, {header:true}).data;
};

function renderData(gson) {

    let chart = document.querySelector('.chart');
    for(let i=0; i<gson.length; i++) {
        let row_data = gson[i];
        //arr2tbl(row_data)
        console.log(row_data[bookName]);
        // let row_html = `<div class="row"><div class="left"><div  style="width:${row_data["Tên sách"]}%"><span>${row_data["Tên sách"]}</span></div></div><div class="middle">${row_data["Timestamp"]}</div><div class="right"><div style="width:${row_data["Tên tập "]}%"><span>${row_data["Tên tập "]}</span></div></div></div>`;
        // console.log(row_html);
        // chart.innerHTML += row_html;
        // console.log(chart.innerHTML);
    }
}


