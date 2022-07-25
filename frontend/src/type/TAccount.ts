/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 */

type TAccount =
{ "id":         string,
  "username":   string | undefined,
  "password":   string | undefined,
  "email":      string | undefined,
  "desc":       string | undefined,
  "isAdmin":    boolean | undefined,
  "stay":       boolean | undefined,
  "created_at": string|undefined
} 

export default TAccount;