




import Apply from "./Apply";
import Group from "./Group";

export default class Transformation {
    apply : Apply;
    group : Group;

    constructor(trans : any) {
        try{
            this.isGroupEmpty(trans);
            this.isBothApplyAndGroup(trans);
            this.group = new Group(this.setGroup(trans));
            if(this.isApplyEmpty(trans)){
                this.apply = new Apply(this.setApply(trans));
            } else {this.apply = null;}

        }catch(err){
            throw err;
        }
    }

    isBothApplyAndGroup(trans :any){
        let group = trans.GROUP;
        let apply = trans.APPLY;

        if(typeof group === "undefined" || typeof apply === "undefined"){
            throw "missing group or apply"
        }



    }

    //Is there always a group and an apply?

    isApplyEmpty(trans : any){

        var oArr : any[] = Object.keys(trans);

        if(oArr[1] === "APPLY") {
            var applyKey = oArr[1];
            var apply = trans[applyKey];

            if (apply.length === 0){
                return false;
            } else {return true;}
        }

        else {
            throw "isApplyEmpty error"}
    }


    isGroupEmpty(trans : any){

        var oArr : any[] = Object.keys(trans);

        if(oArr[0] === "GROUP") {
            var groupKey = oArr[0];
            var group = trans[groupKey];

            if (group.length === 0){
                throw "group length === 0"
            }
        }

        else {
            throw "isGroupEmpty error"}
    }




    setApply(trans : any){
        var oArr : any[] = Object.keys(trans);

        if(oArr[1] === "APPLY") {
            var applyKey = oArr[1];
            var apply = trans[applyKey];
            return apply;
        }

        else {
            throw "setApply error"}
    }


    setGroup(trans : any){
        var oArr : any[] = Object.keys(trans);

        if(oArr[0] === "GROUP") {
            var groupKey = oArr[0];
            var group = trans[groupKey];
            return group;
        }
        else {
            throw "setGroup error";}
    }

    //recursive
    /*
    evaluate(objectArr : any) {

        let groupKeys = this.group.evaluate();
        let glength = groupKeys.length;
        let olength = objectArr.length;
        let pairArr: any[] = [];
        let returnArr: any[] = [];


        for (let i = 0; i < olength; i++) {
            let currObject = objectArr[i];
            let currString = "";
            let groupBoolean = false;

            for (let j = 0; j < glength; j++) {

                let currKey = groupKeys[j];
                let currVal = currObject[currKey];
                if(typeof currVal === "string"){
                    currString = currString + currVal;

                } else {
                    let newString = JSON.stringify(currVal);
                    currString = currString + newString;
                }

            }

            for (let k = 0; k < pairArr.length; k++) {
                let pAKey = Object.keys(pairArr[k]);

                if (currString === pAKey[0]) {
                    pairArr[k][Object.keys(pairArr[k])[0]].push(currObject);
                    groupBoolean = true;
                    break;
                }
            }
            if (!groupBoolean) {
                let newGroupArr: any[] = [];
                newGroupArr.push(currObject);
                let pObj = {[currString]: newGroupArr};
                pairArr.push(pObj);
            }
        }

        let pairArrLength = pairArr.length;

        for (let u = 0; u < pairArrLength; u++) {
            let currPair = pairArr[u];
            let currKey = Object.keys(currPair)[0];
            let currObjArr: any[] = currPair[currKey];

            let groupObject = {};
            let currObj = currObjArr[0];

            for (let j = 0; j < glength; j++) {
                let currKey = groupKeys[j];
                let currVal = currObj[currKey];
                Object.assign(groupObject, {[currKey]: currVal});
            }

            if (this.apply != null) {


                let Obj3 = this.apply.evaluate(currObjArr);
                let finalObj = Object.assign(groupObject, Obj3);
                returnArr.push(finalObj);

            } else {
                returnArr.push(groupObject);
            }
        }

        //console.log( returnArr);

        return returnArr;



    }
    */
    trialevaluate(objectArr : any){
        let groupKeys = this.group.evaluate();
        let glength = groupKeys.length;

        function helpSortMultiple( a: any, b: any ) {
            let groupKeyCounter = groupKeys.length;
            let result = 0;

            let i = 0;
            while (result === 0 && i < groupKeyCounter) {
                result = helpsort(groupKeys[i])(a, b);
                i++;
            }
            return result;
        }

        function helpsort( singleKey: any ) {

            return function ( a: any, b: any ) {

                if (a[singleKey]  > b[singleKey] ) {
                    return 1;
                }

                if (a[singleKey]  < b[singleKey] ) {

                    return -1;
                }
                else {
                    return 0;
                }
            };
        }

        let sortedArray: any[] = objectArr.sort(helpSortMultiple);
        let slength = sortedArray.length;
        let returnArr: any[] = [];
        let groupArr: any[] = [];
        let checkstr: string;
        let otherObject = {};
        let finalObj= {};

        console.table(sortedArray);

        for (let i = 0; i < slength; i++) {

            let currObj = sortedArray[i];
            let currString = "";
            let groupObject = {};

            for (let j = 0; j < glength; j++) {
                let currKey = groupKeys[j];
                let currVal = currObj[currKey];
                Object.assign(groupObject, {[currKey]: currVal});
                if(typeof currVal === "string"){
                    currString = currString + currVal;

                } else {
                    let newString = JSON.stringify(currVal);
                    currString = currString + newString;
                }
            }
            if ((checkstr === currString)||(typeof checkstr === "undefined")) {
                groupArr.push(sortedArray[i]);
                otherObject = groupObject;
                checkstr = currString;
            }else {
                if (this.apply != null) {
                    let Obj3 = this.apply.evaluate(groupArr);
                    finalObj = Object.assign(otherObject, Obj3);
                    returnArr.push(finalObj);
                } else {
                    returnArr.push(otherObject);
                }
                groupArr = [];
                groupArr.push(sortedArray[i]);
                otherObject = groupObject;
                checkstr = currString;
            }
            if (i === slength - 1) {
                if (this.apply != null) {
                    let Obj3 = this.apply.evaluate(groupArr);
                    finalObj = Object.assign(otherObject, Obj3);
                    returnArr.push(finalObj);
                } else {
                    returnArr.push(otherObject);
                }
            }
        }
        return returnArr;


    }

}