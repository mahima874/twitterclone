import React, { useContext, useEffect, useState } from 'react';
import { Segment, Grid, Form, Divider, Button, TextArea } from 'semantic-ui-react';
import { userContext } from '../Context/user.context';
import axios from 'axios';

const Dashboard = () => {
    const {user, setUser} = useContext(userContext);
    const [post, setPost] = useState({
        username: user.username,
        post: ""
    });
    const [message, setMessage] = useState({
        text: "Welcome " + user.name
    })
    const handleButton = () => {
        axios.post("http://localhost:8080/post/writepost", post)
            .then(res => {
                if(res.data.user) {
                    const {msg, id} = res.data.post;
                    setMessage(() => {
                        return {
                            text: msg
                        }
                    })
                }
                else {
                    setMessage(() => {
                        return {
                            text: res.data.msg
                        }
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleForm = (event) => {
        event.preventDefault();
    }
    const handlePost = (event) => {
        const {value} = event.target;
        setPost(postValue => {
            return {
                username: postValue.username,
                post: value
            }
        });
    }

    useEffect(() => {
        axios.get("http://localhost:8080/post")
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    return (
        <>
            <Segment placeholder>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <center>{message.text}</center>
                        <br/>
                        <Form onSubmit={handleForm}>
                            <TextArea 
                                placeholder= 'write a post'
                                name='post'
                                style={{minHeight: 150, minWidth: 300}}
                                onChange={handlePost}
                            />
                            <br/>
                            <Button 
                                content='Post' 
                                primary
                                type='submit' 
                                onClick={handleButton}
                            />
                        </Form>
                    </Grid.Column>

                    <Grid.Column verticalAlign='middle'>
                    </Grid.Column>
                </Grid>

                <Divider vertical>Or</Divider>
            </Segment>
        </>
    )
}

export default Dashboard;