



import Token from "./Token";

export default class Avg extends Token {


    constructor() {
        super();
}


    evaluate(objectArr : any[], key : any){
        let Decimal = require('decimal.js');

        let length = objectArr.length;

        let arrayToBeAvg : any[] = [];

        for(let i = 0; i < length; i++){
           arrayToBeAvg.push(objectArr[i][key]);
        }

        let avg: number = Number((arrayToBeAvg.map(val => <any>new Decimal(val)).reduce((a,b) => a.plus(b)).toNumber() / arrayToBeAvg.length).toFixed(2));

        return avg;
    }

}