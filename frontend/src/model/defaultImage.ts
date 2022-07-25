/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 */

import type TImage from '@/type/TImage'

const defaultImage = () : TImage => {
  return {
    id:          undefined,
    account_id:  undefined,
    title:       undefined,
    desc:        undefined,
    file:        undefined,
    image_data:  undefined,
    created_at:  undefined,
    username:    undefined,
    savedByUser: undefined,
    customProps: new Array<{key: string, value: string}>()
  }
}

export default defaultImage
