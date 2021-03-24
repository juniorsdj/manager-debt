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
    static getUserList = async (): Promise<IUser[] | void> => {
        try {
            const request = await axios.get(`${process.env.JSON_PLACHOLDER_URL}/users`, headers);
            return request.data as IUser[];
        } catch (error) {
            signale.error(`${error.toString()}, ${process.env.JSON_PLACHOLDER_URL}`)
            // return handleErrorRequestService(error, JSON_PLACHOLDER_URL);
        }
    };
    static getUserById = async (userId: string): Promise<IUser | void> => {
        try {
            const request = await axios.get(`${process.env.JSON_PLACHOLDER_URL}/users/${userId}`, headers);
            return request.data as IUser;
        } catch (error) {
            signale.error(`${error.toString()}, ${process.env.JSON_PLACHOLDER_URL}`)
            // return handleErrorRequestService(error, JSON_PLACHOLDER_URL);
        }
    };

}


