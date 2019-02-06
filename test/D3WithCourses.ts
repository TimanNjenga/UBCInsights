///<reference path="../src/controller/IInsightFacade.ts"/>

import {expect} from 'chai';
import Log from "../src/Util";
import InsightFacade from "../src/controller/InsightFacade";
import {IInsightFacade, InsightResponse} from "../src/controller/IInsightFacade";

describe("D3WithCourses", function () {


    let insightfacade : InsightFacade  = null;
    let insightfacade2 : InsightFacade = null;


//new change here

    let fs = require('fs');
    let astring = "courses";
    let data = fs.readFileSync('courses.zip');
    let contentstring = data.toString('base64');

    let astring2 = "rooms";
    let data2 = fs.readFileSync('rooms.zip');
    let contentstring2 = data2.toString('base64');


    let queryA = {
        "WHERE": { },
        "OPTIONS": {
            "COLUMNS": [
                "courses_instructor",
                "maxAVG"
            ],
            "ORDER": {
                "dir": "DOWN",
                "keys": ["maxAVG"]
            }
        },
        "TRANSFORMATIONS": {
            "GROUP": ["courses_instructor"],
            "APPLY": [{
                "maxAVG": {
                    "MAX": "courses_avg"
                }
            }]
        }
    };

    let queryB = {
        "WHERE": { },
        "OPTIONS": {
            "COLUMNS": [
                "courses_dept",
                "courses_id",
                "courses_avg",
                "courses_instructor",
                "courses_title",
                "courses_pass",
                "courses_fail",
                "courses_audit",
                "courses_uuid",
                "courses_year",
                "maxAVG"
            ],
            "ORDER": {
                "dir": "DOWN",
                "keys": ["maxAVG"]
            }
        },
        "TRANSFORMATIONS": {
            "GROUP": [
                "courses_dept",
                "courses_id",
                "courses_avg",
                "courses_instructor",
                "courses_title",
                "courses_pass",
                "courses_fail",
                "courses_audit",
                "courses_uuid",
                "courses_year"],
            "APPLY": [{
                "maxAVG": {
                    "MAX": "courses_avg"
                }
            }]
        }
    };

    let queryC = {
        "WHERE": { },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_fullname",
                "rooms_shortname",
                "rooms_number",
                "rooms_name",
                "rooms_address",
                "rooms_lat",
                "rooms_lon",
                "rooms_seats",
                "rooms_type",
                "rooms_furniture",
                "rooms_href",
                "maxAVG"
            ],
            "ORDER": {
                "dir": "DOWN",
                "keys": ["maxAVG"]
            }
        },
        "TRANSFORMATIONS": {
            "GROUP": [
                "rooms_fullname",
                "rooms_shortname",
                "rooms_number",
                "rooms_name",
                "rooms_address",
                "rooms_lat",
                "rooms_lon",
                "rooms_seats",
                "rooms_type",
                "rooms_furniture",
                "rooms_href"],
            "APPLY": [{
                "maxAVG": {
                    "MAX": "rooms_seats"
                }
            }]
        }
    };

    let queryD = {
        "WHERE": { },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_shortname"
            ],
            "ORDER": {
                "dir": "DOWN",
                "keys": ["rooms_shortname"]
            }
        }
    };




    beforeEach(function () {
        insightfacade = new InsightFacade();


    });

    afterEach(function () {
        insightfacade = null;
    });
    this.timeout(60000);



    it("sample queryA",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(queryA)

                    .then(function (response: InsightResponse) {
                        //console.log(response.body);
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        /*expect(response.body).to.deep.equal({ result:
                            [ { rooms_shortname: 'WOOD', maxSeats: 503 },
                                { rooms_shortname: 'OSBO', maxSeats: 442 },
                                { rooms_shortname: 'CIRS', maxSeats: 426 },
                                { rooms_shortname: 'HEBB', maxSeats: 375 },
                                { rooms_shortname: 'ESB', maxSeats: 350 },
                                { rooms_shortname: 'LSC', maxSeats: 350 },
                                { rooms_shortname: 'WESB', maxSeats: 325 },
                                { rooms_shortname: 'SRC', maxSeats: 299 },
                                { rooms_shortname: 'SCRF', maxSeats: 280 },
                                { rooms_shortname: 'BUCH', maxSeats: 275 },
                                { rooms_shortname: 'CHEM', maxSeats: 265 },
                                { rooms_shortname: 'ANGU', maxSeats: 260 },
                                { rooms_shortname: 'HENN', maxSeats: 257 },
                                { rooms_shortname: 'FSC', maxSeats: 250 },
                                { rooms_shortname: 'PHRM', maxSeats: 236 },
                                { rooms_shortname: 'BIOL', maxSeats: 228 },
                                { rooms_shortname: 'GEOG', maxSeats: 225 },
                                { rooms_shortname: 'MATH', maxSeats: 224 },
                                { rooms_shortname: 'LSK', maxSeats: 205 },
                                { rooms_shortname: 'CHBE', maxSeats: 200 },
                                { rooms_shortname: 'MCML', maxSeats: 200 },
                                { rooms_shortname: 'SWNG', maxSeats: 190 },
                                { rooms_shortname: 'FRDM', maxSeats: 160 },
                                { rooms_shortname: 'DMP', maxSeats: 160 },
                                { rooms_shortname: 'IBLC', maxSeats: 154 },
                                { rooms_shortname: 'AERL', maxSeats: 144 },
                                { rooms_shortname: 'MCLD', maxSeats: 136 },
                                { rooms_shortname: 'MATX', maxSeats: 106 },
                                { rooms_shortname: 'CEME', maxSeats: 100 },
                                { rooms_shortname: 'IONA', maxSeats: 100 },
                                { rooms_shortname: 'FNH', maxSeats: 99 },
                                { rooms_shortname: 'ALRD', maxSeats: 94 },
                                { rooms_shortname: 'LASR', maxSeats: 94 },
                                { rooms_shortname: 'ANSO', maxSeats: 90 },
                                { rooms_shortname: 'ORCH', maxSeats: 72 },
                                { rooms_shortname: 'BRKX', maxSeats: 70 },
                                { rooms_shortname: 'SOWK', maxSeats: 68 },
                                { rooms_shortname: 'SPPH', maxSeats: 66 },
                                { rooms_shortname: 'FORW', maxSeats: 63 },
                                { rooms_shortname: 'UCLL', maxSeats: 55 },
                                { rooms_shortname: 'EOSM', maxSeats: 50 },
                                { rooms_shortname: 'MGYM', maxSeats: 40 },
                                { rooms_shortname: 'PCOH', maxSeats: 40 },
                                { rooms_shortname: 'AUDX', maxSeats: 21 } ] });*/




                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                        console.log(err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
                console.log(err);
                expect.fail();
            });


    });


    it("sample queryB",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(queryB)

                    .then(function (response: InsightResponse) {
                       // console.log(response.body);
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        /*expect(response.body).to.deep.equal({ result:
                            [ { rooms_shortname: 'WOOD', maxSeats: 503 },
                                { rooms_shortname: 'OSBO', maxSeats: 442 },
                                { rooms_shortname: 'CIRS', maxSeats: 426 },
                                { rooms_shortname: 'HEBB', maxSeats: 375 },
                                { rooms_shortname: 'ESB', maxSeats: 350 },
                                { rooms_shortname: 'LSC', maxSeats: 350 },
                                { rooms_shortname: 'WESB', maxSeats: 325 },
                                { rooms_shortname: 'SRC', maxSeats: 299 },
                                { rooms_shortname: 'SCRF', maxSeats: 280 },
                                { rooms_shortname: 'BUCH', maxSeats: 275 },
                                { rooms_shortname: 'CHEM', maxSeats: 265 },
                                { rooms_shortname: 'ANGU', maxSeats: 260 },
                                { rooms_shortname: 'HENN', maxSeats: 257 },
                                { rooms_shortname: 'FSC', maxSeats: 250 },
                                { rooms_shortname: 'PHRM', maxSeats: 236 },
                                { rooms_shortname: 'BIOL', maxSeats: 228 },
                                { rooms_shortname: 'GEOG', maxSeats: 225 },
                                { rooms_shortname: 'MATH', maxSeats: 224 },
                                { rooms_shortname: 'LSK', maxSeats: 205 },
                                { rooms_shortname: 'CHBE', maxSeats: 200 },
                                { rooms_shortname: 'MCML', maxSeats: 200 },
                                { rooms_shortname: 'SWNG', maxSeats: 190 },
                                { rooms_shortname: 'FRDM', maxSeats: 160 },
                                { rooms_shortname: 'DMP', maxSeats: 160 },
                                { rooms_shortname: 'IBLC', maxSeats: 154 },
                                { rooms_shortname: 'AERL', maxSeats: 144 },
                                { rooms_shortname: 'MCLD', maxSeats: 136 },
                                { rooms_shortname: 'MATX', maxSeats: 106 },
                                { rooms_shortname: 'CEME', maxSeats: 100 },
                                { rooms_shortname: 'IONA', maxSeats: 100 },
                                { rooms_shortname: 'FNH', maxSeats: 99 },
                                { rooms_shortname: 'ALRD', maxSeats: 94 },
                                { rooms_shortname: 'LASR', maxSeats: 94 },
                                { rooms_shortname: 'ANSO', maxSeats: 90 },
                                { rooms_shortname: 'ORCH', maxSeats: 72 },
                                { rooms_shortname: 'BRKX', maxSeats: 70 },
                                { rooms_shortname: 'SOWK', maxSeats: 68 },
                                { rooms_shortname: 'SPPH', maxSeats: 66 },
                                { rooms_shortname: 'FORW', maxSeats: 63 },
                                { rooms_shortname: 'UCLL', maxSeats: 55 },
                                { rooms_shortname: 'EOSM', maxSeats: 50 },
                                { rooms_shortname: 'MGYM', maxSeats: 40 },
                                { rooms_shortname: 'PCOH', maxSeats: 40 },
                                { rooms_shortname: 'AUDX', maxSeats: 21 } ] });*/




                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                        console.log(err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
                console.log(err);
                expect.fail();
            });


    });

    it("sample queryC",function(){

        return insightfacade.addDataset(astring2, contentstring2)
            .then ( function (valueonce){

                return insightfacade.performQuery(queryC)

                    .then(function (response: InsightResponse) {
                       // console.log(response.body);
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        /*expect(response.body).to.deep.equal({ result:
                            [ { rooms_shortname: 'WOOD', maxSeats: 503 },
                                { rooms_shortname: 'OSBO', maxSeats: 442 },
                                { rooms_shortname: 'CIRS', maxSeats: 426 },
                                { rooms_shortname: 'HEBB', maxSeats: 375 },
                                { rooms_shortname: 'ESB', maxSeats: 350 },
                                { rooms_shortname: 'LSC', maxSeats: 350 },
                                { rooms_shortname: 'WESB', maxSeats: 325 },
                                { rooms_shortname: 'SRC', maxSeats: 299 },
                                { rooms_shortname: 'SCRF', maxSeats: 280 },
                                { rooms_shortname: 'BUCH', maxSeats: 275 },
                                { rooms_shortname: 'CHEM', maxSeats: 265 },
                                { rooms_shortname: 'ANGU', maxSeats: 260 },
                                { rooms_shortname: 'HENN', maxSeats: 257 },
                                { rooms_shortname: 'FSC', maxSeats: 250 },
                                { rooms_shortname: 'PHRM', maxSeats: 236 },
                                { rooms_shortname: 'BIOL', maxSeats: 228 },
                                { rooms_shortname: 'GEOG', maxSeats: 225 },
                                { rooms_shortname: 'MATH', maxSeats: 224 },
                                { rooms_shortname: 'LSK', maxSeats: 205 },
                                { rooms_shortname: 'CHBE', maxSeats: 200 },
                                { rooms_shortname: 'MCML', maxSeats: 200 },
                                { rooms_shortname: 'SWNG', maxSeats: 190 },
                                { rooms_shortname: 'FRDM', maxSeats: 160 },
                                { rooms_shortname: 'DMP', maxSeats: 160 },
                                { rooms_shortname: 'IBLC', maxSeats: 154 },
                                { rooms_shortname: 'AERL', maxSeats: 144 },
                                { rooms_shortname: 'MCLD', maxSeats: 136 },
                                { rooms_shortname: 'MATX', maxSeats: 106 },
                                { rooms_shortname: 'CEME', maxSeats: 100 },
                                { rooms_shortname: 'IONA', maxSeats: 100 },
                                { rooms_shortname: 'FNH', maxSeats: 99 },
                                { rooms_shortname: 'ALRD', maxSeats: 94 },
                                { rooms_shortname: 'LASR', maxSeats: 94 },
                                { rooms_shortname: 'ANSO', maxSeats: 90 },
                                { rooms_shortname: 'ORCH', maxSeats: 72 },
                                { rooms_shortname: 'BRKX', maxSeats: 70 },
                                { rooms_shortname: 'SOWK', maxSeats: 68 },
                                { rooms_shortname: 'SPPH', maxSeats: 66 },
                                { rooms_shortname: 'FORW', maxSeats: 63 },
                                { rooms_shortname: 'UCLL', maxSeats: 55 },
                                { rooms_shortname: 'EOSM', maxSeats: 50 },
                                { rooms_shortname: 'MGYM', maxSeats: 40 },
                                { rooms_shortname: 'PCOH', maxSeats: 40 },
                                { rooms_shortname: 'AUDX', maxSeats: 21 } ] });*/




                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                        console.log(err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
                console.log(err);
                expect.fail();
            });


    });

    it("sample queryD",function(){

        return insightfacade.addDataset(astring2, contentstring2)
            .then ( function (valueonce){

                return insightfacade.performQuery(queryD)

                    .then(function (response: InsightResponse) {
                        // console.log(response.body);
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        /*expect(response.body).to.deep.equal({ result:
                            [ { rooms_shortname: 'WOOD', maxSeats: 503 },
                                { rooms_shortname: 'OSBO', maxSeats: 442 },
                                { rooms_shortname: 'CIRS', maxSeats: 426 },
                                { rooms_shortname: 'HEBB', maxSeats: 375 },
                                { rooms_shortname: 'ESB', maxSeats: 350 },
                                { rooms_shortname: 'LSC', maxSeats: 350 },
                                { rooms_shortname: 'WESB', maxSeats: 325 },
                                { rooms_shortname: 'SRC', maxSeats: 299 },
                                { rooms_shortname: 'SCRF', maxSeats: 280 },
                                { rooms_shortname: 'BUCH', maxSeats: 275 },
                                { rooms_shortname: 'CHEM', maxSeats: 265 },
                                { rooms_shortname: 'ANGU', maxSeats: 260 },
                                { rooms_shortname: 'HENN', maxSeats: 257 },
                                { rooms_shortname: 'FSC', maxSeats: 250 },
                                { rooms_shortname: 'PHRM', maxSeats: 236 },
                                { rooms_shortname: 'BIOL', maxSeats: 228 },
                                { rooms_shortname: 'GEOG', maxSeats: 225 },
                                { rooms_shortname: 'MATH', maxSeats: 224 },
                                { rooms_shortname: 'LSK', maxSeats: 205 },
                                { rooms_shortname: 'CHBE', maxSeats: 200 },
                                { rooms_shortname: 'MCML', maxSeats: 200 },
                                { rooms_shortname: 'SWNG', maxSeats: 190 },
                                { rooms_shortname: 'FRDM', maxSeats: 160 },
                                { rooms_shortname: 'DMP', maxSeats: 160 },
                                { rooms_shortname: 'IBLC', maxSeats: 154 },
                                { rooms_shortname: 'AERL', maxSeats: 144 },
                                { rooms_shortname: 'MCLD', maxSeats: 136 },
                                { rooms_shortname: 'MATX', maxSeats: 106 },
                                { rooms_shortname: 'CEME', maxSeats: 100 },
                                { rooms_shortname: 'IONA', maxSeats: 100 },
                                { rooms_shortname: 'FNH', maxSeats: 99 },
                                { rooms_shortname: 'ALRD', maxSeats: 94 },
                                { rooms_shortname: 'LASR', maxSeats: 94 },
                                { rooms_shortname: 'ANSO', maxSeats: 90 },
                                { rooms_shortname: 'ORCH', maxSeats: 72 },
                                { rooms_shortname: 'BRKX', maxSeats: 70 },
                                { rooms_shortname: 'SOWK', maxSeats: 68 },
                                { rooms_shortname: 'SPPH', maxSeats: 66 },
                                { rooms_shortname: 'FORW', maxSeats: 63 },
                                { rooms_shortname: 'UCLL', maxSeats: 55 },
                                { rooms_shortname: 'EOSM', maxSeats: 50 },
                                { rooms_shortname: 'MGYM', maxSeats: 40 },
                                { rooms_shortname: 'PCOH', maxSeats: 40 },
                                { rooms_shortname: 'AUDX', maxSeats: 21 } ] });*/




                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                        console.log(err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
                console.log(err);
                expect.fail();
            });


    });






});

