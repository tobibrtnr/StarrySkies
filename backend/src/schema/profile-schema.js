
/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file provides the schema for a profile
 */
 
const
  profileSchema =
  { type: "object",
    properties: 
    {
      username:   { type: ["null", "string"],  },
      desc:       { type: ["null", "string"],  },
      saved:      { type: ["null", "number"],  },
      saved_by:   { type: ["null", "number"],  },
      created_at: { type: ["null", "string"], format: "date-time" }
    },
  }

export default profileSchema
