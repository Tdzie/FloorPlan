

var arrayForWeek = [];


// Event Listeners
document.querySelector("#inputGroupFile02").addEventListener("change", Upload);

var limitRolesForBreaks = document.querySelector("#LimitBreaksCheckbox");
var containerForCashierData = document.getElementById('containerToFillWithCasherDataMonday');





//Reference elements
var fileUpload = document.querySelector("#inputGroupFile02");


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

function organizeDataByWeekday(data) {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let currentDay = null;
    const weekData = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
    };



    for (const item of data) {
        // Check for a day change
        for (const day of daysOfWeek) {
            if (item.__EMPTY && item.__EMPTY.includes(day)) {
                currentDay = day;
                break;
            }
        }

        // If a day is set, add the item to the respective array
        if (currentDay) {
            weekData[currentDay].push(item);
        }
    }

    return weekData;
};

function buildChart(jobTitle, dayOfTheWeek){
    // Array of job titles "Express Cashier", "Regular Cashier", "Another Job Title"
    const scheduleManager = new ScheduleManager();
    scheduleManager.processSchedules(dayOfTheWeek, jobTitle);
    const slotsArray = scheduleManager.getSlotsAsArray();
    console.log(slotsArray);
    const chart = new DivChart(slotsArray);

    const container = chart.createDivs();
    return container;
};

function createDropdown(day, info) {
    var select = document.createElement("select");
    select.id = "jobRoleSelect" + day;

    // Option values
    var options = ['Select Role', "Cashiers", "Cash and Sales", "Office Teammate", "Housekeeping", "Supervisors", "CSM", "Easy Scan Cashier", "Close"];

    // Create and append options
    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.value = options[i];
        option.text = options[i];
        select.appendChild(option);
    }

    // Event listener for the select change
    select.addEventListener('change', function () {
        // Get the selected job title
        var jobTitle = this.value;
        if(jobTitle == 'Cashiers'){
            jobTitle = ['Regular Cashier', 'Express Cashier'];
            // Call the buildChart function with the selected job title and day
            var chartContainer = buildChart(jobTitle, info);
            // Assuming you have a predefined place in your HTML to display the chart
            document.getElementById('chartDisplayArea' + day).innerHTML = ''; // Clear previous chart
            document.getElementById('chartDisplayArea' + day).appendChild(chartContainer);
        }else if( jobTitle == "Close" || jobTitle == "Select Role"){
            document.getElementById('chartDisplayArea' + day).innerHTML = ''; // Clear previous chart
        }else{
            // Call the buildChart function with the selected job title and day
            var chartContainer = buildChart(jobTitle, info);
            // Assuming you have a predefined place in your HTML to display the chart
            document.getElementById('chartDisplayArea' + day).innerHTML = ''; // Clear previous chart
            document.getElementById('chartDisplayArea' + day).appendChild(chartContainer);
        }

    });

    return select;
}



var currentDay = "";
function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    var week = organizeDataByWeekday(excelRows);

    currentDay = "Monday";
    setupForMain(week.Monday);
    currentDay = "Tuesday";
    setupForMain(week.Tuesday);
    currentDay = "Wednesday";
    setupForMain(week.Wednesday);
    currentDay = "Thursday";
    setupForMain(week.Thursday);
    currentDay = "Friday";
    setupForMain(week.Friday);
    currentDay = "Saturday";
    setupForMain(week.Saturday);
    currentDay = "Sunday";
    setupForMain(week.Sunday);
   
    // working to add analysis of days

    const eval = document.getElementById('evaluation');
    let day = document.createElement('h5');
    day.innerText = "Monday";
    let div = document.createElement('div');
    div.id = 'chartDisplayAreaMonday';
    eval.appendChild(day);
    eval.appendChild(div);
    eval.insertBefore(createDropdown('Monday', week.Monday), div);
    eval.appendChild(analyzeDay(week.Monday));
    
    day = document.createElement('h5');
    day.innerText = "Tuesday";
    div = document.createElement('div');
    div.id = 'chartDisplayAreaTuesday';
    eval.appendChild(day);
    eval.appendChild(div);
    eval.insertBefore(createDropdown('Tuesday', week.Tuesday), div);
    eval.appendChild(analyzeDay(week.Tuesday));

    day = document.createElement('h5');
    day.innerText = "Wednesday";
    div = document.createElement('div');
    div.id = 'chartDisplayAreaWednesday';
    eval.appendChild(day);
    eval.appendChild(div);
    eval.insertBefore(createDropdown('Wednesday', week.Wednesday), div);
    eval.appendChild(analyzeDay(week.Wednesday));

    day = document.createElement('h5');
    day.innerText = "Thursday";
    div = document.createElement('div');
    div.id = 'chartDisplayAreaThursday';
    eval.appendChild(day);
    eval.appendChild(div);
    eval.insertBefore(createDropdown('Thursday', week.Thursday), div);
    eval.appendChild(analyzeDay(week.Thursday));

    day = document.createElement('h5');
    day.innerText = "Friday";
    div = document.createElement('div');
    div.id = 'chartDisplayAreaFriday';
    eval.appendChild(day);
    eval.appendChild(div);
    eval.insertBefore(createDropdown('Friday', week.Friday), div);
    eval.appendChild(analyzeDay(week.Friday));

    day = document.createElement('h5');
    day.innerText = "Saturday";
    div = document.createElement('div');
    div.id = 'chartDisplayAreaSaturday';
    eval.appendChild(day);
    eval.appendChild(div);
    eval.insertBefore(createDropdown('Saturday', week.Saturday), div);
    eval.appendChild(analyzeDay(week.Saturday));

    day = document.createElement('h5');
    day.innerText = "Sunday";
    div = document.createElement('div');
    div.id = 'chartDisplayAreaSunday';
    eval.appendChild(day);
    eval.appendChild(div);
    eval.insertBefore(createDropdown('Sunday', week.Sunday), div);
    eval.appendChild(analyzeDay(week.Sunday));

}



