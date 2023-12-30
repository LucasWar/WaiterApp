import { Server } from 'socket.io';
import http from 'node:http';
import express from 'express';
import mongoose from 'mongoose';
import {router} from './router';
import path from 'node:path';

const app = express();

const port = 3001;
const serve =  http.createServer(app);
export const io = new Server(serve);

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017')
  .then(() => {
    console.log('Conectado com o banco');


    app.use((req,res,next) => {
      res.header('Access-Control-Allow-Origin','*');
      res.header('Access-Control-Allow-Methods','*');
      res.header('Access-Control-Allow-Headers','*');

      next();
    });
    app.use('/uploads',express.static(path.resolve(__dirname,'..','uploads')));
    app.use(express.json());
    app.use(router);

    serve.listen(port, () => {
      console.log(`Serve esta on port:http://localhost:${port}`);
    });

  })
  .catch((err) => console.log(err));


