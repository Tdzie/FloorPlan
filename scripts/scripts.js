

var _arrForCashiers;
var breaktimeCashierName = [];
// Event Listeners
//Upload file on change
document.querySelector("#inputGroupFile02").addEventListener("change", Upload);
var counterForjsonLoop = 4;
var counterForLoading = 0;


//Reference elements
var fileUpload = document.querySelector("#inputGroupFile02");
var containerForCashierData = document.querySelector("#containerToFillWithCasherData");

const normalColumnWidthTextAlignLeft = "col border";
const normalColumnWidth = "col border text-center";
const wideColumnWidth = "col-2 border";


function Upload() {

if (typeof (FileReader) != "undefined") {
    var reader1 = new FileReader();

    //For Browsers other than IE.
    if (reader1.readAsBinaryString) {
        reader1.onloadend = function (e) {
            ProcessExcel(e.target.result);
        };
        reader1.readAsBinaryString(fileUpload.files[0]);
    } else {
        //For IE Browser.
        reader.onload = function (e) {
            var data1 = "";
            var bytes1 = new Uint8Array(e.target.result);
            for (var i = 0; i < bytes1.byteLength; i++) {
                data1 += String.fromCharCode(bytes1[i]);
            }
            ProcessExcel(data);
        };
        reader1.readAsArrayBuffer(fileUpload.files[0]);
    }
} else {
    alert("This browser does not support HTML5.");
}
};



function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    _arrForCashiers = excelRows;

    console.log(_arrForCashiers);
    
    var arrayOfCashiers = [];

    //Starting index of 4 is the first occurance of the employees.

    while(counterForjsonLoop < excelRows.length){
        arrayOfCashiers.push(buildCashier(excelRows[counterForjsonLoop]));
        counterForjsonLoop++; 
    }

    arrayOfCashiers.forEach((item) =>{main(item)});

    breaktimeCashierName.sort((a,b) => a[0] - b[0]);
    console.log(arrayOfCashiers);
    console.log(breaktimeCashierName);

    var breakTimeDiv = document.createElement("div");
    breakTimeDiv.classList = "breakTimeDiv d-flex flex-column flex-wrap";
    breakTimeDiv.id = "breakDiv";

    containerForCashierData.appendChild(breakTimeDiv);
    var breakDiv = document.getElementById("breakDiv");

    breaktimeCashierName.forEach((item) => {breakDiv.appendChild(addColumn(item[1] + " | " + item[3] + " |    " + item[2], normalColumnWidthTextAlignLeft))})
}

