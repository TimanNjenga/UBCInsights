import {IInsightFacade, InsightResponse} from "./IInsightFacade";
import {Dataset} from "./InsightFacade";



export default class Parser {


    constructor() {}

    unZip(id : string, content : string) :any{
        return false
    }


    getCourses( jsonObject : any) : any {
        return false;
     }

    getCourseObject( file : any) : any {
        return false ;
    };

    saveFile(file : any) {

        let fs = require('fs');
        let json = JSON.stringify(file);
        fs.writeFile("./test array", json, function(err : any) {
            if(err) {
                return;
            }

        });
    }



}