function analyzeDay(day){
    // Opening cashier          6AM
    let cashierAM = false;
    // Closing cashier          11PM
    let cashierPM = false;
    // Cash and sales           730AM
    let cashAndSales = false;
    // Office open              8AM
    let officeAM = false;
    // Office close             730PM
    let officePM = false;
    // Opening Housekeeping     8AM
    let housekeepingAM = false;
    // Closing Housekeeping     9PM
    let housekeepingPM = false;
    // Easy scan open           830AM
    let easyScanAM  = false;
    // Easy scan close          9PM
    let easyScanPM = false;


    /*
    __EMPTY: "DZIEDZIC, TIMOTHY M"
    __EMPTY_4: "CSM"
    __EMPTY_5: "7:30 AM"
    __EMPTY_6: "4:00 PM"
    __EMPTY_7: "12:00 PM"
    __EMPTY_8: "2"
    __EMPTY_10: "8.5"
    */

    /*
    CSM
    Cash and Sales
    Easy Scan Cashier
    Express Cashier
    Housekeeping
    Office Teammate
    PAC
    PCC
    Regular Cashier
    Supervisor
    */

    day.forEach((person) => {
            if(!person.__EMPTY.includes('Schedule')){
                var startingTime = convertTo24Hour(person.__EMPTY_5);
                var endingTime = convertTo24Hour(person.__EMPTY_6);
            }


        switch (person.__EMPTY_4) {
            case 'Regular Cashier':
            case 'Express Cashier':
            case 'Supervisor':
            case 'CSM':
                if (startingTime <= 600){
                    cashierAM = true;
                }else if(endingTime >= 2300){
                    cashierPM = true;
                }
                break;
            case 'Cash and Sales':
                if (startingTime <= 730) {
                    cashAndSales = true;
                }
                break;
            case 'Office Teammate':
                if (startingTime <= 800) {
                    officeAM = true;
                }else if(endingTime >= 1930){
                    officePM = true;
                }
                break;
            case 'Housekeeping':
                if(startingTime <= 900){
                    housekeepingAM = true;
                }else if(endingTime >= 2100){
                    housekeepingPM = true;
                }
                break;
            case 'Easy Scan Cashier':
                    if (startingTime <= 900) {
                        easyScanAM = true;
                    }else if(endingTime >= 2100){
                        easyScanPM = true;
                    }
                break;
            default:
                break;
        }
    })
    let cashiers = ['Regular Cashier', 'Express Cashier'];
    let cashnSales = ['Cash and Sales'];
    let office = ['Office Teammate'];
    let Housekeeping = ['Housekeeping'];

    let inner = document.createElement('li');
    const result = document.createElement('ul');
    result.classList = "result";
    if (!cashierAM) {
        inner = document.createElement('li');
        inner.innerText = "No opening cashier.";
        result.appendChild(inner);
        console.log(day);
        //result.appendChild(buildChart(cashiers, day));
    }
    if(!cashierPM){
        inner = document.createElement('li');
        inner.innerText = "No closing cashier.";
        result.appendChild(inner);
       // result.appendChild(buildChart(cashiers, day));
    }
    if (!cashAndSales) {
        inner = document.createElement('li');
        inner.innerText = "No cash and sales.";
        result.appendChild(inner);
        //result.appendChild(buildChart(cashnSales, day));
    }
    if (!officeAM) {
        inner = document.createElement('li');
        inner.innerText = "No opening office.";
        result.appendChild(inner);
        //result.appendChild(buildChart(office, day));
    }
    if (!officePM) {
        inner = document.createElement('li');
        inner.innerText = "No closing office.";
        result.appendChild(inner);
       // result.appendChild(buildChart(office, day));
    }
    if (!housekeepingAM) {
        inner = document.createElement('li');
        inner.innerText = "No closing maintanence.";
        result.appendChild(inner);
    }
    if (!housekeepingPM) {
        inner = document.createElement('li');
        inner.innerText = "No closing maintanence.";
        result.appendChild(inner);
    }
    if (!easyScanAM) {
        inner = document.createElement('li');
        inner.innerText = "No opening Easy-scan";
        result.appendChild(inner);
    }
    if (!easyScanPM) {
        inner = document.createElement('li');
        inner.innerText = "No closing easy-scan.";
        result.appendChild(inner);
    }

    return(result);

}

