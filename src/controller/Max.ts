






import Token from "./Token";

export default class Max extends Token {


    constructor() {
        super();
    }


    evaluate(objectArr : any[], key : any){

        let length = objectArr.length;
        let max = 0; //should default be 0?

        for(let i = 0; i < length; i++){
            if(objectArr[i][key] > max){
                max = objectArr[i][key];
            }
        }
        return max;


    }

}