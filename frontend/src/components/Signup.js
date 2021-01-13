import React, { useState } from 'react';
import { Card, Form, Input, Radio, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';

const Signup = () => {
    const history = useHistory;
    const radios = ['Male', 'Female'];
    const [input, setInput] = useState({
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        password: ""
    })
    const [radio, setRadio] = useState();
    const handleInput = (event) => {
        const { name, value } = event.target;
        setInput((inputValue) => {
            if(name === 'firstname') {
                return {
                    firstname: value,
                    lastname: inputValue.lastname,
                    email: inputValue.email,
                    mobile: inputValue.mobile,
                    password: inputValue.password
                }
            }
            else if(name === 'lastname') {
                return {
                    firstname: inputValue.firstname,
                    lastname: value,
                    email: inputValue.email,
                    mobile: inputValue.mobile,
                    password: inputValue.password
                }
            }
            else if(name === 'email') {
                return {
                    firstname: inputValue.firstname,
                    lastname: inputValue.lastname,
                    email: value,
                    mobile: inputValue.mobile,
                    password: inputValue.password
                }
            }
            else if(name === 'mobile') {
                return {
                    firstname: inputValue.firstname,
                    lastname: inputValue.lastname,
                    email: inputValue.email,
                    mobile: value,
                    password: inputValue.password
                }
            }
            else {
                return {
                    firstname: inputValue.firstname,
                    lastname: inputValue.lastname,
                    email: inputValue.email,
                    mobile: inputValue.mobile,
                    password: value
                }
            }
        })
    }
    const handleButton = () => {
        const userDetails = {
            firstname: input.firstname,
            lastname: input.lastname,
            gender: radio,
            email: input.email,
            mobile: input.mobile,
            password: input.password
        }

        axios.post("http://localhost:5001/user/signup", userDetails)
            .then(res => {
                if(res.data.user) {
                    setMessage(() => {
                        return {
                            text: res.data.user.msg
                        }
                    })
                    setTimeout(() => {
                        history.push('./');
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
    const [message, setMessage] = useState({
        text: "Create new account!"
    });

    const handleForm = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <Card centered>
                <Card.Content>
                    <Card.Header>
                        <center>{message.text}</center>
                    </Card.Header>
                    <Card.Description>
                        <Form onSubmit={handleForm}>
                            <Form.Field>
                                <Input
                                    type="text"
                                    name="firstname"
                                    placeholder="firstname"
                                    onChange={handleInput}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    type="text"
                                    name="lastname"
                                    placeholder="lastname"
                                    onChange={handleInput}
                                />
                            </Form.Field>
                            {
                                radios.map((item, index) => 
                                    <Form.Field
                                        control={Radio}
                                        label={item}
                                        value={item}
                                        key={index}
                                        checked={radio === item}
                                        onChange={() => setRadio(item)}
                                    />
                                )
                            }
                            <Form.Field>
                                <Input
                                    type="text"
                                    name="email"
                                    placeholder="email"
                                    onChange={handleInput}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    type="text"
                                    name="mobile"
                                    placeholder="mobile"
                                    onChange={handleInput}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    onChange={handleInput}
                                />
                            </Form.Field>
                            <center>
                                <Button 
                                    content='Sign up' 
                                    primary
                                    type='submit'  
                                    size='small'
                                    onClick={handleButton}
                                />
                            </center>
                        </Form>
                    </Card.Description>
                </Card.Content>
            </Card>
        </>
    )
}

export default Signup;