function convertTo24Hour(timeStr) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return parseInt(`${hours}${minutes}`, 10);
}



// Completed 12/15/23 working with multiple days.
var breaktimeCashierName = [];
var arrayOfCashiers = [];
//var lanes = new registers;
var counterForjsonLoop = 1;



function setupForMain(day) {
    containerForCashierData = document.getElementById('containerToFillWithCasherData' + currentDay);
    counterForjsonLoop = 1;
    breaktimeCashierName = [];
    arrayOfCashiers = [];

    document.getElementById(`dayAndDate${currentDay}`).innerHTML = day[0].__EMPTY;

    window.scheduler = new Scheduler(); // Reset scheduler

    while (counterForjsonLoop < day.length) {
        const person = day[counterForjsonLoop];

        window.scheduler.addCashier([
            getTwentyFourHourTimeForBreakArray(person.__EMPTY_5),
            getTwentyFourHourTimeForBreakArray(person.__EMPTY_6),
            splitFullNameIntoFirst(person.__EMPTY),
            splitFullNameIntoLast(person.__EMPTY),
            person.__EMPTY_4
        ]);

        arrayOfCashiers.push(buildCashier(person, counterForjsonLoop));
        counterForjsonLoop++;
    }

    window.scheduler.assignLanes();

    // Cache assignment results
    const assignments = window.scheduler.getCashierAssignments();

    arrayOfCashiers.forEach((cashier, i) => {
        // Assign lane from scheduler's output
        const assigned = assignments.find(a =>
            a.name.includes(cashier.employeeFirstName.trim()) &&
            a.name.includes(cashier.employeeLastName.trim())
        );
        if (assigned) {
            cashier.lane = assigned.lane;
        }
        main(cashier);
    });

    breaktimeCashierName.sort((a, b) => a[0] - b[0]);

        // Add sorted list of cashiers in a list at the bottom of the lane assignments
        if (limitRolesForBreaks.checked) {
            breakDiv.appendChild(addColumn("<strong>Breaks and lunches sorted by time</strong>", normalColumnWidth));
            breaktimeCashierName.forEach((item) => { if (limitTheRolesAllowedForBreaks(item[4])) { breakDiv.appendChild(addColumn("&emsp;" + item[1] + " | " + item[3] + " |    " + item[2], normalColumnWidthTextAlignLeft)) } });
        } else {
            breaktimeCashierName.forEach((item) => { breakDiv.appendChild(addColumn("&emsp;" + item[1] + " | " + item[3] + " |    " + item[2], normalColumnWidthTextAlignLeft)) });
        }
}




    var counterForLoading = 0;

function main(cashierDataPerLine){

    var buildRow = document.createElement("div");
    buildRow.classList = "row";
    buildRow.id = "row" + counterForLoading;
    containerForCashierData.appendChild(buildRow);

    var grabRow = document.getElementById("row" + counterForLoading);
    //Name
    grabRow.append(addColumn(`${cashierDataPerLine.employeeFirstName} ${cashierDataPerLine.employeeLastName}`, wideColumnWidth));
    //Lane Assignment
    // Lane Assignment
    if (checkRoleForLaneAssignment(cashierDataPerLine.employeeRole)) {
        grabRow.append(addColumn(cashierDataPerLine.lane || "B", normalColumnWidth));
    } else {
        grabRow.append(addColumn("-", normalColumnWidth));
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
function buildCashier(cashierData,number){
    // check if the cashier is already in the array
    return new cashier(
    splitFullNameIntoFirst(cashierData.__EMPTY),
    splitFullNameIntoLast(cashierData.__EMPTY),
    getTwentyFourHourTime(cashierData.__EMPTY_5),
    getTwentyFourHourTime(cashierData.__EMPTY_6),
    cashierData.__EMPTY_4,
    number);
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

document.addEventListener("DOMContentLoaded", function () {
    // Get the button that opens the popup
    var btn = document.getElementById("selectButton");

    // Get the popup window element
    var popup = document.getElementById("popupWindow");

    // Event listener to open the popup
    btn.addEventListener("click", function () {
        popup.style.display = "block";
    });

    // You can add more functionality here like closing the popup
    // when clicking outside of it or on a close button.
});