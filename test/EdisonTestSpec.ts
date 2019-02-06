///<reference path="../src/controller/IInsightFacade.ts"/>

import {expect} from 'chai';
import Log from "../src/Util";
import InsightFacade from "../src/controller/InsightFacade";
import {IInsightFacade, InsightResponse} from "../src/controller/IInsightFacade";

describe("EdisonTestSpec", function () {


    let insightfacade : InsightFacade  = new InsightFacade();

//new change here

    let fs = require('fs');
    let astring = "rooms";
    let data = fs.readFileSync('rooms.zip');
    let contentstring = data.toString('base64');
    let astring2 = "courses";
    let data2 = fs.readFileSync('courses.zip');
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
    let query3 = {
        "WHERE":{
            "OR":[
                {
                    "AND":[
                        {
                            "GT":{
                                "courses_avg":90
                            }
                        },
                        {
                            "IS":{
                                "courses_dept":"adhe"
                            }
                        }
                    ]
                },
                {
                    "EQ":{
                        "courses_avg":95
                    }
                }
            ]
        },
        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
                "courses_id",
                "courses_avg"
            ],
            "ORDER":"courses_avg"
        }
    };



    beforeEach(function () {

    });

    afterEach(function () {

    });
    //this.timeout(50000)

    //this.timeout(5000);

    it("should return new rooms saved file ",function(){
        return insightfacade.addDataset(astring , contentstring)
            .then(function (response: InsightResponse) {
                Log.test('Response number: ' + response.code);
                Log.test('Response body: ' + response.body);
                expect(response.code).to.deep.equal(204);
                expect(response.body).to.deep.equal("the operation was successful and the id was new (not added in this session or was previously cached) ");
                //expect(response.body).to.deep.equal(['{"result":[{"tier_eighty_five":1,"tier_ninety":8,"Title":"rsrch methdlgy","Section":"002","Detail":"","tier_seventy_two":0,"Other":1,"Low":89,"tier_sixty_four":0,"id":31379,"tier_sixty_eight":0,"tier_zero":0,"tier_seventy_six":0,"tier_thirty":0,"tier_fifty":0,"Professor":"","Audit":9,"tier_g_fifty":0,"tier_forty":0,"Withdrew":1,"Year":"2015","tier_twenty":0,"Stddev":2.65,"Enrolled":20,"tier_fifty_five":0,"tier_eighty":0,"tier_sixty":0,"tier_ten":0,"High":98,"Course":"504","Session":"w","Pass":9,"Fail":0,"Avg":94.44,"Campus":"ubc","Subject":"aanb"},{"tier_eighty_five":1,"tier_ninety":8,"Title":"rsrch methdlgy","Section":"overall","Detail":"","tier_seventy_two":0,"Other":1,"Low":89,"tier_sixty_four":0,"id":31380,"tier_sixty_eight":0,"tier_zero":0,"tier_seventy_six":0,"tier_thirty":0,"tier_fifty":0,"Professor":"","Audit":9,"tier_g_fifty":0,"tier_forty":0,"Withdrew":1,"Year":"2015","tier_twenty":0,"Stddev":2.65,"Enrolled":20,"tier_fifty_five":0,"tier_eighty":0,"tier_sixty":0,"tier_ten":0,"High":98,"Course":"504","Session":"w","Pass":9,"Fail":0,"Avg":94.44,"Campus":"ubc","Subject":"aanb"}],"rank":0}','{"result":[{"tier_eighty_five":3,"tier_ninety":2,"Title":"anml welf rsrch","Section":"003","Detail":"","tier_seventy_two":0,"Other":0,"Low":84,"tier_sixty_four":0,"id":31381,"tier_sixty_eight":0,"tier_zero":0,"tier_seventy_six":0,"tier_thirty":0,"tier_fifty":0,"Professor":"","Audit":0,"tier_g_fifty":0,"tier_forty":0,"Withdrew":0,"Year":"2015","tier_twenty":0,"Stddev":2.56,"Enrolled":6,"tier_fifty_five":0,"tier_eighty":1,"tier_sixty":0,"tier_ten":0,"High":91,"Course":"551","Session":"w","Pass":6,"Fail":0,"Avg":87.83,"Campus":"ubc","Subject":"aanb"},{"tier_eighty_five":3,"tier_ninety":2,"Title":"anml welf rsrch","Section":"overall","Detail":"","tier_seventy_two":0,"Other":0,"Low":84,"tier_sixty_four":0,"id":31382,"tier_sixty_eight":0,"tier_zero":0,"tier_seventy_six":0,"tier_thirty":0,"tier_fifty":0,"Professor":"","Audit":0,"tier_g_fifty":0,"tier_forty":0,"Withdrew":0,"Year":"2015","tier_twenty":0,"Stddev":2.56,"Enrolled":6,"tier_fifty_five":0,"tier_eighty":1,"tier_sixty":0,"tier_ten":0,"High":91,"Course":"551","Session":"w","Pass":6,"Fail":0,"Avg":87.83,"Campus":"ubc","Subject":"aanb"}],"rank":0}']);

            }).catch(function (err: any) {
                Log.test('Error: ' + err);
                expect.fail();
            })
    });
    it("should return new courses saved file ",function(){
        return insightfacade.addDataset(astring2 , contentstring2)
            .then(function (response: InsightResponse) {
                Log.test('Response number: ' + response.code);
                Log.test('Response body: ' + response.body);
                expect(response.code).to.deep.equal(204);
                expect(response.body).to.deep.equal("the operation was successful and the id was new (not added in this session or was previously cached) ");

            }).catch(function (err: any) {
                Log.test('Error: ' + err);
                console.log(err);
                expect.fail();
            })
    });

    it("should remove a rooms file ",function(){
        return insightfacade.removeDataset(astring)
            .then(function (response: InsightResponse) {
                Log.test('Response number: ' + response.code);
                Log.test('Response body: ' + response.body);
                expect(response.code).to.deep.equal(204);
                expect(response.body).to.deep.equal("the operation was successful");

            }).catch(function (err: any) {
                console.log(err) ;
                Log.test('Error: ' + err);
                expect.fail();
            })
    });

    it("Returns Correct performQuery Response with Code",function(){


        return insightfacade.performQuery(query3)
            .then(function (response: InsightResponse) {
                Log.test('Response number: ' + response.code);
                Log.test('Response body: ' + response.body);
                expect(response.code).to.deep.equal(200);
                expect(response.body).to.deep.equal({
                    result:
                        [ { courses_dept: 'adhe', courses_id: '329', courses_avg: 90.02 },
                            { courses_dept: 'adhe', courses_id: '412', courses_avg: 90.16 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.17 },
                            { courses_dept: 'adhe', courses_id: '412', courses_avg: 90.18 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.5 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.72 },
                            { courses_dept: 'adhe', courses_id: '329', courses_avg: 90.82 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.85 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.29 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.48 },
                            { courses_dept: 'adhe', courses_id: '329', courses_avg: 92.54 },
                            { courses_dept: 'adhe', courses_id: '329', courses_avg: 93.33 },
                            { courses_dept: 'rhsc', courses_id: '501', courses_avg: 95 },
                            { courses_dept: 'bmeg', courses_id: '597', courses_avg: 95 },
                            { courses_dept: 'bmeg', courses_id: '597', courses_avg: 95 },
                            { courses_dept: 'cnps', courses_id: '535', courses_avg: 95 },
                            { courses_dept: 'cnps', courses_id: '535', courses_avg: 95 },
                            { courses_dept: 'cpsc', courses_id: '589', courses_avg: 95 },
                            { courses_dept: 'cpsc', courses_id: '589', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'sowk', courses_id: '570', courses_avg: 95 },
                            { courses_dept: 'econ', courses_id: '516', courses_avg: 95 },
                            { courses_dept: 'edcp', courses_id: '473', courses_avg: 95 },
                            { courses_dept: 'edcp', courses_id: '473', courses_avg: 95 },
                            { courses_dept: 'epse', courses_id: '606', courses_avg: 95 },
                            { courses_dept: 'epse', courses_id: '682', courses_avg: 95 },
                            { courses_dept: 'epse', courses_id: '682', courses_avg: 95 },
                            { courses_dept: 'kin', courses_id: '499', courses_avg: 95 },
                            { courses_dept: 'kin', courses_id: '500', courses_avg: 95 },
                            { courses_dept: 'kin', courses_id: '500', courses_avg: 95 },
                            { courses_dept: 'math', courses_id: '532', courses_avg: 95 },
                            { courses_dept: 'math', courses_id: '532', courses_avg: 95 },
                            { courses_dept: 'mtrl', courses_id: '564', courses_avg: 95 },
                            { courses_dept: 'mtrl', courses_id: '564', courses_avg: 95 },
                            { courses_dept: 'mtrl', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                            { courses_dept: 'nurs', courses_id: '424', courses_avg: 95 },
                            { courses_dept: 'nurs', courses_id: '424', courses_avg: 95 },
                            { courses_dept: 'obst', courses_id: '549', courses_avg: 95 },
                            { courses_dept: 'psyc', courses_id: '501', courses_avg: 95 },
                            { courses_dept: 'psyc', courses_id: '501', courses_avg: 95 },
                            { courses_dept: 'econ', courses_id: '516', courses_avg: 95 },
                            { courses_dept: 'adhe', courses_id: '329', courses_avg: 96.11 } ] });


            }).catch(function (err: any) {
                Log.test('Error: ' + err);
                expect.fail();
            })


    });


});

