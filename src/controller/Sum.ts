



import Token from "./Token";

export default class Sum extends Token {


    constructor() {
        super();
    }


    evaluate(objectArr : any[], key : any){

        let Decimal = require('decimal.js');

        let length = objectArr.length;

        let arrayToBeSum : any[] = [];

        for(let i = 0; i < length; i++){
            arrayToBeSum.push(objectArr[i][key]);
        }

        let sum = Number(arrayToBeSum.map(val => new Decimal(val)).reduce((a,b) => a.plus(b)).toNumber().toFixed(2));

        return sum;




        /*
        let length = objectArr.length;
        let sum = 0;

        for(let i = 0; i < length; i++){
            sum = sum + objectArr[i][key];
        }

        return sum;
*/


    }

}