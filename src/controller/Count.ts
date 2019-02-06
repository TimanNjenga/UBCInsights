




import Token from "./Token";

export default class Count extends Token {


    constructor() {
        super();
    }

    //implemented wrong!!!

    //COUNT counts the number of unique values in the group for the specified key.
    // So if you're grouping rooms by building, then you apply COUNT: "rooms_shortname",
    // the result will be 1 because there is only 1 unique value for rooms_shortname in the group (i.e., LCS).
    // However, you could apply COUNT to rooms_number to get the result 2, because there are 2 unique room numbers in that group.

    evaluate(objectArr : any[], key : any) : number {
        let length = objectArr.length;
        let newArr : any[] = [];


        if(length === 0){
            return 0;
        }

        if(length === 1){
            return 1;
        }

        let value_1 = objectArr[0][key];

        for(let i = 1; i < length; i++){

           let value_i = objectArr[i][key];

           if(value_i === value_1){

           } else{
               newArr.push(objectArr[i]);
           }

        }

        return 1 + this.evaluate(newArr, key);


    }
}