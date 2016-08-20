UPDATE area_risco SET object_id=1000000 + nextval('area_risco_seq');
ALTER SEQUENCE area_risco_seq RESTART WITH 1;
UPDATE area_risco SET object_id=nextval('area_risco_seq');

UPDATE saude SET object_id=1000000 + nextval('saude_seq');
ALTER SEQUENCE saude_seq RESTART WITH 1;
UPDATE saude SET object_id=nextval('saude_seq');

UPDATE area_verde SET object_id=1000000 + nextval('area_verde_seq');
ALTER SEQUENCE area_verde_seq RESTART WITH 1;
UPDATE area_verde SET object_id=nextval('area_verde_seq');

UPDATE teste SET object_id=1000000 + nextval('teste_seq');
ALTER SEQUENCE teste_seq RESTART WITH 1;
UPDATE teste SET object_id=nextval('teste_seq');