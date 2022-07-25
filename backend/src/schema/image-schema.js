
/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file provides the schema for an image
 */
 const
  imageSchema =
  { type: "object",
    properties: 
    {
      account_id:   { type: ["null", "string"],  format: "uuid", },
      desc:         { type: ["null", "string"],  },
      created_at:   { type: ["null", "string"], format: "date-time" }
    },
  }

export default imageSchema
