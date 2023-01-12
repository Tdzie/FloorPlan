

class registers {

    lane6 = 0;
    lane7 = 8;
    lane8 = 0;
    lane9 = 0;
    lane10 = 0;
    lane11 = 0;
    lane12 = 0;
    lane13 = 0;
    lane14 = 0;

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
    console.log(this.#cashiers);
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
            element.push("12");
        }else{
  
        if(this.lane7 <= startTime && element[1] != 23.00 && this.#normalLaneAssigned){
            this.lane7 = endTime;
            element.push("7");
        }else if(this.lane10 <= startTime && element[1] != 23.00){
            this.lane10 = endTime;
            element.push("10");
            if(startTime >= 8){
                this.#normalLaneAssigned = true;  
            }

        }else if(this.lane8 <= startTime && (element[1] <= 17.00 || element[1] == 23.00)){
            this.lane8 = endTime;
            element.push("8");
            if(startTime >= 8){
                this.#normalLaneAssigned = true;  
            }
        }else if(this.lane11 <= startTime){
            this.lane11 = endTime;
            element.push("11");
            if(startTime >= 8){
                this.#normalLaneAssigned = true;  
            }
        }else if(this.lane9 <= startTime){
            this.lane9 = endTime;
            element.push("9");
            if(startTime >= 8){
                this.#normalLaneAssigned = true;  
            }
        }else if(this.lane13 <= startTime){
            this.lane13 = endTime;
            element.push("13");
            if(startTime >= 8){
                this.#normalLaneAssigned = true;  
            }
        }else if(this.lane14 <= startTime){
            this.lane14 = endTime;
            element.push("14");
            if(startTime >= 8){
                this.#normalLaneAssigned = true;  
            }
        }else if(this.lane6 <= startTime){
            this.lane6 = endTime;
            element.push("6");
            
        }else{
            element.push("B");
        }
         }}});
   
        
    }

    #convertToTime(time){
        let hour = time.slice(0,2);
        let minute = time.slice(4,5) != undefined ? time.slice(3,5).padEnd(2,"0") : "00";
        time = hour +":"+ minute;
        let starting = new Date("1/1/2023 " + time);
        var hours = starting.getHours();
        var AmOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = (hours % 12) || 12;
        var minutes = starting.getMinutes();
        return hours + ":" + minutes.toString().padStart(2, "0") + " " + AmOrPm;
    }

    get lanesUsedByEndTime(){
        let lanes = "<strong>Ending time by lane number</strong><br>";
        if(this.lane6 != 0){
            lanes += `Register #6 | ${this.#convertToTime(String(this.lane6))} <br>`;
        }
        if(this.lane7 != 0){
            lanes += `Register #7 | ${this.#convertToTime(String(this.lane7))} <br>`;
        }
        if(this.lane8 != 0){
            lanes += `Register #8 | ${this.#convertToTime(String(this.lane8))} <br>`;
        }
        if(this.lane9 != 0){
            lanes += `Register #9 | ${this.#convertToTime(String(this.lane9))} <br>`;
        }
        if(this.lane10 != 0){
            lanes += `Register #10 | ${this.#convertToTime(String(this.lane10))} <br>`;
        }
        if(this.lane11 != 0){
            lanes += `Register #11 | ${this.#convertToTime(String(this.lane11))} <br>`;
        }
        if(this.lane12 != 0){
            lanes += `Register #12 | ${this.#convertToTime(String(this.lane12))} <br>`;
        }
        if(this.lane13 != 0){
            lanes += `Register #13 | ${this.#convertToTime(String(this.lane13))} <br>`;
        }
        if(this.lane14 != 0){
            lanes += `Register #14 | ${this.#convertToTime(String(this.lane14))}`;
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
        case "Courtesy Clerk":
        case "Supervisor":
            return true;   
        default:
            return false;
    }
}

}