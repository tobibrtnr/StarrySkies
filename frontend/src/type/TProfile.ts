/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 */

type TProfile = { 
  "id":          string  | undefined,
  "username":    string  | undefined,
  "desc":        string  | undefined,
  "saved":       number  | undefined,
  "saved_by":    number  | undefined,
  "created_at":  string  | undefined,
  "savedByUser": boolean | undefined
} 

export default TProfile;