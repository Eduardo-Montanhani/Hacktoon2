import { useContext } from 'react'
import { Container } from "./styles";
import { RotaContext } from '../../contexts/rotaContext';

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
                                                <p>Origem: {rota.rotaInicial}</p>
                                                <p>Destino: {rota.rotaFinal}</p>
                                                <p>Horário Saída: {rota.horario}</p>
                                                <p>Valor: {rota.preco}</p>
                                            </div>
                                            <div>

                                                <button type='button' className='btn-editar'
                                                    onClick={() => {
                                                        //o editar é para ajuste tecnico
                                                        funEditarRota({ editar: true, rota: rota })
                                                        props.abrirModal();
                                                    }}
                                                >
                                                    Editar
                                                </button>
                                                <button type='button' className='btn-delete'
                                                    onClick={() => {
                                                        deleteRota(rota)
                                                    }}
                                                >
                                                    Deletar
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
