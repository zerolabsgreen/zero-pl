import { Request } from 'express';
import { Strategy as PassportStrategy } from 'passport-strategy';

export default class AnonymousStrategyImppl extends PassportStrategy {

    constructor() {
        super();
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    authenticate(req: Request, options?: any){

    };
}
