





import ApplyKey from "./ApplyKey";

export default class Apply {
    applyKeyArray : any[] = [];

    constructor(apply : any) {
        try{
            this.setKeyArray(apply);
            this.isStringDouble();
        }catch(err){
            throw err;
        }

    }

    setKeyArray(apply : any[]){
        let newArray : any[] = [];

        let length = apply.length;


        for(let i = 0; i < length; i++){
            let applyKeyObject = new ApplyKey(apply[i]);

            newArray[i] = applyKeyObject;
        }
        this.applyKeyArray = newArray;
    }

    isStringDouble() {
        let length = this.applyKeyArray.length;
        let stringArr: any[] = [];


        for (let i = 0; i < length; i++) {
            let currAppKey = this.applyKeyArray[i];
            let key = Object.keys(currAppKey)[0];
            let currString = JSON.stringify(currAppKey[key]);


            if (stringArr.includes(currString)) {
                throw "duplicate apply strings"
            }
            stringArr.push(currString);
        }
    }

    evaluate(objectArr : any[]){


        let alength = this.applyKeyArray.length;
        let olength = objectArr.length;

        let finalObj = {};
            for(let i = 0; i < alength; i++){
                let currObj = this.applyKeyArray[i].evaluate(objectArr);

                Object.assign(finalObj, currObj);
            }

            return finalObj;

    }


}