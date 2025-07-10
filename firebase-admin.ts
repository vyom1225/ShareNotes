import {
    initializeApp,
    getApps,
    getApp,
    cert,
    App
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore"; 

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string);

let app: App;

if(getApps().length === 0) {
    app = initializeApp({
        credential: cert({
            projectId: serviceAccount.project_id,
            clientEmail: serviceAccount.client_email,
            privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"),
        })
    });
}else{
    app = getApp();
}

const adminDb = getFirestore(app);

export { adminDb , app as adminApp };