

class registers {

    lane6 = 0;
    lane7 = 8.15;
    lane8 = 0;
    lane9 = 0;
    lane10 = 0;
    lane11 = 0;
    lane12 = 0;
    lane13 = 0;
    lane14 = 0;



    constructor(){}

    //Accepts starting time, ending time.
    //Must return lane number.
    assignRegister(startTime, endTime, role){
        if(role == "Supervisor"){
            this.lane12 = endTime;
            return "12";
        }
       startTime = parseFloat(startTime);
       endTime = parseFloat(endTime);
        if(this.lane7 <= startTime){
            this.lane7 = endTime;
            return "7";
        }else if(this.lane10 <= startTime){
            this.lane10 = endTime;
            return "10";
        }else if(this.lane8 <= startTime){
            this.lane8 = endTime;
            return "8";
        }else if(this.lane11 <= startTime){
            this.lane11 = endTime;
            return "11";
        }else if(this.lane9 <= startTime){
            this.lane9 = endTime;
            return "9";
        }else if(this.lane13 <= startTime){
            this.lane13 = endTime;
            return "13";
        }else if(this.lane14 <= startTime){
            this.lane14 = endTime;
            return "14";
        }else if(this.lane6 <= startTime){
            this.lane6 = endTime;
            return "6";
        }else{
            return "B";
        }
        
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
        let lanes = "";
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


}