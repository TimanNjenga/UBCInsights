/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse} from "./IInsightFacade";

import Log from "../Util";
import Parser from "./Parser";
import Program from "./Program";
import * as fs from "fs";
import {isNull, isNullOrUndefined, isUndefined} from "util";
import Courses from "./Courses";
import Rooms from "./Rooms";
import Address from "./Address";
import Filter from "./Filter";

//new change here


export  interface Dataset {
    ident: string,
    thefile: {},
}


export default class InsightFacade implements IInsightFacade {

    static myDatasets: Dataset [] ;
    constructor() {
        Log.trace('InsightFacadeImpl::init()');
        InsightFacade.myDatasets = null;
    }



    addDataset(id: string, content: string): Promise<InsightResponse> {


        let p = new Parser();
        let c = new Courses();
        let a = new Address();
        let r = new Rooms() ;
        let response: InsightResponse ={
            code: 0 ,
            body: "",
        };
        let b: boolean = false;
        let newdataset: Dataset = {
            ident: "",
            thefile: {},

        };


        function checkir(file:any) {

            if (isNullOrUndefined(file) || (!(file instanceof Object)) || file.length === 0){
                throw ( "Invalid JSON" );
            }
            if (!InsightFacade.myDatasets)
            {
                InsightFacade.myDatasets = [];
            }
            else {
                for (let i = 0; i < InsightFacade.myDatasets.length; i++) {
                    if (InsightFacade.myDatasets[i].ident === id) {
                        b = true;
                    }
                }
            }

            if (b) {
                response.code = 201;
                response.body = "the operation was successful and the id already existed (was added in this session or was previously cached)" ;
            }
            else   {
                response.code = 204;
                response.body = "the operation was successful and the id was new (not added in this session or was previously cached) ";
                newdataset.ident = id ;
                newdataset.thefile = file ;
                InsightFacade.myDatasets.push(newdataset);
            }



        }

        return new Promise(function (fulfill , reject) {

            if (id == "courses") {

                c.unZip(id, content).then(function(newFArr) {
                    checkir(newFArr);
                    p.saveFile(InsightFacade.myDatasets);
                    fulfill(response);
                    return
                    }
                ).catch(function(err){
                    response.code = 400;
                    response.body = {"error": err};
                    reject(response);
                    return
                });

            }
            else if (id == "rooms") {
                r.unZip(id, content).then(function(newFArr) {
                        onceitsdone(newFArr);
                    }
                ).catch(function(err){
                    response.code = 400;
                    response.body = {"error": err};
                    reject(response);
                    return
                });

            }else{
                response.code = 400;
                response.body = {"error": "Invalid  ID"};
                reject(response);
                return
            }

            function onceitsdone(newarr:any){
                a.getaddress(newarr).then(function(result:any) {
                    checkir(result);
                    p.saveFile(InsightFacade.myDatasets);
                    fulfill(response);
                    }
                ).catch(function(err :any){
                    response.code = 400;
                    response.body = {"error": err};
                    reject(response);
                    return;
                });


            }
        });

    }


    removeDataset( id: string ): Promise<InsightResponse> {


        let p = new Parser();
        let response: InsightResponse ={
            code: 0 ,
            body: "",
        };
        let b: number;
        let boo: boolean = false;
        let fArr :any;


        return new Promise(function (fulfill , reject) {
            if (isNullOrUndefined(InsightFacade.myDatasets)){
                response.code = 404;
                response.body = "the operation was unsuccessful because the delete was for a resource that was not previously added ";
                reject(response) ;
                return
            }
            let file = InsightFacade.myDatasets;

            for (let i = 0; i < file.length; i++) {
                if (file[i].ident === id) {
                    b = i;
                    boo = true;
                }
            }
            if (boo) {
                file.splice(b, 1);
                p.saveFile(file);
                InsightFacade.myDatasets = file;
                response.code = 204;
                response.body = "the operation was successful";
                fulfill(response);
                return
            }
            else {
                response.code = 404;
                response.body = "the operation was unsuccessful because the delete was for a resource that was not previously added ";
                reject(response);
                return
            }
        });

    }

    performQuery( query: any ): Promise<InsightResponse> {

        Filter.isRoom = null;
        let response: InsightResponse ={
            code: 0 ,
            body: { },

        };
        let p = new Program();
        let boo: boolean = false;
        /*
   * 200: the query was successfully answered. The result should be sent in JSON according in the response body.
   * 400: the query failed; body should contain {"error": "my text"} providing extra detail.
   * 424: the query failed because of a missing dataset; body should contain {"error": "my text"} providing extra detail.
         */

        return new Promise(function (fulfill, reject) {

            if ((InsightFacade.myDatasets === null)
                || (InsightFacade.myDatasets.length === 0)
                ||(! (InsightFacade.myDatasets)))
            {
                response.code = 424;
                response.body = {"error " : "there are no data sets in the file"};
                reject(response);
                return
            }

            try {
                p.parseQuery(query);
            }catch (err) {
                response.code = 400;
                response.body = {"error ": err};
                reject(response);
                return;
            }

            if (Filter.isRoom){
                for ( let i of InsightFacade.myDatasets){
                    if (i.ident === "rooms"){
                        boo = true;
                        try {
                            response.code = 200;
                            response.body = { result : p.evaluateAll(i.thefile) } ;
                            fulfill(response);

                        }
                        catch (err) {
                            response.code = 400;
                            response.body = {"error ": err};
                            reject(response);
                        }
                    }

                }
            }
            if (!(Filter.isRoom)) {
                for ( let i of InsightFacade.myDatasets){
                    if (i.ident === "courses"){
                        boo = true;
                        try {
                            response.code = 200;
                            response.body = { result : p.evaluateAll(i.thefile) } ;
                            fulfill(response);

                        }
                        catch (err) {
                            response.code = 400;
                            response.body = {"error ": err};
                            reject(response);
                        }
                    }

                }
            }
            if (!(boo)){
                response.code = 424;
                response.body = {"error " : "there are no data sets in the file"};
                reject(response);
                return
            }


        })

    }
}
