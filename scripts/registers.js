/*
Registers js. This program file holds a priority queue implementation with a Greedy Lane Assignment
 */

//Represents a cashier with a shift and a role
class Cashier{
    constructor(start, end, first, last, role){
        this.start = parseFloat(start);
        this.end = parseFloat(end);
        this.first = first;
        this.last = last;
        this.role = role;
        this.lane = null;
        this.isAssigned = false;
    }
}

class Lane{
    constructor(id, type = "normal"){
        this.id = id;
        this.type = type; //Express, supervisor, normal
        this.schedule = [];
    }
    //Checks if the lane is free during the Cashiers Shift
    isAvailable(start, end){
        return this.schedule.every(({start: s, end: e}) => end <= s || start >= e);
    }
    //Assign the cashier to this lane
    assign(cashier){
        this.schedule.push({start: cashier.start, end: cashier.end});
        cashier.lane = this.id;
        cashier.isAssigned = true;
    }
    //Used to sort lanes by when they become available next
    getNextFreeTime(){
        return this.schedule.length > 0 ? this.schedule[this.schedule.length - 1].end : 0;
    }
}

//Manages all assignments and rules
class Scheduler{
    constructor(){
        this.cashiers = [];
        this.lanes = [
            new Lane(7, "normal"),
            new Lane(6, "express"),
            new Lane(8, "normal"),
            new Lane(9, "normal"),
            new Lane(10, "normal"),
            new Lane(11, "normal"),
            new Lane(12, "supervisor"),
            new Lane(13, "normal"),
            new Lane(14, "normal"),
        ];
    }

    //Adds a cashier to the list if their role is valid
    addCashier(data){
        const[start, end , first, last, role] = data;
        if(["Regular Cashier", "Express Cashier", "Supervisor"].includes(role)){
            this.cashiers.push(new Cashier(start, end , first, last, role));
        }
    }
    //Assign lanes With respect to constraints
    assignLanes(){
        //Sort: regular -> express -> Supervisor, then earliest shift first
        this.cashiers.sort((a,b)=>{
            const roleRank = {"Regular Cashier": 0, "Express Cashier" : 1, "Supervisor": 2};
            return roleRank[a.role] - roleRank[b.role] || a.start - b.start;
        });
        //Identifies special cases
        const closing = this.cashiers.find(c => c.end === 23);

        const lane8 = this.lanes.find(l => l.id === 8);
        if (closing && lane8 && lane8.isAvailable(closing.start, closing.end)) {
            lane8.assign(closing);
        }

        const firstAfter930 = this.cashiers.find ( c => c.start >= 9.5 && !c.isAssigned);
        const lane7 = this.lanes.find(l => l.id === 7);
        if(firstAfter930 && 7 && lane7.isAvailable(firstAfter930.start, firstAfter930.end)){
            lane7.assign(firstAfter930);
        }


        for(let cashier of this.cashiers){
            if(cashier.isAssigned) continue;


            //Filter lanes based on constraints
            let possibleLanes = this.lanes.filter(lane => {
                if(lane.id === 8) return false;
                if(cashier.role === "Supervisor") return lane.type === "supervisor" || lane.id === 13; //Allows supervisor on next available register
                if(cashier.role === "Express Cashier") return lane.type === "express";
                if(cashier.role === "Regular Cashier") return lane.type === "normal";
                return false;
            });
            //Choose the lane that becomes free soonest
            possibleLanes.sort((a,b) => a.getNextFreeTime() - b.getNextFreeTime());

            //Assign to first available lane
            let assigned = false;
            for(let lane of possibleLanes){
                if(lane.isAvailable(cashier.start, cashier.end)){
                    lane.assign(cashier);
                    break;
                }
            }
            if(!assigned && possibleLanes.length > 0){
                possibleLanes[0].assign(cashier);
            }

            if(!cashier.isAssigned) cashier.lane = "B";
        }
    }
    printAssignments(){
        for(let cashier of this.cashiers){
            console.log(`${cashier.first} ${cashier.last} → Lane ${cashier.lane}`);
        }
    }
    //Get all cashier Assignments
    getCashierAssignments(){
        return this.cashiers.map (c => ({
            name: `${c.first} ${c.last}`,
            lane: c.lane,
            role: c.role,
            start: c.start,
            end: c.end
        }));
    }
}
window.scheduler = new Scheduler();