import React from "react";

import {
	BrowserRouter,
	Route,
	Routes,
} from "react-router-dom";

// import MatchDetails from "./MatchDetails";
// import Match from "./matches";
// import PlayerDetails from "./Player_info";
// import Pointstable from "./points_table";
// import VenueDetails from "./VenueDetails";
// import Venues from "./venues";
// import Venue_add from "./Venue_add";
import Home from "./index";
import QuestionDetails from "./QuestionDetails";
import Questions from "./questions";
import Users from "./users";
import Add_User from "./User_Add";

export default function App() {
	return (


		<BrowserRouter>
			<div>
				{/* <div>
			<button>Hi</button>
		</div> */}
				<Routes>
					<Route exact path="/questions/" element={<Questions />} />
					<Route exact path="/users/" element={<Users />} />
					<Route exact path="/questions/:question_id" element={<QuestionDetails />} />
					{/* <Route exact path="/signup/" element={<AddUser />} /> */}
					<Route exact path="/" element={<Home />} />
					<Route exact path="/Signup" element={<Add_User />} />



				</Routes>
			</div>
		</BrowserRouter>
	);
}

