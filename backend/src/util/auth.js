/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file handles user authentication.
 * see https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
 */
import jwt          from 'jsonwebtoken'
import {getIsAdmin} from '../db/auth.js'

const
{ TOKEN_SECRET = 'Please set the secret value in .env: TOKEN_SECRET=...' }
  = process.env

function isNotAuthorized(req, res, next) 
{ if (req.headers['authorization'] == null) 
  { next() }
  else 
  { return res.status(400).json({message: 'already authorized'}) }
}

function isAuthorized(req, res, next) 
{ const 
    c_auth_header = req.headers['authorization'], // Bearer ex237ez....
    c_token       = c_auth_header && c_auth_header.split(' ')[1];

  if (c_token == null) 
  { return res.status(401).json({message: 'not authorized'}) }
  jwt.verify
  ( c_token, 
    TOKEN_SECRET, 
    (err, payload) => 
    {
      if (err) 
      { return res.status(401).json({message: 'not autorized'}) }

      req.id      = payload.id;
      req.isAdmin = payload.isAdmin;
      next();
    }
  )
}

async function isAdmin(req, res, next) 
{ if (!((await getIsAdmin(req.id))?.isAdmin))
  { return res.status(401).json({message: 'not authorized'}) }
  next();
}

async function isNotAdmin(req, res, next) 
{ if (!((await getIsAdmin(req.id))?.isAdmin))
  { next() }
}

export
{ isAuthorized,
  isNotAuthorized,
  isAdmin,
  isNotAdmin,
}

export default
{ isAuthorized,
  isNotAuthorized,
  isAdmin,
  isNotAdmin,
}
