/*************************************************************************************
 * Image REST Functions
 * Author: Tobias Breitenauer
 *************************************************************************************/

BEGIN;

/* Cleanup */

DROP FUNCTION IF EXISTS post_image  (_data JSONB, _file BYTEA);
DROP FUNCTION IF EXISTS delete_image(_id UUID);

/* Functions */
/* POST a new image */

CREATE FUNCTION post_image(_data JSONB, _file BYTEA) RETURNS TABLE ("result" JSONB) 
LANGUAGE plpgsql
AS 
$$
BEGIN 
  RETURN QUERY
  SELECT rest_helper_file -- $1 = _id, $2 = _data, $3 = _file
         ('INSERT INTO "image"("account_id", "image_data", "title", "desc","customProps")
           VALUES(($2->> ''account_id'')::UUID,
                  $3::BYTEA,
                  ($2->> ''title'')::D_UNTAINTED,
                  json_attr_value_d_untainted($2, ''desc'', NULL),
                  json_attr_value_jsonb($2, ''customProps'', NULL)
                 )
          ', 
          _data => _data, _file => _file, _http_status => 201
         );
END
$$
;

/* DELETE an image */

CREATE FUNCTION delete_image(_id UUID) RETURNS TABLE ("result" JSONB) 
LANGUAGE plpgsql
AS 
$$
BEGIN 
  RETURN QUERY
  SELECT rest_helper -- $1 = _id, $2 = _data
         ('DELETE 
           FROM   "image" p
           WHERE  p."id" = $1
          ', 
          _id => _id, _constraint => 'image_does_not_exist'
         );
END
$$
;

/* Save it */

COMMIT;
