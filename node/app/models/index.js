module.exports = function(lb) {
    user  = require('./users')(lb);
    thing = require('./things')(lb);
};
