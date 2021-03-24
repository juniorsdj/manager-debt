import { Db } from 'mongodb';

import ApplicationServer from '../server';
import MongoHelper from './_helpers/MongoHelper';

describe('ApplicationServer - Init', () => {
    let server: ApplicationServer;
    let db: Db;

    beforeAll(async () => {
        db = await MongoHelper.connect();
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    describe('setupApp', () => {
        it('should setup the app', async () => {
            server = new ApplicationServer(db);
            const app = await server.setupApp();

            expect(app).toBeTruthy();
            expect(server.mongoDb).toBeTruthy();
        });
    });
});
