import { Request } from 'express';
import { Strategy as PassportStrategy } from 'passport-strategy';

export default class AnonymousStrategyImppl extends PassportStrategy {
    
    constructor() {
        super();
    }

    authenticate(req: Request, options?: any){

    };
}