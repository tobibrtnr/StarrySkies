/*************************************************************************************
 * Image Table
 * Author: Tobias Breitenauer
 *************************************************************************************/

/* *** Schema *** */
BEGIN;

/* Cleanup */

DROP TABLE IF EXISTS "image" CASCADE;;

/* Tables */
CREATE TABLE "image"
("id"            UUID        DEFAULT gen_random_uuid(),
 "account_id"    UUID,
 "image_data"    BYTEA,
 "title"         D_UNTAINTED,
 "desc"          D_UNTAINTED,
 "customProps"   JSONB,
 "created_at"    TIMESTAMP   NOT NULL DEFAULT NOW(),

 CONSTRAINT image_pk
 PRIMARY KEY ("id"),

 CONSTRAINT image_check_account_id
 CHECK ("account_id" IS NOT NULL),

 CONSTRAINT image_check_image_data
 CHECK ("image_data" IS NOT NULL),

 CONSTRAINT image_check_title
 CHECK ("title" IS NOT NULL AND "title" <> ''),

 CONSTRAINT image_fk_account
     FOREIGN KEY(account_id)
         REFERENCES account(id) ON DELETE CASCADE
);

CREATE INDEX image_account_id ON image (account_id);

COMMIT;
