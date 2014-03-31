module.exports = function(lbConnect,lbConfig) {
    user  = require('./users')(lbConnect,lbConfig);
    thing = require('./things')(lbConnect,lbConfig);
};
