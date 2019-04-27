const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'}
];

app.get('/',(req,res)=>{
    res.send('Hello World!!!');
})

app.get('/api/courses',(req,res)=>{
    res.send(courses);
})

app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course){
        res.status(404).send('Given Course was not found');
    }
    res.send(course);
})

app.post('/api/courses/', (req,res) =>{



    const result = validateCourse(req.body);
    
    if (result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }



    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);

})

app.put('/api/courses/:id',(req,res) =>{
    //get the course
    //If not existing , return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course){
        res.status(404).send('Given Course was not found');
    }

    //Validate
    //Return 400 for invalid
    const result = validateCourse(req.body);
    
    if (result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //Update course
    course.name = req.body.name;
    //Return Updated
    res.send(course);

})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course,schema);
}



/* app.get('/api/courses/:year/:month',(req,res)=>{
    res.send(req.query);
}) */

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
});