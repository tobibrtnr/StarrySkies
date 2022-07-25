/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 */

type TErrorMessage = { 
  "properties": Array<string>, 
  "message":    string | null
} | null | undefined
 
export default TErrorMessage;