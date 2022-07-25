/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file provides database requests for authentication
 */
import { query }  from './index.js'

const
  // Send a new login request
  postLogin =
  async ({ user, password }) => 
  { const result = 
    (await query
     ( `SELECT check_password($1::VARCHAR, $2::VARCHAR) AS "authorized", 
               "id", "isAdmin"
        FROM   account
        WHERE  "username" = $1::VARCHAR OR "email" = $1::VARCHAR
       `, 
       [user, password]
     )
    ).rows[0];

    return result 
           ? { status:  result.authorized ? 200 : 401, 
               id:      result.id, 
               isAdmin: result.isAdmin
             } 
           : { status: 401 }
  },

  // Get if a account is admin
  getIsAdmin =
  async (id) => 
  { const result = 
    (await query
     ( `SELECT "isAdmin" FROM "account" WHERE "id" = $1::UUID`, 
       [id]
     )
    ).rows[0];

    return result
           ? { status: 200, 
               id, 
               isAdmin: result.isAdmin
             }
           : { status: 400,
               id,
               constraint: "account_does_not_exist"  
             }
  }

export
{ postLogin,
  getIsAdmin,
}

export default
{ postLogin,
  getIsAdmin,
}
