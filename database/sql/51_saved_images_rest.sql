/*************************************************************************************
 * Saved Images REST Functions
 * Author: Tobias Breitenauer
 *************************************************************************************/

BEGIN;

/* Cleanup */

DROP FUNCTION IF EXISTS   post_saved_image(_id UUID, _saved_id UUID);
DROP FUNCTION IF EXISTS delete_saved_image(_id UUID, _saved_id UUID);

/* Functions */
/* POST a relation (save an image) */

CREATE FUNCTION post_saved_image(_id UUID, _saved_id UUID) RETURNS TABLE ("result" JSONB) 
LANGUAGE plpgsql
AS 
$$
BEGIN 
  RETURN QUERY
  SELECT rest_helper_save -- $1 = _id, $2 = _data
         ('INSERT INTO "saved_images"("account_id", "saved_id")
           VALUES($1, $2)
          ', 
          _id => _id, _saved_id => _saved_id, _http_status => 201
         );
END
$$
;

/* DELETE a relation (unsave an image) */

CREATE FUNCTION delete_saved_image(_id UUID, _saved_id UUID) RETURNS TABLE ("result" JSONB) 
LANGUAGE plpgsql
AS 
$$
BEGIN 
  RETURN QUERY
  SELECT rest_helper_save -- $1 = _id, $2 = _data
         ('DELETE 
           FROM   "saved_images" sp
           WHERE  sp."account_id" = $1
              AND sp."saved_id" = $2
          ', 
          _id => _id, _saved_id => _saved_id, _constraint => 'save_does_not_exist'
         );
END
$$
;

/* Save it */

COMMIT;
