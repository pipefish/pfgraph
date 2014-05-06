'use strict';

//var lbConnect = require('logicblox-connectblox');



/**
 * LogicBlox configuration
 */
var lb = {
        conn: require('logicblox-connectblox'),
        config: { default:  {
                              lbhome: __dirname + '/../../app/lib',
                              host: "glmaster.pipefish.com"
                            },
                  admin:    {
                              admin: true, lbhome: __dirname + '/../../app/lib',
                              host: "glmaster.pipefish.com"
                            }
                }
      };

exports = module.exports = lb;
