const mongoose = require('mongoose');

const jobroleSchema = new mongoose.Schema({
    name:   { 
        type: String, 
        required: true,
        unique: true
    },
    description:  { 
        type: String, 
        required: true
    },
    avgsal: { 
        type: String, 
        required: true
    }
   });
  
   const jobroles = new mongoose.model("jobroles", jobroleSchema);

   const createDocument = async() =>{
    try {
    const j1 = new jobroles({
        name: 'Applications Developer',
        description: 'Also known as a software developer or software architect, an application developer is responsible for developing and modifying source code for software applications. These applications are aimed at aiding customers with computer tasks or programs.',
        avgsal: 'Around 6 LPA'
    })
    const j2 = new jobroles({
        name: 'CRM Technical Developer',
        description: 'CRM developers are programmers who specialize in systems that collect user, consumer, and subscriber data. Their job is to improve the tools sales reps, customer service reps, account managers, and marketers use in their efforts to keep customers happy and coming back for more.',
        avgsal: 'Arounf 4 LPA'
    })
    const j3 = new jobroles({
        name: 'Database Developer',
        description: 'Database developers work in the IT department and are responsible for the development and maintenance of databases while following specific coding standards.',
        avgsal: 'Around 5 LPA'
    })
    const j4 = new jobroles({
        name: 'Mobile applications developer',
        description: 'Mobile applications developers create and develop mobile apps. They have a strong working knowledge of the different platforms that applications are suitable for, such as smartphones and tablets.',
        avgsal: 'Around 5 LPA'
    })
    const j5 = new jobroles({
        name: 'Network Security Engineer',
        description: 'A network security engineer is involved in the provisioning, deployment, configuration, and administration of many different pieces of network- and security-related hardware and software. These include firewalls, routers, switches, various network monitoring tools, and VPNs (virtual private networks).',
        avgsal: 'Arounf 6 LPA'
    })
    const j6 = new jobroles({
        name: 'Software Developer',
        description: 'Software developers develop computer applications that allow users to perform specific tasks on computers or other devices.  They may also develop or customize existing systems that run devices or control networks.',
        avgsal: 'Around 5.5 LPA'
    })
    const j7 = new jobroles({
        name: 'Software Engineer',
        description: 'A software engineer is a person who applies the principles of software engineering to the design, development, maintenance, testing, and evaluation of computer software.',
        avgsal: 'Around 8 LPA'
    })
    const j8 = new jobroles({
        name: 'Software Quality Assurance',
        description: 'A software quality assurance engineer is someone who monitors every phase of the software development process so as to ensure design quality, making sure that the software adheres to the standards set by the development company.',
        avgsal: 'Around 6 LPA'
    })
    const j9 = new jobroles({
        name: 'System Security Administrator',
        description: 'A security systems administrator handles all aspects of information security and protects the virtual data resources of a company.',
        avgsal: 'Around 6 LPA'
    })
    const j10 = new jobroles({
        name: 'Technical Support',
        description: 'test1',
        avgsal: 'Around 4 LPA'
    })
    const j11 = new jobroles({
        name: 'UX Designer',
        description: 'UX designer make products and technology usable, enjoyable, and accessible for humans. UX designers tend to work as part of a wider product team, and will often find themselves bridging the gap between the user, the development team, and key business stakeholders.',
        avgsal: 'Around 7 LPA'
    })
    const j12 = new jobroles({
        name: 'Web Developer',
        description: 'They are developers who are capable of handling all aspects of a web application such as front-end, back-end, clients, servers and databases.',
        avgsal: '7 LPA'
    })
    
    const result = await jobroles.insertMany([j1, j2, j3, j4, j5, j6, j7, j8, j9, j10, j11, j12]); 
    } catch (error)
    {
     console.log(error);
    }
    }
     
    //createDocument();

module.exports = jobroles;
