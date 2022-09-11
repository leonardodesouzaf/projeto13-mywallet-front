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
            if (transactionsList.length === 0) {
                setTransactionsContent(
                    <NonTransactionsText>
                        Não há registros de entrada ou saída
                    </NonTransactionsText>
                );
            } else {
                setTransactionsContent(
                    <>
                        {transactionsList.map((transaction,index) => {
                            totalCounter += transaction.value;
                            return(<Transaction key={index} date={transaction.date} description={transaction.description} value={transaction.value} type={transaction.type} />);
                        })}
                    </>
                )
            }
        }
    }, [refreshTransactionsList]);
    return (
        <Content>
            <TitleDiv>
                <p>Olá, Fulano</p>
            </TitleDiv>
        </Content>
    );
}

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
`;
