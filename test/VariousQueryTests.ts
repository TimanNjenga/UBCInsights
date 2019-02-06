///<reference path="../src/controller/IInsightFacade.ts"/>

import {expect} from 'chai';
import Log from "../src/Util";
import InsightFacade from "../src/controller/InsightFacade";
import {IInsightFacade, InsightResponse} from "../src/controller/IInsightFacade";
import Filter from "../src/controller/Filter";

describe("VariousQueryTests", function () {


    let insightfacade : InsightFacade  =  new InsightFacade();


//new change here

    let fs = require('fs');
    let astring = "rooms";
    let astring2 = "courses";
    let data = fs.readFileSync('rooms.zip');
    let data2 = fs.readFileSync('courses.zip');
    let contentstring = data.toString('base64');
    let contentstring2 = data2.toString('base64');


    let query1 = {

        "WHERE": {
            "IS": {
                "rooms_name": "DMP_*"
            }
        },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_name"
            ],
            "ORDER": "rooms_name"
        }
    };

    let query2 = {
        "WHERE": {
            "IS": {
                "rooms_address": "*Agrono*"
            }
        },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_address", "rooms_name"
            ]
        }
    };

    let query19 = {
        "WHERE":{


            "AND":[
                {
                    "IS":{
                        "courses_id": '329'
                    }
                },
                {
                    "IS":{
                        "courses_dept":"adhe"
                    }
                }
            ]
        },

        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
                "courses_id",
                "courses_avg",
                "courses_year"
            ],
            "ORDER":"courses_avg"
        }
    };



    beforeEach(function () {
    });

    afterEach(function () {
    });
   // this.timeout(50000)


        it("add rooms and perform rooms query",function(){

            return insightfacade.addDataset(astring, contentstring)
                .then ( function (valueonce){
                   // console.log("in first then")
                    return insightfacade.performQuery(query1)
                        .then(function (response: InsightResponse) {
                       //     console.log("in second then")
                         //   console.log(Filter.isRoom);
                            Log.test('Response number: ' + response.code);
                            Log.test('Response body: ' + response.body);
                            expect(response.code).to.deep.equal(200);
                            expect(response.body).to.deep.equal({
                                "result": [{
                                    "rooms_name": "DMP_101"
                                }, {
                                    "rooms_name": "DMP_110"
                                }, {
                                    "rooms_name": "DMP_201"
                                }, {
                                    "rooms_name": "DMP_301"
                                }, {
                                    "rooms_name": "DMP_310"
                                }]
                            });

                        }).catch(function (err: any) {
                            Log.test('Error: ' + err);
                            expect.fail();
                        })
                })
                .catch(function (err: any) {
                  //  console.log(Filter.isRoom)
                   // console.log(err);
                    expect.fail();
                });
        });



    it("add rooms and perform rooms query2",function(){
        return insightfacade.performQuery(query1)
            .then(function (response: InsightResponse) {
             //   console.log(Filter.isRoom);
                Log.test('Response number: ' + response.code);
                Log.test('Response body: ' + response.body);
                expect(response.code).to.deep.equal(200);
                expect(response.body).to.deep.equal({
                    "result": [{
                        "rooms_name": "DMP_101"
                    }, {
                        "rooms_name": "DMP_110"
                    }, {
                        "rooms_name": "DMP_201"
                    }, {
                        "rooms_name": "DMP_301"
                    }, {
                        "rooms_name": "DMP_310"
                    }]
                });

            }).catch(function (err: any) {
              //  console.log(err.body)
                Log.test('Error: ' + err);
              //  console.log(err);
              //  console.log(Filter.isRoom)
                expect.fail();
            })
    });

    it("add rooms and perform rooms query3",function(){
        return insightfacade.performQuery(query1)
            .then(function (response: InsightResponse) {
           //     console.log(Filter.isRoom);
                Log.test('Response number: ' + response.code);
                Log.test('Response body: ' + response.body);
                expect(response.code).to.deep.equal(200);
                expect(response.body).to.deep.equal({
                    "result": [{
                        "rooms_name": "DMP_101"
                    }, {
                        "rooms_name": "DMP_110"
                    }, {
                        "rooms_name": "DMP_201"
                    }, {
                        "rooms_name": "DMP_301"
                    }, {
                        "rooms_name": "DMP_310"
                    }]
                });

            }).catch(function (err: any) {
             //   console.log(err.body)
                Log.test('Error: ' + err);
              //  console.log(err);
              //  console.log(Filter.isRoom)
                expect.fail();
            })
    });











});

