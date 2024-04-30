import {useState} from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query"
import {deleteItem} from "../../../services/ApiCalls.ts";


type CommonHookProps = {
    data: {
        url: string
    }
}
const useCommonHook = (props:CommonHookProps) => {
    const [componentData, setComponentData] = useState();
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient()

    const { mutate: deleteDa } = useMutation(deleteItem, {
        onSuccess: () => {
            queryClient.invalidateQueries(props.data.url)
        },
        onError: (error) => {
            console.log('delete error: ', error)
        }
    })

    function handleDelete(element: any) {
        const item = {
            url: props.data.url,
            data: element
        }
        deleteDa(item)
    }

    const fetchData = async (url: string) => {
        try {
            setLoading(true);
            const response = await axios.get(url);
            const data = await response.data;
            setComponentData(data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            setLoading(false);
        }
    };

    return { componentData, loading, fetchData };
}