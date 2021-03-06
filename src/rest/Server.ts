/**
 * This is the REST entry point for the project.
 * Restify is configured here.
 */

import restify = require('restify');

import Log from "../Util";
import {InsightResponse} from "../controller/IInsightFacade";
import InsFacaSingleton from "./InsFacaSingleton";
import InsightFacade from "../controller/InsightFacade";
import Parser from "../controller/Parser";

/**
 * This configures the REST endpoints for the server.
 */
export default class Server {

    private port: number;
    private rest: restify.Server;

    constructor(port: number) {
        Log.info("Server::<init>( " + port + " )");
        this.port = port;
        InsightFacade.myDatasets = null;
        //let p = new Parser();
        //p.saveFile(InsightFacade.myDatasets);
        //let fs = require('fs');
        //InsightFacade.myDatasets = fs.readFileSync("./test array",'utf8');
    }

    /**
     * Stops the server. Again returns a promise so we know when the connections have
     * actually been fully closed and the port has been released.
     *
     * @returns {Promise<boolean>}
     */
    public stop(): Promise<boolean> {
        Log.info('Server::close()');
        let that = this;
        return new Promise(function (fulfill) {
            that.rest.close(function () {
                fulfill(true);
            });
        });
    }

    /**
     * Starts the server. Returns a promise with a boolean value. Promises are used
     * here because starting the server takes some time and we want to know when it
     * is done (and if it worked).
     *
     * @returns {Promise<boolean>}
     */
    public start(): Promise<boolean> {
        let that = this;
        return new Promise(function (fulfill, reject) {
            try {
                Log.info('Server::start() - start');

                that.rest = restify.createServer({
                    name: 'insightUBC'
                });

                that.rest.use(restify.bodyParser({mapParams: true, mapFiles: true}));

                // support CORS
                that.rest.use(function crossOrigin(req, res, next) {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "X-Requested-With");
                    return next();
                });

                that.rest.get('/', function (req: restify.Request, res: restify.Response, next: restify.Next) {
                    res.send(200);
                    return next();
                });

                // provides the echo service
                // curl -is  http://localhost:4321/echo/myMessage
                that.rest.get('/echo/:msg', Server.echo);

                // Other endpoints will go here

                that.rest.put('dataset/:id',Server.putDataset);
                that.rest.del('dataset/:id',Server.deleteDataset);
                that.rest.post('/query',Server.postDataset);

                that.rest.listen(that.port, function () {
                    Log.info('Server::start() - restify listening: ' + that.rest.url);
                    fulfill(true);
                });

                that.rest.on('error', function (err: string) {
                    // catches errors in restify start; unusual syntax due to internal node not using normal exceptions here
                    Log.info('Server::start() - restify ERROR: ' + err);
                    reject(err);
                });
            } catch (err) {
                Log.error('Server::start() - ERROR: ' + err);
                reject(err);
            }
        });
    }

    // The next two methods handle the echo service.
    // These are almost certainly not the best place to put these, but are here for your reference.
    // By updating the Server.echo function pointer above, these methods can be easily moved.

    public static echo(req: restify.Request, res: restify.Response, next: restify.Next) {
        Log.trace('Server::echo(..) - params: ' + JSON.stringify(req.params));
        try {
            let result = Server.performEcho(req.params.msg);
            Log.info('Server::echo(..) - responding ' + result.code);
            res.json(result.code, result.body);
        } catch (err) {
            Log.error('Server::echo(..) - responding 400');
            res.json(400, {error: err.message});
        }
        return next();
    }

    public static performEcho(msg: string): InsightResponse {
        if (typeof msg !== 'undefined' && msg !== null) {
            return {code: 200, body: {message: msg + '...' + msg}};
        } else {
            return {code: 400, body: {error: 'Message not provided'}};
        }
    }

    public static putDataset(req:restify.Request, res: restify.Response, next:restify.Next){

        let iFacade = InsFacaSingleton.getInstance();
        let dataStr = new Buffer(req.params.body).toString('base64');
        let datasetName = req.params.id;

        iFacade.addDataset(datasetName, dataStr)
            .then(function(resp:any){
                Log.info('Server::putDataset(..) - responding ' + resp.code);
                res.status(resp.code);
                res.json(resp);
            })
            .catch(function(err:any){
                Log.error('Server::putDataset(..) - responding with error');
                res.status(err.code);
                res.json(err.code, {error: err});
        });
        return next();
    }
    public static deleteDataset(req:restify.Request, res: restify.Response, next:restify.Next){

        let iFacade = InsFacaSingleton.getInstance();
        let datasetName = req.params.id;

        iFacade.removeDataset(datasetName)
            .then(function(resp:any){
                Log.info('Server::deleteDataset(..) - responding ' + resp.code);
                res.status(resp.code);
                res.json(resp);
            })
            .catch(function(err:any){
                Log.error('Server::deleteDataset(..) - responding with error');
                res.status(err.code);
                res.json(err.code, {error: err.body});

            });

        return next();

    }

    public static postDataset(req:restify.Request, res: restify.Response, next:restify.Next){

        let iFacade = InsFacaSingleton.getInstance();
        let queryBody = req.body;

        iFacade.performQuery(queryBody)
            .then(function(resp:any){
                Log.info('Server::postDataset(..) - responding ' + resp.code);
                res.status(resp.code);
                res.json(resp);
            })
            .catch(function(err:any){
                Log.error('Server::postDataset(..) - responding with error');
                res.status(err.code);
                res.json(err.code, {error: err});
            });

        return next();

    }

}
