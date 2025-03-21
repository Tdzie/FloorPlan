

class registers {

    lane6 = 0;
    lane6Array =[];
    lane7 = 8;
    lane7Array = [];
    lane8 = 0;
    lane8Array = [];
    lane9 = 0;
    lane9Array = [];
    lane10 = 0;
    lane10Array = [];
    lane11 = 0;
    lane11Array = [];
    lane12 = 0;
    lane12Array = [];
    lane13 = 0;
    lane13Array = [];
    lane14 = 0;
    lane14Array = [];

    #cashiers = [];

    #normalLaneAssigned = false;

    constructor(){}
/*
    0: "7.30"
    1: "16.00"
    2: "TIMOTHY"
    3: "DZIEDZIC"
    4: "CSM"
*/
    buildArrayOfCashierForLaneAssignments(cashier){
        if(checkRoleForLaneAssignment(cashier[4])){
            this.#cashiers.push(cashier);
            this.#cashiers.sort((a,b) => a[0] - b[0]);
        }
    }

    logArray(){
   // console.log(this.#cashiers);
    //console.log(this.lane10Array);
    }

    //Accepts starting time, ending time.
    //Must return lane number.
   
    assignRegister(){ 
        this.#cashiers.forEach(element => {
            if(this.checkRoleForLaneAssignment(element[4])){

            let startTime = parseFloat(element[0]);
            let endTime = parseFloat(element[1]);

            if(element[4] == "Supervisor"){
            this.lane12 = element[1];
            this.lane12Array.push([this.#convertToTime(String(startTime)), this.#convertToTime(String(endTime)), element[2],element[3]]);
            element.push("12");
        }else{
  
        if(this.lane7 <= startTime && element[1] != 23.00 && this.#normalLaneAssigned && element[2] != "Roseann"){
            this.lane7 = endTime;
            this.lane7Array.push([this.#convertToTime(String(startTime)), this.#convertToTime(String(endTime)), element[2],element[3]]);
            element.push("7");
        }else if(this.lane10 <= startTime && element[1] != 23.00){
            this.lane10 = endTime;
            this.lane10Array.push([this.#convertToTime(String(startTime)), this.#convertToTime(String(endTime)), element[2],element[3]]);
            element.push("10");

            if(startTime >= 8){
                this.#normalLaneAssigned = true;  
            }

        }else if(this.lane8 <= startTime && (element[1] <= 17.00 || element[1] == 23.00)){
            this.lane8 = endTime;
            this.lane8Array.push([this.#convertToTime(String(startTime)), this.#convertToTime(String(endTime)), element[2],element[3]]);
            element.push("8");
            if(startTime >= 8){
                this.#normalLaneAssigned = true;  
            }
        }else if(this.lane11 <= startTime){
            this.lane11 = endTime;
            this.lane11Array.push([this.#convertToTime(String(startTime)), this.#convertToTime(String(endTime)), element[2],element[3]]);
            element.push("11");
            if(startTime >= 8){
                this.#normalLaneAssigned = true;  
            }
        }else if(this.lane9 <= startTime){
            this.lane9 = endTime;
            this.lane9Array.push([this.#convertToTime(String(startTime)), this.#convertToTime(String(endTime)), element[2],element[3]]);
            element.push("9");
            if(startTime >= 8){
                this.#normalLaneAssigned = true;  
            }
        }else if(this.lane13 <= startTime){
            this.lane13 = endTime;
            this.lane13Array.push([this.#convertToTime(String(startTime)), this.#convertToTime(String(endTime)), element[2],element[3]]);
            element.push("13");
            if(startTime >= 8){
                this.#normalLaneAssigned = true;  
            }
        }else if(this.lane14 <= startTime){
            this.lane14 = endTime;
            this.lane14Array.push([this.#convertToTime(String(startTime)), this.#convertToTime(String(endTime)), element[2],element[3]]);
            element.push("14");
            if(startTime >= 8){
                this.#normalLaneAssigned = true;  
            }
        }else if(this.lane6 <= startTime){
            this.lane6 = endTime;
            this.lane6Array.push([this.#convertToTime(String(startTime)), this.#convertToTime(String(endTime)), element[2],element[3]]);
            element.push("6");
            
        }else{
            element.push("B");
        }
         }}});
   
        
    }

    #convertToTime(time){
        let hour = time.split(".")[0] < 10 ? time.slice(0,1) : time.slice(0,2);
        let minute = time.split(".")[1] > 0 ? time.split(".")[1].padEnd(2,"0") : "00";
        time = hour +":"+ minute;
        let starting = new Date("1/1/2023 " + time);
        var hours = starting.getHours();
        var AmOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = (hours % 12) || 12;
        var minutes = starting.getMinutes();
        return hours + ":" + minutes.toString().padStart(2, "0") + " " + AmOrPm;
    }

    get lanesUsedByEndTime(){
        let lanes = "<strong>Registers by time</strong><br>";
        if(this.lane6 != 0){

            lanes += `&nbsp;&nbsp;&nbsp;&nbsp;<strong>#6</strong> `;
            this.lane6Array.forEach(element =>{
                lanes += `&nbsp;| <strong>${element[0]}</strong> ${element[2]} <strong>${element[1]}</strong>`
            })
            lanes += `<br>`;
        }
        if(this.lane7 != 0){

            lanes += `&nbsp;&nbsp;&nbsp;&nbsp;<strong>#7</strong> `;
            this.lane7Array.forEach(element =>{
                lanes += `&nbsp;| <strong>${element[0]}</strong> ${element[2]} <strong>${element[1]}</strong>`
            })
            lanes += `<br>`;
        }
        if(this.lane8 != 0){
            
            lanes += `&nbsp;&nbsp;&nbsp;&nbsp;<strong>#8</strong> `;
            this.lane8Array.forEach(element =>{
                lanes += `&nbsp;| <strong>${element[0]}</strong> ${element[2]} <strong>${element[1]}</strong>`
            })
            lanes += `<br>`;

        }
        if(this.lane9 != 0){
            
            lanes += `&nbsp;&nbsp;&nbsp;&nbsp;<strong>#9</strong> `;
            this.lane9Array.forEach(element =>{
                lanes += `&nbsp;| <strong>${element[0]}</strong> ${element[2]} <strong>${element[1]}</strong>`
            })
            lanes += `<br>`;

        }
        if(this.lane10 != 0){
            lanes += `&nbsp;&nbsp;&nbsp;&nbsp;<strong>#10</strong> `;
            this.lane10Array.forEach(element =>{
                lanes += `&nbsp;| <strong>${element[0]}</strong> ${element[2]} <strong>${element[1]}</strong>`
            })
            lanes += `<br>`;
        }
        if(this.lane11 != 0){
           lanes += `&nbsp;&nbsp;&nbsp;&nbsp;<strong>#11</strong> `;
            this.lane11Array.forEach(element =>{
                lanes += `&nbsp;| <strong>${element[0]}</strong> ${element[2]} <strong>${element[1]}</strong>`
            })
            lanes += `<br>`; 
        }
        if(this.lane12 != 0){
            lanes += `&nbsp;&nbsp;&nbsp;&nbsp;<strong>#12</strong> `;
            this.lane12Array.forEach(element =>{
                lanes += `&nbsp;| <strong>${element[0]}</strong> ${element[2]} <strong>${element[1]}</strong>`
            })
            lanes += `<br>`;
        }
        if(this.lane13 != 0){
            lanes += `&nbsp;&nbsp;&nbsp;&nbsp;<strong>#13</strong> `;
            this.lane13Array.forEach(element =>{
                lanes += `&nbsp;| <strong>${element[0]}</strong> ${element[2]} <strong>${element[1]}</strong>`
            })
            lanes += `<br>`;
        }
        if(this.lane14 != 0){
            lanes += `&nbsp;&nbsp;&nbsp;&nbsp;<strong>#14</strong> `;
            this.lane14Array.forEach(element =>{
                lanes += `&nbsp;| <strong>${element[0]}</strong> ${element[2]} <strong>${element[1]}</strong>`
            })
            lanes += `<br>`;
        }
        return lanes;

    }

    get cashierWithLanesAssigned(){
        return this.#cashiers;
    }

    checkRoleForLaneAssignment(role){
    switch (role) {
        case "Express Cashier":
        case "Regular Cashier":
        case "Supervisor":
            return true;   
        default:
            return false;
    }
}

}
