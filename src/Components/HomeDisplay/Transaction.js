import styled from 'styled-components';
import { useState } from "react";
export default function Transaction(props){
    let isGreen = false;
    if(props.type === "in"){
        isGreen = true;
    }
    return( 
        <>
            {isGreen ? (
                <TransactionDiv>
                    <DateDescDiv>
                        <DateDiv>
                            {props.date}
                        </DateDiv>
                        <DescDiv>
                            {props.description}
                        </DescDiv>
                    </DateDescDiv>
                    <TransactionValueIn>
                        {props.value}
                    </TransactionValueIn>
                </TransactionDiv>
            ) : (
                <TransactionDiv>
                    <DateDescDiv>
                        <DateDiv>
                            {props.date}
                        </DateDiv>
                        <DescDiv>
                            {props.description}
                        </DescDiv>
                    </DateDescDiv>
                    <TransactionValueOut>
                        {((props.value)*(-1)).toFixed(2)}
                    </TransactionValueOut>
                </TransactionDiv>
            )}
        </>
    )
}

const TransactionDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 21px;
    margin-bottom: 12px;
`;

const DateDescDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;

const DateDiv = styled.div`
    box-sizing: border-box;
    margin-left: 0px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #C6C6C6;
`;

const DescDiv = styled.div`
    box-sizing: border-box;
    margin-left: 12px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
`;

const TransactionValueIn = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #03AC00;
    margin-right: 5px;
`;

const TransactionValueOut = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #C70000;
    margin-right: 5px;
`;