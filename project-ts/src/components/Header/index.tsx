import { Container } from "./styles"

interface PropsHeader {
    abrirModal: () => void;
}

export const Header = (props: PropsHeader) => {
    return(
        <Container>
            <img src="/logobus.png" alt="logo" />
            <div>
                <button
                    type="button"
                    onClick={props.abrirModal}
                >
                    Nova Rota
                </button>
            </div>
        </Container>
    )
}
