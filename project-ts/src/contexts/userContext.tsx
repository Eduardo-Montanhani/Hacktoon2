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

interface PropsUserContext {
    users: Array<UsersComID>;
    createUsers: (users: Users) => Promise<void>;
}

export const UserContext = createContext({} as PropsUserContext);

interface PropsUserProvider {
    children: ReactNode;
}

export function UsersProvider({ children }: PropsUserProvider) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);

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

    return (
        <UserContext.Provider value={{
            users,
            createUsers
        }}>
            <Loading visible={loading} />
            {children}
        </UserContext.Provider>
    );
}


