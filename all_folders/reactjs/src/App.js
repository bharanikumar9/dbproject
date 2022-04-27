import React from "react";

import {
	BrowserRouter,
	Route,
	Routes,
} from "react-router-dom";
import Ask_question from "./ask_question";
import Main_page from "./main";
import QuestionDetails from "./QuestionDetails";
import Questions from "./questions";
import Tags from "./tags";
import Users from "./users";
import Add_User from "./User_Add";
import View_profile from "./profile";
import TagDetails from "./tagDetails";
import Login from "./Login";
export default function App() {
	return (


		<BrowserRouter>
			<div>
				<Routes>
					<Route exact path="/questions/" element={<Questions />} />
					<Route exact path="/users/" element={<Users />} />
					<Route exact path="/tags/" element={<Tags />} />
					<Route exact path="/questions/:question_id" element={<QuestionDetails />} />
					<Route exact path="/" element={<Main_page />} />
					<Route exact path="/Signup" element={<Add_User />} />
					<Route exact path="/questions/ask" element={<Ask_question />} />
					<Route exact path="/users/:user_id" element={<View_profile />} />
					<Route exact path="/tags/:tag_id" element={<TagDetails />} />
					<Route exact path="/Login" element={<Login />} />




				</Routes>
			</div>
		</BrowserRouter>
	);
}

