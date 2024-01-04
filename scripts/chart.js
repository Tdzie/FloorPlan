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

        let yAxisContainer = this.createYAxis();
        outerContainer.appendChild(yAxisContainer);

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
        chartContainer.style.width = '1400px';

        let max = Math.max(...this.arr);

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
    

    createBar(index, max) {
        let div = document.createElement('div');
        div.style.height = `${this.arr[index] / max * 100}%`;
        div.style.width = '30px';
        div.style.backgroundColor = this.getColorForHour(index);
        //div.style.opacity = 1 - (index % 4) * 0.25;
        //div.style.fontSize = 'small';
        div.style.display = 'flex';
        div.style.alignItems = 'flex-end';
        div.style.justifyContent = 'center';
       // let span = document.createElement('span');
        //span.style.opacity = '1';
        //span.style.zIndex = '1111111';
        div.innerText = this.hourValues[index];
        //div.appendChild(span);
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