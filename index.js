const Joi = require('joi');
const express = require ('express');
const app = express();
//middleware
app.use(express.json());

const courses = [
    {id: 1, name: 'courses1'},
]
app.get('/', (req, res) =>{
    res.send('Hello Word');
});

app.get('/api/courses', (req, res) => {
    res.send([courses]);

});

app.get('/api/courses/:id', (req,res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id ));
  if (!course) return res.status (404).send('The course with the given ID was not found')
  res.send(course);

  //404 means object not found 
});

app.post('/api/courses', (req,res) => {
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id:courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);

});
app.put('/api/courses/:id', (req, res =>) {
    // look up course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('error') 
    ///if not there return 404
    
    //validate
    
    //if invalid reurn 400 error
   
   const { error }= validateCourse(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);
    return;    }
    //update course
    course.name = req.body.name;
    
    //return the updated course
    res.send(course);
    });


    app.delete('/api/courses/:id', (req, res) => {
     const index = courses.indexOf(course);
     courses.splice(index, 1);

     res.send(course);
    });

    function validateCourse(course) {
        const schema = {
            name: Joi.string().min(3).required()
        };
       return Joi.validate(course, schema);

    }




//PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log (`listening on port ${port}`));


