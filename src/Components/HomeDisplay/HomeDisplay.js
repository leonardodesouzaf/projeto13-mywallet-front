import styled from 'styled-components';
import { useNavigate , Link } from "react-router-dom";
import { useState } from "react";
import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import Transaction from './Transaction';
import { getTransactions } from '../../service/api';

export default function HomeDisplay() {
    
    const { tasks, setTasks } = useContext(UserContext);
    const navigate = useNavigate();
    const [transactionsContent, setTransactionsContent] = useState(<></>);
    const [refreshTransactionsList, setRefreshTransactionsList] = useState(false);
    useEffect(() => {
        let totalCounter = 0;
        getTransactions(tasks.token).then(renderTransactions).catch(() => {
                alert("Erro ao carregar as transações! Tente novamente!");
        });
        function renderTransactions(answer) {
            let transactionsList = answer.data;
            console.log(transactionsList);
            if (transactionsList.length === 0) {
                setTransactionsContent(
                    <NonTransactionsDiv>
                        <NonTransactionsText>
                            Não há registros de entrada ou saída
                        </NonTransactionsText>
                    </NonTransactionsDiv>
                );
            } else {
                setTransactionsContent(
                    <TransactionsDiv>
                        {transactionsList.map((transaction,index) => {
                            totalCounter += transaction.value;
                            return(<Transaction key={index} date={transaction.date} description={transaction.description} value={transaction.value} type={transaction.type} />);
                        })}
                    </TransactionsDiv>
                )
            }
        }
    }, [refreshTransactionsList]);
    return (
        <Content>
            <TitleDiv>
                <p>Olá, {tasks.name}</p>
                <Link to="/">
                    <ion-icon name="log-out-outline"></ion-icon>
                </Link>
            </TitleDiv>
            {transactionsContent}
            <ButtonsDiv>
                <ButtonTransaction>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <ButtonText>Nova entrada</ButtonText>
                </ButtonTransaction>
                <ButtonTransaction>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <ButtonText>Nova saída</ButtonText>
                </ButtonTransaction>
            </ButtonsDiv>
        </Content>
    );
}

const ButtonText = styled.div`
    font-size: 17px;
    width: 40%;
`;

const ButtonTransaction = styled.div`
    background-color: #A328D6;
    border-radius: 5px;
    height: 114px;
    width: 48%;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 20px;
    color: #FFFFFF;
`;

const ButtonsDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 13px;
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
    margin-bottom: 22px;
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

const NonTransactionsText = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
    width: 60%;
`;

const NonTransactionsDiv = styled.div`
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 446px;
`;

const TransactionsDiv = styled.div`
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 86.9%;
    height: 446px;
    box-sizing: border-box;
    padding: 23px 10px 10px 10px;
`;
