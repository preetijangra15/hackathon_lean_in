// Import the express in typescript file
import express from 'express';
const app: express.Application = express();
var bodyParser = require('body-parser')
var path = require('path')
// Take a port 3000 for running server.
const port: number = 3000;

//prisma
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import login from './routes/login'
import dashboard from './routes/renderpages'

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.use("public", express.static(path.join(__dirname,'public')));


async function main() {
  // Connect the client
  await prisma.$connect()
  // ... you will write your Prisma Client queries here
  const allUsers = await prisma.investor.findMany()
  console.log(allUsers)

}

//routes
//app.use('/loginstartup', login);

//app.use('/login', login);

app.use('/auth', login) // now u can handle auth in login file naming conventions dekh lena
app.use('/dash',dashboard)

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })



// Handling '/' Request
// app.get('/', (_req, _res) => {
// 	_res.send("TypeScript With Express");
// });

app.get('/', (req, res) => {
  res.render('pages/index')
})

app.get('/signup',(req,res) =>{
  res.render('pages/signup')
})

app.get('/signupinvestorpage',(req,res) =>{
  res.render('pages/signupinvestor')
})

app.get('/signupstartuppage', (req,res) =>{
  res.render('pages/signupstartup')
})

app.get('/investordash',async (req,res) => {
  const users = await prisma.startup.findMany()
  console.log(users)
  res.render('pages/investordash', {users:users})
})

app.post('/logininvestor', async(req,res) =>{

  res.send("inside logininvestor page");


  let email = req.body.email;
  let pass = req.body.password;

  const details = await prisma.investor.findUnique({
      where:{
          email : email
      }
  })


//res.render('pages/investordash', {users:users})

  //console.log(details);

  if(details?.password == pass){
      const name = details?.name;
      const users = await prisma.startup.findMany()
      console.log(users)
      console.log('inside logininvestor')
      res.redirect('/investordash')
  }

  else{
      console.log("Wrong Credentials!")
  }

})
// Server setup
app.listen(port, () => {
	console.log(`TypeScript with Express
		http://localhost:${port}/`);
});






