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

// test
async function execute(){
  const zoo = await findZoos()
  console.log(zoo)
}

// endpoints here
server.get('/api', (req, res) => {
  res.send(`
  <h2>
      WEBDB2 
  </h2>`)
})

server.get('/api/zoos', async (req, res) => {
  try{
      const zooList = await db.findZoos();
      res.status(200).json(zooList)
  } catch (error) {
      res.status(500).json({
          message: 'The account list could not be retrieved.'
      })
  }
})



//server
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

execute()
