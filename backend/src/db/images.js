/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file provides database requests for images
 */
import { query } from './index.js'

const
  // Get all images from the database
  getImagesAll =
    async () => {
      return {
        status: 200,
        data: (await query
          (`SELECT "id", "account_id", "title", "desc", "created_at"
            FROM   "image"
            ORDER BY "created_at" DESC
           `
          )
        ).rows
      }
    },

  // Get images of an username
  getImagesByAccount =
    async (username) => {
      const
      c_result =
        await query
          (`SELECT p."id", p."account_id", p."title", p."desc", p."created_at"
            FROM   "image" p
            JOIN account a ON a."id" = p."account_id"
            WHERE  a.username = $1::VARCHAR
            ORDER BY p."created_at" DESC
           `,
           [username]
          );

      return { status: 200, data: c_result.rows }
    },

  // Get all images or by username, depending of the parameter
  getImages =
    async (username) => { return username ? getImagesByAccount(username) : getImagesAll() },

  // Get an image by its ID.
  getImage =
    async (id) => {
      const
      c_result =
        await query
          (`SELECT p."id", p."account_id", a."username", encode(p."image_data", 'base64') as "image_data", p."title", p."desc", p."customProps", p."created_at"
            FROM   "image" p
            JOIN account a
            ON p."account_id" = a."id"
            WHERE  $1::UUID = p.id
           `,
           [id]
          );

      return { status: 200, data: c_result.rows[0] }
    },

  // Upload a new image to the database
  postImage =
    async (data, file) => {
      const
        c_result =
          await query
            (`SELECT "result" FROM post_image($1, $2)`, [data, file])

      return c_result.rows[0]
    },

  // Delete a image from the database
  deleteImage =
    async (id) => {
      const
      c_result =
        await query
          (`SELECT "result" FROM delete_image($1)`, [id])

      return c_result.rows[0]
    },

  // Get the newest 12 images.
  getNewestImages =
    async () => {
      const
        c_result =
          await query(
            `SELECT "id" 
             FROM "image"
             ORDER BY "created_at" DESC
             LIMIT 12`
          )
      return { status: 200, data: c_result.rows }
    },

  // Get the image feed of a username
  getFeed =
    async (username) => {
      const
        c_result =
          await query(
            `SELECT i."id"
             FROM "image" i
             WHERE "account_id" IN (SELECT sa."saved_id" as "account_id"
                                    FROM "saved_accounts" sa
                                    JOIN "account" a
                                      ON a."id" = sa."account_id"
                                    WHERE a."username" = $1)
              ORDER BY "created_at" DESC
              LIMIT 12`,
            [username]
          )
      return { status: 200, data: c_result.rows }
    }

export {
  getImage,
  getImages,
  postImage,
  deleteImage,
  getNewestImages,
  getFeed
}

export default
  {
    getImage,
    getImages,
    postImage,
    deleteImage,
    getNewestImages,
    getFeed
  }
