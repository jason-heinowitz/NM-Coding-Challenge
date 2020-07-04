import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import modules from './modules';

const app = express();
const PORT = 5000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  // do not listen if testing
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
}

app.use('/ping', modules.ping);
app.use('/auth', modules.auth);
app.use('/email', modules.email);

// catch all
app.use('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  next({
    code: 404,
    message: 'Sorry - this resource cannot be found.',
    log: `User failed request: ${req.method} - ${req.originalUrl}`,
  });
});

// structure if error in application
interface NextError {
  log: string;
  code: number;
  message: string;
}

app.use((err: NextError, req: express.Request, res: express.Response, next: express.NextFunction) =>
  // err MUST be in format:
  // { code: status code, message: message to user, log: message to server operator }
  res.status(err.code).json({ error: err.message }));

// export to expedite testing implementation
module.exports = app;
