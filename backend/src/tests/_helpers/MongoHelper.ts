import { MongoClient, Collection, Db } from 'mongodb';

let client: MongoClient | null = null;
let uri: string;

export default class MongoHelper {
    static async createConnection(uriString: string): Promise<void> {
        uri = uriString;
        client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    static async connect(): Promise<Db> {
        await this.createConnection(process.env.MONGO_URL || '');
        return client?.db() as Db;
    }

    static async disconnect(): Promise<void> {
        if (client) {
            await client.close();
            client = null;
        }
    }

    static async getCollection(name: string): Promise<Collection> {
        if (!client?.isConnected()) {
            await this.createConnection(uri);
        }
        return (client as MongoClient).db().collection(name);
    }
}
