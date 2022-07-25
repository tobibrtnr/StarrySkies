/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file handles user authentication.
 * see https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
 */
import Router              from 'express-promise-router'
import jwt                 from 'jsonwebtoken'
import validate            from '../schema/validate.js'
import accountSchema       from '../schema/account-schema.js'
import accountsDB          from '../db/accounts.js'
import { isNotAuthorized } from '../util/auth.js'
import dbAuth              from '../db/auth.js'
import bannedNames         from '../util/bannedNames.js'

const 
  auth            = Router(),
  { TOKEN_SECRET  = 'Please set the secret value in .env: TOKEN_SECRET=...', 
    TOKEN_EXPIRES = 86400000,
  }               = process.env,
  refreshToken    =
    (req, res, next) =>
    { const
      token = jwt.sign
              ({id: req.id, isAdmin: req.isAdmin}, 
               TOKEN_SECRET, 
               {expiresIn: TOKEN_EXPIRES}
              )
      res.set('Authorization', `Bearer ${token}`);
      next()
    }

auth.post
// POST request for login
( '/login', isNotAuthorized,
  async (req, res) => 
  { const 
      {status, id, isAdmin} = await dbAuth.postLogin(req.body)
    
    if (status === 200)
    { const
        token = jwt.sign
                ({id, isAdmin}, 
                 TOKEN_SECRET, 
                 {expiresIn: parseInt(TOKEN_EXPIRES)}
                )

      res.set('Authorization', `Bearer ${token}`)
         .status(status).json({ message: 'logged in'}); 
    }
    else
    { res.status(status).json({ message: 'not logged in'}) } 
  }  
),

auth.post
// POST request for registering
( '/register', isNotAuthorized, validate({ body: accountSchema }),
  async (req, res) => 
  { 
    // Only admins can set an account to be an admin account.
    if (req.body.isAdmin) {
      { return res.status(401).json({message: 'not authorized'}) }
    }
    req.body.username = req.body.username?.trim()

    // If the registered name is banned (e.g. login), do not allow registering
    if(req.body.username && bannedNames.includes((req.body.username).toLowerCase())) {
      { return res.status(400).json({constraint: 'banned_name'}) }
    }

    const 
      {result} = await accountsDB.postAccount(req.body),
      proxy    = req.headers["x-forwarded-host"],
      host     = proxy ? proxy : req.headers.host

    res.set('Location', `${req.protocol}://${host}${req.baseUrl}/${result.id}`)
       .status(result.status)
       .json(result)
  } 
);

export
{ auth, 
  refreshToken,
}

export default 
{ auth, 
  refreshToken,
}
