

import Filter from "./Filter";
import {isNullOrUndefined} from "util";

export default class MComparison extends Filter {
    m_key : string;
    inputNumber : any;
    comp : string;


//new change here
    constructor(mComp : any){
        super();
        try {
            this.getMComp(mComp);
            this.m_key = this.getMKey(mComp);
            if (typeof Filter.isRoom === 'undefined'|| Filter.isRoom === null) {
                this.getIsRooms();
            }
            this.roomCourseConflict();
            this.inputNumber = this.getInputNumber(mComp);
        } catch (err) {
            throw err;
        }

    }


    getMKey(mComp : any){
        var oArr : any[] = Object.keys(mComp);
        var mCompKey = oArr[0];
        var keyset = mComp[mCompKey];
        var mArr : any[] = Object.keys(keyset);

            if((mArr[0] === "rooms_lat" || mArr[0] === "rooms_lon" || mArr[0] === "rooms_seats")){
                return mArr[0];
            }




        if((mArr[0] === "courses_pass" || mArr[0] === "courses_audit" || mArr[0] === "courses_avg" || mArr[0] === "courses_fail" || mArr[0] === "courses_year")){
            return mArr[0];} else {throw "not m_key";}

    }


    getIsRooms() {

        if(this.m_key === "courses_pass" || this.m_key === "courses_audit" || this.m_key === "courses_avg" || this.m_key === "courses_fail" || this.m_key === "courses_year"){
            Filter.isRoom = false;
        }

        if(this.m_key === "rooms_lat" || this.m_key === "rooms_lon" || this.m_key === "rooms_seats"){
            Filter.isRoom = true;
        }

    }

    roomCourseConflict(){
        if(Filter.isRoom && (this.m_key === "courses_pass" || this.m_key === "courses_audit" || this.m_key === "courses_avg" || this.m_key === "courses_fail" || this.m_key === "courses_year")){
            throw "Query contains both courses and rooms keys."
        }
        if(!Filter.isRoom && (this.m_key === "rooms_lat" || this.m_key === "rooms_lon" || this.m_key === "rooms_seats")){
            throw "Query contains both courses and rooms keys."
        }
    }


    getMComp(mComp : any) {
        var oArr : any[] = Object.keys(mComp);
        this.comp = oArr[0];

    }

    getInputNumber(mComp : any){


        var oArr : any[] = Object.keys(mComp);

        if(oArr[0] === "LT" || oArr[0] === "GT" || oArr[0] === "EQ"){
            var mCompKey = oArr[0];
            var keySet = mComp[mCompKey];
            var mArr : any[] = Object.keys(keySet);
            var key = mArr[0];
            var inputNumber = keySet[key];

            if (isNullOrUndefined(inputNumber)
                || (typeof inputNumber !== "number")){
                throw "invalidInputNumber err"
            }
            if (mArr[0] === "courses_avg") {
                if (inputNumber > 100) {
                    throw "invalidInputNumber err"
                }
            }
            return inputNumber;

        } else {
            //console.log("getInputNumber err");
            throw "getInputNumber err"}

    }

    evaluate(courseObject : any) : boolean {

        if(this.comp === "LT"){

            return (courseObject[this.m_key] < this.inputNumber);
        }

        if(this.comp === "GT"){

            return (courseObject[this.m_key] > this.inputNumber);
        }

        if(this.comp === "EQ"){

            return (courseObject[this.m_key] === this.inputNumber);
        }
    }


}