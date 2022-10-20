
import Question from './Question';
class GameMain {
    private questions:string[] = [];
    private rightQuestions:any[] = [];
    private wrongQuestions:any[] = [];
    private missQuestions:any[] = [];
    private activeQuestions:any[] = [];
    constructor(){

    }

    setLevel(level:number){

    }

    createQuestions(){
        let q = new Question();
        console.log(q);
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