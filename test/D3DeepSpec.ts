///<reference path="../src/controller/IInsightFacade.ts"/>

import {expect} from 'chai';
import Log from "../src/Util";
import InsightFacade from "../src/controller/InsightFacade";
import {IInsightFacade, InsightResponse} from "../src/controller/IInsightFacade";

describe("D3DeepTests", function () {


    let insightfacade : InsightFacade  = null;
    let insightfacade2 : InsightFacade = null;


//new change here

    let fs = require('fs');
    let astring = "rooms";
    let data = fs.readFileSync('rooms.zip');
    let contentstring = data.toString('base64');


    let queryA = {
        "WHERE": { },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_shortname",
                "maxSeats"
            ],
            "ORDER": {
                "dir": "DOWN",
                "keys": ["maxSeats"]
            }
        },
        "TRANSFORMATIONS": {
            "GROUP": ["rooms_shortname"],
            "APPLY": [{
                "maxSeats": {
                    "MAX": "rooms_seats"
                }
            }]
        }
    };

    let queryB = {
        "WHERE": { },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_furniture",
                "maxSeats",
                "minSeats"
            ],
            "ORDER": {
                "dir": "DOWN",
                "keys": ["maxSeats"]
            }
        },
        "TRANSFORMATIONS": {
            "GROUP": ["rooms_furniture"],
            "APPLY": [{
                "maxSeats": {
                    "MAX": "rooms_seats"
                }
            },
                {
                    "minSeats": {
                        "MIN": "rooms_seats"
                    }
                }]
        }
    };

    let queryC = {
        "WHERE": { },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_furniture",
                "maxSeats",
                "sumSeats"
            ],
            "ORDER": {
                "dir": "DOWN",
                "keys": ["maxSeats"]
            }
        },
        "TRANSFORMATIONS": {
            "GROUP": ["rooms_furniture"],
            "APPLY": [{
                "maxSeats": {
                    "MAX": "rooms_seats"
                }
            },
                {
                    "sumSeats": {
                        "SUM": "rooms_seats"
                    }
                }]
        }
    };

    let queryD = {
        "WHERE": { },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_furniture",
                "maxSeats",
                "sumSeats"
            ],
            "ORDER": {
                "dir": "DOWN",
                "keys": ["maxSeats"]
            }
        },
        "TRANSFORMATIONS": { }
    };

    let queryE = {
        "WHERE": { },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_furniture",
                "maxSeats",
                "sumSeats"
            ],
            "ORDER": {
                "dir": "DOWN",
                "keys": ["maxSeats"]
            }
        },
        "TRANSFORMATIONS": {
            "GROUP": ["rooms_furniture"]
        }
    };


    let queryF = {
        "WHERE": { },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_furniture",
                "maxSeats",
                "sumSeats"
            ],
            "ORDER": {
                "dir": "DOWN",
                "keys": ["maxSeats"]
            }
        },
        "TRANSFORMATIONS": {
            "APPLY": [{
                "maxSeats": {
                    "MAX": "rooms_seats"
                }
            },
                {
                    "sumSeats": {
                        "SUM": "rooms_seats"
                    }
                }]
        }
    };

    let queryG = {
        "WHERE": { },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_furniture",
                "rooms_type",
                "maxSeats",
                "sumSeats"
            ],
            "ORDER": {
                "dir": "DOWN",
                "keys": ["maxSeats"]
            }
        },
        "TRANSFORMATIONS": {
            "GROUP": ["rooms_furniture"],
            "APPLY": [{
                "maxSeats": {
                    "MAX": "rooms_seats"
                }
            },
                {
                    "sumSeats": {
                        "SUM": "rooms_seats"
                    }
                }]
        }
    };


    let queryH = {
        "WHERE": { },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_furniture",
                "sumSeats",
                "avgSeats"
            ],
            "ORDER": {
                "dir": "DOWN",
                "keys": ["avgSeats"]
            }
        },
        "TRANSFORMATIONS": {
            "GROUP": ["rooms_furniture"],
            "APPLY": [{
                "sumSeats": {
                    "SUM": "rooms_seats"
                }
            },
                {
                    "avgSeats": {
                        "AVG": "rooms_seats"
                    }
                }]
        }
    };


    beforeEach(function () {
        insightfacade = new InsightFacade();


    });

    afterEach(function () {
        insightfacade = null;
    });
  //this.timeout(50000);


    it("sample queryA",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(queryA)

                    .then(function (response: InsightResponse) {
                        //console.log(response.body)
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal({ result:
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
                                { rooms_shortname: 'AUDX', maxSeats: 21 } ] });




                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                        //console.log(err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
                //console.log(err);
                expect.fail();
            });


    });




    it("sample queryB",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(queryB)

                    .then(function (response: InsightResponse) {
                        //console.log(response.body)
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal({ result:
                            [ { rooms_furniture: 'Classroom-Fixed Tablets',
                                maxSeats: 503,
                                minSeats: 60 },
                                { rooms_furniture: 'Classroom-Movable Tables & Chairs',
                                    maxSeats: 442,
                                    minSeats: 7 },
                                { rooms_furniture: 'Classroom-Fixed Tables/Fixed Chairs',
                                    maxSeats: 375,
                                    minSeats: 80 },
                                { rooms_furniture: 'Classroom-Fixed Tables/Movable Chairs',
                                    maxSeats: 350,
                                    minSeats: 25 },
                                { rooms_furniture: 'Classroom-Hybrid Furniture',
                                    maxSeats: 150,
                                    minSeats: 16 },
                                { rooms_furniture: 'Classroom-Moveable Tablets',
                                    maxSeats: 90,
                                    minSeats: 90 },
                                { rooms_furniture: 'Classroom-Fixed Tables/Moveable Chairs',
                                    maxSeats: 78,
                                    minSeats: 56 },
                                { rooms_furniture: 'Classroom-Learn Lab',
                                    maxSeats: 72,
                                    minSeats: 30 },
                                { rooms_furniture: 'Classroom-Movable Tablets',
                                    maxSeats: 68,
                                    minSeats: 12 },
                                { rooms_furniture: 'Classroom-Moveable Tables & Chairs',
                                    maxSeats: 40,
                                    minSeats: 6 } ] });

                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                        //console.log(err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
                // console.log(err);
                expect.fail();
            });
    });


    it("sample queryC",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(queryC)

                    .then(function (response: InsightResponse) {
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal({ result:
                            [ { rooms_furniture: 'Classroom-Fixed Tablets',
                                maxSeats: 503,
                                sumSeats: 6332 },
                                { rooms_furniture: 'Classroom-Movable Tables & Chairs',
                                    maxSeats: 442,
                                    sumSeats: 6479 },
                                { rooms_furniture: 'Classroom-Fixed Tables/Fixed Chairs',
                                    maxSeats: 375,
                                    sumSeats: 1572 },
                                { rooms_furniture: 'Classroom-Fixed Tables/Movable Chairs',
                                    maxSeats: 350,
                                    sumSeats: 6231 },
                                { rooms_furniture: 'Classroom-Hybrid Furniture',
                                    maxSeats: 150,
                                    sumSeats: 381 },
                                { rooms_furniture: 'Classroom-Moveable Tablets',
                                    maxSeats: 90,
                                    sumSeats: 90 },
                                { rooms_furniture: 'Classroom-Fixed Tables/Moveable Chairs',
                                    maxSeats: 78,
                                    sumSeats: 212 },
                                { rooms_furniture: 'Classroom-Learn Lab',
                                    maxSeats: 72,
                                    sumSeats: 150 },
                                { rooms_furniture: 'Classroom-Movable Tablets',
                                    maxSeats: 68,
                                    sumSeats: 1516 },
                                { rooms_furniture: 'Classroom-Moveable Tables & Chairs',
                                    maxSeats: 40,
                                    sumSeats: 506 } ] }
                        );

                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                        // console.log(err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
                // console.log(err);
                expect.fail();
            });


    });

    it("sample queryD",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(queryD)

                    .then(function (response: InsightResponse) {
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect.fail();

                    }).catch(function (err: any) {
                        Log.test('Response number: ' + err.code);
                        Log.test('Response body: ' + err.body);
                        expect(err.code).to.deep.equal(400);
                        expect(err.body).to.deep.equal(err.body);

                    })
            })
            .catch(function (err: any) {
                // console.log(err);
                expect.fail();
            });


    });

    it("sample queryE",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(queryE)

                    .then(function (response: InsightResponse) {
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect.fail();

                    }).catch(function (err: any) {
                        Log.test('Response number: ' + err.code);
                        Log.test('Response body: ' + err.body);
                        expect(err.code).to.deep.equal(400);
                        expect(err.body).to.deep.equal(err.body);

                    })
            })
            .catch(function (err: any) {
                // console.log(err);
                expect.fail();
            });


    });



    it("sample queryF",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(queryF)

                    .then(function (response: InsightResponse) {
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect.fail();

                    }).catch(function (err: any) {
                        Log.test('Response number: ' + err.code);
                        Log.test('Response body: ' + err.body);
                        expect(err.code).to.deep.equal(400);
                        expect(err.body).to.deep.equal(err.body);

                    })
            })
            .catch(function (err: any) {
                // console.log(err);
                expect.fail();
            });


    });

    it("sample queryG",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(queryG)

                    .then(function (response: InsightResponse) {
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect.fail();

                    }).catch(function (err: any) {
                        Log.test('Response number: ' + err.code);
                        Log.test('Response body: ' + err.body);
                        expect(err.code).to.deep.equal(400);
                        expect(err.body).to.deep.equal(err.body);

                    })
            })
            .catch(function (err: any) {
                // console.log(err);
                expect.fail();
            });


    });


    it("sample queryH",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(queryH)

                    .then(function (response: InsightResponse) {
                       // console.log(response.body)
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal({ result:
                            [ { rooms_furniture: 'Classroom-Fixed Tablets',
                                sumSeats: 6332,
                                avgSeats: 191.88 },
                                { rooms_furniture: 'Classroom-Fixed Tables/Fixed Chairs',
                                    sumSeats: 1572,
                                    avgSeats: 157.2 },
                                { rooms_furniture: 'Classroom-Fixed Tables/Movable Chairs',
                                    sumSeats: 6231,
                                    avgSeats: 91.63 },
                                { rooms_furniture: 'Classroom-Moveable Tablets',
                                    sumSeats: 90,
                                    avgSeats: 90 },
                                { rooms_furniture: 'Classroom-Fixed Tables/Moveable Chairs',
                                    sumSeats: 212,
                                    avgSeats: 70.67 },
                                { rooms_furniture: 'Classroom-Learn Lab',
                                    sumSeats: 150,
                                    avgSeats: 50 },
                                { rooms_furniture: 'Classroom-Hybrid Furniture',
                                    sumSeats: 381,
                                    avgSeats: 47.63 },
                                { rooms_furniture: 'Classroom-Movable Tables & Chairs',
                                    sumSeats: 6479,
                                    avgSeats: 39.27 },
                                { rooms_furniture: 'Classroom-Movable Tablets',
                                    sumSeats: 1516,
                                    avgSeats: 34.45 },
                                { rooms_furniture: 'Classroom-Moveable Tables & Chairs',
                                    sumSeats: 506,
                                    avgSeats: 17.45 } ] });

                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                        //console.log(err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
                //console.log(err);
                expect.fail();
            });


    });


});

