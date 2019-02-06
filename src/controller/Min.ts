



import Token from "./Token";

export default class Min extends Token {


    constructor() {
        super();
    }


    evaluate(objectArr : any[], key : any){
        let length = objectArr.length;
        let min = objectArr[0][key]; //should this be default??

        for(let i = 1; i < length; i++){
            if(objectArr[i][key] < min){
                min = objectArr[i][key];
            }
        }
        return min;
    }

}