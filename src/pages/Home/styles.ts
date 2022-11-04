import styled from "styled-components";

export const HomeContainer = styled.main`
    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }
`





export const BaseCountDownButton =  styled.button`
    width: 100%;
    border: 0;
    padding: 1rem;
    border-radius: 8px;
    color: ${props=> props.theme["gray-100"]};
    font-weight: bold;
    
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .5rem;

    &:disabled{
    opacity: .7;
    cursor: not-allowed;
    }


    cursor: pointer;
`

export const StartCountDownButton = styled(BaseCountDownButton)`
    background-color: ${props=> props.theme["green-500"]};

    &:not(:disabled):hover{
    background-color: ${props=> props.theme["green-700"]};
    }

`

export const StopCountDownButton = styled(BaseCountDownButton)`
    background-color: ${props=> props.theme["red-500"]};

    &:not(:disabled):hover{
    background-color: ${props=> props.theme["red-700"]};
    }
`