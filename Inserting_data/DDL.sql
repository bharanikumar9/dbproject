DROP TABLE IF EXISTS answer_likes;
DROP TABLE IF EXISTS question_likes;
DROP TABLE IF EXISTS question_comments;
DROP TABLE IF EXISTS answer_comments;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS tags_courses;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS users;



create table if not exists users
(
    user_id int,
    display_name text,
    password varchar(15),
    age int,
    location text,
    about varchar,
    creation_date timestamp,
    is_instructor int,
    reputation int,
    upvotes int,
    downvotes int,
    views int,
    primary key (user_id)
);

create table if not exists courses(
  course_id int primary key,
  course_name varchar,
  description varchar
);

create table if not exists tags_courses(
    tag_id int primary key ,
    tag_name text UNIQUE,
    course_id int,
    foreign key (course_id) references courses (course_id)
);


create table if not exists questions(
    question_id int,
    title text,
    body varchar,
    user_id int,
    view_count int,
    creation_date timestamp,
    upvotes int,
    downvotes int,
    tag_1 text,
    tag_2 text NULL,
    tag_3 text NULL,
    tag_4 text NULL,
    tag_5 text NULL,
    tag_6 text NULL,

    primary key(question_id),
    foreign key (user_id) references users (user_id),
    foreign key (tag_1) references tags_courses (tag_name),
    foreign key (tag_2) references tags_courses (tag_name),
    foreign key (tag_3) references tags_courses (tag_name),
    foreign key (tag_4) references tags_courses (tag_name),
    foreign key (tag_5) references tags_courses (tag_name),
    foreign key (tag_6) references tags_courses (tag_name)

);






create table if not exists answers(
    answer_id int,
    body varchar,
    user_id int,
    view_count int,
    creation_date timestamp,
    upvotes int,
    downvotes int,
    primary key(answer_id),
    foreign key (user_id) references users (user_id)
);







create table if not exists question_comments(
    comment_id int primary key,
    body varchar,
    creation_date timestamp,
    question_id int,
    user_id int,
    score int,
    foreign key (question_id) references questions (question_id),
    foreign key (user_id) references users (user_id)
);

create table if not exists answer_comments(

    comment_id int primary key,
    body varchar,
    creation_date timestamp,
    answer_id int,
    user_id int,
    score int,
    foreign key (answer_id) references answers (answer_id),
    foreign key (user_id) references users (user_id)
);


create table if not exists question_likes(

    like_type int,
    question_id int,
    user_id int,

    foreign key (question_id) references answers (question_id),
    foreign key (user_id) references users (user_id),
);

create table if not exists answer_likes(

    like_type int,
    answer_id int,
    user_id int,

    foreign key (answer_id) references answers (answer_id),
    foreign key (user_id) references users (user_id),
);