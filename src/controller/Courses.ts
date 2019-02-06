import {IInsightFacade, InsightResponse} from "./IInsightFacade";
import {Dataset} from "./InsightFacade";
import Parser from "./Parser";

export  interface Course {
    Subject : string,
    id : string,
    Avg : number,
    Professor : string,
    Title : string,
    Pass : number,
    Fail : number,
    Audit : number,
    Course : string,
    Year : number,
}
export default class Courses extends Parser{
    courseArray : any[];
    constructor() {
        super() ;
        this.courseArray = [];
    }

    unZip(id : string, content : string) : Promise<Array<any>>{
        let JSZip = require('jszip');
        let zip = new JSZip();
        let fArr: any[] = [];
        let that = this ;

        return new Promise(function (fulfill , reject){

            zip.loadAsync(content, {base64:true})
                .then(function (result:any ) {

                    Object.keys(result.files).forEach(function ( filepath ) {
                        if (result.file(filepath)){
                            fArr.push(result.file(filepath).async("string")
                                .catch(function ( err: Array<any> ) {
                                    reject(err);
                                })
                            )}

                    });
                    Promise.all(fArr)
                        .then(function ( finalResult: any ) {

                            for (let j = 0; j < finalResult.length; j++) {
                                try {
                                    let jsonObject: JSON = JSON.parse(finalResult[j]);
                                    that.getCourses(jsonObject);
                                } catch (err) {
                                    reject('JSON could not be parsed')
                                }
                            }
                            fulfill(that.courseArray);
                        })
                        .catch(function ( err: any ) {
                            reject(err);
                        })

                })
                .catch(function (err: any) {
                    reject(err);
                });
        }) ;

    }

    getCourses( jsonObject : any){
        let oArr : any[] = Object.keys(jsonObject);
        let that = this ;
        if(oArr[0] === "result") {
            let resultKey = oArr[0];
            let result = jsonObject[resultKey];
            for(let jObject of result){
                that.getCourseObject(jObject);
            }
        } else {
            return;
        }

    }

    getCourseObject( file : any){
        let oArr : any[] = Object.keys(file);
        let that = this ;

        if (!(
                (file.hasOwnProperty("Subject")) ||
                (file.hasOwnProperty("id")) ||
                (file.hasOwnProperty("Avg")) ||
                (file.hasOwnProperty("Professor")) ||
                (file.hasOwnProperty("Title")) ||
                (file.hasOwnProperty("Pass")) ||
                (file.hasOwnProperty("Audit")) ||
                (file.hasOwnProperty("Course")) ||
                (file.hasOwnProperty("Year"))))
        {  throw new Error ( "INVALID COURSE")}

        let year : number;

        if(file.Section == "overall") {
            year = 1900;
        }else {
            year = Number.parseInt(file.Year) ;
        }

        let courseObject: Course = {
                Subject: file.Subject,
                id: file.id.toString(),
                Avg: file.Avg,
                Professor: file.Professor,
                Title: file.Title,
                Fail: file.Fail,
                Pass: file.Pass,
                Audit: file.Audit,
                Course: file.Course.toString(),
                Year: year,
        };

        this.courseArray.push(courseObject);

    }



}
