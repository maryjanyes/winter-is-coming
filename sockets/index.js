/**
 * @sockets.index.js
 **/

const ZombiesModule = require('../src/ZombiesModule');
const wsPort = 1001;
const ws = require('ws');
const randomize = require('../utils/randomize');
const clientEventHandler = require('../utils/clientEventHandler');
const SOCKET_EVENT_TYPES = require('./constants/eventTypes');

class BoardWebSockets {

    constructor() {
        
        const wsServer = new ws.Server({
            port: wsPort,
            perMessageDeflate: {
                zlibDeflateOptions: {
                    chunkSize: 1024
                },
                zlibInflateOptions: {
                    chunkSize: 10 * 1024
                },
                concurrencyLimit: 10,
                threshold: 1024
            }
        }), connectionList = [];
        wsServer.on('error', (err) => {
            console.log('ws error: ', err);
            wsServer.close();
        });
        wsServer.on('connection', async(ws, req) => {
            if (ws.readyState === 1) {
                const newClient = await randomize();
                const runCordsPusher = () => setInterval(() => {
                    console.log('interval running on: ', newClient);
                    ws.send(
                        JSON.stringify({
                            status: 200,
                            type: SOCKET_EVENT_TYPES.UPDATE_ZOMBIES_CORDS,
                            zombies: ZombiesModule.updateZombies()
                        })
                    );
                }, 2000);
                connectionList.push({
                    url: req.url,
                    _id: newClient,
                    pusher: runCordsPusher()
                });
                ws.on('close', (ping_id) => {
                    const toClose = connectionList.findIndex((elem) => elem._id === newClient);
                    console.log('to close: ', toClose);
                    clearInterval(connectionList[toClose].pusher);
                    connectionList.splice(toClose, 1);
                });
                ws.send(
                    JSON.stringify({
                        status: 200,
                        eventTypes: SOCKET_EVENT_TYPES,
                        zombies: ZombiesModule.getZombies()
                    })
                );
            }
        });
        wsServer.on('message', clientEventHandler.bind(wsServer));

        return wsServer;
    }

}

module.exports = new BoardWebSockets;
