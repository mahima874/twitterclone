import React, { useState } from 'react';
import { Segment, Grid, Form, Divider, Button, Input } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import axios from 'axios';

const Home = () => {
    const history = useHistory();
    const fields = ['username', 'password'];
    const [input, setInput] = useState({
        username: "",
        password: ""
    });
    const handleInput = (event) => {
        const {name, value} = event.target;
        setInput((inputValue) => {
            if(name === 'username') {
                return {
                    username: value,
                    password: inputValue.password
                }
            }
            else {
                return {
                    username: inputValue.username,
                    password: value
                }
            }
        })
    }
    const handleForm = (event) => {
        event.preventDefault();
    }
    const handleSignin = () => {
        axios.post("http://localhost:5001/user/signin", input)
            .then(res => {
                if(res.data.user) {
                    setMessage(() => {
                        return {
                            text: res.data.user.msg
                        }
                    })
                    setTimeout(() => {
                        history.push('./dashboard');
                    }, 2000);
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
                setMessage(() => {
                    return {
                        text: err
                    }
                })
            })
    }
    const handleSignup = () => {
        history.push('./signup');
    }
    const [message, setMessage] = useState({
        text: "Please login!"
    });

    return(
        <>
            <Segment placeholder>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <center>{message.text}</center>
                        <br/>
                        <Form onSubmit={handleForm}>
                            {
                                fields.map((item, index) => 
                                    <Form.Field
                                        control={Input}
                                        type={index === 1 ? 'password' : 'text'}  
                                        key={index} 
                                        name={item} 
                                        placeholder={item}  
                                        onChange={handleInput}
                                    />
                                )
                            }

                            <Button 
                                content='Sign in' 
                                primary
                                type='submit'  
                                onClick={handleSignin}
                            />
                        </Form>
                    </Grid.Column>

                    <Grid.Column verticalAlign='middle'>
                        <Button 
                            content='Sign up' 
                            icon='signup' 
                            size='big' 
                            onClick={handleSignup}
                        />
                    </Grid.Column>
                </Grid>

                <Divider vertical>Or</Divider>
            </Segment>
        </>
    )
}


export default Home;