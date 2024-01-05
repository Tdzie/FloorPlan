class DivChart {
    constructor(arr) {
        this.arr = arr;
    }

    formatHour(hourIndex) {
        let hour = 6 + hourIndex;
        let amOrPm = 'AM';

        if (hour >= 12) {
            amOrPm = 'PM';
            hour = hour > 12 ? hour - 12 : hour;
        }

        return `${hour} ${amOrPm}`;
    }

    getColorForHour(index) {
        let hour = Math.floor(index / 4) + 6;
        const colors = ['red', 'green', 'aqua', 'lightgray', 'lavender', 'cyan', 'orange', 'violet', 'pink', 'antiquewhite', 'lime', 'lightblue', 'beige', 'olive', 'teal','grey' , 'magenta'];
        return colors[hour % colors.length];
    }

    createDivs() {
        let outerContainer = document.createElement('div');
        outerContainer.style.display = 'flex';

        //let yAxisContainer = this.createYAxis();
        //outerContainer.appendChild(yAxisContainer);

        let chartContainer = this.createChart();
        outerContainer.appendChild(chartContainer);

        return outerContainer;
    }

    createYAxis() {
        let yAxisContainer = document.createElement('div');
        yAxisContainer.style.flex = 'none';

        for (let i = Math.max(...this.arr); i >= 0; i--) {
            let label = document.createElement('div');
            label.textContent = i;
            label.style.height = '57px';
            yAxisContainer.appendChild(label);
        }

        return yAxisContainer;
    }
    hourValues = [6, 15, 30, 45, 7, 15, 30, 45, 8, 15, 30, 45, 9, 15, 30, 45, 10, 15, 30, 45, 11, 15, 30, 45, 12, 15, 30, 45, 1, 15, 30, 45, 2, 15, 30, 45, 3, 15, 30, 45,
        4, 15, 30, 45, 5, 15, 30, 45, 6, 15, 30, 45, 7, 15, 30, 45, 8, 15, 30, 45, 9, 15, 30, 45, 10, 15, 30, 45,11];

    createChart() {

        let chartContainer = document.createElement('div');
        chartContainer.style.display = 'flex';
        chartContainer.style.alignItems = 'flex-end';
        chartContainer.style.height = '300px';
        chartContainer.style.gap = '1px';
       // chartContainer.style.width = '1200px';

        let max = Math.max(...this.arr);
        if(max < 5){
            max = 5;
        }
        for (let i = 0; i < this.arr.length -1; i++) {
            chartContainer.appendChild(this.createBar(i, max));
            /*
            if (i % 4 === 0) {
                chartContainer.appendChild(this.createHourLabel(i));
            }
            */
        }

        return chartContainer;
    }
    
    boldValues = [1,2,3,4,5,6,7,8,9,10,11,12];
    
    createBar(index, max) {
        let div = document.createElement('div');
        if (this.arr[index] != 0) {
            div.style.height = `${this.arr[index] / max * 100}%`;
        }else{
            div.style.height = `8%`;
            div.style.opacity = `50%`;
        } 
        
        div.style.width = '18px';
        div.style.backgroundColor = this.getColorForHour(index);
        // = 1 - (index % 4) * 0.25;
        //div.style.fontSize = 'small';
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'space-between';
        div.style.flexDirection = 'column';

        let span = document.createElement('span');
        let number = this.arr[index];
        if(number != 0){
         span.innerText = number;  
        }
        div.appendChild(span);

        span = document.createElement('span');
        let time = this.hourValues[index];
        span.innerText = time;
        if(this.boldValues.includes(time)){
            span.style.fontWeight = '600';
        }else{
            span.style.fontWeight = '400';
        }
        
        div.appendChild(span);

        return div;
    }

    createHourLabel(index) {
        let hourLabel = document.createElement('div');
        hourLabel.textContent = this.formatHour(index / 4);
        hourLabel.style.position = 'absolute';
        hourLabel.style.left = `${(index + 2) * 14}px`;
        hourLabel.style.zIndex = '1';
        //hourLabel.style.top = '310px';
        return hourLabel;
    }
}