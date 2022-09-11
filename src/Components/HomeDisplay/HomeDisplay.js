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
        getTransactions(tasks).catch(() => {
                alert("Erro ao carregar as transações! Tente novamente!");
        }).then(renderTransactions);
        function renderTransactions(answer) {
            let transactionsList = answer.data;
            if (transactionsList.length === 0) {
                setTransactionsContent(
                    <NonTransactionsText>
                        Não há registros de entrada ou saída
                    </NonTransactionsText>
                );
            }
            if (transactionsList.length !== 0) {
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
        <>
            fala caramujo
        </>
    );
}


const NonTransactionsText = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
`;
