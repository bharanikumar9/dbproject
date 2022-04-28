const express = require("express");
const cors = require("cors");
require('dotenv').config({ path: __dirname + '/dbproj.env' })

const session = require('express-session')




const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

PGHOST = process.env.host
PGUSER = process.env.username
PGDATABASE = process.env.dbname
PGPASSWORD = process.env.password
PGPORT = process.env.port

// pg init and config
const { Client } = require('pg')
const conObject = {
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT,
}

const client = new Client(conObject)
client.connect()

// session store and session config
const store = new (require('connect-pg-simple')(session))({
    pool: client
})



app.use(
    session({
        store: store,
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            secure: false,
            httpOnly: false,
            sameSite: false,
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
)

// user_id,display_name,password,age,location,about,creation_date,is_instructor,reputation,upvotes,downvotes,views

app.post('/register', async (req, res) => {
    const { display_name, password, age, location, about, creation_date, is_instructor, reputation, upvotes, downvotes, views } = req.query

    if (
        display_name == null ||
        age == null ||
        password == null ||
        is_instructor == null
    ) {
        console.error(req.query)
        return res.sendStatus(403)
    }

    try {
        // const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        const data = await client.query(
            `INSERT INTO users (display_name, password, age, location, about, creation_date, is_instructor, reputation, upvotes, downvotes, views
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
            [display_name, password, age, location, about, creation_date, is_instructor, reputation, upvotes, downvotes, views]
        )

        if (data.rows.length === 0) {
            res.sendStatus(403)
        }
        const user = data.rows[0]

        req.session.user = {
            user_id: user.user_id,
            display_name: user.display_name,
        }

        res.status(200)
        return res.json({ user: req.session.user })
    } catch (e) {
        console.error(e)
        return res.sendStatus(403)
    }
});

app.post('/login', async (req, res) => {
    const { display_name, password } = req.query

    if (display_name == null || password == null) {
        return res.sendStatus(403)
    }

    try {
        const data = await client.query(
            'SELECT display_name, password FROM users WHERE display_name = $1',
            [display_name]
        )

        if (data.rows.length === 0) {
            return res.sendStatus(403)
        }
        const user = data.rows[0]

        // const matches = bcrypt.compareSync(password, user.password)
        // if (!matches) {
        //     return res.sendStatus(403)
        // }

        req.session.user = {
            id: user.id,
            display_name: user.display_name,
        }

        res.status(200)
        return res.json({ user: req.session.user })
    } catch (e) {
        console.error(e)
        return res.sendStatus(403)
    }
});


app.post('/logout', async (req, res) => {
    try {
        await req.session.destroy()
        return res.sendStatus(200)
    } catch (e) {
        console.error(e)
        return res.sendStatus(500)
    }
});

app.get("/questions/:offset/:limit", async (req, res) => {
    try {
        const { offset, limit } = req.params;
        const allTodos = await client.query(`SELECT questions.question_id,questions.title, questions.body, users.display_name, 
        questions.creation_date, questions.tag_1, questions.tag_2, questions.tag_3, questions.tag_4,
        questions.tag_5, questions.tag_6, questions.upvotes, questions.downvotes from questions,users 
        where questions.user_id = users.user_id ORDER BY view_count DESC,upvotes DESC, downvotes ASC
        OFFSET $1 LIMIT $2`
            , [offset, limit]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});


app.get("/recentquestions/:offset/:limit", async (req, res) => {
    try {
        const { offset, limit } = req.params;
        const allTodos = await client.query(`SELECT questions.question_id,questions.title, questions.body, users.display_name, 
        questions.creation_date, questions.tag_1, questions.tag_2, questions.tag_3, questions.tag_4,
        questions.tag_5, questions.tag_6, questions.upvotes, questions.downvotes from questions,users 
        where questions.user_id = users.user_id ORDER BY creation_date ASC, view_count DESC,upvotes DESC, downvotes ASC
        OFFSET $1 LIMIT $2`
            , [offset, limit]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/topusers/:offset/:limit", async (req, res) => {
    try {
        const { offset, limit } = req.params;
        const allTodos = await client.query(`SELECT * from users
        ORDER BY views DESC, reputation DESC 
        OFFSET $1 LIMIT $2`
            , [offset, limit]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/toptags/:offset/:limit", async (req, res) => {
    try {
        const { offset, limit } = req.params;
        const allTodos = await client.query(`select tag_id, tag_name,course_id, count(tag_name) from tags_courses,questions where 
        (tag_1 = tag_name or tag_2 = tag_name or tag_3 = tag_name or tag_4 = tag_name or tag_5 = tag_name or tag_6 = tag_name) 
        group by tag_id,tag_name,course_id order by count(tag_name) DESC
        OFFSET $1 LIMIT $2`
            , [offset, limit]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});





app.get("/users/:offset/:limit", async (req, res) => {
    try {
        const { offset, limit } = req.params;
        const allTodos = await client.query(`SELECT users.user_id, users.display_name, users.reputation,
        users.is_instructor,substring(CAST(creation_date as varchar),0,11) as date from users ORDER BY views DESC        
        OFFSET $1 LIMIT $2`
            , [offset, limit]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/questions/:question_id", async (req, res) => {
    try {
        const { question_id } = req.params;
        const allTodos = await client.query(`SELECT questions.title, questions.body, users.display_name, 
        questions.creation_date, questions.tag_1, questions.tag_2, questions.tag_3, questions.tag_4,
        questions.tag_5, questions.tag_6, questions.upvotes, questions.downvotes from questions,users 
        where question_id = $1 and questions.user_id = users.user_id
        `
            , [question_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});


app.get("/answers/:question_id", async (req, res) => {
    try {
        const { question_id } = req.params;
        const allTodos = await client.query(`SELECT  answers.answer_id , answers.question_id , users.display_name ,  body  ,answers.user_id ,  answers.creation_date, answers.upvotes ,answers.downvotes  from answers , users
        where  question_id = $1  and users.user_id = answers.user_id order by upvotes`
            , [question_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});


app.get("/comments/:question_id", async (req, res) => {
    try {
        const { question_id } = req.params;
        const allTodos = await client.query(` select display_name, comment_id ,answer_id , score ,  body  ,users.user_id ,  a.creation_date , display_name from users, ( SELECT  comment_id ,answer_id , score ,  body  ,user_id ,  creation_date  from answer_comments where answer_id in  (select answer_id from answers where question_id = $1)
       ) a where a.user_id = users.user_id order by answer_id,creation_date`
            , [question_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/user/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const allTodos = await client.query(`SELECT *,substring(CAST(creation_date as varchar),0,11) as date from users where users.user_id = $1`
            , [user_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});



app.get("/tags/:offset/:limit", async (req, res) => {
    try {
        const { offset, limit } = req.params;

        const allTodos = await client.query(`select tag_id, tag_name,course_id, count(tag_name) from tags_courses,questions where 
        (tag_1 = tag_name or tag_2 = tag_name or tag_3 = tag_name or tag_4 = tag_name or tag_5 = tag_name or tag_6 = tag_name) 
        group by tag_id,tag_name,course_id order by count(tag_name) DESC
        OFFSET $1 LIMIT $2`
            , [offset, limit]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});


app.get("/user_tags/:user_id", async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const allTodos = await client.query(`SELECT tag_name,tag_id, count(*) as counts FROM tags_courses,questions WHERE tag_name in (questions.tag_1,questions.tag_2,questions.tag_3,questions.tag_4,questions.tag_5,questions.tag_6) AND questions.user_id = $1 GROUP BY tag_name,tag_id ORDER BY counts desc limit 5;`, [user_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/user_questions/:user_id", async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const allTodos = await client.query(`SELECT * from questions where user_id=$1 order by view_count desc limit 5;`, [user_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});


var server = app.listen(5000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Discussion Forum app listening at http://%s:%s", host, port)
})

module.exports = app;