import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

    :root {
        --background: #13bcf0;
        --blue: #00a5d7;
        --text-body: #1d1016;
        --background-modal: #fff;

        --blue-light: #014d63;
    }

    * {
        margin: 0;
        padding: 0;
    }

    body {
        background-color: var(--background);
    }

    body, input-security, textarea, button {
        font-family: Arial, Helvetica, sans-serif;
    }

    button {
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .react-modal-overlay{
        background: rgba(0,0,0,0.5);

        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }
    .react-modal-content{
        max-width:100%;
        max-width: 576px;
        background: var(--background-modal);
        padding: 3rem;
        position: relative;
        border-radius: 0.24rem;
    }
    .react-modal-close {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        border: 0;
        background: transparent;
        transition: filter 0.2s;
        &:hover {
            filter: brightness(0.8);
        }
    }


`
