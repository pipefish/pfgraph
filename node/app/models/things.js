var model = require('nodejs-model');

//create a new model definition _User_ and define _name_/_password_ attributes
var User = model("User")
            .attr('id',{})
            .attr('name', {})
            .attr('password', {
                validations: {
                  length: {
                    minimum: 5,
                    maximum: 20,
                    messages: {
                      tooShort: 'password is too short!',
                      tooLong: 'password is too long!'
                    }
                  }
                },
                //this tags the accessibility as _private_
                tags: ['private']
            });


User.get = function(id) {
  switch(id) {
  case 1:
    p = User.create();
    p.update({
      id: 1,
      name: "Fred",
      password: "Wilma"
    });
    break;
  case 2:
    p = User.create();
    p.update({
      id: 2,
      name: "Barny",
      password: "Betty"
    });
    break;
  case 3:
    p = User.create();
    p.update({
      id: 3,
      name: "Pebbles",
      password: "Bambam"
    });
    break;
  default:
    console.log("bad user id error");
  }
  return p;
}
