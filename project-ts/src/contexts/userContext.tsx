import axios from "axios";
import {
    ReactNode,
    createContext,
    useState,
    useEffect,
} from "react";

import { Loading } from "../components/Loading";

interface Users {
    nome: string;
    senha: string;
}

interface UsersComID {
    id: string;
    nome: string;
    senha: string;
}

interface DataEditarUser {
    editar: boolean;
    user: UsersComID | null;
}
interface PropsUserContext {
    users: Array<UsersComID>;
    createUsers: (users: Users) => Promise<void>;
    updateUser: (users: UsersComID) => Promise<void>
    funEditarUser: (tarefas: DataEditarUser) => void;
    funSetUserDefault: () => void;
    editarUser: DataEditarUser;
    deleteUser: (users: UsersComID) => Promise<void>
}

export const UserContext = createContext({} as PropsUserContext);

interface PropsUserProvider {
    children: ReactNode;
}

export function UsersProvider({ children }: PropsUserProvider) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [editarUser, setEditarUsers] = useState<DataEditarUser>({editar: false, user: null})
    useEffect(() => {
        axios.get("http://localhost:3000/usuario").then((res) => {
            setUsers(res.data);
        });
    }, []);

    async function createUsers(data: Users) {
        setLoading(true);
        await axios.post("http://localhost:3000/usuario", data);
        axios.get("http://localhost:3000/usuario").then((res) => {
            setUsers(res.data);
            setLoading(false);
        });
    }
    async function updateUser(data: UsersComID) {
        setLoading(true)
        await axios.put(`http://localhost:3000/usuario/${data.id}`, data);
        axios.get('http://localhost:3000/usuario')
        .then((res) => {
            setUsers(res.data);
            setLoading(false)
        });
    }
    function funSetUserDefault(){
        setEditarUsers({ editar: false, user: null})
    }
    function funEditarUser(data: DataEditarUser) {
        setEditarUsers(data)
    }
    async function deleteUser(data: UsersComID) {
        setLoading(true)
        await axios.delete(`http://localhost:3000/usuario/${data.id}`);
        axios.get('http://localhost:3000/usuario')
        .then((res)=> {
            setUsers(res.data);
            setLoading(false)
        });
    }

    return (
        <UserContext.Provider value={{
            users,
            createUsers,
            updateUser,
            funEditarUser,
            funSetUserDefault,
            deleteUser,
            editarUser

        }}>
            <Loading visible={loading} />
            {children}
        </UserContext.Provider>
    );
}


