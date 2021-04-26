
import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col
} from "reactstrap";
import {login} from "../../network/ApiAxios";

const Login = props => {
	let history = useHistory();

    const [EmailId, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState("");

    const tryLogin = async () => {
        if(EmailId === '' || Password === ''){
            
            Swal.fire({
                icon:"error",
                title:"Oops!",
                text:"username and password is incorrect"
              })
        }
        else if(EmailId !== '' && Password !== ''){

        const response = await login(EmailId, Password);
        const {data} = response;
        localStorage.setItem("user",JSON.stringify(data) );
            history.push('/admin')
        }
        else{
            
            Swal.fire({
                icon:"error",
                title:"Oops!",
                text:"username and password is incorrect"
              })
        }
    }

    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-5">
                        <div className="text-muted text-center mt-2 mb-3">
                            <small>Sign in with</small>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <Form role="form">
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Email" type="email" autoComplete="email"  name="EmailId"
                                           onChange={e => setEmail(e.target.value)}/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Password" type="password" autoComplete="password"  name="Password"
                                           onChange={e => setPassword(e.target.value)}/>
                                </InputGroup>
                            </FormGroup>
                            {error ?
                                <div className="text-muted font-italic">
                                    <small>
                                        error:{" "}
                                        <span className="text-red font-weight-700">{error}</span>
                                    </small>
                                </div> : null }
                            <div className="text-center">
                                <Button className="my-4" color="primary" type="button" onClick={tryLogin}>
                                    Sign in
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                <Row className="mt-4 text-center">
                    <Col xs="12">
                        <a
                            className="text-light"
                            onClick={() => props.history.push('/auth/reset-password')}
                        >
                            <small>Forgot password?</small>
                        </a>
                    </Col>
                </Row>
            </Col>
        </>
    );
}

export default Login;
