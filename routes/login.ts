import { PrismaClient } from '@prisma/client'
import express from "express"
const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {  // test route for get method on auth file access localhost:port/auth
    res.send('Auth rooute working') 
})


// INVESTOR LOGIN AND SIGNUP ////////////
router.post('/logininvestor', async(req,res) =>{

    res.send("inside logininvestor page");


    let email = req.body.email;
    let pass = req.body.password;

    const details = await prisma.investor.findUnique({
        where:{
            email : email
        }
    })

    //console.log(details);

    if(details?.password == pass){
        const name = details?.name;
        console.log('inside logininvestor')
        res.render('/pages/investordash' , {name:name})
    }

    else{
        console.log("Wrong Credentials!")
    }

})

router.post('/signupinvestor',async (req, res) => {

    res.send('inside signupinvestor')
    console.log(req.body);
    await prisma.investor.create({
        data:{
            email : req.body.email,
            name: req.body.name,
            bio : req.body.bio,
            phone: req.body.phone,
            password: req.body.password,
            maxinv : req.body.maxinv,
            profession: req.body.profession
        },
    })
    
})


///// STARTUP LOGIN AND SIGNUP ///////

router.post('/loginstartup', async(req,res) =>{

    res.send("inside loginstartup page");


    let email = req.body.email;
    let pass = req.body.password;

    const details = await prisma.startup.findUnique({
        where:{
            email : email
        }
    })

    //console.log(details);

    if(details?.password == pass){
        console.log("Logged In!");
    }

    else{
        console.log("Wrong Credentials!")
    }

})

router.post('/signupstartup',async (req, res) => {

    res.send('inside signupstartup')

    console.log(req.body);
    
    await prisma.startup.create({
        data:{
            BusName : req.body.BusName,
            email : req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            password: req.body.password,
            revenue : req.body.revenue,
            sale: req.body.sale,
            offer : req.body.offer
        },
    })
    
})


export default router;
