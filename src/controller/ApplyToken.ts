import Filter from "./Filter";
import Key from "./Key";
import Max from "./Max";
import Min from "./Min";
import Avg from "./Avg";
import Count from "./Count";
import Sum from "./Sum";
import Token from "./Token";

export default class ApplyToken {
    static viableTokens : any[] = ["MAX", "MIN", "AVG", "COUNT", "SUM"];
    tokenString : any;
    key : any;
    token : Token;


    constructor(applyToken : any) {
        try{
            this.setToken(applyToken);
            this.setKey(applyToken);
        }catch(err){
            throw err;
        }

    }

    setToken(applyToken : any){
        var oArr : any[] = Object.keys(applyToken);

        if(ApplyToken.viableTokens.includes(oArr[0])){
            this.tokenString = oArr[0];

            if(this.tokenString === "MAX"){
                this.token = new Max();
            }
            if(this.tokenString === "MIN"){
                this.token = new Min();
            }
            if(this.tokenString === "AVG"){
                this.token = new Avg();
            }
            if(this.tokenString === "COUNT"){
                this.token = new Count();
            }
            if(this.tokenString === "SUM"){
                this.token = new Sum();
            }

        }else{throw "setToken error"}

    }

    setKey(applyToken : any){

        let tempKey = applyToken[this.tokenString];

        if(this.tokenString === "COUNT"){

            if(Filter.isRoom && Key.isRoomKey(tempKey)){
                this.key = tempKey;
            }
            if(!Filter.isRoom && Key.isCourseKey(tempKey)){
                this.key = tempKey;
            }
        }

        if(ApplyToken.viableTokens.includes(this.tokenString)){

            if(Filter.isRoom && Key.isRoomMKey(tempKey)){
                this.key = tempKey;
            }

            if(!Filter.isRoom && Key.isCourseMKey(tempKey)){
                this.key = tempKey;
            }
        } else{
            throw "applyToken() error"
        }

    }

    evaluate(objectArr : any[]){

       let value = this.token.evaluate(objectArr, this.key);

       return value;

    }
}