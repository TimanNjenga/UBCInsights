///<reference path="../src/controller/IInsightFacade.ts"/>

import {expect} from 'chai';
import Log from "../src/Util";
import InsightFacade from "../src/controller/InsightFacade";
import {IInsightFacade, InsightResponse} from "../src/controller/IInsightFacade";

describe("performQueryspec", function () {


    let insightfacade : InsightFacade  = null;
    let insightfacade2 : InsightFacade = null;


//new change here

    let fs = require('fs');
    let astring = "courses";
    let data = fs.readFileSync('courses.zip');
    let contentstring = data.toString('base64');

    let query1 = {

        "WHERE": {
            "IS": {
                "courses_instructor": 'campbell, deborah'
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
    let query2 = {

        "WHERE":{
            "OR":[
                {
                    "OR":[
                        {
                            "GT":{
                                "courses_avg": 90.1
                            }
                        },
                        {
                            "LT":{
                                "courses_avg":90.2
                            }
                        }
                    ]
                },
                {
                    "IS":{
                        "courses_dept" : "CPSC"
                    }
                }
            ]
        },
        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
                "courses_avg",
                "courses_instructor"
            ],
            "ORDER":"courses_avg"
        }
    };
    let query4 = {

        "WHERE":{
            "AND":[
                {
                    "AND":[
                        {
                            "GT":{
                                "courses_avg": 70
                            }
                        },
                        {
                            "LT":{
                                "courses_avg":80
                            }
                        }
                    ]
                },
                {
                    "IS":{
                        "courses_dept" : "musc"
                    }
                }
            ]
        },
        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
                "courses_avg",
                "courses_instructor"
            ]
        }
    };
    let query5 = {
        "WHERE":{

            "AND": [

                {
                    "OR": [
                        {
                            "EQ": {
                                "courses_avg":90}
                                },
                        {
                            "LT":{ "courses_avg":10}
                        }
                    ]
                },
                {
                    "OR": [
                        {
                            "EQ":{ "courses_avg":5}
                            },
                        {
                            "GT":{ "courses_avg":85}
                        }
                    ]
                },
                {
                    "IS": {"courses_dept": "musc"}
                }
            ]
        },
        "OPTIONS":{

            "COLUMNS":[
                "courses_dept",
                "courses_id",
                "courses_avg"
            ],
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

    let query20 = {
        "WHERE":{
            "GT":{
                "courses_avg":97
            }
        },
        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
            ],
            "ORDER":"courses_dept"
        }
    };



    beforeEach(function () {
        insightfacade = new InsightFacade();


    });

    afterEach(function () {
        insightfacade = null;
    });
   //this.timeout(50000);




    it("should return blank file ",function(){
        return insightfacade.performQuery(query1)
            .then(function (response: InsightResponse) {
                Log.test('Response number: ' + response.code);
                Log.test('Response body: ' + response.body);
                expect.fail();

            }).catch(function (err: any) {
                expect(err.code).to.deep.equal(424);
                expect(err.body).to.deep.equal({"error " : "there are no data sets in the file"});

            })
    });

    it("Returns Correct performQuery Response with Code",function(){


        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){
                return insightfacade.performQuery(query3)
                    .then(function (response: InsightResponse) {
                        //console.log(response.body);
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

    it("specific course with no order and between 70 and 80 avg",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

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
            })
            .catch(function (err: any) {
                expect.fail();
            });


    });

    it("query for DeepMind",function(){
        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){
                return insightfacade.performQuery(query5)
                    .then(function (response: InsightResponse) {
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal({ result:
                            [ { courses_dept: 'musc', courses_id: '553', courses_avg: 90 },
                                { courses_dept: 'musc', courses_id: '553', courses_avg: 90 } ] });




                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
                expect.fail();
            });


    });

    it("Double Negation",function(){
        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){
                return insightfacade.performQuery(query)
                    .then(function (response: InsightResponse) {
                        //console.log(response.body);
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal(
                            { result:
                                [ { courses_instructor: '',
                                    courses_dept: 'musc',
                                    courses_avg: 93,
                                    courses_year: 2008 },
                                    { courses_instructor: 'konoval, michael brandon',
                                        courses_dept: 'musc',
                                        courses_avg: 94.25,
                                        courses_year: 2009 },
                                    { courses_instructor: 'bortolussi, paolo;hamm, corey',
                                        courses_dept: 'musc',
                                        courses_avg: 93.35,
                                        courses_year: 2015 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 93.35,
                                        courses_year: 1900 },
                                    { courses_instructor: 'hamm, corey;magnanensi, giorgio;wilson, eric',
                                        courses_dept: 'musc',
                                        courses_avg: 93.06,
                                        courses_year: 2010 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 93.06,
                                        courses_year: 1900 },
                                    { courses_instructor: 'stride, frederick',
                                        courses_dept: 'musc',
                                        courses_avg: 90.19,
                                        courses_year: 2011 },
                                    { courses_instructor: 'sharon, rena',
                                        courses_dept: 'musc',
                                        courses_avg: 91.8,
                                        courses_year: 2013 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 91.8,
                                        courses_year: 1900 },
                                    { courses_instructor: 'sharon, rena',
                                        courses_dept: 'musc',
                                        courses_avg: 90.8,
                                        courses_year: 2012 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 90.8,
                                        courses_year: 1900 },
                                    { courses_instructor: 'sharon, rena',
                                        courses_dept: 'musc',
                                        courses_avg: 90.25,
                                        courses_year: 2011 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 90.25,
                                        courses_year: 1900 },
                                    { courses_instructor: 'van deursen, john',
                                        courses_dept: 'musc',
                                        courses_avg: 92.63,
                                        courses_year: 2011 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 92.63,
                                        courses_year: 1900 },
                                    { courses_instructor: 'hesselink, nathan',
                                        courses_dept: 'musc',
                                        courses_avg: 93.45,
                                        courses_year: 2016 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 93.45,
                                        courses_year: 1900 },
                                    { courses_instructor: 'raftery, james',
                                        courses_dept: 'musc',
                                        courses_avg: 92.67,
                                        courses_year: 2015 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 92.67,
                                        courses_year: 1900 },
                                    { courses_instructor: 'girard, jonathan',
                                        courses_dept: 'musc',
                                        courses_avg: 95.38,
                                        courses_year: 2015 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 95.67,
                                        courses_year: 1900 },
                                    { courses_instructor: 'girard, jonathan',
                                        courses_dept: 'musc',
                                        courses_avg: 92.47,
                                        courses_year: 2013 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 92.47,
                                        courses_year: 1900 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 92,
                                        courses_year: 2008 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 92,
                                        courses_year: 1900 },
                                    { courses_instructor: 'van deursen, john',
                                        courses_dept: 'musc',
                                        courses_avg: 93.33,
                                        courses_year: 2011 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 93.33,
                                        courses_year: 1900 },
                                    { courses_instructor: 'barcza, peter;sharon, rena',
                                        courses_dept: 'musc',
                                        courses_avg: 90.08,
                                        courses_year: 2015 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 90.08,
                                        courses_year: 1900 },
                                    { courses_instructor: 'langager, graeme',
                                        courses_dept: 'musc',
                                        courses_avg: 94.5,
                                        courses_year: 2014 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 94.5,
                                        courses_year: 1900 },
                                    { courses_instructor: 'langager, graeme',
                                        courses_dept: 'musc',
                                        courses_avg: 95,
                                        courses_year: 2010 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 95,
                                        courses_year: 1900 },
                                    { courses_instructor: 'langager, graeme',
                                        courses_dept: 'musc',
                                        courses_avg: 95,
                                        courses_year: 2013 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 95,
                                        courses_year: 1900 },
                                    { courses_instructor: 'langager, graeme',
                                        courses_dept: 'musc',
                                        courses_avg: 93.75,
                                        courses_year: 2009 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 93.75,
                                        courses_year: 1900 },
                                    { courses_instructor: 'langager, graeme',
                                        courses_dept: 'musc',
                                        courses_avg: 92.75,
                                        courses_year: 2012 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 92.75,
                                        courses_year: 1900 },
                                    { courses_instructor: 'langager, graeme',
                                        courses_dept: 'musc',
                                        courses_avg: 95,
                                        courses_year: 2011 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 95,
                                        courses_year: 1900 },
                                    { courses_instructor: 'girard, jonathan',
                                        courses_dept: 'musc',
                                        courses_avg: 96.5,
                                        courses_year: 2012 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 96.5,
                                        courses_year: 1900 },
                                    { courses_instructor: 'bortolussi, paolo;hamm, corey',
                                        courses_dept: 'musc',
                                        courses_avg: 90.43,
                                        courses_year: 2014 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 90.43,
                                        courses_year: 1900 },
                                    { courses_instructor: 'hamm, corey;wilson, eric',
                                        courses_dept: 'musc',
                                        courses_avg: 94,
                                        courses_year: 2010 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 94,
                                        courses_year: 1900 },
                                    { courses_instructor: 'bortolussi, paolo;hamm, corey',
                                        courses_dept: 'musc',
                                        courses_avg: 91.6,
                                        courses_year: 2012 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 91.6,
                                        courses_year: 1900 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 91,
                                        courses_year: 2008 },
                                    { courses_instructor: '',
                                        courses_dept: 'musc',
                                        courses_avg: 91,
                                        courses_year: 1900 } ] });



                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
                expect.fail();
            });


    });

    it("query for mango",function(){



        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(query6)
                    .then(function (response: InsightResponse) {
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal({ result:
                            [] });




                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
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

                return insightfacade.performQuery(query7)
                    .then(function (response: InsightResponse) {
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect.fail();

                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                        expect(err.code).to.deep.equal(400);
                        expect(err.body).to.deep.equal({ 'error ': 'not s_key' });
                    })
            })
            .catch(function (err: any) {
                expect.fail();
            });
    });

    it("query for Liberation",function(){


        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(query9)
                    .then(function (response: InsightResponse) {
                       // console.log(response);
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect.fail();

                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                        //console.log(err);
                        expect(err.code).to.deep.equal(400);
                        expect(err.body).to.deep.equal({ 'error ': "make filter error" });
                    })
            })
            .catch(function (err: any) {
                expect.fail();
            });
    });




    it("find course year with course",function(){



        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(query19)

                    .then(function (response: InsightResponse) {
                       // console.log(response.body)
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal({ result:
                            [ { courses_dept: 'adhe',
                                courses_id: '329',
                                courses_avg: 67.5,
                                courses_year: 2013 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 67.95,
                                    courses_year: 2014 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 70.56,
                                    courses_year: 2012 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 72.29,
                                    courses_year: 2013 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 72.93,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 73.79,
                                    courses_year: 2012 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 75.67,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 75.91,
                                    courses_year: 2013 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 77,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 77.5,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 77.59,
                                    courses_year: 2013 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 77.77,
                                    courses_year: 2014 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 78.24,
                                    courses_year: 2014 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 79,
                                    courses_year: 2014 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 79.83,
                                    courses_year: 2012 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 79.84,
                                    courses_year: 2015 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 80.33,
                                    courses_year: 2011 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 80.35,
                                    courses_year: 2008 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 80.44,
                                    courses_year: 2013 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 81.71,
                                    courses_year: 2008 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 81.71,
                                    courses_year: 2013 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 81.75,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 81.85,
                                    courses_year: 2012 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 82.49,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 82.76,
                                    courses_year: 2012 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 82.78,
                                    courses_year: 2011 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 82.84,
                                    courses_year: 2007 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 83.34,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 83.45,
                                    courses_year: 2009 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 83.48,
                                    courses_year: 2015 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 83.69,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 84.57,
                                    courses_year: 2011 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 84.78,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 84.83,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 85.03,
                                    courses_year: 2015 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 85.39,
                                    courses_year: 2010 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 85.58,
                                    courses_year: 2007 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 85.7,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 85.86,
                                    courses_year: 2008 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 86,
                                    courses_year: 2012 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 86.04,
                                    courses_year: 2010 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 86.19,
                                    courses_year: 2007 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 86.24,
                                    courses_year: 2016 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 86.26,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 86.26,
                                    courses_year: 2010 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 86.44,
                                    courses_year: 2009 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 86.59,
                                    courses_year: 2014 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 86.64,
                                    courses_year: 2014 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 87.71,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 89,
                                    courses_year: 2011 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 89,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 89.3,
                                    courses_year: 2014 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 89.38,
                                    courses_year: 2009 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 89.38,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 90.02,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 90.82,
                                    courses_year: 2015 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 92.54,
                                    courses_year: 2015 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 93.33,
                                    courses_year: 2016 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 96.11,
                                    courses_year: 2015 } ] });




                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
                expect.fail();
            });


    });


    it("filter courses by year",function(){

        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){

                return insightfacade.performQuery(query19)

                    .then(function (response: InsightResponse) {
                       //console.log(response.body)
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        expect(response.body).to.deep.equal({ result:
                            [ { courses_dept: 'adhe',
                                courses_id: '329',
                                courses_avg: 67.5,
                                courses_year: 2013 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 67.95,
                                    courses_year: 2014 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 70.56,
                                    courses_year: 2012 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 72.29,
                                    courses_year: 2013 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 72.93,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 73.79,
                                    courses_year: 2012 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 75.67,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 75.91,
                                    courses_year: 2013 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 77,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 77.5,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 77.59,
                                    courses_year: 2013 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 77.77,
                                    courses_year: 2014 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 78.24,
                                    courses_year: 2014 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 79,
                                    courses_year: 2014 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 79.83,
                                    courses_year: 2012 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 79.84,
                                    courses_year: 2015 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 80.33,
                                    courses_year: 2011 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 80.35,
                                    courses_year: 2008 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 80.44,
                                    courses_year: 2013 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 81.71,
                                    courses_year: 2008 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 81.71,
                                    courses_year: 2013 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 81.75,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 81.85,
                                    courses_year: 2012 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 82.49,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 82.76,
                                    courses_year: 2012 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 82.78,
                                    courses_year: 2011 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 82.84,
                                    courses_year: 2007 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 83.34,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 83.45,
                                    courses_year: 2009 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 83.48,
                                    courses_year: 2015 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 83.69,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 84.57,
                                    courses_year: 2011 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 84.78,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 84.83,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 85.03,
                                    courses_year: 2015 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 85.39,
                                    courses_year: 2010 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 85.58,
                                    courses_year: 2007 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 85.7,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 85.86,
                                    courses_year: 2008 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 86,
                                    courses_year: 2012 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 86.04,
                                    courses_year: 2010 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 86.19,
                                    courses_year: 2007 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 86.24,
                                    courses_year: 2016 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 86.26,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 86.26,
                                    courses_year: 2010 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 86.44,
                                    courses_year: 2009 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 86.59,
                                    courses_year: 2014 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 86.64,
                                    courses_year: 2014 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 87.71,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 89,
                                    courses_year: 2011 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 89,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 89.3,
                                    courses_year: 2014 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 89.38,
                                    courses_year: 2009 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 89.38,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 90.02,
                                    courses_year: 1900 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 90.82,
                                    courses_year: 2015 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 92.54,
                                    courses_year: 2015 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 93.33,
                                    courses_year: 2016 },
                                { courses_dept: 'adhe',
                                    courses_id: '329',
                                    courses_avg: 96.11,
                                    courses_year: 2015 } ] });




                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                       // console.log(err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
                //console.log(err)
                expect.fail();
            });


    });

    it("Returns second Correct performQuery Response with Code",function(){


        return insightfacade.addDataset(astring, contentstring)
            .then ( function (valueonce){
                return insightfacade.performQuery(query20)
                    .then(function (response: InsightResponse) {
                        Log.test('Response number: ' + response.code);
                        Log.test('Response body: ' + response.body);
                        expect(response.code).to.deep.equal(200);
                        //console.log(response.body);
                        expect(response.body).to.deep.equal(response.body);


                    }).catch(function (err: any) {
                        Log.test('Error: ' + err);
                        expect.fail();
                    })
            })
            .catch(function (err: any) {
              //  console.log(err);
                expect.fail();
            });


    });


});

