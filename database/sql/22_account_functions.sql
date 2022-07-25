/*************************************************************************************
 * Account: Functions
 * Author: Wolfgang Kowarschick
 *************************************************************************************/

BEGIN;

/* Cleanup */

DROP FUNCTION IF EXISTS check_password CASCADE;

/* Passwords */

-- check_password
-- Returns TRUE if the user password is correct.
-- usr: user name or email address
-- pw:  password not encrypted
CREATE 
  FUNCTION check_password(usr TEXT, pw TEXT) 
  RETURNS BOOLEAN 
  RETURNS NULL ON NULL INPUT
  LANGUAGE SQL
AS
$$
  SELECT EXISTS
         (SELECT * 
          FROM   account
          WHERE  LOWER(usr) IN ("username", "email") AND "password" = crypt(pw, "password")
         );
$$
;

/* Save it */

COMMIT;
