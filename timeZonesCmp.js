import {LightningElement, api, track, wire} from 'lwc';

export default class TimeZonesCmp extends LightningElement {
    @api date = new Date();

    get moscowStandardTime() {
        return this.getTime(this.date.getHours(), 0);
    }

    get greenwichMeanTime() {
        return this.getTime(this.date.getHours(), 3);
    }

    get pacificStandardTime() {
        return this.getTime(this.date.getHours(), 11);
    }

    get getDate() {
        const monthNames = [
            'January', 'February', 'March',
            'April', 'May', 'June',
            'July', 'August', 'September',
            'October', 'November', 'December'
        ];
        const weekNames = [
            'Sunday', 'Monday', 'Tuesday',
            'Wednesday', 'Thursday', 'Friday',
            'Saturday'
        ];
        return this.date.getDate() + ' ' + monthNames[this.date.getMonth()] + ' ' + this.date.getFullYear() + ', ' + weekNames[this.date.getDay()];
    }

    addZero(number) {
        let result = number;
        if (String(number).length === 1) {
            result = '0' + number;
        }
        return result;
    }

    getTime(hour, differenceHours) {
        const AM = 'AM';
        const PM = 'PM';
        let totalTime;
        let time;
        let timeItem = new Map([
            [13, 1], [14, 2], [15, 3],
            [16, 4], [17, 5], [18, 6],
            [19, 7], [20, 8], [21, 9],
            [22, 10], [23, 11], [24, 0]
        ]);
        let diffHours = hour - differenceHours;
        if (hour >= 0 && hour < 12) {
            if (diffHours < differenceHours) {
                if (diffHours < 0) {
                    totalTime = timeItem.get(24 - Math.abs(diffHours));
                    time = this.addZero(totalTime) + ':' + this.addZero(this.date.getMinutes()) + ' ' + PM;
                } else {
                    time = this.addZero(diffHours) + ':' + this.addZero(this.date.getMinutes()) + ' ' + AM;
                }
            } else {
                time = this.addZero(diffHours) + ':' + this.addZero(this.date.getMinutes()) + ' ' + AM;
            }
        } else {
            if (diffHours > 0 && diffHours < 12) {
                time = this.addZero(diffHours) + ':' + this.addZero(this.date.getMinutes()) + ' ' + AM;
            } else if (diffHours === 12) {
                time = this.addZero(diffHours) + ':' + this.addZero(this.date.getMinutes()) + ' ' + PM;
            } else {
                time = this.addZero(timeItem.get(diffHours)) + ':' + this.addZero(this.date.getMinutes()) + ' ' + PM;
            }
        }
        return time;
    }
}
