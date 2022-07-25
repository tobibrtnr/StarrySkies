/*************************************************************************************
 * Saved Images Table
 * Author: Tobias Breitenauer
 *************************************************************************************/

/* *** Schema *** */
BEGIN;

/* Cleanup */

DROP TABLE IF EXISTS saved_images CASCADE;

/* Tables */
CREATE TABLE saved_images
(account_id     UUID,
 saved_id       UUID,
 saved_at       TIMESTAMP NOT NULL DEFAULT NOW(),

 CONSTRAINT pk_saved_images
 PRIMARY KEY (account_id, saved_id),
 
 CONSTRAINT fk_account
     FOREIGN KEY(account_id)
         REFERENCES account(id) ON DELETE CASCADE,
 CONSTRAINT fk_saved_image
     FOREIGN KEY(saved_id)
         REFERENCES image(id) ON DELETE CASCADE  
);

COMMIT;
