import { Handler, NextFunction, Request, Response } from 'express';

export default function authenticateWithAzureAD(passport: any): Handler {
  return(req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('azuread-openidconnect', {
      failureRedirect: '/',
      keepSessionInfo: true,
      response: res,
    })(res, req, next);
  };
}