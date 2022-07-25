/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file provides the schema for an account
 */
const
  accountSchema =
  { type: "object",
    properties: 
    { 
      username:   { type: ["null", "string"],  },
      email:      { type: ["null", "string"],  },
      password:   { type: ["null", "string"],  },
      isAdmin:    { type: ["null", "boolean"], default: false, },
      created_at: { type: ["null", "string"], format: "date-time" }
    },
  }

export default accountSchema
