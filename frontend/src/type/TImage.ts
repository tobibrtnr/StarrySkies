/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 */

import type TProp from "./TCustomProp";

type TImage = { 
  "id":          string  | undefined,
  "account_id":  string  | undefined,
  "title":       string  | undefined,
  "file":        File    | undefined,
  "image_data":  string  | undefined,
  "desc":        string  | undefined,
  "created_at":  string  | undefined,
  "username":    string  | undefined,
  "savedByUser": boolean | undefined,
  "customProps": Array<TProp>
} 

export default TImage;