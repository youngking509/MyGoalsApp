// [ ] I want to be able to click on each month and see my goals
// [ ]
// [ ] I want to be able to edit or delete a goal
// [ ] I want to style the app 
// [ ]
// [ ]
// [ ]
// [ ]
// [ ]
// [ ]

// require our dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require("method-override")
const Goal = require('./models/goal');


const app = express();

require('dotenv').config();

const { PORT = 3000, DATABASE_URL } = process.env;

mongoose.connect(DATABASE_URL);

const db = mongoose.connection;

db
.on('connected', () => console.log(`Connected to MongoDB on ${db.host}:${db.port}`))
.on('disconnected', () => console.log(`Disconnected from MongoDB`))
.on('error', (err) => console.log(`MongoDB Error: ${err.message}`));

// Middleware
app.use(methodOverride("_method"))
// app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// public css
app.use('/public', express.static('public'))



// ROUTES

// Index Route
app.get('/goal', (req, res) => {
    Goal.find({}, (err, goal) => {
        res.render('index.ejs', { goal });
    })
})


// new route
app.get('/new', (req, res) => {
    res.render('new.ejs');
});



// delete route
// booksRouter.delete('/books/:id', (req, res) => {
//     res.send('deleting...')
// })
app.delete('/goal/:id', (req, res) => {
    Goal.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/goal')
    })
});
 


// update route
app.put("/goal/:id", (req, res) => {
    // res.send(req.body)
    Goal.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedBook) => {
          res.redirect(`/goal/${req.params.id}`)
        }
      )
})


// create route
app.post('/goal', (req, res) => {
    Goal.create(req.body, (err, goal) => {
        res.redirect('/goal');
    });
});

// edit route
app.get("/goal/:id/edit", (req, res) => {
    Goal.findById(req.params.id, (error, foundGoal) => {
      res.render("edit.ejs", {
        goal: foundGoal,
      })
    })
})



//  show route
app.get("/goal/:id", (req, res) => {
	Goal.findById(req.params.id, (err, goal) => {
		res.render("show.ejs", { goal });
	});
});





// tell the server to listen for requests from the client
app.listen(PORT, () =>{
    console.log('express is listening on port:' + PORT);
})