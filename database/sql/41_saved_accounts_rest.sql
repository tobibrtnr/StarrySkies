/*************************************************************************************
 * Saved Account REST Functions
 * Author: Tobias Breitenauer
 *************************************************************************************/

BEGIN;

/* Cleanup */

DROP FUNCTION IF EXISTS   post_saved_account(_id UUID, _saved_id UUID);
DROP FUNCTION IF EXISTS delete_saved_account(_id UUID, _saved_id UUID);

/* Functions */
/* POST a new relation (save an account) */

CREATE FUNCTION post_saved_account(_id UUID, _saved_id UUID) RETURNS TABLE ("result" JSONB) 
LANGUAGE plpgsql
AS 
$$
BEGIN 
  RETURN QUERY
  SELECT rest_helper_save -- $1 = _id, $2 = _data
         ('INSERT INTO "saved_accounts"("account_id", "saved_id")
           VALUES($1, $2)
          ', 
          _id => _id, _saved_id => _saved_id, _http_status => 201
         );
END
$$
;

/* DELETE a relation (unsave an account) */

CREATE FUNCTION delete_saved_account(_id UUID, _saved_id UUID) RETURNS TABLE ("result" JSONB) 
LANGUAGE plpgsql
AS 
$$
BEGIN 
  RETURN QUERY
  SELECT rest_helper_save -- $1 = _id, $2 = _data
         ('DELETE 
           FROM   "saved_accounts" sp
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
