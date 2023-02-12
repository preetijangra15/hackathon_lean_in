import { PrismaClient } from '@prisma/client'
import express from "express"
const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {  // test route for get method on auth file access localhost:port/auth
    res.send('dashboard route working') 
})

router.get('/investordash', async(req, res) =>{
    var users = await prisma.startup.findMany()
    console.log(users)
})

export default router;