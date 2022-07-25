/*************************************************************************************
 * Sample Data for Accounts and Saved Accounts
 * Author: Tobias Breitenauer
 *************************************************************************************/

BEGIN;

/* Data */

INSERT INTO account("username", "email", "desc", "password", "isAdmin")
VALUES 
('admin',              'admin@gmail.com', 'Administrator der Website', 'changeme1', true),
('tobi',               'tobias.breitenauer@test.de', 'Das ist der Account von Tobi.', 'changeme1', false),
('ers_fan_2000',       'ers@ers2000.com',     'Hallo, ich bin ERS_FAN_2000!' , 'changeme1', false),
('happymouse513',      'example1@example.com', 'Hallo, das ist meine Beschreibung!' , 'changeme1', false),
('bluepanda344',       'example2@example.com', null , 'changeme1', false),
('orangesnake477',     'example3@example.com', 'Hallo, das ist meine Beschreibung!' , 'changeme1', false),
('bluefish171',        'example4@example.com', null , 'changeme1', false),
('greenelephant529',   'example5@example.com', 'Hallo, das ist meine Beschreibung!' , 'changeme1', false),
('happymouse882',      'example6@example.com', null , 'changeme1', false),
('organicpanda507',    'example7@example.com', 'Hallo, das ist meine Beschreibung!' , 'changeme1', false),
('brownmeercat858',    'example8@example.com', null , 'changeme1', false),
('organicmeercat907',  'example9@example.com', 'Hallo, das ist meine Beschreibung!' , 'changeme1', false),
('goldenmeercat114',   'example0@example.com', null , 'changeme1', false),
('crazymouse592',      'example11@example.com', 'Hallo, das ist meine Beschreibung!' , 'changeme1', false),
('goldenmeercat222',   'example12@example.com', null , 'changeme1', false),
('crazy108',           'example13@example.com', 'Hallo, das ist meine Beschreibung!' , 'changeme1', false),
('angrysnake118',      'example14@example.com', null , 'changeme1', false),
('purplelion508',      'example15@example.com', 'Hallo, das ist meine Beschreibung!' , 'changeme1', false),
('blackelephant728',   'example16@example.com', null , 'changeme1', false);

CREATE TABLE tmp_saved_accounts
("user1" D_USERNAME,
 "user2" D_USERNAME,

 CONSTRAINT tmp_sa_primary
 PRIMARY KEY ("user1","user2")
);

INSERT INTO tmp_saved_accounts("user1","user2")
VALUES
('admin','tobi'),
('ers_fan_2000','tobi'),
('happymouse513','tobi'),
('bluepanda344','tobi'),
('orangesnake477','tobi'),
('bluefish171','tobi'),
('greenelephant529','tobi'),
('happymouse882','tobi'),
('organicpanda507','tobi'),
('brownmeercat858','tobi'),
('organicmeercat907','tobi'),
('goldenmeercat114','tobi'),
('crazymouse592','tobi'),
('goldenmeercat222','tobi'),
('crazy108','tobi'),
('angrysnake118','tobi'),
('purplelion508','tobi'),
('admin','ers_fan_2000'),
('tobi','organicmeercat907'),
('happymouse513','ers_fan_2000'),
('bluepanda344','ers_fan_2000'),
('orangesnake477','ers_fan_2000'),
('tobi','admin'),
('greenelephant529','orangesnake477'),
('happymouse882','orangesnake477'),
('organicpanda507','orangesnake477'),
('tobi','orangesnake477'),
('organicmeercat907','happymouse882'),
('goldenmeercat114','happymouse882'),
('tobi','happymouse882'),
('goldenmeercat222','happymouse882'),
('crazy108','happymouse882'),
('angrysnake118','bluepanda344'),
('purplelion508','bluepanda344'),
('admin','bluepanda344'),
('ers_fan_2000','bluepanda344'),
('happymouse513','bluepanda344'),
('bluepanda344','greenelephant529'),
('orangesnake477','greenelephant529'),
('tobi','greenelephant529'),
('greenelephant529','ers_fan_2000'),
('happymouse882','greenelephant529'),
('organicpanda507','happymouse513'),
('tobi','happymouse513'),
('greenelephant529','happymouse513'),
('goldenmeercat114','happymouse513'),
('crazymouse592','happymouse513'),
('goldenmeercat222','happymouse513'),
('crazy108','happymouse513'),
('tobi','ers_fan_2000'),
('purplelion508','happymouse513');

INSERT INTO saved_accounts("account_id","saved_id")
SELECT a1.id, a2.id
FROM tmp_saved_accounts t
JOIN account a1
ON a1.username = t.user1
JOIN account a2
ON a2.username = t.user2;

DROP TABLE tmp_saved_accounts;

/* Save it */

COMMIT;
