/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 */

import type TAccount from '@/type/TAccount'

const defaultAccount = (): TAccount => {
  return {
    id:         '',
    username:   undefined,
    password:   undefined,
    desc:       undefined,
    email:      undefined,
    isAdmin:    false,
    stay:       false,
    created_at: undefined
  }
}

export default defaultAccount
