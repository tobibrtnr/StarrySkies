
/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file provides the schema for a save relation
 */
 
const
  saveSchema =
  { type: "object",
    properties: 
    { 
      id:       { type: ["null", "string"],  format: "uuid", },
      saved_id: { type: ["null", "string"],  format: "uuid", }
    },
  }

export default saveSchema
