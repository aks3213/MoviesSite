const express=require('express');

const cors = require('cors');
const  {mongoose}=require('./db/mongoose');

const bodyParser=require('body-parser');

const {Movie,User}=require('./db/models');
const jwt = require('jsonwebtoken');
const app=express();

app.use(cors())
app.options('*', cors())

//middleware
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
  });
//request is valid??
let authenticate = (req, res, next) => {
    //console.log("in");
    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        //console.log("in in");

        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            //console.log("in 3");

            res.status(401).send(err);
        } else {
            // jwt is valid
            //console.log("in 2");
            req.user_id = decoded._id;
            next();
        }
    });
}

let authenticateAdmin = (req, res, next) => {
    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.user_id = decoded._id;
            User.findOne({_id:  req.user_id}).then(function(user){
                // Do something with the user
                if(user.admin){
                    console.log("good to go");
                    next();
                }else{
                    res.status(401).send("not admin");
                }
            });
        }
    });
}

let verifySession = (req, res, next) => {
    // grab the refresh token from the request header
    let refreshToken = req.header('x-refresh-token');

    // grab the _id from the request header
    let _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            // user couldn't be found
            return Promise.reject({
                'error': 'User not found. Make sure that the refresh token and user id are correct'
            });
        }


        // if the code reaches here - the user was found
        // therefore the refresh token exists in the database - but we still have to check if it has expired or not

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                // check if the session has expired
                if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    // refresh token has not expired
                    isSessionValid = true;
                }
            }
        });

        if (isSessionValid) {
            // the session is VALID - call next() to continue with processing this web request
            next();
        } else {
            // the session is not valid
            return Promise.reject({
                'error': 'Refresh token has expired or the session is invalid'
            })
        }

    }).catch((e) => {
        res.status(401).send(e);
    })
}


/* route handlers */
app.get('/movies',authenticate , (req,res)=>{
    Movie.find({}).then((movies)=>{
        res.send(movies);
    }).catch((e)=>{
        res.send(e);
    });
});
app.get('/admovies',authenticateAdmin , (req,res)=>{
    Movie.find({}).then((movies)=>{
        res.send(movies);
    }).catch((e)=>{
        res.send(e);
    });
});
app.get('/movies/:id',authenticate , (req,res)=>{
    let id=req.params.id;
    Movie.findById(id).then((movies)=>{
        res.send(movies);
        console.log("send");
    }).catch((e)=>{
        res.send(e);
    });
});
app.get('/genre/:genre',authenticate , (req,res)=>{
    let genre=req.params.genre;
    Movie.find({"genre":genre}).then((movies)=>{
        res.send(movies);
    }).catch((e)=>{
        res.send(e);
    });
});
app.get('/quality/:quality',authenticate , (req,res)=>{
    let quality=req.params.quality;
    console.log(quality);
    Movie.find({"quality":quality}).then((movies)=>{
        res.send(movies);
    }).catch((e)=>{
        res.send(e);
    });
});
app.get('/size/:size',authenticate , (req,res)=>{
    let size=parseFloat(req.params.size);
    
    let lower=size-0.15;
    let higher=size+0.15;
    console.log(lower," ",higher);
    Movie.find({"size":{$gt:lower,$lt:higher}}).then((movies)=>{
        res.send(movies);
    }).catch((e)=>{
        res.send(e);
    });
});

app.post('/movies',authenticateAdmin,(req,res)=>{
    
    let newMovie=new Movie(req.body);

    console.log(newMovie);

    newMovie.save().then((movieDoc)=>{
        res.send(movieDoc);
    });
});

app.get('/',( req, res )=>{
    res.send("hello");
});

app.patch('/movies/:id',authenticateAdmin,(req,res)=>{
    Movie.findOneAndUpdate({_id:req.params.id},{
        $set:req.body
    }).then(()=>{
        res.sendStatus(200);
    });
});

app.delete('/movies/:id',authenticateAdmin,(req,res)=>{
    console.log("before");
    Movie.findOneAndRemove({
        _id:req.params.id
    }).then((removedMovieDoc)=>{
        res.send(removedMovieDoc);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/users', (req, res) => {
    // User sign up

    let body = req.body;
    let newUser = new User(body);
    //console.log(req.body)

    newUser.save().then(() => {
        console.log("created")
        return newUser.createSession();
    }).then((refreshToken) => {
        // Session created successfully - refreshToken returned.
        // now we geneate an access auth token for the user

        return newUser.generateAccessAuthToken().then((accessToken) => {
            // access auth token generated successfully, now we return an object containing the auth tokens
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
            console.log("---")
    }).catch((e) => {
        res.status(400).send(e);
        console.log(e.message)
    })
})

app.post('/users/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user

            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
})

app.post('/admins/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let admin=req.params.admin;

    User.findAdminByCredentials(email, password, admin).then((user) => {
        return user.createSession().then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user

            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
})

app.get('/users/me/access-token', verifySession, (req, res) => {
    // we know that the user/caller is authenticated and we have the user_id and user object available to us
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    });
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/users',authenticateAdmin , (req,res)=>{
    User.find({}).then((users)=>{
        res.send(users);
    }).catch((e)=>{
        res.send(e);
    });
});

app.delete('/user/:id',authenticateAdmin,(req,res)=>{
    // console.log("before");
     User.findOneAndRemove({
         _id:req.params.id
     }).then((removedUserDoc)=>{
         res.send(removedUserDoc);
     });
 });


app.listen(3000, () =>{
    console.log("server running:3000");
})