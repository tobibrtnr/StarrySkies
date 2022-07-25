/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file provides database requests for saved images.
 */
import { query } from './index.js'

const
  // Get all images a user has saved
  getSaved =
    async (username) => {
      return {
        status: 200,
        data: (await query
          (`SELECT sa."saved_id" as id, sa."saved_at"
                   FROM   "saved_images" sa
                   JOIN   "account" a
                   ON     sa."account_id" = a."id"
                   WHERE a."username" = $1
                  `,
            [username]
          )
        ).rows
      }
    },

  // Create a new saved image relation
  postSave =
    async (id, saved_id) => {
      const
      c_result =
        await query
          (`SELECT "result" FROM post_saved_image($1, $2)`, [id, saved_id])

      return c_result.rows[0]
    },

  // Delete a saved image relation
  deleteSave =
    async (id, saved_id) => {
      const
      c_result =
        await query
          (`SELECT "result" FROM delete_saved_image($1, $2)`, [id, saved_id])

      return c_result.rows[0]
    },

  // Get if a image is saved by a user
  isSavedBy =
    async (username, image_id) => {
      return {
        status: 200,
        data: {
          saved: (await query(
            `SELECT 1 FROM saved_images sa
         JOIN account a
           ON a."id" = sa."account_id"
         WHERE a."username" = $1
           AND sa."saved_id" = $2`,
            [username, image_id]
          )).rows.length === 1
        }
      }
    }

export {
  getSaved,
  postSave,
  deleteSave,
  isSavedBy
}

export default
  {
    getSaved,
    postSave,
    deleteSave,
    isSavedBy
  }
