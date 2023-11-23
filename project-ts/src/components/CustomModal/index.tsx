
import { FormEvent, useContext, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { FormContainer } from './styles'
import { TarefaContext } from '../../contexts/tarefaContext';

interface PropsModal {
    modalVisible: boolean;
    fecharModal: () => void;
}

export function CustomModal(props: PropsModal){
    const { createRota, editarRota, funSetRotasDefault, updateRota } = useContext(TarefaContext);
    const [nome, setNome] = useState('')
    const [rotaInicial, setRotaInicial] = useState ('')
    const [rotaFinal, setRotaFinal] = useState ('')
    const [preco, setPreco] = useState ('')

    useEffect(() => {
        if(editarRota.editar){
            setNome(editarRota.rota?.nome ? editarRota.rota.nome : '')
            setRotaInicial(editarRota.rota?.rotaInicial ? editarRota.rota.rotaInicial : '')
            setRotaFinal(editarRota.rota?.rotaFinal? editarRota.rota.rotaFinal: '')
            setPreco(editarRota.rota?.preco ? editarRota.rota.preco : '')
        }

    },[editarRota.editar])
    function limparCamposEFecharModal() {
        funSetRotasDefault();
        setNome('')
        setRotaInicial('')
        setRotaFinal('')
        setPreco('')
        props.fecharModal()
    }
    //poderia ser OnsubmitModal
    function criarRota(event: FormEvent) {
        event.preventDefault()


        if (editarRota.editar && editarRota.rota) {
            let objRota = {
                ...editarRota.rota,
                nome,
                rotaInicial,
                rotaFinal,
                preco

            }
            updateRota(objRota)

        } else {
            createRota({
                nome,
                rotaInicial,
                rotaFinal,
                preco
            })
        }


        limparCamposEFecharModal()

    }

    return (
        <Modal
            isOpen={props.modalVisible}
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
                onSubmit={criarRota}
            >
                <h2>CADASTRAMENTO DE ROTAS</h2>

                <input
                    type="text"
                    placeholder='Nome Da Rota'
                    required
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}

                />
                <input
                    type="text"
                    placeholder='Rota Inicial'
                    required
                    value={rotaInicial}
                    onChange={(event) => setRotaInicial(event.target.value)}

                />
                <input
                    type="text"
                    placeholder='Rota Final'
                    required
                    value={rotaFinal}
                    onChange={(event) => setRotaFinal(event.target.value)}

                />

                <button type='submit'>
                    Cadastrar Informações
                </button>
            </FormContainer>

        </Modal>
    )
}
