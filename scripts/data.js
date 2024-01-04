class ScheduleManager {
    constructor() {
        this.slots = this.createTimeSlots();
    }

    createTimeSlots() {
        const slots = {};
        let hour = 6;
        let minute = 0;

        while (hour < 23 || (hour === 23 && minute === 0)) {
            const time = `${hour}:${minute.toString().padStart(2, '0')}`;
            slots[time] = 0;
            minute += 15;
            if (minute === 60) {
                minute = 0;
                hour++;
            }
        }
        return slots;
    }

    addSchedule(data) {
        const startTime = this.convertTime12to24(data.__EMPTY_5); // Convert "7:30 AM" format to 24 hours
        const endTime = this.convertTime12to24(data.__EMPTY_6);   // Convert "4:00 PM" format to 24 hours

        let currentTime = new Date(`01/01/2000 ${startTime}`);
        const endDate = new Date(`01/01/2000 ${endTime}`);
        endDate.setMinutes(endDate.getMinutes()); // Extend to include the end time slot

        while (currentTime < endDate) {
            const timeKey = `${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
            if (this.slots[timeKey] !== undefined) {
                this.slots[timeKey] += 1; // Increment by 1 for each person
            }
            currentTime = new Date(currentTime.getTime() + 15 * 60000); // Add 15 minutes
        }
    }

    convertTime12to24(time12h) {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
            hours = '00';
        }
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        return `${hours}:${minutes}`;
    }

    processSchedules(dataArray, jobTitles) {
        dataArray.forEach(data => {
            if (jobTitles.includes(data.__EMPTY_4) && data.__EMPTY_5 && data.__EMPTY_6) {
                this.addSchedule(data);
            }
        });
    }

    getSlotsAsArray() {
        return Object.values(this.slots);
    }
}
