import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

export interface EnvConfig {
    [prop: string]: string;
}

export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filePath = `.env.${process.env.NODE_ENV}`) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }

    /**
     * Ensures all needed variables are set, and returns the validated JavaScript object
     * including the applied default values.
     */
    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid(['development', 'production', 'test'])
                .default('development'),
            PORT: Joi.number().default(3000),
            FB_API_KEY: Joi.string().required(),
            FB_PROJECT_ID: Joi.string().required(),
        });

        const { error, value: validatedEnvConfig } = Joi.validate(
            envConfig,
            envVarsSchema,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    get fbApiKey(): string {
        return String(this.envConfig.FB_API_KEY);
    }

    get fbProjectId(): string {
        return String(this.envConfig.FB_PROJECT_ID);
    }
}