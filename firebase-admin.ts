import {
    initializeApp,
    getApps,
    getApp,
    cert,
    App
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore"; 

const servicekey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string;

let app: App;

if(getApps().length === 0) {
    app = initializeApp({
        credential: cert(servicekey)
    });
}else{
    app = getApp();
}

const adminDb = getFirestore(app);

export { adminDb , app as adminApp };