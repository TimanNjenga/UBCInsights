


import ApplyToken from "./ApplyToken";

export default class ApplyKey {
    string : any;
    applyToken : ApplyToken;

    constructor(applyKey : any) {
        try{
            this.setString(applyKey);
            this.setApplyToken(applyKey);
        }catch(err){
            throw err;
        }
    }

    setString(applyKey : any){
        var oArr : any[] = Object.keys(applyKey);

        if((typeof oArr[0] === "string") && !oArr[0].includes("_")){
            this.string = oArr[0];
        }else{throw "applyKey string error"}

    }

    setApplyToken(applyKey : any){

        let applyToken = applyKey[this.string];
        this.applyToken = new ApplyToken(applyToken);
    }

    evaluate(objectArr : any[]){

        let length = objectArr.length;

        let value = this.applyToken.evaluate(objectArr);

        return {[this.string] : value};

    }
}