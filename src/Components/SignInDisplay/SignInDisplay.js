import styled from 'styled-components';
import { useNavigate , Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";
import { postSignIn } from '../../service/api';

export default function SignInDisplay(){
    const { tasks, setTasks } = useContext(UserContext);
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    function logIn (event) {
        event.preventDefault();
        setIsLoading(true);
		postSignIn({
			email: email,
			password: password
		}).then((answer) => {
            setTasks(answer.data);
            navigate("/home");
        }).catch((err) => {
            alert("Login não efetuado! Tente novamente!");
            setIsLoading(false);
            console.error(err);
        });
    }
    return(
        <>
            <Content>
                <Logo>MyWallet</Logo>
                <Form onSubmit={logIn}>
                    <Input placeholder="E-mail" disabled={isLoading} type="email" required onChange={e => setEmail(e.target.value)}/>
                    <Input placeholder="Senha" disabled={isLoading} type="password" required onChange={e => setPassword(e.target.value)}/>
                    {isLoading ?
                    <Button disabled><ThreeDots 
                    color={'white'} 
                    height={30} 
                    width={40}/></Button>
                    :
                    <Button type="submit" disabled={isLoading}>Entrar</Button>
                    }
                </Form>
                
                <Link to="/sign-up">
                    <Register>Primeira vez? Cadastre-se!</Register>
                </Link>
            </Content>
        </>
    )
}

const Logo = styled.div`
    font-family: 'Saira Stencil One';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
    margin-bottom: 24px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Content = styled.div`
    width: 100vw;
    height: 100vh;
	display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Input = styled.input`
    background-color: #FFFFFF;
    box-sizing: border-box;
    padding-left: 15px;
    border: none;
    border-radius: 5px;
    width: 86.9%;
    height: 58px;
    margin-bottom: 13px;
    text-decoration: none;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
    ::placeholder{
        color: #000000;
    }
`;

const Button = styled.button`
    width: 86.9%;
    height: 46px;
    box-sizing: border-box;
    background-color: #A328D6;
    border-radius: 5px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #FFFFFF;
    border: none;
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Register = styled.p`
    text-align: center;
    text-decoration: none;
    text-decoration-line: none;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
`;
