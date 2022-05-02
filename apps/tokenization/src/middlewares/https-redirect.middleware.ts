import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from "express";

@Injectable()
export class HttpsRedirectMiddleware implements NestMiddleware {
    constructor(private readonly configService: ConfigService) {}

    use(req: Request, res: Response, next: () => void) {
        if (!req.secure && this.configService.get('NODE_ENV') == 'production') {
            const httpsUrl = `https://${req.hostname}${req.originalUrl}`;
            res.redirect(HttpStatus.PERMANENT_REDIRECT, httpsUrl);
        } else {
            next();
        }
    }
}