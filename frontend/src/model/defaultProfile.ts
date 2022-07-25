/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 */

import type TProfile from '@/type/TProfile'

const defaultProfile = (): TProfile => {
  return { 
    id:          undefined,
    username:    undefined,
    desc:        undefined,
    saved:       undefined,
    saved_by:    undefined,
    created_at:  undefined,
    savedByUser: undefined
  }
}

export default defaultProfile
