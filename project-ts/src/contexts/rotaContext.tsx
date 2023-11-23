import axios from "axios";
import {
    ReactNode,
    createContext,
    useState,
    useEffect
} from "react";

import { Loading } from "../components/Loading";


interface Rotas {
    nome: string;
    rotaInicial: string;
    rotaFinal: string;
    horario: string;
    preco: string;
}

interface RotasComID {
    id: string;
    nome: string;
    rotaInicial: string;
    rotaFinal: string;
    horario: string;
    preco: string;
}

interface DataEditarRota {
    editar: boolean;
    rota: RotasComID | null;
}

interface PropsRotaContext {
    rotas: Array<RotasComID>;
    updateRota: (rotas: RotasComID) => Promise<void>
    createRota: (rotas: Rotas) => Promise<void>;
    funEditarRota: (tarefas: DataEditarRota) => void;
    funSetRotasDefault: () => void;
    editarRota: DataEditarRota;
    deleteRota: (rotas: RotasComID) => Promise<void>
}

export const RotaContext = createContext(
    {} as PropsRotaContext
)
interface PropsRotaProvider {
    children: ReactNode
}

export function RotasProvider({children}: PropsRotaProvider) {

    const [rotas, setRotas] = useState([])
    const [editarRota, setEditarRotas] = useState<DataEditarRota>({editar: false, rota: null})
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        axios.get('http://localhost:3000/rotas')
        .then((res) => {
            setRotas(res.data)
        })
    }, [])


    async function createRota(data: Rotas){
        setLoading(true)
        await axios.post('http://localhost:3000/rotas', data);
        axios.get('http://localhost:3000/rotas')
        .then((res) =>{
            setRotas(res.data);
            setLoading(false)
        });
    }
    async function updateRota(data: RotasComID) {
        setLoading(true)
        await axios.put(`http://localhost:3000/rotas/${data.id}`, data);
        axios.get('http://localhost:3000/rotas')
        .then((res) => {
            setRotas(res.data);
            setLoading(false)
        });
    }
    function funSetRotasDefault(){
        setEditarRotas({ editar: false, rota: null})
    }
    function funEditarRota(data: DataEditarRota) {
        setEditarRotas(data)
    }
    async function deleteRota(data: RotasComID) {
        setLoading(true)
        await axios.delete(`http://localhost:3000/rotas/${data.id}`);
        axios.get('http://localhost:3000/rotas')
        .then((res)=> {
            setRotas(res.data);
            setLoading(false)
        });
    }

    return (
        <RotaContext.Provider value={{
            rotas,
            createRota,
            editarRota,
            funEditarRota,
            funSetRotasDefault,
            updateRota,
            deleteRota,




        }}>
            <Loading visible={loading} />
            {children}
        </RotaContext.Provider>
    )
}