function main(cashierDataPerLine){

    var buildRow = document.createElement("div");
    buildRow.classList = "row";
    buildRow.id = "row" + counterForLoading;
    containerForCashierData.appendChild(buildRow);

    var grabRow = document.getElementById("row" + counterForLoading);

    grabRow.append(addColumn(`${cashierDataPerLine.employeeFirstName} ${cashierDataPerLine.employeeLastName}`, wideColumnWidth));
    grabRow.append(addColumn(" ",normalColumnWidth));
    grabRow.append(addColumn(cashierDataPerLine.employeeRole.split(" ")[0], normalColumnWidth));
    grabRow.append(addColumn(cashierDataPerLine.employeeStartTime, normalColumnWidth));
    grabRow.append(addColumn(cashierDataPerLine.employeeEndTime, normalColumnWidth));
    if(cashierDataPerLine.oneBreak){
        breaktimeCashierName.push([getTwentyFourHourTimeForBreakArray(cashierDataPerLine.setBreaks()),cashierDataPerLine.setBreaks(),`${cashierDataPerLine.employeeLastName} ${cashierDataPerLine.employeeFirstName} `,"B"]);
        grabRow.append(addColumn(cashierDataPerLine.setBreaks(), normalColumnWidth));
        grabRow.append(addColumn("-", normalColumnWidth));
        grabRow.append(addColumn("-", normalColumnWidth));
    }else if(cashierDataPerLine.oneBreakOneLunch){
        breaktimeCashierName.push([getTwentyFourHourTimeForBreakArray(cashierDataPerLine.setBreaks()[0]),cashierDataPerLine.setBreaks()[0],`${cashierDataPerLine.employeeLastName} ${cashierDataPerLine.employeeFirstName}`,"B"]);
        breaktimeCashierName.push([getTwentyFourHourTimeForBreakArray(cashierDataPerLine.setBreaks()[1]),cashierDataPerLine.setBreaks()[1],`${cashierDataPerLine.employeeLastName} ${cashierDataPerLine.employeeFirstName}`,"L"]);
        grabRow.append(addColumn(cashierDataPerLine.setBreaks()[0], normalColumnWidth));
        grabRow.append(addColumn(cashierDataPerLine.setBreaks()[1], normalColumnWidth));
        grabRow.append(addColumn("-", normalColumnWidth));
    }else{
        breaktimeCashierName.push([getTwentyFourHourTimeForBreakArray(cashierDataPerLine.setBreaks()[0]),cashierDataPerLine.setBreaks()[0],`${cashierDataPerLine.employeeLastName} ${cashierDataPerLine.employeeFirstName}`,"B"]);
        breaktimeCashierName.push([getTwentyFourHourTimeForBreakArray(cashierDataPerLine.setBreaks()[1]),cashierDataPerLine.setBreaks()[1],`${cashierDataPerLine.employeeLastName} ${cashierDataPerLine.employeeFirstName}`,"L"]);
        breaktimeCashierName.push([getTwentyFourHourTimeForBreakArray(cashierDataPerLine.setBreaks()[2]),cashierDataPerLine.setBreaks()[2],`${cashierDataPerLine.employeeLastName} ${cashierDataPerLine.employeeFirstName}`,"B"]);
        grabRow.append(addColumn(cashierDataPerLine.setBreaks()[0], normalColumnWidth));
        grabRow.append(addColumn(cashierDataPerLine.setBreaks()[1], normalColumnWidth));
        grabRow.append(addColumn(cashierDataPerLine.setBreaks()[2], normalColumnWidth));
    }

    counterForLoading++;
};


/* Sample JSON DATA
__EMPTY: "DZIEDZIC, TIMOTHY M"
__EMPTY_4: "CSM"
__EMPTY_5: "6:00 AM"
__EMPTY_6: "2:30 PM"
__EMPTY_7: "11:30 AM"
__EMPTY_8: "2"
__EMPTY_10: "8.5"
*/

// "Dziedzic, Timothy M"
function splitFullNameIntoFirst(name){
return name.split(",")[0];
}

function splitFullNameIntoLast(name){
    return name.split(" ")[1];
}
// TODO
function fixTimes(time){
time.split(" ")[0];
time.split(":");
if(time[1].spice(1,1) == 9){
    time = (time[0]++) +";" + [time[1]++];
}
}


// build the cashiers from the json array
function buildCashier(cashierData){
    return new cashier(
    splitFullNameIntoFirst(cashierData.__EMPTY),
    splitFullNameIntoLast(cashierData.__EMPTY),
    getTwentyFourHourTime(cashierData.__EMPTY_5),
    getTwentyFourHourTime(cashierData.__EMPTY_6),
    cashierData.__EMPTY_4);
}

// return 24 hour time
function getTwentyFourHourTime(amPmString) {
    try {
            var dateString = new Date("1/1/2023 " + amPmString); 
            if(dateString.getMinutes() == "0"){
            return dateString.getHours() + ":" + "00";
        }else{
            return dateString.getHours() + ':' + dateString.getMinutes()
        }    
    } catch (error) {
        return error;
    } 


}
function getTwentyFourHourTimeForBreakArray(amPmString) {
    try {
            var dateString = new Date("1/1/2023 " + amPmString); 
            if(dateString.getMinutes() == "0"){
            return dateString.getHours() + "." + "00";
        }else{
            return dateString.getHours() + '.' + dateString.getMinutes()
        }    
    } catch (error) {
        return error;
    } 


}



function addColumn(cashier, widthOfCol){
    var buildCol = document.createElement("div");
    buildCol.classList = widthOfCol;
    buildCol.innerHTML = cashier;
    return buildCol;
};

