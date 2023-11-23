import { Container } from "./styles"

interface PropsHeader {
    abrirModal: () => void;
}

export const Header = (props: PropsHeader) => {
    return(
        <Container>
            <h1>SI BUS</h1>
            <div>
                <button
                    type="button"
                    onClick={props.abrirModal}

                >
                    Adicionar Novas Rotas
                </button>
            </div>
        </Container>
    )
}
