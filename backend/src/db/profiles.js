/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file provides database requests for profiles
 */
import { query } from './index.js'

const
  // Get all profiles
  getProfilesAll =
    async () => {
      return {
        status: 200,
        data: (await query
          (`SELECT "id", "username", "desc", "saved", "saved_by", "created_at" 
            FROM "profileView"
           `
          )
        ).rows
      }
    },

  // Get all profiles that match the search query
  getProfilesSearch =
    async (key) => {
      const
      c_result =
        await query
          (`SELECT "id", "username", "desc", "saved", "saved_by", "created_at" 
            FROM   "profileView"
            WHERE  lower("username")  LIKE lower($1::VARCHAR || '%')
           `,
           [key]
          );

      return { status: 200, data: c_result.rows }
    },

  // Get all profiles or match the key, if this parameter exists
  getProfiles =
    async (key) => { return key === undefined ? getProfilesAll() : getProfilesSearch(key) },

  // Get a profile by its ID
  getProfileById =
    async (id) => {
      const
      c_result =
        await query
          (`SELECT "id", "username", "desc", "saved", "saved_by", "created_at" 
            FROM   "profileView"
            WHERE  $1::UUID = id
           `,
           [id]
          );

      return { status: 200, data: c_result.rows[0] }
    },

  // Get a profile by its username
  getProfileByName =
    async (username) => {
      const
      c_result =
        await query
          (`SELECT "id", "username", "desc", "saved", "saved_by", "created_at" 
            FROM   "profileView"
            WHERE  $1::VARCHAR = username
           `,
           [username]
          );

      return { status: 200, data: c_result.rows[0] }
    }

export {
  getProfiles,
  getProfileById,
  getProfileByName
}

export default
  {
    getProfiles,
    getProfileById,
    getProfileByName
  }
