class employee {
    #firstName;
    #lastName;
    constructor(firstName, lastName){
        this.#firstName = firstName;
        this.#lastName = lastName;
    }

    get employeeFirstName(){
        return this.#firstName;
    }

    get employeeLastName(){
        return this.#lastName;
    }
}


class cashier extends employee{
    #startTime;
    #endTime;
    #role;
    #shiftLength;
    #shiftInMilli;
    oneBreak = false;
    oneBreakOneLunch = false;
    constructor(firstName, lastName, startTime, endTime, role){
        super(firstName,lastName);
        this.#startTime = new Date("1/1/2023 " + startTime);
        this.#endTime = new Date("1/1/2023 " + endTime);
        this.#role = role;
        this.#shiftLength = this.#formatTime(this.#endTime - this.#startTime);
        this.oneBreak = (this.#shiftLength.replace(":","") <= 600);
        this.oneBreakOneLunch = this.#shiftLength.replace(":","") > 600 && this.#shiftLength.replace(":","") < 830;
      
        this.#shiftInMilli = (this.#endTime.getTime() - this.#startTime.getTime());

    }
   

    setBreaks(){

                // Start
        //console.log(`Start Time ${this.#startTime}`);
                // End
        //console.log(`Shift Length ${this.#shiftLength}`);

        if(this.oneBreak){
            return this.#setOneBreak();
        }else if(this.oneBreakOneLunch){
            return this.#setOneBreakOneLunch();
        }else{
            return this.#setTwoBreaksOneLunch();
        }

    }

    #setTwoBreaksOneLunch(){
        let thirdOfTheShift = new Date("1/1/2023 " + this.#findOneQuarterTime(this.#shiftInMilli));
        let createBreakTime = new Date(this.#startTime);

        createBreakTime.setHours(createBreakTime.getHours() + thirdOfTheShift.getHours());
        createBreakTime.setMinutes(createBreakTime.getMinutes() + thirdOfTheShift.getMinutes());

        var hours = createBreakTime.getHours();
        var AmOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = (hours % 12) || 12;
        var minutes = createBreakTime.getMinutes();
        minutes = this.#modifyMinutes(minutes);
        
        let breaktime = hours + ":" + minutes + " " + AmOrPm;

        // Start lunch

        let halfOfTheShift = new Date("1/1/2023 " + this.#findhalf(this.#shiftInMilli));
        let createLunchTime = new Date(this.#startTime);
        createLunchTime.setHours(createLunchTime.getHours() + halfOfTheShift.getHours());
        createLunchTime.setMinutes(createLunchTime.getMinutes() + halfOfTheShift.getMinutes());
        var hours = createLunchTime.getHours();
        var AmOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = (hours % 12) || 12;
        var minutes = createLunchTime.getMinutes();
        minutes = this.#modifyMinutes(minutes);
        let lunchTime = hours + ":" + minutes + " " + AmOrPm;

         // Start second break time
        let threeQuartersOfTheShift = new Date("1/1/2023 " + this.#findThreeQuarterTime(this.#shiftInMilli));
        let createSecondBreak = new Date(this.#startTime);
        createSecondBreak.setHours(createSecondBreak.getHours() + threeQuartersOfTheShift.getHours());
        createSecondBreak.setMinutes(createSecondBreak.getMinutes() + threeQuartersOfTheShift.getMinutes());
        var hours = createSecondBreak.getHours();
        var AmOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = (hours % 12) || 12;
        var minutes = createSecondBreak.getMinutes();
        minutes = this.#modifyMinutes(minutes);
        let secondBreakTime = hours + ":" + minutes + " " + AmOrPm;

        return [breaktime,lunchTime, secondBreakTime];
    }

    #setOneBreakOneLunch(){
        let thirdOfTheShift = new Date("1/1/2023 " + this.#findOneThird(this.#shiftInMilli));
        let createBreakTime = new Date(this.#startTime);
        //console.log(`Start of shift ${createBreakTime}`);
        createBreakTime.setHours(createBreakTime.getHours() + thirdOfTheShift.getHours());
        createBreakTime.setMinutes(createBreakTime.getMinutes() + thirdOfTheShift.getMinutes());
        //console.log(`Break Time ${createBreakTime}`);
        var hours = createBreakTime.getHours();
        var AmOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = (hours % 12) || 12;
        var minutes = createBreakTime.getMinutes();
        minutes = this.#modifyMinutes(minutes);
        let breaktime = hours + ":" + minutes + " " + AmOrPm;

        // Start lunch
        thirdOfTheShift = new Date("1/1/2023 " + this.#findTwoThirds(this.#shiftInMilli));
        let createLunchTime = new Date(this.#startTime);
        createLunchTime.setHours(createLunchTime.getHours() + thirdOfTheShift.getHours());
        createLunchTime.setMinutes(createLunchTime.getMinutes() + thirdOfTheShift.getMinutes());
        var hours = createLunchTime.getHours();
        var AmOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = (hours % 12) || 12;
        var minutes = createLunchTime.getMinutes();
        minutes = this.#modifyMinutes(minutes);
        let lunchTime = hours + ":" + minutes + " " + AmOrPm;

        return [breaktime,lunchTime];
    }
    #setOneBreak(){
        let halfOfTheShift = new Date("1/1/2023 " + this.#findhalf(this.#shiftInMilli));
        let createBreakTime = new Date(this.#startTime);
        //console.log(`Start of shift ${createBreakTime}`);
        createBreakTime.setHours(createBreakTime.getHours() + halfOfTheShift.getHours());
        createBreakTime.setMinutes(createBreakTime.getMinutes() + halfOfTheShift.getMinutes());
        //console.log(`Break Time ${createBreakTime}`);
        var hours = createBreakTime.getHours();
        var AmOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = (hours % 12) || 12;
        var minutes = createBreakTime.getMinutes();
        minutes = this.#modifyMinutes(minutes);
        return hours + ":" + minutes + " " + AmOrPm;
        
    }

    // return 24 hour time
    #getTwentyFourHourTime(amPmString) { 
    var dateString = new Date("1/1/2023 " + amPmString); 
    if(dateString.getMinutes() == "0"){
        return dateString.getHours() + ":" + "00";
    }else{
        return dateString.getHours() + ':' + dateString.getMinutes()
    }

}

    #findhalf(milliseconds){
        milliseconds = milliseconds / 2;
        let minutes = Math.floor((milliseconds / 1000 / 60) % 60);
        let hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

        return [
            hours.toString().padStart(2, "0"),
            minutes.toString().padStart(2, "0")
        ].join(":");
    }
    
    #findOneThird(milliseconds){
        milliseconds = milliseconds / 3;
        let minutes = Math.floor((milliseconds / 1000 / 60) % 60);
        let hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

        return [
            hours.toString().padStart(2, "0"),
            minutes.toString().padStart(2, "0")
        ].join(":");
    }

    #findTwoThirds(milliseconds){
        milliseconds = (milliseconds / 3) * 1.75;
        let minutes = Math.floor((milliseconds / 1000 / 60) % 60);
        let hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

        return [
            hours.toString().padStart(2, "0"),
            minutes.toString().padStart(2, "0")
        ].join(":");
    }

    #findOneQuarterTime(milliseconds){
        milliseconds = milliseconds / 4;
        let minutes = Math.floor((milliseconds / 1000 / 60) % 60);
        let hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

        return [
            hours.toString().padStart(2, "0"),
            minutes.toString().padStart(2, "0")
        ].join(":");
    }

    #findThreeQuarterTime(milliseconds){
        milliseconds = (milliseconds / 4) * 3;
        let minutes = Math.floor((milliseconds / 1000 / 60) % 60);
        let hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

        return [
            hours.toString().padStart(2, "0"),
            minutes.toString().padStart(2, "0")
        ].join(":");
    }


    #formatTime (milliseconds) {
        const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
        const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

        return [
            hours.toString().padStart(2, "0"),
            minutes.toString().padStart(2, "0")
        ].join(":");
    }

    #modifyMinutes(minute){
            if(minute <= 7){
                return "00";
            }else if(minute > 7 && minute <= 22){
                return "15";
            }else if(minute > 22 && minute <= 37){
                return "30";
            }else if(minute > 37){
                return "45";
            }
    }

    get employeeShiftLength(){
        return this.#shiftLength;
    }

    get employeeRole(){
        return this.#role;
    }

    get employeeStartTime(){
        let starting = new Date(this.#startTime);
        var hours = starting.getHours();
        var AmOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = (hours % 12) || 12;
        var minutes = starting.getMinutes();
        return hours + ":" + minutes.toString().padStart(2, "0") + " " + AmOrPm;
    }

    get employeeEndTime(){
        let starting = new Date(this.#endTime);
        var hours = starting.getHours();
        var AmOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = (hours % 12) || 12;
        var minutes = starting.getMinutes();
        return hours + ":" + minutes.toString().padStart(2, "0") + " " + AmOrPm;
    }


}