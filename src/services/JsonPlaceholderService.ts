import axios from 'axios';
import { ObjectId } from 'mongodb';
import signale from 'signale';
import { IUser } from './../types'

const headers = {
    headers: {
        'Content-Type': 'application/json',
    },
};




export class JsonPlaceholderService {
    static getUserList = async (): Promise<IUser> => {
        try {
            const request = await axios.get(`${process.env.JSON_PLACHOLDER_URL}/users`, headers);
            console.log(request.data)
            return request.data;
        } catch (error) {
            signale.error(`error.toString(), ${process.env.JSON_PLACHOLDER_URL}`)
            // return handleErrorRequestService(error, JSON_PLACHOLDER_URL);
        }
    };

}


