/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file provides database requests for accounts
 */
import { query }  from './index.js'

const
  // Get all acounts from the database
  getAccountsAll =
    async () => 
    { return {
        status: 200,
        data:   (await query
                 (`SELECT "id", "username", "email", "isAdmin", "desc", "created_at"
                   FROM   "account"
                  `
                 )
                ).rows
      }  
    },

  // Get a account by its ID or username or email
  getAccountSearch =
  async (key) => 
  { const 
      c_uuid_regex = 
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      c_result = // UUID and CARCHAR are not type compatible. So, a combined OR-query would fail.
        key.match(c_uuid_regex)
        ? await query
          (`SELECT "id", "username", "email", "isAdmin", "desc", "created_at" 
            FROM   "account"
            WHERE  "id" = $1::UUID
           `,
           [key]
          )
        : await query
          (`SELECT "id", "username", "email", "isAdmin", "desc", "created_at"
            FROM   "account"
            WHERE  lower("username")  LIKE lower($1::VARCHAR || '%') OR 
                   lower("email") LIKE lower($1::VARCHAR || '%')
           `,
           [key]
          );
  
    return { status: 200, data: c_result.rows}
  },

  // Get all accounts or by key, depending on the parameter
  getAccounts =
  async (key) => 
  { return key ? getAccountSearch(key) : getAccountsAll() },

  // Get an account by its ID
  getAccount =
  async (id) => 
  { const 
      c_result = 
      await query
      ( `SELECT "id", "username", "email", "isAdmin", "desc", "created_at"
         FROM   "account"
         WHERE  $1::UUID = id
        `, 
        [id]
      );

    return { status: 200, data: c_result.rows[0]} 
  },
  
  // Create a new account
  postAccount =
  async (data) => 
  { const 
      c_result =
      await query
      ( `SELECT "result" FROM post_account($1)`, [data])

    return c_result.rows[0]
  },
  
  // Edit an existing account
  putAccount =
  async (id, data) => 
  { const 
      c_result =
      await query
      ( `SELECT "result" FROM put_account($1, $2)`, [id, data])

    return c_result.rows[0]
  },

  // Edit an existing account
  patchAccount =
  async (id, data) => 
  { const 
      c_result =
      await query
      ( `SELECT "result" FROM patch_account($1, $2)`, [id, data])

    return c_result.rows[0]
  },

  // Delete an account
  deleteAccount =
  async (id) => 
  { const 
      c_result = 
      await query
      ( `SELECT "result" FROM delete_account($1)`, [id])
  
    return c_result.rows[0]
  }
  
export
{ getAccounts,
  postAccount,
  getAccount,
  putAccount,
  patchAccount,
  deleteAccount,
}

export default
{ getAccounts,
  postAccount,
  getAccount,
  putAccount,
  patchAccount,
  deleteAccount,
}
