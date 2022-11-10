
type Formula = number|'+'|'-';
type Formulas = Formula[];

class Question {
    frames:number = 0; //当前存活的帧数
    activeTimer:number = 10000 // 存活秒数
    startTimer:number|undefined; //开始的时间戳
    status:string = 'unAnswer'; //right,wrong,miss
    answer:number|undefined;
    private rightAnswer:number = 0;
    private formulas:Formulas;
    /**
     * 
     * @param minDigit 随机的算式中最小可能的位数
     * @param maxDigit 随机的算式中最大可能的位数
     * @param ActiveTimer 当算式在画面中展示时，存活多少毫秒
     * @param operator 可能随机到的运算符
     * @param operatorNum 可能随机到的运算则数
     */
    constructor(minDigit:number = 1, maxDigit:number = 1, activeTimer:number = 10000, operatorNum:number = 3){
        this.activeTimer = activeTimer;
        this.formulas = this.randomGenerate(minDigit,maxDigit,operatorNum);
        this.rightAnswer = this.getRightAnswer(this.formulas);
    }

    getRightAnswer(formulas?:Formulas) {
        try {
        return new Function('return ' + this.getFormula(formulas) + ';')();
        } catch(e) {
            debugger
        }
    }
    getFormula(formulas?:Formulas){
        let _formulas:Formulas = [];
        let str:string = '';
        _formulas = _formulas.concat(formulas || this.formulas);
        if(_formulas.length % 2 === 0) {
            _formulas.pop();
        }
        
        _formulas.forEach((formula:Formula) =>{
           str+= formula; 
        })
        return str;
    }



    doAnswer(answer:number) {
        return this.rightAnswer === answer;
    } 

    private random(min:number,max:number) {
        return Math.ceil(Math.random() * (max+1-min) + (min -1))
    }

    private randomGenerate(minDigit:number,maxDigit:number,operatorNum:number){
        const formulas:Formulas = [];
        for (let i=0; i< operatorNum * 2 - 1; i++) {
            let  answer = formulas.length === 0? 0 : this.getRightAnswer(formulas);
            if(i%2 == 0) { //生成数字
                let num; 
                let digit = this.random(minDigit,maxDigit);
                let prev = formulas[formulas.length - 1];
                if( prev  && prev === '-') {
                    num=this.random(Math.pow(10,digit-1), answer);
                } else {
                    num=this.random(Math.pow(10,digit-1), Math.pow(10,digit) -1);
                }
                formulas.push(num);
            } else { //生成运算符
                if(answer === 0) {
                    formulas.push('+');
                } else {
                    formulas.push(this.random(0,1) === 0 ?'+':'-');
                }
            }
            
            
            
        }
        return formulas;
    }
    
}

export default Question;