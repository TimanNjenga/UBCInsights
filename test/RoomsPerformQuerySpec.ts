///<reference path="../src/controller/IInsightFacade.ts"/>

import {expect} from 'chai';
import Log from "../src/Util";
import InsightFacade from "../src/controller/InsightFacade";
import {IInsightFacade, InsightResponse} from "../src/controller/IInsightFacade";

describe("RoomsPerformQuerySpec", function () {


    let insightfacade : InsightFacade  = null;
    let insightfacade2 : InsightFacade = null;




//new change here

    let fs = require('fs');
    let astring = "rooms";
    let data = fs.readFileSync('rooms.zip');
    let contentstring = data.toString('base64');


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
    let query3 = {
        "WHERE": {
            "IS": {
                "rooms_furniture": "*urn*"
            }
        },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_address", "rooms_name", "rooms_href", "rooms_lon", "rooms_lat", "rooms_furniture"
            ],
            "ORDER":"rooms_href"
        }
    };
    let query12 = {

        "WHERE": {
            "IS": {
                "rooms_instructor": 'campbell, deborah'
            }
        },
        "OPTIONS": {
            "COLUMNS": [
                "courses_dept",
                "courses_avg",
                "courses_instructor"
            ],
            "ORDER": "courses_avg"
        }
    };
    let query11 = {
        "WHERE":{
            "OR":[
                {
                    "AND":[
                        {
                            "GT":{
                                "rooms_seats":10
                            }
                        },
                        {
                            "LT":{
                                "rooms_seats":20
                            }
                        }
                    ]
                },
                {
                    "EQ":{
                        "rooms_seats":5
                    }
                }
            ]
        },
        "OPTIONS":{
            "COLUMNS":[
                "rooms_lon",
                "rooms_lat",
                "rooms_seats",
                "rooms_name"
            ],
            "ORDER":"rooms_seats"
        }
    };
    let query10 = {

        "WHERE":{


            "AND": [
                {
                    "LT": {"rooms_lon": -123.25740}
                },
                {
                    "GT":{ "rooms_lon": -123.25742}
                },
                {
                    "LT": {"rooms_lat": 49.26959}
                },
                {
                    "GT":{ "rooms_lat": 49.26957}
                }
            ]

        },
        "OPTIONS":{
            "COLUMNS":[
                "rooms_lon",
                "rooms_lat",
                "rooms_shortname"
            ],
            "ORDER":"rooms_lon"
        }
    };
    let query4 = {

        "WHERE":{


            "AND": [
                {
                    "EQ": {"rooms_lon": -123.25741}
                },
                {
                    "EQ":{ "rooms_lat": 49.26958}
                }
            ]

        },
        "OPTIONS":{
            "COLUMNS":[
                "rooms_lon",
                "rooms_lat",
                "rooms_shortname",
                "rooms_address",
                "rooms_name"
            ],
            "ORDER":"rooms_lon"
        }
    };
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
    let query5 = {

        "WHERE":{
            "IS":
                {
                     "rooms_address": "6303 North West Marine Drive"
                }
        },
        "OPTIONS":{
            "COLUMNS":[
                "rooms_lon",
                "rooms_lat",
                "rooms_shortname",
                "rooms_address",
                "rooms_name",
                "rooms_seats"
            ],
            "ORDER":"rooms_lon"
        }
    };
    let query = {
        "WHERE": {
            "AND": [
                {
                    "NOT": {
                        "NOT": {
                            "IS": {
                                "courses_dept": "musc"
                            }
                        }
                    }
                },
                {"GT" : {"courses_avg" : 90}}
            ]
        },
        "OPTIONS": {
            "COLUMNS": [
                "courses_instructor",
                "courses_dept",
                "courses_avg",
                "courses_year"
            ]
        }
    };
    let query6 = {
        "WHERE":{
            "AND":[
                {
                    "NOT": {
                        "IS": {
                            "courses_dept": "musc"
                        }
                    }
                },
                {
                    "IS":{
                        "courses_dept": "musc"
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
    let query7 = {

        "WHERE": {
            "IS": "hey"

        },
        "OPTIONS": {
            "COLUMNS": [
                "courses_dept",
                "courses_avg",
                "courses_instructor"
            ],
            "ORDER": "courses_avg"
        }
    };
    let query9 = {
        "WHERE":{
            "AND":[{}]
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
    let query20 = {
        "WHERE": {
            "OR":[{
                "AND":[{
                    "GT":{
                        "rooms_seats":100
                    }},{"OR":
                    [{"LT":{
                        "rooms_lat": 40
                    }
                    },{
                        "IS":{
                            "rooms_name":"*AN*"
                        }
                    },{
                        "AND":[{
                            "IS":{
                                "rooms_href":"*AN*"
                            }
                        },{
                            "EQ":{
                                "rooms_seats": 54
                            }
                        }]
                    }]},{
                    "NOT":{
                        "NOT":{
                            "AND":[{
                                "LT":{
                                    "rooms_lon":200
                                }
                            },{
                                "GT":{
                                    "rooms_lon":-200
                                }
                            },{
                                "NOT":{
                                    "IS":{
                                        "rooms_address": "*grono*"
                                    }
                                }
                            }]
                        }
                    }
                }
                ]},{"EQ":{
                "rooms_seats":54
            }},{
                "NOT":{
                    "IS":{
                        "rooms_furniture":"Classroom-Movable Tables & Chairs"
                    }
                }
            }]
        },
        "OPTIONS":{
            "COLUMNS":[
                "rooms_seats",
                "rooms_lon","rooms_name","rooms_address","rooms_href"

            ]
        }
    };



    beforeEach(function () {
        insightfacade = new InsightFacade();


    });

    afterEach(function () {
        insightfacade = null;
    });
  // this.timeout(500000);




    it("query for Liberation1",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(query1)
                    .then(function (response: InsightResponse) {
                      //  console.log(response.body);
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal({ result:
                            [ { rooms_name: 'DMP_101' },
                                { rooms_name: 'DMP_110' },
                                { rooms_name: 'DMP_201' },
                                { rooms_name: 'DMP_301' },
                                { rooms_name: 'DMP_310' } ] });


                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                      //  console.log(err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
                expect.fail();
            });
    });



    it("query for Liberation2",function(){



        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(query2)
                    .then(function (response: InsightResponse) {
                        //console.log(response.body);
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal({ result:
                            [ { rooms_address: '6245 Agronomy Road V6T 1Z4',
                                rooms_name: 'DMP_101' },
                                { rooms_address: '6245 Agronomy Road V6T 1Z4',
                                    rooms_name: 'DMP_110' },
                                { rooms_address: '6245 Agronomy Road V6T 1Z4',
                                    rooms_name: 'DMP_201' },
                                { rooms_address: '6245 Agronomy Road V6T 1Z4',
                                    rooms_name: 'DMP_301' },
                                { rooms_address: '6245 Agronomy Road V6T 1Z4',
                                    rooms_name: 'DMP_310' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_1001' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_3002' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_3004' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_3016' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_3018' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_3052' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_3058' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_3062' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_3068' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_3072' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_3074' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_4002' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_4004' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_4016' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_4018' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_4052' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_4058' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_4062' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_4068' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_4072' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_4074' } ] });


                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                      //  console.log(err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
                expect.fail();
            });
    });


    it("query for Liberation3",function(){



        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(query2)
                    .then(function (response: InsightResponse) {
                      //  console.log(response.body);
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal({ result:
                            [ { rooms_address: '6245 Agronomy Road V6T 1Z4',
                                rooms_name: 'DMP_101' },
                                { rooms_address: '6245 Agronomy Road V6T 1Z4',
                                    rooms_name: 'DMP_110' },
                                { rooms_address: '6245 Agronomy Road V6T 1Z4',
                                    rooms_name: 'DMP_201' },
                                { rooms_address: '6245 Agronomy Road V6T 1Z4',
                                    rooms_name: 'DMP_301' },
                                { rooms_address: '6245 Agronomy Road V6T 1Z4',
                                    rooms_name: 'DMP_310' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_1001' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_3002' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_3004' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_3016' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_3018' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_3052' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_3058' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_3062' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_3068' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_3072' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_3074' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_4002' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_4004' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_4016' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_4018' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_4052' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_4058' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_4062' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_4068' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_4072' },
                                { rooms_address: '6363 Agronomy Road', rooms_name: 'ORCH_4074' } ] }
                        );


                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                      //  console.log(err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
                expect.fail();
            });
    });

    it("query for Picses",function(){



        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(query3)
                    .then(function (response: InsightResponse) {
                      //  console.log(response.body);
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal({ result:
                            [ { rooms_address: '2207 Main Mall',
                                rooms_name: 'ESB_1012',
                                rooms_href: 'http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/ESB-1012',
                                rooms_lon: -123.25224,
                                rooms_lat: 49.26274,
                                rooms_furniture: 'Classroom-Hybrid Furniture' },
                                { rooms_address: '6363 Agronomy Road',
                                    rooms_name: 'ORCH_1001',
                                    rooms_href: 'http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/ORCH-1001',
                                    rooms_lon: -123.24944,
                                    rooms_lat: 49.26048,
                                    rooms_furniture: 'Classroom-Hybrid Furniture' },
                                { rooms_address: '6363 Agronomy Road',
                                    rooms_name: 'ORCH_3004',
                                    rooms_href: 'http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/ORCH-3004',
                                    rooms_lon: -123.24944,
                                    rooms_lat: 49.26048,
                                    rooms_furniture: 'Classroom-Hybrid Furniture' },
                                { rooms_address: '6363 Agronomy Road',
                                    rooms_name: 'ORCH_3052',
                                    rooms_href: 'http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/ORCH-3052',
                                    rooms_lon: -123.24944,
                                    rooms_lat: 49.26048,
                                    rooms_furniture: 'Classroom-Hybrid Furniture' },
                                { rooms_address: '6363 Agronomy Road',
                                    rooms_name: 'ORCH_4018',
                                    rooms_href: 'http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/ORCH-4018',
                                    rooms_lon: -123.24944,
                                    rooms_lat: 49.26048,
                                    rooms_furniture: 'Classroom-Hybrid Furniture' },
                                { rooms_address: '6363 Agronomy Road',
                                    rooms_name: 'ORCH_4052',
                                    rooms_href: 'http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/ORCH-4052',
                                    rooms_lon: -123.24944,
                                    rooms_lat: 49.26048,
                                    rooms_furniture: 'Classroom-Hybrid Furniture' },
                                { rooms_address: '6363 Agronomy Road',
                                    rooms_name: 'ORCH_4062',
                                    rooms_href: 'http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/ORCH-4062',
                                    rooms_lon: -123.24944,
                                    rooms_lat: 49.26048,
                                    rooms_furniture: 'Classroom-Hybrid Furniture' },
                                { rooms_address: '6363 Agronomy Road',
                                    rooms_name: 'ORCH_4072',
                                    rooms_href: 'http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/ORCH-4072',
                                    rooms_lon: -123.24944,
                                    rooms_lat: 49.26048,
                                    rooms_furniture: 'Classroom-Hybrid Furniture' } ] });


                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                        //console.log(err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
                expect.fail();
            });
    });





    it("query for Liberation",function(){



        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(query11)
                    .then(function (response: InsightResponse) {
                    //    console.log(response.body);
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal({ result:
                            [ { rooms_lon: -123.24673,
                                rooms_lat: 49.26478,
                                rooms_seats: 12,
                                rooms_name: 'WOOD_G65' },
                                { rooms_lon: -123.24959,
                                    rooms_lat: 49.26414,
                                    rooms_seats: 12,
                                    rooms_name: 'FNH_20' },
                                { rooms_lon: -123.24673,
                                    rooms_lat: 49.26478,
                                    rooms_seats: 12,
                                    rooms_name: 'WOOD_G57' },
                                { rooms_lon: -123.2521,
                                    rooms_lat: 49.26766,
                                    rooms_seats: 12,
                                    rooms_name: 'IBLC_264' },
                                { rooms_lon: -123.25505,
                                    rooms_lat: 49.2643,
                                    rooms_seats: 12,
                                    rooms_name: 'SOWK_122' },
                                { rooms_lon: -123.24842,
                                    rooms_lat: 49.2642,
                                    rooms_seats: 12,
                                    rooms_name: 'SPPH_B136' },
                                { rooms_lon: -123.24342,
                                    rooms_lat: 49.26229,
                                    rooms_seats: 14,
                                    rooms_name: 'PHRM_3116' },
                                { rooms_lon: -123.24842,
                                    rooms_lat: 49.2642,
                                    rooms_seats: 14,
                                    rooms_name: 'SPPH_B138' },
                                { rooms_lon: -123.24673,
                                    rooms_lat: 49.26478,
                                    rooms_seats: 14,
                                    rooms_name: 'WOOD_G44' },
                                { rooms_lon: -123.24944,
                                    rooms_lat: 49.26048,
                                    rooms_seats: 16,
                                    rooms_name: 'ORCH_4062' },
                                { rooms_lon: -123.24944,
                                    rooms_lat: 49.26048,
                                    rooms_seats: 16,
                                    rooms_name: 'ORCH_3062' },
                                { rooms_lon: -123.24944,
                                    rooms_lat: 49.26048,
                                    rooms_seats: 16,
                                    rooms_name: 'ORCH_3068' },
                                { rooms_lon: -123.24944,
                                    rooms_lat: 49.26048,
                                    rooms_seats: 16,
                                    rooms_name: 'ORCH_3072' },
                                { rooms_lon: -123.25364,
                                    rooms_lat: 49.26486,
                                    rooms_seats: 16,
                                    rooms_name: 'ANGU_332' },
                                { rooms_lon: -123.24944,
                                    rooms_lat: 49.26048,
                                    rooms_seats: 16,
                                    rooms_name: 'ORCH_4068' },
                                { rooms_lon: -123.25364,
                                    rooms_lat: 49.26486,
                                    rooms_seats: 16,
                                    rooms_name: 'ANGU_232' },
                                { rooms_lon: -123.25364,
                                    rooms_lat: 49.26486,
                                    rooms_seats: 16,
                                    rooms_name: 'ANGU_432' },
                                { rooms_lon: -123.25505,
                                    rooms_lat: 49.2643,
                                    rooms_seats: 16,
                                    rooms_name: 'SOWK_324' },
                                { rooms_lon: -123.25505,
                                    rooms_lat: 49.2643,
                                    rooms_seats: 16,
                                    rooms_name: 'SOWK_326' },
                                { rooms_lon: -123.24842,
                                    rooms_lat: 49.2642,
                                    rooms_seats: 16,
                                    rooms_name: 'SPPH_B112' },
                                { rooms_lon: -123.25249,
                                    rooms_lat: 49.26479,
                                    rooms_seats: 16,
                                    rooms_name: 'BIOL_1503' },
                                { rooms_lon: -123.25249,
                                    rooms_lat: 49.26479,
                                    rooms_seats: 16,
                                    rooms_name: 'BIOL_2519' },
                                { rooms_lon: -123.2521,
                                    rooms_lat: 49.26766,
                                    rooms_seats: 16,
                                    rooms_name: 'IBLC_460' },
                                { rooms_lon: -123.24673,
                                    rooms_lat: 49.26478,
                                    rooms_seats: 16,
                                    rooms_name: 'WOOD_G66' },
                                { rooms_lon: -123.24886,
                                    rooms_lat: 49.26044,
                                    rooms_seats: 18,
                                    rooms_name: 'FSC_1402' },
                                { rooms_lon: -123.25468,
                                    rooms_lat: 49.26826,
                                    rooms_seats: 18,
                                    rooms_name: 'BUCH_B312' } ] });


                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                        //console.log(err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
                expect.fail();
            });
    });


    it("query for latlon box",function(){



        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(query10)
                    .then(function (response: InsightResponse) {
                      //  console.log(response.body);
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal({ result:
                            [ { rooms_lon: -123.25741,
                                rooms_lat: 49.26958,
                                rooms_shortname: 'ANSO' },
                                { rooms_lon: -123.25741,
                                    rooms_lat: 49.26958,
                                    rooms_shortname: 'ANSO' },
                                { rooms_lon: -123.25741,
                                    rooms_lat: 49.26958,
                                    rooms_shortname: 'ANSO' },
                                { rooms_lon: -123.25741,
                                    rooms_lat: 49.26958,
                                    rooms_shortname: 'ANSO' } ] });


                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                      //  console.log(err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
                expect.fail();
            });
    });


    it("specific address given latlon",function(){



        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(query4)
                    .then(function (response: InsightResponse) {
                       // console.log(response.body);
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal({ result:
                            [ { rooms_lon: -123.25741,
                                rooms_lat: 49.26958,
                                rooms_shortname: 'ANSO',
                                rooms_address: '6303 North West Marine Drive',
                                rooms_name: 'ANSO_202' },
                                { rooms_lon: -123.25741,
                                    rooms_lat: 49.26958,
                                    rooms_shortname: 'ANSO',
                                    rooms_address: '6303 North West Marine Drive',
                                    rooms_name: 'ANSO_203' },
                                { rooms_lon: -123.25741,
                                    rooms_lat: 49.26958,
                                    rooms_shortname: 'ANSO',
                                    rooms_address: '6303 North West Marine Drive',
                                    rooms_name: 'ANSO_205' },
                                { rooms_lon: -123.25741,
                                    rooms_lat: 49.26958,
                                    rooms_shortname: 'ANSO',
                                    rooms_address: '6303 North West Marine Drive',
                                    rooms_name: 'ANSO_207' } ] });


                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                   //     console.log(err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
                expect.fail();
            });
    });



});

