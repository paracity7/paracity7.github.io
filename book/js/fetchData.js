//fetch the data

fetch(sheet_csv)
    .then(function(response){return response.text();})
    .then(function(data){
        arr2tbl(Papa.parse(data, {header:true}).data)
    });

//parse the data
function parseData(data){
    let gson = Papa.parse(data, {header:true}).data;
    arr2tbl(gson);
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

function arr2tbl(array){
    let tableString="<tr>"
    for(let column in array[0]){
        if (column === urlEditResponse) {
            tableString+=`<th>Edit</th>`
        } else {
            tableString+=`<th>${column}</th>`
        }
    }
    tableString+="</tr>"
    array.forEach(element => {
        tableString+="<tr>"
        for(let prop in element){
            if (prop === urlEditResponse) {
                if (element[prop] !== "") {
                    tableString+=`<td><a href="${element[prop]}" target="_blank">Edit</a></td>`
                } else {
                    tableString+=`<td>Edit</td>`
                }
            } else {
                tableString+=`<td>${element[prop]}</td>`
            }
        }
        tableString+="</tr>"
    });
    document.querySelector(idTable).innerHTML=tableString;
}
