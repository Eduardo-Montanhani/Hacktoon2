import { useContext } from 'react'
import { Container } from "./styles";
import { RotaContext } from '../../contexts/rotaContext';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

//para realizar a tipagem
interface PropsListTarefas {
    abrirModal: () => void;
}

export function ListTarefas(props: PropsListTarefas) {
    //chamou o funEditarTarefa do Context
    const { rotas, funEditarRota, deleteRota } = useContext(RotaContext)



    return (
        <>
            <Container>
                <div>
                    <h3>
                        Rotas Cadastradas
                    </h3>
                    <ul>
                        {
                            rotas
                                .map((rota, index) => {
                                    return (
                                        <li
                                            key={index}
                                        >
                                            <div>
                                                <h4>
                                                    Rota: {rota.nome}
                                                </h4>
                                                <p><b>Origem:</b> {rota.rotaInicial}</p>
                                                <p><b>Destino:</b> {rota.rotaFinal}</p>
                                                <p><b>Horário Saída:</b> {rota.horario}</p>
                                                <p><b>Valor:</b> {rota.preco}</p>
                                            </div>
                                            <div>

                                                <button type='button' className='btn-editar'
                                                    onClick={() => {
                                                        //o editar é para ajuste tecnico
                                                        funEditarRota({ editar: true, rota: rota })
                                                        props.abrirModal();
                                                    }}
                                                >
                                                    <FaEdit size={20}/>
                                                </button>
                                                <button type='button' className='btn-delete'
                                                    onClick={() => {
                                                        deleteRota(rota)
                                                    }}
                                                >
                                                    <MdDelete size={20}/>
                                                </button>
                                            </div>
                                        </li>
                                    )
                                })
                        }

                    </ul>
                </div>


            </Container>
        </>
    )
}
