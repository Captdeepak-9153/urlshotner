const mongoose = require('mongoose');

async function connectMongoDb(url){
    return mongoose.connect(url); // it takes the url from index.js file and connect it with database
}

module.exports = {
    connectMongoDb,
};