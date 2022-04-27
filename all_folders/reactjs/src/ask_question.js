import React, { createRef } from "react";
import Home from ".";
import parse from 'html-react-parser'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Ask_question extends React.Component {

    // async componentDidMount() {
    //     fetch(`http://localhost:5000/`)
    //         .then((res) => res.json())
    //         .then((json) => {
    //             this.setState({
    //                 DataisLoaded: true,
    //                 items: json
    //             });
    //         })
    // }


    render() {


        return (
            <div>
                <Home />
                <div className="container-body">


                </div>

                <style jsx>{`
				

				

				h1,h2,h3,h4{
					text-align: center;
				}

                .container-body{
                    padding-left: 0px;
                    padding-top: 60px;
                    // position: fixed;
                    z-index: 10;
                    // box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1)
                }

				main{
					text-align: center;
					z-index: 1;
				}
                a{
                    text-decoration: none;
                }
				left {
					z-index: 2;
					background-color: rgb(179, 179, 179);
					position:fixed;
					left: 10px;
					bottom: 20px;
				}
				right {
					z-index: 2;
					background-color: rgb(179, 179, 179);
					position:fixed;
					right: 10px;
					bottom: 20px;
				}
		
				.btn:hover {
					color: black;
				}
				`}</style>

            </div>
        );
    }
}

export default Ask_question;
