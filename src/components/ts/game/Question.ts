
type Formula = {
    nums:number[];
    operators:string[];
}


class Question {
    frames:number = 0; //存活周期，每帧变化
    speed:number =1 // frames的变化量
    status:string = 'unAnswer'; //right,wrong,miss
    answer:number|undefined;
    private rightAnswer:number = 0;
    private formula:Formula;
    constructor(minDigit:number = 1, maxDigit:number = 2, speed:number = 1,operator:string[] = ["+","-"], operatorNum:number = 3){
        this.speed = speed
        this.formula = this.randomGenerate(minDigit,maxDigit,operator,operatorNum);
        this.rightAnswer = this.getRightAnswer();
    }

    getRightAnswer(formula?:Formula) {
        return new Function('return ' + this.getFormula(formula) + ';')();
    }

    getFormula(formula?:Formula){
        formula = formula || this.formula;
        let str:string = '';
        for (let i=0; i< formula.nums.length; i++) {
            if(!formula.nums[i]) {
                formula.nums[i] = 0;
            }

            str +=  formula.nums[i];
            if(formula.operators[i] && formula.nums[i+1]) {
                str+=formula.operators[i]
            } 
        }

        return str;
    }



    doAnswer(answer:number) {
        return this.rightAnswer === answer;
    } 

    private random(min:number,max:number) {
        return Math.ceil(Math.random() * (max+1-min) + (min -1))
    }

    private randomGenerate(minDigit:number,maxDigit:number,operator:string[],operatorNum:number){
        // operatorNum 确定几则运算
        const nums:number[] = [];
        const operators:string[] = [];
        const formula:Formula = {
            nums,
            operators
        }
        // nums.push()
        for (let i=0; i< operatorNum; i++) {
            let prevOperator = operators[operators.length-1];
            let num; 
            if(prevOperator && prevOperator === '-') { //减法时要前项结果大于后项
                let currAnswer = this.getRightAnswer(formula);
                if(currAnswer < 10) {
                    num=this.random(Math.pow(10, String(currAnswer).length), currAnswer);
                } else {
                    num=this.random(Math.pow(10, String(currAnswer).length-1), currAnswer);
                }
            } else {
                let digit = this.random(minDigit,maxDigit)
                num=this.random(Math.pow(10,digit-1), Math.pow(10,digit) -1);
            }
            
            nums.push(num);
            if(i !== operatorNum -1 ) {
                let _operator = operator[this.random(0,operator.length-1)];
                operators.push(_operator);
            }
            
        }
        return formula;
    }
    
}

export default Question;