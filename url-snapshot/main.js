SnapShots = new Meteor.Collection('posts');

if(Meteor.isServer) {
  var Future = Npm.require('fibers/future');
  Meteor.methods({
    takeSnapshot: function(url) {
      this.unblock();
      var content =  HTTP.get(url);
      SnapShots.insert({content: content, url: url, takenAt: new Date()});
    },

    getRecentSnapshot: function(url) {
      var options = {
        sort: {takenAt: -1}
      };
      return SnapShots.findOne({url: url}, options);
    } 
  });

  function wait(time, done) {
    setTimeout(function() {
      done();
    }, time)
  }

  //Initialize APM
  Apm.connect('cjw7pzNyaXs5RbuKc', 'pKmYjvr57oFAxDC99');
}
