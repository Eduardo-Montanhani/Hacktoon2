import styled from 'styled-components'

export const Container = styled.div`

    margin-top: 2rem;
    margin-left: 1rem;
    margin-right: 1rem;
    display: flex;
    justify-content: center;

    h3 {
        text-align: center;
        font-size: 25px;
        font-weight: 700;
        color: var(--blue-light);
        margin: 0 0 25px 0;
    }

    ul {
        width: 30rem;
        border-radius: 8px;
        margin: 5px;
        border: 2px solid #d7d7d7;
        background-color: #ebecf0;


        h4 {
            margin-bottom: 10px;
            color: var(--blue-light);
            font-size: 20px;
            font-weight: 750;
        }

        p {
            margin: 0 0 8px 0;
        }

        li {
            padding: 1rem 2rem;
            color: var(--text-body);
            background-color: #fff;
            border: 0;
            border-radius: 8px;
            margin: 10px;
            list-style: none;

            display: flex;
            justify-content: space-between;

        }

        button {
            margin: 5px;

        }

        .btn-editar{
            padding: 3px;
            border: 0;
            background-color: #fff;
        }

        .btn-delete{
            padding: 3px;
            border: 0;
            background-color: #fff;
        }

        .btn-editar:hover{
            background-color: #b5b3b3;
            transition: 1s;
            border-radius: 3px;
        }

        .btn-delete:hover{
            background-color: #b5b3b3;
            transition: 1s;
            border-radius: 3px;
        }
    }
`
