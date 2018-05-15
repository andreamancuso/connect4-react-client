import {ConfigService} from "./config.service";
import {initFirestore} from "./firestore.client";
import {PROVIDER_FIRESTORE} from "./constants";

export const firestoreFactory = {
    provide: PROVIDER_FIRESTORE,
    useFactory: (configService: ConfigService) => {
        return initFirestore({
            apiKey: configService.fbApiKey,
            projectId: configService.fbProjectId,
            authDomain: `${configService.fbProjectId}.firebaseapp.com`
        })
    },
    inject: [ConfigService],
};
