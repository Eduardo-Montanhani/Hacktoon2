import { useState } from 'react'
import Modal from 'react-modal'
import { Header } from "./components/Header"
import { ListTarefas } from './components/ListRotas'
import { GlobalStyle } from './styles/global'
import { CustomModal } from './components/CustomModal'
import { RotasProvider } from './contexts/rotaContext'
import { CustomUser } from './components/CustomUser'
import { UsersProvider } from './contexts/userContext'
import { ListUser } from './components/ListUser'

Modal.setAppElement('#root')

// dontpad.com/profchines
function App() {

    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [isVisibleUser, setIsVisibleUser] = useState(false)


    function abrirModal() {
        setIsVisibleModal(true)
    }

    function fecharModal() {
        setIsVisibleModal(false)
    }
    function abrirUser() {
        setIsVisibleUser(true)
    }

    function fecharUser() {
        setIsVisibleUser(false)
    }

    return (
        <>
            <RotasProvider>
            <GlobalStyle />
                <Header
                    abrirModal={abrirModal}
                    abrirUser={abrirUser}
                />

                <ListTarefas
                 abrirModal={abrirModal}
                />


                <CustomModal
                    modalVisible={isVisibleModal}
                    fecharModal={fecharModal}
                />
            </RotasProvider>

            <UsersProvider>
            <ListUser
                abrirUser={abrirUser}
                />
            <CustomUser
                    UserVisible={isVisibleUser}
                    fecharUser={fecharUser}

                />
            </UsersProvider>
        </>
    )
}

export default App
