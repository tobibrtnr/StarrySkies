/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file provides database requests for saved accounts.
 */
import { query } from './index.js'

const
  // Get all profiles a user has saved
  getSaved =
    async (username) => {
      return {
        status: 200,
        data: (await query
          (`SELECT sa."saved_id" as id, a2."username", sa."saved_at"
                   FROM   "saved_accounts" sa
                   JOIN   "account" a
                   ON     sa."account_id" = a."id"
                   JOIN   "account" a2
                   ON     sa."saved_id" = a2."id"
                   WHERE a."username" = $1
                  `,
            [username]
          )
        ).rows
      }
    },

  // Get all profiles that saved a user
  getSavedBy =
    async (username) => {
      return {
        status: 200,
        data: (await query
          (`SELECT sa."account_id" as id, a2."username", sa."saved_at"
                 FROM   "saved_accounts" sa
                 JOIN   "account" a
                 ON     sa."saved_id" = a."id"
                 JOIN   "account" a2
                 ON     sa."account_id" = a2."id"
                 WHERE a."username" = $1
                `,
            [username]
          )
        ).rows
      }
    },

  // Create a new saved account relation
  postSave =
    async (id, saved_id) => {
      const
        c_result =
          await query
            (`SELECT "result" FROM post_saved_account($1, $2)`, [id, saved_id])

      return c_result.rows[0]
    },

  // Delete a saved account relation
  deleteSave =
    async (id, saved_id) => {
      const
        c_result =
          await query
            (`SELECT "result" FROM delete_saved_account($1, $2)`, [id, saved_id])

      return c_result.rows[0]
    },

  // Get if a account is saved by another profile
  isSavedBy =
    async (username, otheruser) => {
      return {
        status: 200,
        data: {
          saved: (await query(
            `SELECT 1 FROM saved_accounts sa
         JOIN account a
           ON a."id" = sa."saved_id"
         JOIN account a2
           ON a2."id" = sa."account_id"
         WHERE a."username" = $1
           AND a2."username" = $2`,
            [username, otheruser]
          )).rows.length === 1
        }
      }
    }

export {
  getSaved,
  getSavedBy,
  postSave,
  deleteSave,
  isSavedBy
}

export default
  {
    getSaved,
    getSavedBy,
    postSave,
    deleteSave,
    isSavedBy
  }
