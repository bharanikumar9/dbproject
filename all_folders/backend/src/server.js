const express = require("express");
const cors = require("cors");
require('dotenv').config({ path: __dirname + '/dbproj.env' })

const session = require('express-session')

const app = express();
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
        credentials: true,
    })
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    multipleStatements: true
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
            originalMaxAge: 60 * 60 * 1000,
        },
    })
)

// user_id,display_name,password,age,location,about,creation_date,is_instructor,reputation,upvotes,downvotes,views

app.post('/register', async (req, res) => {
    const { display_name, password, age, location, about, is_instructor, reputation, upvotes, downvotes, views } = req.body


    // console.log(req)

    if (
        display_name == null ||
        age == null ||
        password == null ||
        is_instructor == null
    ) {
        // console.error(req.body)
        return res.sendStatus(403)
    }


    try {
        // const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        const data = await client.query(
            `INSERT INTO users (display_name, password, age, location, about, is_instructor, reputation, upvotes, downvotes, views
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [display_name, password, age, location, about, is_instructor, reputation, upvotes, downvotes, views]
        )
        console.log(data)
        if (data.rows.length === 0) {

            res.sendStatus(400)
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
    const { username, password } = req.body
    console.log(req.body)
    if (username == null || password == null) {
        return res.sendStatus(403)
    }

    try {
        const data = await client.query(
            'SELECT user_id, display_name FROM users WHERE display_name = $1',
            [username]
        )

        if (data.rows.length === 0) {
            return res.sendStatus(403)
        }
        const user = data.rows[0]


        console.log("user login successful")


        console.log(user)

        // const matches = bcrypt.compareSync(password, user.password)
        // if (!matches) {
        //     return res.sendStatus(403)
        // }

        req.session.user = {
            user_id: user.user_id,
            display_name: user.display_name,
        }
        console.log("session create successful")

        res.status(200)
        return res.json({ user: req.session.user })
    } catch (e) {
        console.error(e)
        return res.sendStatus(403)
    }
});


app.post('/logout', async (req, res) => {

    // const { display_name } = req.body
    // if (display_name == null) {
    //     return res.sendStatus(403)
    // }



    try {
        await req.session.destroy()
        console.log("logout user successful")
        console.log(req.session.user)
        return res.sendStatus(200)
    } catch (e) {
        console.log("logout user failed")
        console.error(e)
        return res.sendStatus(500)
    }
});
app.get('/fetch-user', async (req, res) => {

    if (req.sessionID && req.session.user) {
        console.log(req.session.user)
        console.log("fetch user successful")
        res.status(200)
        return res.json([req.session.user])
    }
    return res.sendStatus(403)
})
app.get("/questions/:offset/:limit", async (req, res) => {
    try {
        const { offset, limit } = req.params;
        const allTodos = await client.query(`SELECT questions.question_id,questions.title, questions.body, users.display_name, 
        substring(CAST(questions.creation_date as varchar),0,11) as date, questions.tag_1, questions.tag_2, questions.tag_3, questions.tag_4,
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
        substring(CAST(questions.creation_date as varchar),0,11) as date, questions.tag_1, questions.tag_2, questions.tag_3, questions.tag_4,
        questions.tag_5, questions.tag_6, questions.upvotes, questions.downvotes from questions,users 
        where questions.user_id = users.user_id ORDER BY date DESC, view_count DESC,upvotes DESC, downvotes ASC
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
        const allTodos = await client.query(`SELECT *,substring(CAST(users.creation_date as varchar),0,11) as date from users
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
        substring(CAST(questions.creation_date as varchar),0,11) as date, questions.tag_1, questions.tag_2, questions.tag_3, questions.tag_4,
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
        const allTodos = await client.query(`SELECT  answers.answer_id , answers.question_id , users.display_name ,  body  ,answers.user_id ,  substring(CAST(answers.creation_date as varchar),0,11) as date, answers.upvotes ,answers.downvotes  from answers , users
        where  question_id = $1  and users.user_id = answers.user_id order by upvotes`
            , [question_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});


app.get("/questioncomments/:question_id", async (req, res) => {
    try {
        const { question_id } = req.params;
        const allTodos = await client.query(` 
        select substring(CAST(question_comments.creation_date as varchar),0,11) as date, 
        body, users.user_id, users.display_name from question_comments, users
        where question_comments.question_id = $1 and users.user_id = question_comments.user_id order by date ASC`
            , [question_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/answercomments/:question_id", async (req, res) => {
    try {
        const { question_id } = req.params;
        const allTodos = await client.query(` 
        with t1 as (select answer_id from answers where question_id = $1)
        select t1.answer_id, substring(CAST(answer_comments.creation_date as varchar),0,11) as date, 
        body, users.user_id, users.display_name from answer_comments, users, t1 
        where answer_comments.answer_id = t1.answer_id and users.user_id = answer_comments.user_id order by date ASC`
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
        const addtoviewcount = await client.query(`UPDATE users SET views = views + 1  where users.user_id = $1`
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


app.get("/tags/:tag_id", async (req, res) => {
    try {
        const tag_id = req.params.tag_id;

        const allTodos = await client.query(`SELECT questions.title,questions.question_id,questions.upvotes,questions.downvotes,questions.view_count,questions.creation_date,questions.user_id, users.display_name from questions,tags_courses,users where tags_courses.tag_id= $1 and questions.user_id=users.user_id and tag_name in (tag_1,tag_2,tag_3,tag_4,tag_5);`, [tag_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/tagname/:tag_name", async (req, res) => {
    try {
        const tag_name = req.params.tag_name;

        const allTodos = await client.query(`SELECT questions.title,questions.question_id,questions.upvotes,questions.downvotes,
        questions.view_count,questions.creation_date,questions.user_id, users.display_name from questions,tags_courses,users
        where tags_courses.tag_name = $1 and questions.user_id=users.user_id and tag_name in (tag_1,tag_2,tag_3,tag_4,tag_5,tag_6)`
            , [tag_name]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/tags1/:tag_id", async (req, res) => {
    try {
        const tag_id = req.params.tag_id;

        const allTodos = await client.query(`select tag_name from tags_courses where tag_id=$1`, [tag_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/tagname1/:tag_name", async (req, res) => {
    try {
        const tag_name = req.params.tag_name;

        const allTodos = await client.query(`select tag_name from tags_courses where tag_name=$1`, [tag_name]);
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


/* 

user_posted_question - token(user_id), question_title, question_body, tags


*/

app.post('/user_posted_question', async (req, res) => {
    let { title, body, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6 } = req.body
    console.log(req.body)

    if (tag_1 == null || title == null || body == null) {
        return res.sendStatus(403)
    }
    if(tag_2 == "" ) tag_2 = null
    if(tag_3 == "" ) tag_3 = null
    if(tag_4 == "" ) tag_4 = null
    if(tag_5 == "" ) tag_5 = null
    if(tag_6 == "" ) tag_6 = null


    // question_id,title,body,user_id,view_count,creation_date,upvotes,downvotes,tag_1,tag_2,tag_3,tag_4,tag_5,tag_6
    // view_count = 0 , upvotes = 0, downvotes = 0, 
    try {
        const data = await client.query(
            `INSERT INTO questions (title, body, user_id, view_count, upvotes, downvotes,tag_1,tag_2,tag_3,tag_4,tag_5,tag_6
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
            [title, body, req.session.user.user_id, 0, 0, 0, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6]
        )

        if (data.rows.length === 0) {
            return res.sendStatus(403)
        }
        console.log("question insert successful")
        console.log(data.rows[0])

        res.status(200)
        return res.json({ data: data })
    } catch (e) {
        console.error(e)
        return res.sendStatus(403)
    }
    finally {
        const changereputation = await client.query(
            `UPDATE users SET reputation = reputation + 100 where users.user_id = $1 
            `,
            [req.session.user.user_id]
        )
    }
});






/*


user_answered_question - question_id, user_id, answer,


*/
// answer_id,question_id,user_display_name,body,user_id,view_count,creation_date,upvotes,downvotes


app.post('/user_answered_question', async (req, res) => {
    const { question_id, body } = req.body
    console.log(req.session.user)

    if (!(req.sessionID && req.session.user)) {
        console.log("no user")
        return res.sendStatus(403)
    }
    if (body == null || question_id == null) {
        return res.sendStatus(403)
    }

    try {
        const data = await client.query(
            `INSERT INTO answers (question_id,display_name,body,user_id,view_count,upvotes,downvotes
                ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [question_id, req.session.user.display_name, body, req.session.user.user_id, 0, 0, 0]
        )

        if (data.rows.length === 0) {
            return res.sendStatus(403)
        }
        console.log("answer insert successful")
        console.log(data.rows[0])

        res.status(200)
        return res.json({ data: data })
    } catch (e) {
        console.error(e)
        return res.sendStatus(403)
    }
    finally {
        const changereputation = await client.query(
            `UPDATE users SET reputation = reputation + 50 where users.user_id = $1 
            `,
            [req.session.user.user_id]
        )
    }
});



/*
user_commented_question - question_id, user_id, comment,


*/


// comment_id,body,creation_date,question_id,user_id,score


app.post('/user_commented_question', async (req, res) => {
    const { question_id, body } = req.body
    console.log(req.body)

    if (body == null || question_id == null) {
        return res.sendStatus(403)
    }

    try {
        const data = await client.query(
            `INSERT INTO question_comments (body,question_id,user_id,score
                ) VALUES ($1, $2, $3, $4) RETURNING *`,
            [body, question_id, req.session.user.user_id, 0]
        )

        if (data.rows.length === 0) {
            return res.sendStatus(403)
        }
        console.log("comment for question insert successful")
        console.log(data.rows[0])

        res.status(200)
        return res.json({ data: data })
    } catch (e) {
        console.error(e)
        return res.sendStatus(403)
    }
    finally {
        const changereputation = await client.query(
            `UPDATE users SET reputation = reputation + 10 where users.user_id = $1 
            `,
            [req.session.user.user_id]
        )
    }

});






/*
user_commented_answer - answer_id, user_id, comment,
comment_id,body,creation_date,answer_id,user_id,score

*/

app.post('/user_commented_answer', async (req, res) => {
    const { answer_id, body } = req.body
    console.log(req.body)

    if (body == null || answer_id == null) {
        return res.sendStatus(403)
    }

    try {
        const data = await client.query(
            `INSERT INTO answer_comments (body,answer_id,user_id,score
                ) VALUES ($1, $2, $3, $4) RETURNING *`,
            [body, answer_id, req.session.user.user_id, 0]
        )

        if (data.rows.length === 0) {
            return res.sendStatus(403)
        }
        console.log("comment for answer insert successful")
        console.log(data.rows[0])

        res.status(200)
        return res.json({ data: data })
    } catch (e) {
        console.error(e)
        return res.sendStatus(403)
    }
    finally {
        const changereputation = await client.query(
            `UPDATE users SET reputation = reputation + 10 where users.user_id = $1 
            `,
            [req.session.user.user_id]
        )
    }
});


/*
user_liked_question - question_id, like_type, user_id
user_liked_answer - answer_id, like_type, user_id


*/

// like_type,answer_id,user_id



app.post('/user_liked_question', async (req, res) => {
    const { question_id, like_type } = req.body
    console.log(req.body)

    if (like_type == null || question_id == null) {
        return res.sendStatus(403)
    }

    try {
        const data = await client.query(
            `INSERT INTO question_likes (like_type,question_id,user_id
                ) VALUES ($1, $2, $3) RETURNING *`,
            [like_type, question_id, req.session.user.user_id]
        )
        if (data.rows.length === 0) {
            console.log("vote question insert failed")
            return res.sendStatus(403)
        }
        console.log("vote for question add successful")
        console.log(data.rows[0])

        res.status(200)
        return res.json({ data: data })
    } catch (e) {
        console.error(e)
        return res.sendStatus(403)
    }
    finally {
        const votechange = await client.query(
            `UPDATE questions SET upvotes = CASE WHEN $2 = 1 THEN upvotes + 1 ELSE upvotes END,
            downvotes = CASE WHEN $2 = 0 THEN downvotes + 1 ELSE downvotes END
            where questions.question_id = $1;
            `,
            [question_id, like_type]
        )
        const changereputation = await client.query(
            `UPDATE users SET reputation = CASE WHEN $2 = 1 THEN reputation + 1 ELSE reputation - 1 END 
            from questions where questions.question_id = $1 and users.user_id = questions.user_id;
            `,
            [question_id, like_type]
        )
    }
});



app.post('/user_liked_answer', async (req, res) => {
    const { answer_id, like_type } = req.body
    console.log(req.body)

    if (like_type == null || answer_id == null) {
        return res.sendStatus(403)
    }

    try {
        const data = await client.query(
            `INSERT INTO answer_likes (like_type,answer_id,user_id
                ) VALUES ($1, $2, $3) RETURNING *`,
            [like_type, answer_id, req.session.user.user_id]
        )


        if (data.rows.length === 0) {
            console.log("vote question insert failed")
            return res.sendStatus(403)
        }
        console.log("vote for answer add successful")
        console.log(data.rows[0])

        res.status(200)
        return res.json({ data: data })
    } catch (e) {
        console.error(e)
        return res.sendStatus(403)
    }
    finally {
        const votechange = await client.query(
            `UPDATE answers SET upvotes = CASE WHEN $2 = 1 THEN upvotes + 1 ELSE upvotes END,
            downvotes = CASE WHEN $2 = 0 THEN downvotes + 1 ELSE downvotes END
            where answers.answer_id = $1;
            `,
            [answer_id, like_type]
        )
        const changereputation = await client.query(
            `UPDATE users SET reputation = CASE WHEN $2 = 1 THEN reputation + 1 ELSE reputation - 1 END 
            from answers where answers.answer_id = $1 and users.user_id = answers.user_id;
            `,
            [answer_id, like_type]
        )
    }
});

app.get("/user_liked_questions/:question_id", async (req, res) => {

    const question_id = req.params.question_id;

    try {
        const data = await client.query(
            `SELECT like_type from question_likes where user_id=$1 and question_id = $2;`,
            [req.session.user.user_id, question_id,]
        )
        res.json(data.rows);

    } catch (e) {
        console.error(e)
    }
});


app.get("/user_liked_answers/:question_id", async (req, res) => {

    const question_id = req.params.question_id;
    try {
        const data = await client.query(
            `SELECT like_type,answer_id from answer_likes where user_id=$1 and answer_id in (select answer_id from answers where question_id = $2);`,
            [req.session.user.user_id, question_id,]
        )
        res.json(data.rows);

    } catch (e) {
        console.error(e)
    }
});

app.get("/tags", async (req, res) => {
    try {
        const allTodos = await client.query(`SELECT tag_name from tags_courses;`)
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