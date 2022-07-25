/*************************************************************************************
 * Saved Accounts Table
 * Author: Tobias Breitenauer
 *************************************************************************************/

/* *** Schema *** */
BEGIN;

/* Cleanup */

DROP TABLE IF EXISTS "saved_accounts" CASCADE;

/* Tables */
CREATE TABLE "saved_accounts"
("account_id"       UUID,
 "saved_id"         UUID,
 "saved_at"         TIMESTAMP NOT NULL DEFAULT NOW(),

 CONSTRAINT pk_saved_accounts
 PRIMARY KEY ("account_id", "saved_id"),
 
 CONSTRAINT sa_check_save
    CHECK("account_id" <> "saved_id"),

 CONSTRAINT fk_account
     FOREIGN KEY("account_id")
         REFERENCES "account"("id") ON DELETE CASCADE,
 CONSTRAINT fk_saved_account
     FOREIGN KEY("saved_id")
         REFERENCES "account"("id") ON DELETE CASCADE 
);

COMMIT;
