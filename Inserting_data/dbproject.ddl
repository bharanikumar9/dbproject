--
-- PostgreSQL database dump
--

-- Dumped from database version 10.15 (Ubuntu 10.15-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.15 (Ubuntu 10.15-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: answer_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.answer_comments (
    comment_id integer NOT NULL,
    body character varying,
    creation_date timestamp without time zone,
    answer_id integer,
    user_id integer,
    score integer
);


ALTER TABLE public.answer_comments OWNER TO postgres;

--
-- Name: answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.answers (
    answer_id integer NOT NULL, 
       parent_id integer,
       display_name character varying,
        body character varying,
    user_id integer,
    view_count integer,
    creation_date timestamp without time zone,
    upvotes integer,
    downvotes integer
);


ALTER TABLE public.answers OWNER TO postgres;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    course_id integer NOT NULL,
    course_name character varying,
    description character varying
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- Name: question_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.question_comments (
    comment_id integer NOT NULL,
    body character varying,
    creation_date timestamp without time zone,
    question_id integer,
    user_id integer,
    score integer
);


ALTER TABLE public.question_comments OWNER TO postgres;

--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    question_id integer NOT NULL,
    title text,
    body character varying,
    user_id integer,
    view_count integer,
    creation_date timestamp without time zone,
    upvotes integer,
    downvotes integer,
    tag_1 text,
    tag_2 text,
    tag_3 text,
    tag_4 text,
    tag_5 text,
    tag_6 text
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: tags_courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags_courses (
    tag_id integer NOT NULL,
    tag_name text,
    course_id integer
);


ALTER TABLE public.tags_courses OWNER TO postgres;

--
-- Name: temp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.temp (
    id character varying
);


ALTER TABLE public.temp OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    display_name text,
    password character varying(15),
    age integer,
    location text,
    about character varying,
    creation_date timestamp without time zone,
    is_instructor integer,
    reputation integer,
    upvotes integer,
    downvotes integer,
    views integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: answer_comments answer_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answer_comments
    ADD CONSTRAINT answer_comments_pkey PRIMARY KEY (comment_id);


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (answer_id);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (course_id);


--
-- Name: question_comments question_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_comments
    ADD CONSTRAINT question_comments_pkey PRIMARY KEY (comment_id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (question_id);


--
-- Name: tags_courses tags_courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags_courses
    ADD CONSTRAINT tags_courses_pkey PRIMARY KEY (tag_id);


--
-- Name: tags_courses tags_courses_tag_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags_courses
    ADD CONSTRAINT tags_courses_tag_name_key UNIQUE (tag_name);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: answer_comments answer_comments_answer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answer_comments
    ADD CONSTRAINT answer_comments_answer_id_fkey FOREIGN KEY (answer_id) REFERENCES public.answers(answer_id);


--
-- Name: answer_comments answer_comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answer_comments
    ADD CONSTRAINT answer_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: answers answers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.questions(question_id);


--
-- Name: question_comments question_comments_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_comments
    ADD CONSTRAINT question_comments_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(question_id);


--
-- Name: question_comments question_comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_comments
    ADD CONSTRAINT question_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: questions questions_tag_1_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_tag_1_fkey FOREIGN KEY (tag_1) REFERENCES public.tags_courses(tag_name);


--
-- Name: questions questions_tag_2_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_tag_2_fkey FOREIGN KEY (tag_2) REFERENCES public.tags_courses(tag_name);


--
-- Name: questions questions_tag_3_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_tag_3_fkey FOREIGN KEY (tag_3) REFERENCES public.tags_courses(tag_name);


--
-- Name: questions questions_tag_4_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_tag_4_fkey FOREIGN KEY (tag_4) REFERENCES public.tags_courses(tag_name);


--
-- Name: questions questions_tag_5_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_tag_5_fkey FOREIGN KEY (tag_5) REFERENCES public.tags_courses(tag_name);


--
-- Name: questions questions_tag_6_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_tag_6_fkey FOREIGN KEY (tag_6) REFERENCES public.tags_courses(tag_name);


--
-- Name: questions questions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: tags_courses tags_courses_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags_courses
    ADD CONSTRAINT tags_courses_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(course_id);


--
-- PostgreSQL database dump complete
--

