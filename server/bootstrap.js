// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  var password = process.env['METEOR_PASSWORD']
  if (password) {
    var require = __meteor_bootstrap__.require
    var connect = require('connect')
    __meteor_bootstrap__.app.use(connect.basicAuth(process.env['METEOR_USERNAME'] || process.env['USERNAME'] || process.env['LOGNAME'] || process.env['USER'], password))
    var basicAuth = __meteor_bootstrap__.app.stack.pop()
    __meteor_bootstrap__.app.stack.unshift(basicAuth)
  }

  if (Lists.find().count() === 0) {
    var data = [
      {name: "Meteor Principles",
       contents: [
         ["Data on the Wire", "Simplicity", "Better UX", "Fun"],
         ["One Language", "Simplicity", "Fun"],
         ["Database Everywhere", "Simplicity"],
         ["Latency Compensation", "Better UX"],
         ["Full Stack Reactivity", "Better UX", "Fun"],
         ["Embrace the Ecosystem", "Fun"],
         ["Simplicity Equals Productivity", "Simplicity", "Fun"]
       ]
      },
      {name: "Languages",
       contents: [
         ["Lisp", "GC"],
         ["C", "Linked"],
         ["C++", "Objects", "Linked"],
         ["Python", "GC", "Objects"],
         ["Ruby", "GC", "Objects"],
         ["JavaScript", "GC", "Objects"],
         ["Scala", "GC", "Objects"],
         ["Erlang", "GC"],
         ["6502 Assembly", "Linked"]
         ]
      },
      {name: "Favorite Scientists",
       contents: [
         ["Ada Lovelace", "Computer Science"],
         ["Grace Hopper", "Computer Science"],
         ["Marie Curie", "Physics", "Chemistry"],
         ["Carl Friedrich Gauss", "Math", "Physics"],
         ["Nikola Tesla", "Physics"],
         ["Claude Shannon", "Math", "Computer Science"]
       ]
      }
    ];

    var timestamp = (new Date()).getTime();
    for (var i = 0; i < data.length; i++) {
      var list_id = Lists.insert({name: data[i].name});
      for (var j = 0; j < data[i].contents.length; j++) {
        var info = data[i].contents[j];
        Todos.insert({list_id: list_id,
                      text: info[0],
                      timestamp: timestamp,
                      tags: info.slice(1)});
        timestamp += 1; // ensure unique timestamp.
      }
    }
    Todos.update({"text" : "Ada Lovelace"},{"$set":{"left":200}})
    Todos.update({"text" : "Ada Lovelace"},{"$set":{"top":250}})
  }
});
