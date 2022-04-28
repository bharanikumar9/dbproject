import App from './App'
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Home from '.';
import parse from 'html-react-parser'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'



function Main_page() {
  const fetchdata = async (api) => {
    const res = await fetch(api)
    const json = await res.json();
    return json
  }


  const [topquestions, setTopquestions] = useState([{}]);
  const [recentquestions, setRecentquestions] = useState([{}]);
  const [topusers, setTopUsers] = useState([{}]);
  const [toptags, setTopTags] = useState([{}]);
  const [value, setValue] = useState([1]);
  const [displayinfo, setDisplayinfo] = useState([{}]);



  useEffect(() => {
    const api1 = `http://localhost:5000/questions/0/10`;
    fetchdata(api1).then(data => {
      setTopquestions(data)
    })
    const api4 = `http://localhost:5000/recentquestions/0/10`;
    fetchdata(api4).then(data => {
      setRecentquestions(data)
    })
    const api2 = `http://localhost:5000/topusers/0/10`;
    fetchdata(api2).then(data => {
      setTopUsers(data)
    })
    const api3 = `http://localhost:5000/toptags/0/10`;
    fetchdata(api3).then(data => {
      setTopTags(data)
    })
  }, [])


  const handleChange = (val) => {
    setValue(val);

  }


  return (
    <div >


      <Home />

      <div className='container-body'>
        <ToggleButtonGroup style={{ marginLeft: '470px' }} type="radio" name="options" defaultValue={1} onChange={handleChange}>
          <ToggleButton id="tbg-radio-1" value={1}>
            Popular questions
          </ToggleButton> <h3>&nbsp;</h3>
          <ToggleButton id="tbg-radio-2" value={2}>
            Recent questions
          </ToggleButton> <h3>&nbsp;</h3>
          <ToggleButton id="tbg-radio-3" value={3}>
            Popular users
          </ToggleButton> <h3>&nbsp;</h3>
          <ToggleButton id="tbg-radio-4" value={4}>
            Popular tags
          </ToggleButton>
        </ToggleButtonGroup>



        {value == 1 ?
          (
            <div>
              {
                topquestions.map((item) => (
                  <div style={{ padding: 20 }} >

                    <Card style={{ marginLeft: '0px', marginRight: '10px' }}>
                      <Card.Body>
                        <a style={{ textDecoration: 'none' }} href={`/questions/${item.question_id}`}>
                          <Card.Title>
                            {item.title}
                          </Card.Title>
                        </a>

                        <Card.Subtitle className="mb-2 text-muted">posted on {item.creation_date} by {item.display_name}</Card.Subtitle>

                        <Button size="sm" variant="outline-info">{item.tag_1}</Button>{' '}
                        {item.tag_2 ? <Button size="sm" variant="outline-info">{item.tag_2}</Button> : null}{' '}
                        {item.tag_3 ? <Button size="sm" variant="outline-info">{item.tag_3}</Button> : null}{' '}
                        {item.tag_4 ? <Button size="sm" variant="outline-info">{item.tag_4}</Button> : null}{' '}
                        {item.tag_5 ? <Button size="sm" variant="outline-info">{item.tag_5}</Button> : null}{' '}
                        {item.tag_6 ? <Button size="sm" variant="outline-info">{item.tag_6}</Button> : null}{' '}


                        <Card.Text>
                          upvotes {item.upvotes} downvotes {item.downvotes}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              }
            </div>
          )
          : null}

        {value == 2 ?
          (
            <div>
              {
                recentquestions.map((item) => (
                  <div style={{ padding: 20 }} >

                    <Card style={{ marginLeft: '0px', marginRight: '10px' }}>
                      <Card.Body>
                        <a style={{ textDecoration: 'none' }} href={`/questions/${item.question_id}`}>
                          <Card.Title>
                            {item.title}
                          </Card.Title>
                        </a>

                        <Card.Subtitle className="mb-2 text-muted">posted on {item.creation_date} by {item.display_name}</Card.Subtitle>

                        <Button size="sm" variant="outline-info">{item.tag_1}</Button>{' '}
                        {item.tag_2 ? <Button size="sm" variant="outline-info">{item.tag_2}</Button> : null}{' '}
                        {item.tag_3 ? <Button size="sm" variant="outline-info">{item.tag_3}</Button> : null}{' '}
                        {item.tag_4 ? <Button size="sm" variant="outline-info">{item.tag_4}</Button> : null}{' '}
                        {item.tag_5 ? <Button size="sm" variant="outline-info">{item.tag_5}</Button> : null}{' '}
                        {item.tag_6 ? <Button size="sm" variant="outline-info">{item.tag_6}</Button> : null}{' '}


                        <Card.Text>
                          upvotes {item.upvotes} downvotes {item.downvotes}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              }
            </div>
          )
          : null}



        {value == 3 ?
          (
            <div>
              {
                topusers.map((item) => (
                  <div style={{ padding: 20 }} >

                    <Card style={{ marginLeft: '0px', marginRight: '10px' }}>
                      <Card.Body>
                        <a style={{ textDecoration: 'none' }} href={`/user/${item.user_id}`}>
                          <Card.Title>
                            {item.display_name}
                          </Card.Title>
                        </a>

                        <Card.Subtitle className="mb-2 text-muted">joined on {item.creation_date}</Card.Subtitle>

                        <Card.Text>
                          viewed {item.views} times <br></br>
                          Reputation {item.reputation}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              }
            </div>
          )
          : null}

        {value == 4 ?
          (
            <div>
              {
                toptags.map((item) => (
                  <div className='center' style={{ padding: 20 }} >

                    <Card style={{ marginLeft: '0px', marginRight: '10px' }}>
                      <Card.Body>
                        <a style={{ textDecoration: 'none' }} href={`/tag/${item.tag_id}`}>
                          <Card.Title>
                            {item.tag_name}
                          </Card.Title>
                        </a>

                        <Card.Subtitle className="mb-2 text-muted">related to course #{item.course_id}</Card.Subtitle>

                        <Card.Text>
                          tagged {item.count} times
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              }
            </div>
          )
          : null}




      </div>




      <style jsx>{`

          .container {
            position: relative
          }
          .center {
            text - align: center;
          }
          .container-body{
            padding-left: 350px;
            padding-top: 70px;
            // position: fixed;
            z-index: 10;
            // box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1)
          }
          .container .sidebar {
            padding-left: 0px;
            padding-top: 50px;
            position: fixed;
            height: 250px;
            width: 200px;
            z-index: 10;
            text-align: center;
            box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1)
          }
          .container .fixed-top {
            padding-left: 0px;
            position: fixed;
            height: 50px;
            z-index: 20;
            text-align: center;
            box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1)
          }

          a{
            text - decoration: none;
          }


          .sidebar li:hover {
            padding: 30px 0px;
            background-color: transparent;
            color: #000
          }


          .sidebar li {
            padding: 12px;
            cursor: pointer;
            transition: all 0.5s;
            letter-spacing: 1px;
            display: flex;
            flex-direction: column
          }

          .sidebar li span {
            font-size: 15px
          }

          

          .sidebar li:hover {
            background-color: #f2f2f2;
            padding: 12px
          }

          .sidebar li a{
            text-decoration: none;
            color: black; 
          }

          .container .content {
            padding-left: 75px
          }
      `}</style>

      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      />


    </div>



  )
}
export default Main_page;