import {ConfigService} from "./config.service";
import {initFirestore} from "./firestore.client";

export const firestoreFactory = {
    provide: 'Firestore',
    useFactory: (configService: ConfigService) => {
        return initFirestore({
            apiKey: configService.fbApiKey,
            projectId: configService.fbProjectId,
            authDomain: `${configService.fbProjectId}.firebaseapp.com`
        })
    },
    inject: [ConfigService],
};
