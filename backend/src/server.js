/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 */
import express from 'express'

import * as uuid           from 'uuid'
import { auth }            from './routes/auth.js'
import { accounts }        from './routes/accounts.js'
import { profiles }        from './routes/profiles.js'
import { images }          from './routes/images.js'
import upload              from './routes/upload.js'
import save                from './routes/save.js'
import { ValidationError } from 'express-json-validator-middleware'

import fileupload          from "express-fileupload"

const 
  { PORT   = 4000, 
    SERVER = `http://localhost:${PORT}`,
  }        = process.env,
  c_app    = express(),
  c_uuid   = uuid.v4;

// Middleware that automatically converts incoming data into JSON:
c_app.use(express.json());
// Use express-fileupload for uploading images
c_app.use(fileupload());

c_app.use('/v1',          auth);
c_app.use('/v1',          upload);
c_app.use('/v1/save',     save);
c_app.use('/v1/accounts', accounts);
c_app.use('/v1/profiles', profiles);
c_app.use('/v1/images',   images);

// For testing purposes sometimes a uuid is needed.
c_app.get('/v1/uuid', (req, res) => res.status(200).json(c_uuid()));

c_app.use((error, req, res, next) => 
          { if (error instanceof ValidationError) 
            {  res.status(400).send(error.validationErrors);
               next();
            } 
            else 
            { next(error); }
          }
         );

c_app.listen(PORT);

console.log(`Running on ${SERVER}`);
