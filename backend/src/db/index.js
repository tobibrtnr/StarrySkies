/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file provides helper functions for executing sql queries.
 */
import pg from 'pg'

const 
  { PG_HOST     = 'localhost',
    PG_USER     = 'app',
    PG_PASSWORD = 'default',
    PG_DATABASE = 'starryskies',
    PG_PORT     =  5432, 
  }             = process.env,
  c_pool        = new pg.Pool({'host':     PG_HOST,
                               'user':     PG_USER,
                               'password': PG_PASSWORD,
                               'database': PG_DATABASE,
                               'port':     PG_PORT,
                             }),
       
  query = 
    async (p_sql, p_params) =>
      await c_pool.query(p_sql, p_params),
  
  transaction = 
    async (p_query_callback) =>
    { const c_client = await c_pool.connect();
      try 
      { await c_client.query('BEGIN');
        await p_query_callback(c_client);
        await c_client.query('COMMIT')
      } 
      catch (p_error) 
      { await c_client.query('ROLLBACK')
        throw p_error
      } 
      finally 
      { c_client.release() }
    }

export 
{ query, 
  transaction,
}

export default
{ query, 
  transaction,
}  
