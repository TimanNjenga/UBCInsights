///<reference path="../src/controller/IInsightFacade.ts"/>

import {expect} from 'chai';
import Log from "../src/Util";
import InsightFacade from "../src/controller/InsightFacade";
import {IInsightFacade, InsightResponse} from "../src/controller/IInsightFacade";

describe("performQueryspec", function () {

    let insightfacade : InsightFacade  = null;
//new change here

    let fs = require('fs');
    let astring = "courses";
    let data = fs.readFileSync('courses.zip');
    let contentstring = data.toString('base64');


    let query1 = {

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
    let query2 = {

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
                                "courses_dept":"ad*"
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
                                "courses_dept":"*he"
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
    let query4 = {

        "WHERE":{
            "AND":[
                {
                    "GT":{
                        "courses_avg":90
                    }
                },
                {
                    "IS":{
                        "courses_dept":"*dh*"
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
    let query5 = {

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
                                "courses_dept":"*"
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
    let query6 = {

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
                                "courses_dept":"**"
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
    let query7 = {

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
                                "courses_dept":"a*d"
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
    let query8 = {

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
                                "courses_dept":"a*d*"
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
        insightfacade = new InsightFacade();


    });

    afterEach(function () {
        insightfacade = null;
    });

  // this.timeout(50000);

    it("Returns Correct performQuery where key Matches inputstring exactly",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){
                return insightfacade.performQuery(query1)
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
            })
            .catch(function (err: any) {

                expect.fail();
            });


    });

    it("Returns Correct performQuery where key Starts with inputstring",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){
                return insightfacade.performQuery(query2)
                    .then(function (response: InsightResponse) {
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        //console.log(response.body);
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
                        //console.log(err);
                        Log.test('Error: ' + err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {

                expect.fail();
            });


    });

    it("Returns Correct performQuery where key Ends with inputstring",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){
                return insightfacade.performQuery(query3)
                    .then(function (response: InsightResponse) {
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        //console.log(response.body);
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
                        //console.log(err);
                        Log.test('Error: ' + err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {

                expect.fail();
            });


    });

    it("Returns Correct performQuery where key contains inputstring",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){
                return insightfacade.performQuery(query4)
                    .then(function (response: InsightResponse) {
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        //console.log(response.body);
                        expect(response.body).to.deep.equal({ result:
                            [ { courses_dept: 'adhe', courses_id: '329', courses_avg: 90.02 },
                                { courses_dept: 'dhyg', courses_id: '462', courses_avg: 90.03 },
                                { courses_dept: 'dhyg', courses_id: '402', courses_avg: 90.08 },
                                { courses_dept: 'dhyg', courses_id: '402', courses_avg: 90.08 },
                                { courses_dept: 'adhe', courses_id: '412', courses_avg: 90.16 },
                                { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.17 },
                                { courses_dept: 'adhe', courses_id: '412', courses_avg: 90.18 },
                                { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.5 },
                                { courses_dept: 'dhyg', courses_id: '412', courses_avg: 90.63 },
                                { courses_dept: 'dhyg', courses_id: '461', courses_avg: 90.67 },
                                { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.72 },
                                { courses_dept: 'adhe', courses_id: '329', courses_avg: 90.82 },
                                { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.85 },
                                { courses_dept: 'dhyg', courses_id: '461', courses_avg: 91.15 },
                                { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.29 },
                                { courses_dept: 'dhyg', courses_id: '461', courses_avg: 91.3 },
                                { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
                                { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
                                { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.48 },
                                { courses_dept: 'dhyg', courses_id: '400', courses_avg: 91.56 },
                                { courses_dept: 'dhyg', courses_id: '462', courses_avg: 91.88 },
                                { courses_dept: 'dhyg', courses_id: '462', courses_avg: 91.88 },
                                { courses_dept: 'dhyg', courses_id: '400', courses_avg: 92.13 },
                                { courses_dept: 'dhyg', courses_id: '462', courses_avg: 92.17 },
                                { courses_dept: 'adhe', courses_id: '329', courses_avg: 92.54 },
                                { courses_dept: 'adhe', courses_id: '329', courses_avg: 93.33 },
                                { courses_dept: 'dhyg', courses_id: '412', courses_avg: 93.58 },
                                { courses_dept: 'dhyg', courses_id: '412', courses_avg: 93.72 },
                                { courses_dept: 'adhe', courses_id: '329', courses_avg: 96.11 } ] });

                    }).catch(function (err: any) {
                        //console.log(err);
                        Log.test('Error: ' + err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {

                expect.fail();
            });


    });

    it("Returns fail where input string is *  ",function(){
        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){
                return insightfacade.performQuery(query5)
                    .then(function (response: InsightResponse) {
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        //console.log(response.body);
                        expect.fail();
                    }).catch(function (err: any) {
                        //console.log(err);
                        Log.test('Error: ' + err);
                        expect(err.code).to.deep.equal(400);
                        //console.log(err.body);
                        expect(err.body).to.deep.equal(err.body);
                    })
            })
            .catch(function (err: any) {
                expect.fail();
            });
    });

    it("Returns fail where input string is **  ",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){
                return insightfacade.performQuery(query6)
                    .then(function (response: InsightResponse) {
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        //console.log(response.body);
                        expect.fail();


                    }).catch(function (err: any) {
                        //console.log(err);
                        Log.test('Error: ' + err);
                        expect(err.code).to.deep.equal(400);
                        //console.log(err.body);
                        expect(err.body).to.deep.equal(err.body);

                    })
            })
            .catch(function (err: any) {

                expect.fail();
            });


    });

    it("Returns fail where input string is a*a  ",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){
                return insightfacade.performQuery(query7)
                    .then(function (response: InsightResponse) {
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        //console.log(response.body);
                        expect.fail();


                    }).catch(function (err: any) {
                        //console.log(err);
                        Log.test('Error: ' + err);
                        expect(err.code).to.deep.equal(400);
                        //console.log(err.body);
                        expect(err.body).to.deep.equal(err.body);

                    })
            })
            .catch(function (err: any) {

                expect.fail();
            });


    });

    it("Returns fail where input string is a*a*  ",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){
                return insightfacade.performQuery(query8)
                    .then(function (response: InsightResponse) {
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        //console.log(response.body);
                        expect.fail();


                    }).catch(function (err: any) {
                        //console.log(err);
                        Log.test('Error: ' + err);
                        expect(err.code).to.deep.equal(400);
                        //console.log(err.body);
                        expect(err.body).to.deep.equal(err.body);

                    })
            })
            .catch(function (err: any) {

                expect.fail();
            });


    });


});

