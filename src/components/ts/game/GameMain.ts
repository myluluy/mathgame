
import Question from './Question';
class GameMain {
    private questions:any[] = [];
    private rightQuestions:any[] = [];
    private wrongQuestions:any[] = [];
    private missQuestions:any[] = [];
    private activeQuestions:any[] = [];
    constructor(){

    }

    setLevel(level:number){

    }

    createQuestions(){
        let len = 10;
        for(let i=0; i<len; i++) {
            let q = new Question();
            this.questions.push(q);
        }

    }
    activeQuestion(){
        if(this.activeQuestions.length ===0) {
            let q = this.questions.pop();
            if(q) {
                this.activeQuestions.push(q)
            }
        }
        
    }
    doQuestion(anwser:number){
        
    }
    doMissQuestion(question:Question) {
        question.status = 'miss';
        this.missQuestions.push(question);
    }

    getRightQuestions(){
        return this.rightQuestions;
    }

    getWrongQuestions(){
        return this.wrongQuestions;
    }

    getMissQuestions(){
        return this.missQuestions;
    }
    getActiveQuestions(){
        return this.activeQuestions;
    }

    private _getNewQuestion(){
        if(this.questions.length === 0) {
            return null;
        }
        return this.questions.pop();
    }

    hasQuestions (){
        return false;
    }

    pause(){

    }
    continue(){

    }

}

export default GameMain