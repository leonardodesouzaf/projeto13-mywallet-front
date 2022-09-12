import styled from 'styled-components';
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { postIn } from '../../service/api';

export default function InDisplay(){
    const { tasks, setTasks } = useContext(UserContext);
    const [value, setValue] = useState(0);
	const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    function logIn (event) {
        event.preventDefault();
        setIsLoading(true);
		postIn({
			value: value,
			description: description
		},tasks.token).then((answer) => {
            setIsLoading(false);
            navigate("/home");
        }).catch((err) => {
            alert("Transação não efetuada! Tente novamente!");
            setIsLoading(false);
            console.error(err);
        });
    }
    return(
        <Content>
            <TitleDiv>Nova entrada</TitleDiv> 
            <Form onSubmit={logIn}>
                <Input placeholder="Valor" disabled={isLoading} type="numeric" step=".01" required onChange={e => setValue(e.target.value)}/>
                <Input placeholder="Descrição" disabled={isLoading} type="text" required onChange={e => setDescription(e.target.value)}/>
                {isLoading ?
                <Button disabled><ThreeDots 
                color={'white'} 
                height={30} 
                width={40}/></Button>
                :
                <Button type="submit" disabled={isLoading}>Salvar entrada</Button>
                }
             </Form>
        </Content> 
    )
}

const Input = styled.input`
    background-color: #FFFFFF;
    box-sizing: border-box;
    padding-left: 15px;
    border: none;
    border-radius: 5px;
    width: 100%;
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Button = styled.button`
    width: 100%;
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

const TitleDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
    box-sizing: border-box;
    margin-bottom: 40px;
`;

const Content = styled.div`
    width: 100vw;
    height: 100vh;
	display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 25px;
`;
