



import Columns from "./Columns";
import Options, {returnObject} from "./Options";
import Body from "./Body";
import Filter from "./Filter";
import Transformation from "./Transformation";
import {orderRetObject} from "./Order";

export default class Query {
    body: Body;
    options: Options;
    transformation : Transformation;

    constructor(jsonObject: any) {
        try {

            if(!this.isBodyEmpty(jsonObject)){
                this.body = new Body(this.getBody(jsonObject));
            } else {
                this.body = null;
            }
            this.options = new Options(this.getOptions(jsonObject));
            if(this.isTransformation(jsonObject)){
                this.transformation = new Transformation(this.getTransformation(jsonObject));
            } else {
                this.transformation = null;
            }
        } catch (err) {
            throw err;
        }
    }


    getBody(jsonObject: any) {
        const kArr: any[] = Object.keys(jsonObject);

        if (kArr[0] === "WHERE") {
            const bodyKey = kArr[0];
            const body = jsonObject[bodyKey];
            return {WHERE : body};
        } else {
            throw "getBodyError"
        }

    }

    isEmpty(obj : any) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    isBodyEmpty(jsonObject: any){

        const kArr: any[] = Object.keys(jsonObject);

        if (kArr[0] === "WHERE") {
            const bodyKey = kArr[0];
            const body = jsonObject[bodyKey];
            if(this.isEmpty(body)){
                return true;
            } else {return false;}
        } else {
            throw "isBodyEmpty Error"
        }


    }

    getOptions(jsonObject: any) {
        const kArr: any[] = Object.keys(jsonObject);
        if (kArr[1] === "OPTIONS") {
            const optionsKey = kArr[1];
            const options = jsonObject[optionsKey];
            return options;
        } else {
            throw "getOptions error"
        }
    }

    isTransformation(jsonObject : any){
        const kArr: any[] = Object.keys(jsonObject);
        let keyLength = kArr.length;
        if(keyLength < 3){
            return false;
        } else {return true;}

    }


    getTransformation(jsonObject : any){
        const kArr: any[] = Object.keys(jsonObject);
        if (kArr[2] === "TRANSFORMATIONS") {
            const transKey = kArr[2];
            const trans = jsonObject[transKey];
            return trans;
        } else {
            throw "transformation error"
        }

    }

    evaluate(file : any){


        let sortKeys: any;
        let sortDir: any;
        let returnObject: returnObject = this.options.evaluate();
        const sortData: orderRetObject = returnObject.key;
        const dataKeys = returnObject.keySet.dataKeyArray;
        const queryKeys = returnObject.keySet.queryKeyArray;

        if (sortData) {
            sortKeys = sortData.keys;
            sortDir = sortData.dir;
        }


        let transArr : any[] = [];
        let secArr : any[] = [];


        let v;
        let finalArr: any[] = [];

        try {
            v = file;
        }
        catch (err){
            throw err
        }


        for(let courseObject of v){
            let newObject;



            if (!Filter.isRoom) {

                newObject = {
                    courses_dept: courseObject.Subject,
                    courses_id: courseObject.Course,
                    courses_avg: courseObject.Avg,
                    courses_instructor: courseObject.Professor,
                    courses_title: courseObject.Title,
                    courses_pass: courseObject.Pass,
                    courses_fail: courseObject.Fail,
                    courses_audit: courseObject.Audit,
                    courses_uuid: courseObject.id,
                    courses_year: courseObject.Year,
                };

            } else {
                newObject = courseObject;
            }

            if(this.body != null){
                if(this.body.evaluate(newObject)){
                    transArr.push(newObject);
                }
            } else{transArr.push(newObject);}
        }



       if(this.transformation !=null){

           //secArr = this.transformation.evaluate(transArr);
           secArr =  this.transformation.trialevaluate(transArr);

       } else {secArr = transArr;}





       for(let courseObject of secArr) {


           let firstCourseObject = {};
           let size = dataKeys.length;

           for (let i = 0; i < size; i++) {

               let dataKey = dataKeys[i];
               let dataValue = courseObject[dataKey];

               if(typeof dataValue === 'undefined'){
                   throw "dataValue is undefined"
               }

               let queryKey = queryKeys[i];
               let secondCourseObject = {
                   [queryKey]: dataValue
               };
               firstCourseObject = Object.assign(firstCourseObject, secondCourseObject);
           }
           finalArr.push(firstCourseObject);
       }



        function helpSortMultiple( a: any, b: any ) {
            let sortKeyCounter = sortKeys.length;
            let result = 0;

            let i = 0;
            while (result === 0 && i < sortKeyCounter) {
                result = helpsort(sortKeys[i])(a, b);
                i++;
            }
            return result;
        }

        function helpsort( singleKey: any ) {

            return function ( a: any, b: any ) {

                if (a[singleKey] > b[singleKey]) {
                    if (sortDir === "DOWN") {
                        return -1
                    } else {
                        return 1;
                    }
                }
                if (a[singleKey] < b[singleKey]) {
                    if (sortDir === "DOWN") {
                        return 1
                    } else {
                        return -1;
                    }
                }
                else {
                    return 0;
                }
            };
        }

        if (sortKeys) {
            return finalArr.sort(helpSortMultiple);
        } else {
            return finalArr;
        }

    }


}
