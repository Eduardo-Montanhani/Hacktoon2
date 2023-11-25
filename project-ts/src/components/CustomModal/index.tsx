
import { FormEvent, useContext, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { FormContainer } from './styles'
import { RotaContext } from '../../contexts/rotaContext'
import NumberFormat from 'react-number-format';

interface PropsModal {
    modalVisible: boolean;
    fecharModal: () => void;
}

export function CustomModal(props: PropsModal) {
    const { createRota, editarRota, funSetRotasDefault, updateRota } = useContext(RotaContext);
    const [nome, setNome] = useState('')
    const [rotaInicial, setRotaInicial] = useState('')
    const [rotaFinal, setRotaFinal] = useState('')
    const [horario, setHorario] = useState('')
    const [preco, setPreco] = useState('')
    const [erro, setErro] = useState('');


    useEffect(() => {
        if (editarRota.editar) {
            setNome(editarRota.rota?.nome ? editarRota.rota.nome : '')
            setRotaInicial(editarRota.rota?.rotaInicial ? editarRota.rota.rotaInicial : '')
            setRotaFinal(editarRota.rota?.rotaFinal ? editarRota.rota.rotaFinal : '')
            setHorario(editarRota.rota?.horario ? editarRota.rota.horario : '')
            setPreco(editarRota.rota?.preco ? editarRota.rota.preco : '')
        }

    }, [editarRota.editar])
    function limparCamposEFecharModal() {
        funSetRotasDefault();
        setNome('')
        setRotaInicial('')
        setRotaFinal('')
        setHorario('')
        setPreco('')
        props.fecharModal()
    }

    //poderia ser OnsubmitModal
    function criarRota(event: FormEvent) {
        event.preventDefault()

        if (preco <= '0') {
            setErro('O valor da passagem deve ser um número positivo');
            return;
        } else {
            setErro('');
        }

        if (editarRota.editar && editarRota.rota) {
            let objRota = {
                ...editarRota.rota,
                nome,
                rotaInicial,
                rotaFinal,
                horario,
                preco

            }
            updateRota(objRota)

        } else {
            createRota({
                nome: nome,
                rotaInicial: rotaInicial,
                rotaFinal,
                horario,
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
                <h2>CADASTRO DE ROTAS</h2>

                {erro && <p className="erro">{erro}</p>}

                <input
                    type="text"
                    placeholder='Origem - Destino'
                    required
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}

                />
                <input
                    type="text"
                    placeholder='Origem'
                    required
                    value={rotaInicial}
                    onChange={(event) => setRotaInicial(event.target.value)}

                />
                <input
                    type="text"
                    placeholder='Destino'
                    required
                    value={rotaFinal}
                    onChange={(event) => setRotaFinal(event.target.value)}

                />

                <input
                    type="time"
                    placeholder='Horário'
                    required
                    value={horario}
                    onChange={(event) => setHorario(event.target.value)}

                />

              <input

                    type="number"
                    placeholder='Valor da Passagem'
                    required
                    value={preco}
                    onChange={(event) => setPreco((event.target.value))}

                />

                <button type='submit'>
                    <strong>Cadastrar Informações</strong>
                </button>
            </FormContainer>

        </Modal>
    )
}
