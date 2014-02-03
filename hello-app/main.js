Posts = new Meteor.Collection('posts');

if(Meteor.isServer) {
  var Future = Npm.require('fibers/future');
  Meteor.methods({
    hello: function() {
      // console.log('callling: Hello');
      var content =  HTTP.get(process.env.ROOT_URL);
      Posts.insert({aa: 100});
      var cnt =  Posts.find({}).count();
      
      Meteor._wrapAsync(wait)(1000);
      return cnt;
    },

    async: function() {
      Posts.insert({aa: 10});
      var content = HTTP.get(process.env.ROOT_URL);;
      return content;
    },

    userCheck: function() {
      var user = Meteor.user();
      Meteor.users.update(user._id, {$set: {abc: Random.id()}});
    },

    dbCallback: function() {
      Posts.insert({aa: 10}, function() {
        console.log('DONE');
      });
      console.log('IWARAAI');
    }
  });

  function wait(time, done) {
    setTimeout(function() {
      done();
    }, time)
  }

  if(typeof Apm != 'undefined') {
    //Initialize APM
    Apm.connect('EGTEf6YEzHTF638tb', 'w4uwysCvzcxP4FnZ5', {
      endpoint: "http://localhost:11011"
    });
  }

  // Meteor.require('heapdump');
}


//ss
