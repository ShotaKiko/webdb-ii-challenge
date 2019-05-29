const express = require('express');
const helmet = require('helmet');
const knex = require('knex')

const config = {
  client: "sqlite3",
  connection: {
    filename : './data/lambda.sqlite3'
  },
  useNullasDefault: true
};

const db = knex(config)

const server = express();

server.use(express.json());
server.use(helmet());


//helper functions~~~~~~
//SELECT * from zoos
function findZoos(){
  return db('zoos')
}

//select * from zoos where id = id
function findById(id){
  return db('zoos').where({ id })
}

// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
