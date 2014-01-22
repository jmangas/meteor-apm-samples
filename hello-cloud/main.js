Posts = new Meteor.Collection('posts');

if(Meteor.isServer) {
  var Future = Npm.require('fibers/future');
  Meteor.methods({
    hello: function() {
      var content =  HTTP.get('http://google.com');
      Posts.insert({aa: 100});
      var cnt =  Posts.find({}).fetch();
      
      Meteor._wrapAsync(wait)(1000);
      return cnt;
    },

    async: function() {
      var res = Async.runSync(function(done) {
        setTimeout(function() {
          done(null, 2000);
        }, 2000);
      });
      return res;
    } 
  });

  function wait(time, done) {
    setTimeout(function() {
      done();
    }, time)
  }


  //Initialize APM
  Apm.connect('wkNWdKsdsyCrpsdsdsu', 'QrrFwYsdsdssdsgr7RYCd');
}
