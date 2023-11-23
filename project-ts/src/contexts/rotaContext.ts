import axios from "axios";
import {
    ReactNode,
    createContext,
    useState,
    useEffect
} from "react";

import { Loading } from "../components/Loading";




// antes do banco
interface Rotas {
    nome: string;
    rotaInicial: string;
    rotaFinal: string;
    preco: string;

}

//depois do banco
interface RotaID {
    id: string;
    nome: string;
    rotaInicial: string;
    rotaFinal: string;
    preco: string;

}
//feito para editar tarefa
interface DataEditarRota {
    editar: boolean;
    rota: RotaID | null;
}


// função para omitir os atributos que não quer utilizar
//type TarefaExample = Omit<TarefasWithID, 'id'>

interface PropsRotaContext {
    rotas: Array<RotaID>;
    //exemplo de fazer delete
    updateRota: (rotas: RotaID) => Promise<void>;
    createRota: (rotas: Rotas) => Promise<void>;
    funEditarRota: (rotas: DataEditarRota) => void;
    funsetRotasDefault: () => void;
    editarRota: DataEditarRota;
    deleteRota: (rotas: RotaID) => Promise<void>;



}
export const RotaContext = createContext(
    {} as PropsRotaContext
)

interface PropsRotaProvider {
    children: ReactNode
}
// export function TarefasProvider(props: PropsTarefaProvider) {
export function RotasProvider({ children }: PropsRotaProvider) {

    const [rotas, setRotas] = useState([])

    const [editarRota, setEditarRotas] = useState<DataEditarRota>({ editar: false, rota: null })
    const [loading, setLoading] = useState<boolean>(false)






    useEffect(() => {
        axios.get('http://localhost:3000/posts')
            .then((res) => {
                console.log(res.data)
                setRotas(res.data)
            })
    }, [])

    async function createRota(data: Rotas) {
        setLoading(true)
        await axios.post('http://localhost:3000/posts', data);
        axios.get('http://localhost:3000/posts')//5min
            .then((res) => {
                setRotas(res.data);
                setLoading(false);

            });

    }
    async function updateRota(data: RotaID) {

        //para atualiar utiliza put
        await axios.put(`http://localhost:3000/posts/${data.id}`, data);
        setLoading(true)
        axios.get('http://localhost:3000/posts')//5min
            .then((res) => {
                setRotas(res.data);
                setLoading(false);

            });

    }
    //volta por padrão vazio
    function funsetRotasDefault() {
        setEditarRotas({ editar: false, rota: null })
    }

    //seta a tarefa que vem do editar tarefa
    function funEditarRota(data: DataEditarRota) {
        setEditarRotas(data)
    }
    async function deleteRota(data: RotaID) {
        setLoading(true)
        await axios.delete(`http://localhost:3000/posts/${data.id}`);
        axios.get('http://localhost:3000/posts')
            .then((res) => {
                setRotas(res.data);
                setLoading(false)

            });

    }


    return (
        <value= {{
        rotas,
            createRota,
            editarRota,
            funEditarRota,
            funsetRotasDefault,
            updateRota,
            deleteRota,




        }
}>
    <Loading visible={ loading } />

{ children }
</RotaContext.Provider>

    );
}


