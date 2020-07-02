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

// serve bundle.js in prod for every url
if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));

  // serve index.html on the route '/'
  app.get('/*', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });

  app.listen(80); // listens on port 80 -> http://localhost/
} else if (process.env.NODE_ENV === 'development') {
  // do not listen if testing
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
}

app.use('/ping', modules.ping);

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

app.use((err: NextError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // err MUST be in format:
  // { code: status code, message: message to user, log: message to server operator }
  console.log(err.log);
  return res.status(err.code).json({ message: err.message });
});

// export to expedite testing implementation
module.exports = app;
