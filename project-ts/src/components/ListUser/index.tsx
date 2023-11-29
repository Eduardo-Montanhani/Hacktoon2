import { UserContext } from "../../contexts/userContext";
import { useContext } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Container } from "./styles";

interface PropsListUsers {
    abrirUser: () => void;
}
export function ListUser(props: PropsListUsers) {
    const { users, deleteUser, funEditarUser } = useContext(UserContext)

    return (
        <>
            <Container>
                <div>
                    <h3>
                        Usuarios Cadastrados
                    </h3>
                    <ul>
                        {
                            users
                                .map((user, index) => {
                                    return (
                                        <li
                                            key={index}>
                                            <div>
                                                <h4>
                                                    Usuario: {user.nome}
                                                </h4>
                                                <p><b>Senha:</b>*****</p>

                                            </div>
                                            <div>
                                                <button type='button' className='btn-editar'
                                                    onClick={() => {
                                                        //o editar é para ajuste tecnico
                                                        funEditarUser({ editar: true, user: user })
                                                        props.abrirUser();
                                                    }}
                                                >
                                                    <FaEdit size={20} />
                                                </button>
                                                <button type='button' className='btn-delete'
                                                    onClick={() => {
                                                        deleteUser(user)
                                                    }}
                                                >
                                                    <MdDelete size={20} />
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
