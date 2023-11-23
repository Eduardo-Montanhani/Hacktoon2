import { useState } from 'react'
import Modal from 'react-modal'
import { Header } from "./components/Header"
import { ListTarefas } from './components/ListRotas'
import { GlobalStyle } from './styles/global'
import { CustomModal } from './components/CustomModal'
import { RotasProvider } from './contexts/rotaContext'

Modal.setAppElement('#root')

// dontpad.com/profchines
function App() {

    const [isVisibleModal, setIsVisibleModal] = useState(false)

    function abrirModal() {
        setIsVisibleModal(true)
    }

    function fecharModal() {
        setIsVisibleModal(false)
    }

    return (
        <>
            <RotasProvider>
            <GlobalStyle />
                <Header
                    abrirModal={abrirModal}
                />

                <ListTarefas
                 abrirModal={abrirModal}
                />

                <CustomModal
                    modalVisible={isVisibleModal}
                    fecharModal={fecharModal}
                />
            </RotasProvider>
        </>
    )
}

export default App
