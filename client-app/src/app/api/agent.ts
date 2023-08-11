import axios, {AxiosError, AxiosResponse} from 'axios';
import { Activity } from '../models/activity';
import { toast } from 'react-toastify';
import { router } from '../router/Router';
import { store } from '../stores/store';

axios.defaults.baseURL = 'http://localhost:5000/api';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

const responseBody = <T> (reponse: AxiosResponse<T>) => reponse.data;

axios.interceptors.response.use(async response => {

        await sleep(1000);
        return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found');
            }
            if (data.errors) {
                const modslStateErrors = [];
                for(const key in data.error){
                    if (data.errors[key]) {
                      modslStateErrors.push(data.error[key]);
                    }
                }
                throw modslStateErrors.flat();
            }else{
                toast.error(data);
            }
            break;
         case 401:
            toast.error('unauthorized')
            break;
         case 403:
             toast.error('Forbiden')
             break;
         case 404:
            router.navigate('/not-found')
            break;
         case 500:
           store.commonStore.setServerError(data);
           router.navigate('/server-error');
           break;
    }
    return Promise.reject(error);
} )

const requests = {
    
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete(url).then<T>(responseBody),
}
  //use 'requests.post' instead of post, for post/put/delete (for later)
const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>(`/activities`, activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`,activity ),
    delete: (id: string) => requests.del<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;