var model = require('nodejs-model');

module.exports = function(lbConnect,lbConfig) {

//create a new model definition _Things_ and define _name_/_password_ attributes
  Things = model("Things")
            .attr('id',{})
            .attr('type', {})
            .attr('name',{});


Things.get = function(id) {
  switch(id) {
  case 1:
    p = Things.create();
    p.update({
      id: 1,
      type: "Movie",
      name: "Star Wars"
    });
    break;
  case 2:
    p = Things.create();
    p.update({
      id: 2,
      name: "TVShow",
      password: "Simpsons"
    });
    break;
  case 3:
    p = Things.create();
    p.update({
      id: 3,
      name: "Song",
      password: "Royals"
    });
    break;
  default:
    console.log("bad Things id error");
  }
  return p;
}

//module.exports = Things;
};
