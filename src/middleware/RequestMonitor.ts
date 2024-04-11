import { RequestHandler } from "express";

const RequestMonitor:RequestHandler = (req, res, next) => {
  const Start = Date.now();
  next();
  console.log({
    route: req?.route?.path,
    method: req.method,
    header: req?.headers?.accept,
    timeTocomplete: Date.now() - Start,
  });
};


export default RequestMonitor