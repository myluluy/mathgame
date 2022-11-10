export default class TimeClock {
    private readonly startTime:number;
    constructor(){
        this.startTime  = new Date().getTime();
    }

    getTime(){
        let curr = new Date().getTime();
        return this._formatTime(curr - this.startTime);
    }

    private _formatTime(timeStamp:number) {
        let str = '';
        let totalSec:number = Math.round(timeStamp/1000);
        let _tm = totalSec % 3600;
        let hour = (totalSec - _tm) / 3600;
        let sec = _tm % 60;
        let min = (_tm - sec) /60;
        str = add0(hour) + ':' + add0(min) + ':' + add0(sec);
        function add0(num:number) {
            return num >=10 ? '' +num : '0' + num;
        }
        return str;
    }
}