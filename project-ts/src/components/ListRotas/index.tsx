import { useContext } from 'react'
import { Container } from "./styles";
import { TarefaContext } from '../../contexts/tarefaContext';


//para realizar a tipagem
interface PropsListTarefas {
    abrirModal: () => void;
}

export function ListTarefas(props: PropsListTarefas) {
    //chamou o funEditarTarefa do Context
    const { rotas, funEditarRota, deleteRota} = useContext(TarefaContext)



    return (
        <>
            <Container>
                <div className='quadro'>
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
                                            {rota.nome}
                                        </h4>
                                        <p>{rota.rotaInicial}</p>
                                        <p>{rota.rotaFinal}</p>
                                        <p>{rota.preco}</p>
                                    </div>
                                    <div>
                                        <button type='button'
                                            onClick={() => {
                                                //o editar é para ajuste tecnico
                                                funEditarRota({ editar: true, rota: rota })
                                                props.abrirModal();
                                            }}
                                        >
                                            Editar
                                        </button>
                                    </div>
                                    <div>
                                        <button type='button'
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
