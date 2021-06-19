//Install express server
const express = require('express');

// new variables added
const  bodyParser = require('body-parser');
const Bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

const db = require('./models');
const Role = db.role;


db.mongoose.connect('mongodb+srv://pwmcbrid:out72put@cluster0.lz331.mongodb.net/tarkovUsers?retryWrites=true&w=majority' ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connected");
    initial();
})
.catch(err => {
    console.error("Connection error", err);
    process.exit();
});



//var authentication = require('/routes/authenticate');


const cors = require('cors');

var corsOptions = {

    // this will need to change to 8080 for the live version 
    origin: 'http://localhost:4200'
}

app.use(cors());

// parse requests of content type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content type application/json
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get("/", function(req, res){
    return res.json({ message: "Welcome to Tarkov Map Simulator" });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.use(cookieParser());

// Start the app by listening on the default Heroku port

// change port to 8080 for live version 
app.listen(process.env.PORT || 8080);
//app.listen(8080, () => console.log('Server is listening on 8080'));



function initial(){
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0){
            new Role({
                name: "user"
            }).save(err => {
                if(err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles Collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if(err){
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection")
            });

            new Role({
                name: "admin"
            }).save(err => {
                if(err){
                    console.log("error", err);
                }

                console.log("add 'admin' to roles collection");
            });
        }
    });
}