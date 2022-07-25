/*************************************************************************************
 * Account Table
 * Authors: Wolfgang Kowarschick, Tobias Breitenauer
 *************************************************************************************/

/* *** Schema *** */
BEGIN;

/* Cleanup */

DROP TABLE IF EXISTS account CASCADE;

DROP FUNCTION IF EXISTS  encrpyt_password_function          CASCADE;
DROP FUNCTION IF EXISTS  check_password                     CASCADE;
DROP FUNCTION IF EXISTS  lowercase_username_email_on_insert CASCADE;

/* Account Table */

CREATE TABLE account
("id"               UUID        DEFAULT gen_random_uuid(),
 "username"         D_USERNAME,
 "desc"             D_UNTAINTED,
 "email"            D_EMAIL,
 "password"         VARCHAR,
 "isAdmin"          BOOLEAN NOT NULL DEFAULT false,
 "created_at"       TIMESTAMP NOT NULL DEFAULT NOW(),

 CONSTRAINT account_pk
 PRIMARY KEY ("id"),

 CONSTRAINT account_check_username
 CHECK ("username" IS NOT NULL AND "username" <> ''),

 CONSTRAINT account_unique_username
 UNIQUE ("username"),

 CONSTRAINT account_check_email
 CHECK ("email" IS NOT NULL AND "email" <> ''),

 CONSTRAINT account_unique_email
 UNIQUE ("email"),

 CONSTRAINT account_check_password
 CHECK ("password" IS NOT NULL AND "password" <> '')
);

/* Indexes for faster search */

CREATE UNIQUE INDEX account_username ON account ("username");
CREATE UNIQUE INDEX account_email    ON account ("email");

/* Tables: Triggers and Functions */

CREATE FUNCTION encrpyt_password_function() 
       RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$
  BEGIN -- A new "password" is salted and hashed.
    IF ( TG_OP = 'INSERT' OR 
         (TG_OP = 'UPDATE' AND NEW."password" <> OLD."password")
       ) 
      THEN 
        IF (NEW."password" <> '')
          THEN NEW."password" = crypt(NEW."password", gen_salt('bf',12));  
          ELSE NEW."password" = '';
        END IF;
    END IF;

    RETURN NEW;
  END
$$
;

CREATE TRIGGER encrpyt_password_trigger 
BEFORE INSERT OR UPDATE
ON account
FOR EACH ROW 
  EXECUTE PROCEDURE encrpyt_password_function()
;

CREATE FUNCTION lowercase_username_email_on_insert() RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$
  BEGIN
    NEW.username = LOWER(NEW.username);
    NEW.email    = LOWER(NEW.email);
    RETURN NEW;
  END
$$
;

CREATE TRIGGER lowercase_username_email_on_insert_trigger
BEFORE INSERT OR UPDATE
ON account
FOR EACH ROW
  EXECUTE PROCEDURE lowercase_username_email_on_insert();

/* Raises an exception if no admin exists */

CREATE FUNCTION one_admin_exists_function() RETURNS TRIGGER 
LANGUAGE plpgsql
AS
$$
  BEGIN
    IF NOT EXISTS (SELECT * FROM account WHERE "isAdmin" = true)
      THEN RAISE EXCEPTION 'account_one_admin_exists';
    END IF;
    RETURN NULL;
  END
$$
;

/* Triggers to check if at least one admin exists */

CREATE CONSTRAINT TRIGGER one_admin_exists_delete
AFTER DELETE 
ON account
NOT DEFERRABLE
FOR EACH ROW
  EXECUTE PROCEDURE one_admin_exists_function()
;

CREATE CONSTRAINT TRIGGER one_admin_exists_update
AFTER UPDATE
ON account
NOT DEFERRABLE
FOR EACH ROW
  WHEN (OLD."isAdmin" = true AND NEW."isAdmin" = false)
  EXECUTE PROCEDURE one_admin_exists_function()
;

COMMIT;
