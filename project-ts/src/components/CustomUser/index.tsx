import { FormEvent, useContext, useState } from 'react'
import Modal from 'react-modal'
import { FormContainer } from './styles'
import { UserContext } from '../../contexts/userContext'

interface PropsUser{
    UserVisible: boolean;
    fecharUser: () => void;
}

export function CustomUser(props: PropsUser){
    const { createUsers} = useContext(UserContext);
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')

    function limparCamposEFecharModal() {
        setNome('')
        setSenha('')
        props.fecharUser()
    }
    //poderia ser OnsubmitModal
    function criarUser(event: FormEvent) {
        event.preventDefault()

            createUsers({
                nome : nome,
                senha
            })




        limparCamposEFecharModal()

    }

    return (
        <Modal
            isOpen={props.UserVisible}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
            onRequestClose={() => {
                limparCamposEFecharModal()
            }}
        >
            <button
                type='button'
                className='react-modal-close'
                onClick={limparCamposEFecharModal}
            >
                X
            </button>

            <FormContainer
                onSubmit={criarUser}
            >
                <h2>CADASTRO DE USUARIOS</h2>

                <input
                    type="text"
                    placeholder='Usuario'
                    required
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}

                />
                <input
                    type="password"
                    placeholder='Senha'
                    required
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}

                />


                <button type='submit'>
                    <strong>Cadastrar Informações</strong>
                </button>
            </FormContainer>

        </Modal>
    )
}
