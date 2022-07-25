/*************************************************************************************
 * Profile View
 * Author: Tobias Breitenauer
 *************************************************************************************/

/* *** Schema *** */
BEGIN;

/* Cleanup */

DROP VIEW IF EXISTS "profileView" CASCADE;

/* Table */
/* Get Profile information with amount of users saved / saved by the profile */

CREATE VIEW "profileView" 
AS
SELECT a.id, a.username, a."desc", COALESCE(sa.saved, 0) as saved, COALESCE(sab.saved_by, 0) as saved_by, a.created_at
FROM account a
LEFT JOIN (SELECT account_id, COUNT(*) as saved
     FROM saved_accounts
     GROUP BY account_id) sa
ON a.id = sa.account_id
LEFT JOIN (SELECT saved_id, COUNT(*) as saved_by
     FROM saved_accounts
     GROUP BY saved_id) sab
ON a.id = sab.saved_id;

COMMIT;
