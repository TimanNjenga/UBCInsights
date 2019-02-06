


import Filter from "./Filter";

export default class SComparison extends Filter {
    s_key : any;
    inputString : string;
    comp : string;

//new change here
    constructor(sComp : any){
        super();
        this.s_key = this.getSKey(sComp);
        try {
            this.getSComp(sComp);
            if (typeof Filter.isRoom === 'undefined' || Filter.isRoom === null)  {
                this.getIsRooms();
            }
            this.roomCourseConflict();
            this.inputString = this.getInputString(sComp);





        } catch (err) {
            throw err;
        }
        //console.log("________SComparison - s_key________:");
        //console.log(this.s_key);
        //console.log("________SComparison - inputString_________:");
        //console.log(this.inputString);
    }

    //TODO: needs to check if the keys are S_keys


    getSKey(sComp : any){
        var oArr : any[] = Object.keys(sComp);

        if(oArr[0] === "IS") {
            var sCompKey = oArr[0];
            var keyset = sComp[sCompKey];

            var sArr : any[] = Object.keys(keyset);

            if((sArr[0] === "rooms_fullname" || sArr[0] === "rooms_shortname" || sArr[0] === "rooms_number" || sArr[0] === "rooms_name" || sArr[0] === "rooms_address" || sArr[0] === "rooms_type" || sArr[0] === "rooms_furniture" || sArr[0] === "rooms_href")){
                return sArr[0];
            }

            if(sArr[0] === "courses_dept" || sArr[0] === "courses_instructor" || sArr[0] === "courses_title" || sArr[0] === "courses_uuid" || sArr[0] === "courses_id"){
                return sArr[0];}
            else {throw "not s_key"}
        } else {
            //console.log("getSKey err");
            throw "getSKey err"}
    }

    getSComp(sComp : any) {
        var oArr : any[] = Object.keys(sComp);

        //change for Liberation: Invalid IS should result in 400.
        //
        if((typeof oArr[0] === "string")&& (oArr[0])){
            this.comp = oArr[0];}
        else {throw "inputString err"}

    }

    getIsRooms() {


        if(this.s_key === "courses_dept" || this.s_key === "courses_instructor" || this.s_key  === "courses_title" || this.s_key === "courses_uuid" || this.s_key === "courses_id"){
            Filter.isRoom = false;
        }
        if(this.s_key === "rooms_fullname" || this.s_key === "rooms_shortname" || this.s_key === "rooms_number" || this.s_key === "rooms_name" || this.s_key === "rooms_address" || this.s_key === "rooms_type" || this.s_key === "rooms_furniture" || this.s_key === "rooms_href"){
            Filter.isRoom = true;
        }


    }

    roomCourseConflict(){
        if(Filter.isRoom && (this.s_key === "courses_dept" || this.s_key === "courses_instructor" || this.s_key  === "courses_title" || this.s_key === "courses_uuid" || this.s_key === "courses_id")){
            throw "Room & Course Confict"
        }
        if(!Filter.isRoom && (this.s_key === "rooms_fullname" || this.s_key === "rooms_shortname" || this.s_key === "rooms_number" || this.s_key === "rooms_name" || this.s_key === "rooms_address" || this.s_key === "rooms_type" || this.s_key === "rooms_furniture" || this.s_key === "rooms_href")){
            throw "Room & Course Confict"
        }
    }





    getInputString(sComp : any){
        var oArr : any[] = Object.keys(sComp);

        if(oArr[0] === "IS") {
            var sCompKey = oArr[0];
            var keySet = sComp[sCompKey];

            var sArr : any[] = Object.keys(keySet);
            var key = sArr[0];
            var inputString = keySet[key];
            let wildcardno = (inputString.match(/[*]/ig) || []).length ;
            if (wildcardno === 1){

                if ((inputString.length < 2) ||
                    (inputString.charAt(0) !== "*") && (inputString.charAt(inputString.length -1) !== "*"))
                {throw "invalidInputString err"}

            }
            if (wildcardno === 2) {

                if ((inputString.charAt(0) !== "*") || (inputString.charAt(inputString.length -1) !== "*")
                    || (inputString.length < 3))
                {throw "invalidInputString err"}

            }
            if (wildcardno > 2) {
                throw "invalidInputString err"
            }
            return inputString;

        } else {
            //console.log("getInputString err");
            throw "getInputString err"}
    }


    evaluate(courseObject : any) : boolean {

        let regexp = (/[*]/g) ;
        let indexarray :any[] = [];
        let string1:string = courseObject[this.s_key] ;
        let string2:string = this.inputString ;
        let inputlength = string2.length - 1 ;
        let wildcardnumber = (string2.match(/[*]/ig) || []).length;

        while (regexp.exec(this.inputString) !== null) {
            indexarray.push(regexp.lastIndex)
        }

        if (wildcardnumber === 0){

            return (courseObject[this.s_key] === this.inputString)
        }

        if (wildcardnumber === 2) {
            let subindx1:number = indexarray[0] ;
            let subindx2:number  = (indexarray[1] - 1 ) ;
            return ( string1.indexOf(string2.substring(subindx1,subindx2)) !== -1 )

        }else {
            if (regexp.exec(this.inputString).index === 0 ){

                let string3 = string1.substr(string1.length - inputlength) ;
                let string4 = string2.substring(1);
                return (string3.indexOf(string4) !== -1)

            }else {
                let string3 = string1.substr(0,inputlength) ;
                let string4 = string2.substr(0,inputlength);

                return (string3.indexOf(string4) !== -1)
            }

        }



    }

}
