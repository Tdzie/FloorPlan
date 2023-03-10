

// Event Listeners
document.querySelector("#inputGroupFile02").addEventListener("change", Upload);

var limitRolesForBreaks = document.querySelector("#LimitBreaksCheckbox");
// Loop Counters
var counterForjsonLoop = 4;
var counterForLoading = 0;

//Arrays for storing cashiers
var _arrForCashiers;
var breaktimeCashierName = [];
var arrayOfCashiers = [];


// for lane assignments
var lanes = new registers;


//Reference elements
var fileUpload = document.querySelector("#inputGroupFile02");
var containerForCashierData = document.querySelector("#containerToFillWithCasherData");

// bootstrap column width classes
const normalColumnWidthTextAlignLeft = "col border border-dark";
const normalColumnWidth = "col border text-center border-dark";
const wideColumnWidth = "col-2 border border-dark";


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
    

    //Starting index of 4 is the first occurance of the employees.

    while(counterForjsonLoop < excelRows.length){
        arrayOfCashiers.push(buildCashier(excelRows[counterForjsonLoop]));

        lanes.buildArrayOfCashierForLaneAssignments([
            getTwentyFourHourTimeForBreakArray(excelRows[counterForjsonLoop].__EMPTY_5),
            getTwentyFourHourTimeForBreakArray(excelRows[counterForjsonLoop].__EMPTY_6),
            splitFullNameIntoLast(excelRows[counterForjsonLoop].__EMPTY),
            splitFullNameIntoFirst(excelRows[counterForjsonLoop].__EMPTY),
            excelRows[counterForjsonLoop].__EMPTY_4]
        )
        counterForjsonLoop++; 
    }
    lanes.assignRegister();
    lanes.logArray();
    arrayOfCashiers.forEach((item) =>{main(item)});
    // sort the array of cashier for breaks
    breaktimeCashierName.sort((a,b) => a[0] - b[0]);

    console.log(arrayOfCashiers);
    console.log(breaktimeCashierName);

    // create and add a div for sorted break time by cashier container
    var breakTimeDiv = document.createElement("div");
    breakTimeDiv.classList = "breakTimeDiv d-flex flex-column flex-wrap";
    breakTimeDiv.id = "breakDiv";
    containerForCashierData.appendChild(breakTimeDiv);
    var breakDiv = document.getElementById("breakDiv");

    // Add sorted list of cashiers in a list at the bottom of the lane assignments
    if(limitRolesForBreaks.checked){
        breakDiv.appendChild(addColumn("<strong>Breaks and lunches sorted by time</strong>", normalColumnWidth));
        breaktimeCashierName.forEach((item) => { if (limitTheRolesAllowedForBreaks(item[4])) { breakDiv.appendChild(addColumn("&emsp;" + item[1] + " | " + item[3] + " |    " + item[2], normalColumnWidthTextAlignLeft))}});
    }else{
        breaktimeCashierName.forEach((item) => {breakDiv.appendChild(addColumn("&emsp;" + item[1] + " | " + item[3] + " |    " + item[2], normalColumnWidthTextAlignLeft))});
    }

    // Add the end time of each register at the back of the list of breaks
    breakDiv.appendChild(addColumn("&emsp;" + lanes.lanesUsedByEndTime,normalColumnWidthTextAlignLeft))
}

