///<reference path="../src/controller/IInsightFacade.ts"/>

import {expect} from 'chai';
import Log from "../src/Util";
import InsightFacade from "../src/controller/InsightFacade";
import {IInsightFacade, InsightResponse} from "../src/controller/IInsightFacade";

describe("ApplyGroupsPerformQSpec", function () {
    //TODO: made changes to tests

    let insightfacade : InsightFacade  = null;
    let insightfacade2 : InsightFacade = null;


//new change here

    let fs = require('fs');
    let astring = "rooms";
    let data = fs.readFileSync('rooms.zip');
    let contentstring = data.toString('base64');


    let queryA = {
        "WHERE": {
            "AND": [{
                "IS": {
                    "rooms_furniture": "*Tables*"
                }
            }, {
                "GT": {
                    "rooms_seats": 300
                }
            }]
        },
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


    let queryB : any = {
        "WHERE": {},
        "OPTIONS": {
            "COLUMNS": [
                "rooms_furniture"
            ],
            "ORDER": "rooms_furniture"
        },
        "TRANSFORMATIONS": {
            "GROUP": ["rooms_furniture"],
            "APPLY": []
        }
    };

    let queryC : any = {
        "WHERE": {},
        "OPTIONS": {
            "COLUMNS": [
                "courses_instructor"
            ],
            "ORDER": "courses_instructor"
        },
        "TRANSFORMATIONS": {
            "GROUP": ["courses_instructor"],
            "APPLY": []
        }
    };


    let queryD = {
        "WHERE": {
            "AND": [{
                "IS": {
                    "rooms_furniture": "*Tables*"
                }
            }, {
                "GT": {
                    "rooms_seats": 300
                }
            }]
        },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_shortname",
                "sumSeats"
            ],
        },
        "TRANSFORMATIONS": {
            "GROUP": ["rooms_shortname"],
            "APPLY": [{
                "sumSeats": {
                    "SUM": "rooms_seats"
                }
            }]
        }
    };

    let queryE = {
        "WHERE": {
            "AND": [{
                "IS": {
                    "rooms_furniture": "*Tables*"
                }
            }, {
                "GT": {
                    "rooms_seats": 300
                }
            }]
        },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_shortname",
                "countSeats"
            ],
        },
        "TRANSFORMATIONS": {
            "GROUP": ["rooms_shortname"],
            "APPLY": [{
                "countSeats": {
                    "COUNT": "rooms_seats"
                }
            }]
        }
    };

    let queryF = {
        "WHERE": {
            "AND": [{
                "IS": {
                    "rooms_furniture": "*Tables*"
                }
            }, {
                "GT": {
                    "rooms_seats": 300
                }
            }]
        },
        "OPTIONS": {
            "COLUMNS": [
                "rooms_shortname",
                "avgSeats"
            ],
        },
        "TRANSFORMATIONS": {
            "GROUP": ["rooms_shortname"],
            "APPLY": [{
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
                       // console.log(response.body)
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal({ result:
                            [ { rooms_shortname: 'OSBO', maxSeats: 442 },
                                { rooms_shortname: 'HEBB', maxSeats: 375 },
                                { rooms_shortname: 'LSC', maxSeats: 350 } ] });




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



    it("sample queryB",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(queryB)

                    .then(function (response: InsightResponse) {

                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal({
                            "result": [{
                                "rooms_furniture": "Classroom-Fixed Tables/Fixed Chairs"
                            }, {
                                "rooms_furniture": "Classroom-Fixed Tables/Movable Chairs"
                            }, {
                                "rooms_furniture": "Classroom-Fixed Tables/Moveable Chairs"
                            }, {
                                "rooms_furniture": "Classroom-Fixed Tablets"
                            }, {
                                "rooms_furniture": "Classroom-Hybrid Furniture"
                            }, {
                                "rooms_furniture": "Classroom-Learn Lab"
                            }, {
                                "rooms_furniture": "Classroom-Movable Tables & Chairs"
                            }, {
                                "rooms_furniture": "Classroom-Movable Tablets"
                            }, {
                                "rooms_furniture": "Classroom-Moveable Tables & Chairs"
                            }, {
                                "rooms_furniture": "Classroom-Moveable Tablets"
                            }]
                        });




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



    it("sample queryD sum",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(queryD)

                    .then(function (response: InsightResponse) {
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal({ result:
                            [ { rooms_shortname: 'HEBB', sumSeats: 375 },
                                { rooms_shortname: 'LSC', sumSeats: 700 },
                                { rooms_shortname: 'OSBO', sumSeats: 442 } ] });
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




    it("sample queryE count",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(queryE)

                    .then(function (response: InsightResponse) {

                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal({ result:
                            [ { rooms_shortname: 'HEBB', countSeats: 1 },
                                { rooms_shortname: 'LSC', countSeats: 1 },
                                { rooms_shortname: 'OSBO', countSeats: 1 } ] });
                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                      //  console.log(err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
               // console.log(err);
                expect.fail();
            });

    });



    it("sample queryF AVG",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(queryF)

                    .then(function (response: InsightResponse) {
                      //  console.log(response.body)
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal({ result:
                            [ { rooms_shortname: 'HEBB', avgSeats: 375 },
                                { rooms_shortname: 'LSC', avgSeats: 350 },
                                { rooms_shortname: 'OSBO', avgSeats: 442 } ] });
                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                     //   console.log(err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
             //   console.log(err);
                expect.fail();
            });

    });



});

