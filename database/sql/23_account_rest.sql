/*************************************************************************************
 * Account REST Functions
 * Authors: Wolfgang Kowarschick, Tobias Breitenauer
 *************************************************************************************/

BEGIN;

/* Cleanup */

DROP FUNCTION IF EXISTS post_account  (          _data JSONB);
DROP FUNCTION IF EXISTS put_account   (_id UUID, _data JSONB);
DROP FUNCTION IF EXISTS patch_account (_id UUID, _data JSONB);
DROP FUNCTION IF EXISTS delete_account(_id UUID);

/* Functions */
/* POST a new account */

CREATE FUNCTION post_account(_data JSONB) RETURNS TABLE ("result" JSONB) 
LANGUAGE plpgsql
AS 
$$
BEGIN 
  RETURN QUERY
  SELECT rest_helper -- $1 = _id, $2 = _data
         ('INSERT INTO "account"("username", "email", "desc", "password", "isAdmin")
           VALUES(($2->> ''username'')::D_USERNAME,
                  ($2->> ''email'')::D_EMAIL,
                  json_attr_value_d_untainted($2, ''desc'', NULL),
                  ($2->>''password'')::TEXT, 
                  COALESCE(($2->>''isAdmin'' )::BOOLEAN, false)
                 )
          ', 
          _data => _data, _http_status => 201
         );
END
$$
;

/* PUT an account */

CREATE FUNCTION put_account(_id UUID, _data JSONB) RETURNS TABLE ("result" JSONB) 
LANGUAGE plpgsql
AS 
$$
BEGIN 
  RETURN QUERY
  SELECT rest_helper -- $1 = _id, $2 = _data
         ('UPDATE "account" a
           SET    "username" = COALESCE(($2->>''username'')::TEXT, a."username"),
                  "email"    = COALESCE(($2->>''email'')::TEXT, a."email"),
                  "desc"    =  json_attr_value_d_untainted($2, ''desc'',     a."desc"),
                  "password" = COALESCE(($2->>''password'')::TEXT, a."password"),
                  "isAdmin"  = COALESCE(($2->>''isAdmin'')::BOOLEAN, false)
           WHERE  a."id" = $1
          ', 
          _id => _id, _data => _data, _constraint => 'account_does_not_exist'
         );
END
$$
;

/* PATCH an account */

CREATE FUNCTION patch_account(_id UUID, _data JSONB) RETURNS TABLE ("result" JSONB) 
LANGUAGE plpgsql
AS 
$$
BEGIN 
  RETURN QUERY
  SELECT rest_helper -- $1 = _id, $2 = _data
         ('UPDATE "account" a
           SET    "username" = json_attr_value_d_username ($2, ''username'', a."username"),
                  "email"    = json_attr_value_d_untainted($2, ''email'',    a."email"),
                  "desc"    =  json_attr_value_d_untainted($2, ''desc'',     a."desc"),
                  "password" = json_attr_value_not_null   ($2, ''password'', a."password")::TEXT,
                  "isAdmin"  = json_attr_value_not_null   ($2, ''isAdmin'',  a."isAdmin"::TEXT)::TEXT::BOOLEAN
           WHERE  a."id" = $1
          ', 
          _id => _id, _data => _data, _constraint => 'account_does_not_exist'
         );
END
$$
;

/* DELETE an account */

CREATE FUNCTION delete_account(_id UUID) RETURNS TABLE ("result" JSONB) 
LANGUAGE plpgsql
AS 
$$
BEGIN 
  RETURN QUERY
  SELECT rest_helper -- $1 = _id, $2 = _data
         ('DELETE 
           FROM   "account" a
           WHERE  a."id" = $1
          ', 
          _id => _id, _constraint => 'account_does_not_exist'
         );
END
$$
;

/* Save it */

COMMIT;