function main(cashierDataPerLine){

    var buildRow = document.createElement("div");
    buildRow.classList = "row";
    buildRow.id = "row" + counterForLoading;
    containerForCashierData.appendChild(buildRow);

    var grabRow = document.getElementById("row" + counterForLoading);
    //Name
    grabRow.append(addColumn(`${cashierDataPerLine.employeeFirstName} ${cashierDataPerLine.employeeLastName}`, wideColumnWidth));
    //Lane Assignment
    if(checkRoleForLaneAssignment(cashierDataPerLine.employeeRole)){

        lanes.cashierWithLanesAssigned.forEach((element)=>{
            if(element[3] == cashierDataPerLine.employeeFirstName && element[2] == cashierDataPerLine.employeeLastName){
                grabRow.append(addColumn(element[5], normalColumnWidth)); 
            }
        });

    }else{
        grabRow.append(addColumn(` `,normalColumnWidth));
    }
    //Role
    grabRow.append(addColumn(cashierDataPerLine.employeeRole.split(" ")[0], normalColumnWidthTextAlignLeft));
    //Starting time
    grabRow.append(addColumn(cashierDataPerLine.employeeStartTime, normalColumnWidth));
    //Ending Time
    grabRow.append(addColumn(cashierDataPerLine.employeeEndTime, normalColumnWidth));
    //Check the number of breaks the cashier has and run the correct function.
    if(cashierDataPerLine.oneBreak){
        breaktimeCashierName.push([getTwentyFourHourTimeForBreakArray(cashierDataPerLine.setBreaks()),cashierDataPerLine.setBreaks(),`${cashierDataPerLine.employeeLastName} ${cashierDataPerLine.employeeFirstName} `,"B",cashierDataPerLine.employeeRole]);
        grabRow.append(addColumn(cashierDataPerLine.setBreaks(), normalColumnWidth));
        grabRow.append(addColumn("-", normalColumnWidth));
        grabRow.append(addColumn("-", normalColumnWidth));
    }else if(cashierDataPerLine.oneBreakOneLunch){
        breaktimeCashierName.push([getTwentyFourHourTimeForBreakArray(cashierDataPerLine.setBreaks()[0]),cashierDataPerLine.setBreaks()[0],`${cashierDataPerLine.employeeLastName} ${cashierDataPerLine.employeeFirstName}`,"B",cashierDataPerLine.employeeRole]);
        breaktimeCashierName.push([getTwentyFourHourTimeForBreakArray(cashierDataPerLine.setBreaks()[1]),cashierDataPerLine.setBreaks()[1],`${cashierDataPerLine.employeeLastName} ${cashierDataPerLine.employeeFirstName}`,"L",cashierDataPerLine.employeeRole]);
        grabRow.append(addColumn(cashierDataPerLine.setBreaks()[0], normalColumnWidth));
        grabRow.append(addColumn(cashierDataPerLine.setBreaks()[1], normalColumnWidth));
        grabRow.append(addColumn("-", normalColumnWidth));
    }else{
        breaktimeCashierName.push([getTwentyFourHourTimeForBreakArray(cashierDataPerLine.setBreaks()[0]),cashierDataPerLine.setBreaks()[0],`${cashierDataPerLine.employeeLastName} ${cashierDataPerLine.employeeFirstName}`,"B",cashierDataPerLine.employeeRole]);
        breaktimeCashierName.push([getTwentyFourHourTimeForBreakArray(cashierDataPerLine.setBreaks()[1]),cashierDataPerLine.setBreaks()[1],`${cashierDataPerLine.employeeLastName} ${cashierDataPerLine.employeeFirstName}`,"L",cashierDataPerLine.employeeRole]);
        breaktimeCashierName.push([getTwentyFourHourTimeForBreakArray(cashierDataPerLine.setBreaks()[2]),cashierDataPerLine.setBreaks()[2],`${cashierDataPerLine.employeeLastName} ${cashierDataPerLine.employeeFirstName}`,"B",cashierDataPerLine.employeeRole]);
        grabRow.append(addColumn(cashierDataPerLine.setBreaks()[0], normalColumnWidth));
        grabRow.append(addColumn(cashierDataPerLine.setBreaks()[1], normalColumnWidth));
        grabRow.append(addColumn(cashierDataPerLine.setBreaks()[2], normalColumnWidth));
    }
    counterForLoading++;





};

function limitTheRolesAllowedForBreaks(role){
    switch (role) {
        case "Express Cashier":
        case "Regular Cashier":
        case "Courtesy Clerk":
        case "Supervisor":
        case "CSM":
        case "Cash and Sales":
        case "Easy Scan Cashier":
        case "Office Teammate":
        case "Shopper":
            return true;
    
        default:
            return false;
    }
}

function checkRoleForLaneAssignment(role){
    switch (role) {
        case "Express Cashier":
        case "Regular Cashier":
        case "Courtesy Clerk":
        case "Supervisor":
            return true;   
        default:
            return false;
    }
}


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

