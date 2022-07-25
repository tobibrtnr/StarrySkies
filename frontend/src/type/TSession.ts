/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 */

import type TErrorMessage from './TErrorMessage'

type TSession = {
  "token":        string | null,
  "errorMessage": TErrorMessage,
  "isAdmin":      boolean,
} 

export default TSession;