// mongoDb

// const { MongoClient } = require("mongodb");
// // Replace the uri string with your MongoDB deployment's connection string.
// const uri = "mongodb://127.0.0.1:27017";
// const client = new MongoClient(uri);

// async function run() {
//   try {
//     await client.connect();
//     const database = client.db('chat');
//     const movies = database.collection('movies');

//     await movies.deleteOne({title: 'Back to the Future'});

//     await movies.insert({title: 'Back to the Future'});

//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query);
//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// mongoose

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/chat', {useNewUrlParser: true, useUnifiedTopology: true});

// const schema = mongoose.Schema({
//     name: String
// });
// schema.methods.meow = function {
//     console.log(this.get('name'));
// };

// const Cat = mongoose.model('Cat', schema);

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then((k) => {
//     k.meow()
//     // console.log('meow')
// });

// const User = require('./models/User').User;

// const user = new User({
//     username: 'Alex',
//     password: 'alex'
// });

// user.save();

/**
 * 1 drop database
 * 2 create & save 3 users
 * 3 close connection
 */

 
const mongoose = require("./libs/mongoose");
const User = require("./models/User").User;
const async = require('async');

// async.series([
//     open,
//     dropDB,
//     createUsers,
//     close,
// ], function(err, result) {
//     // console.log(arguments);
// });


function runner(deeds) {
    return deeds.reduce(function(p, deed) {
        return p.then(function() {
            return deed()
        })
    }, Promise.resolve())
}

function a1() {
    return new Promise(function(resolve) {
        setTimeout(() => {
            console.log('a1');
            resolve()
        }, 2000)
    })
}

function a2() {
    return new Promise(function(resolve) {
        setTimeout(() => {
            console.log('a2');
            resolve()
        }, 200)
    })
}

runner([a1, a2]).then((dd) => {
    console.log('res', dd);
})


function open(cb) {
  mongoose.connection.on("open", cb);
}

function close() {
    mongoose.disconnect();
}

function dropDB(cb) {
  const db = mongoose.connection.db;
  db.dropDatabase(cb);
}

function createUsers(cb) {
  const user1 = new User({
    username: "Alex1",
    password: "alex1",
  });

  const user2 = new User({
    username: "Alex2",
    password: "alex2",
  });

  const user3 = new User({
    username: "Alex3",
    password: "alex3",
  });

  Promise.all([user1.save(), user2.save(), user3.save()]).then(cb);
}
