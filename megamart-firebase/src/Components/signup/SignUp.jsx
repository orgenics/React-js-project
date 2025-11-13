import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import { createUserAsync } from "../../services/action/propertyauthAction";

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {errMsg, isCreated} = useSelector(state => state.authReducer)
    const [inputForm, setInputForm] = useState({
        email: "",
        password: ""
    });

    const handleChanged = (e) => {
        const { name, value } = e.target;
        setInputForm({
            ...inputForm,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputForm)
        dispatch(createUserAsync(inputForm))
    }

    useEffect(()=> {
        if(isCreated){
            navigate("/signIn");
        }
    }, [isCreated]);
    return (
        <>
            <Container>
                <h2>Register Form</h2>
                {errMsg ? <p>{errMsg}</p> : ""}
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Email
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" name="email" value={inputForm.email} onChange={handleChanged} placeholder="Enter Email" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" name="password" value={inputForm.password} onChange={handleChanged} placeholder="Enter Password" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">

                        </Form.Label>
                        <Col sm="10">
                            <button type='submit'>SignUp</button>
                        </Col>
                    </Form.Group>
                </Form>
                <p>Already an Account ? <Link to="/signIn">SignIn</Link> </p>
            </Container>
        </>
    )
}

export default SignUp;