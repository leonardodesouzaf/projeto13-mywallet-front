import styled from 'styled-components';
import { useNavigate , Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { postSignUp } from '../../service/api';

export default function SignUpDisplay(){
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    function registerIn (event) {
        event.preventDefault();
        setIsLoading(true);
        if(password === passwordConfirm){
            postSignUp({
                email: email,
                name: name,
                password: password
            }).catch(() => {
                alert("Cadastro não efetuado! Tente novamente!");
                setIsLoading(false);
            }).then(() => {navigate("/")});
        }else{
            alert('Senhas não coincidem! Digite novamente!');
            setIsLoading(false);
        };  
    }
    return(
        <>
            <Content>
                <Logo>MyWallet</Logo>
                <Form onSubmit={registerIn}>
                    <Input placeholder="Nome" disabled={isLoading} type="text" required onChange={e => setName(e.target.value)}/>
                    <Input placeholder="E-mail" disabled={isLoading} type="email" required onChange={e => setEmail(e.target.value)}/>
                    <Input placeholder="Senha" disabled={isLoading} type="password" required onChange={e => setPassword(e.target.value)}/>
                    <Input placeholder="Confirme a senha" disabled={isLoading} type="password" required onChange={e => setPasswordConfirm(e.target.value)}/>
                    {isLoading ?
                    <Button disabled><ThreeDots 
                    color={'white'} 
                    height={30} 
                    width={30}/></Button>
                    :
                    <Button type="submit" disabled={isLoading}>Cadastrar</Button>
                    }
                </Form>
                <Link to="/">
                    <Register>Já tem uma conta? Entre agora!</Register>
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
