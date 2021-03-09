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

const User = require('./models/User').User;

const user = new User({
    username: 'Alex',
    password: 'alex'
});

user.save();