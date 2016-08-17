CREATE SEQUENCE teste_object_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE teste_object_id_seq
  OWNER TO postgres;

CREATE TABLE teste
(
  object_id serial NOT NULL,
  geom geometry(MultiLineString,31985),
  id bigint,
  CONSTRAINT teste_pkey PRIMARY KEY (object_id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE teste
  OWNER TO postgres;

INSERT INTO teste (object_id,geom,id)
SELECT object_id, geom, 1
FROM favela
WHERE gm_layer LIKE '%FAV.SALGADINHO%';

INSERT INTO camada(
            id, nome, descricao, tabela, cor_camada)
    VALUES (nextval('camada_seq'), 'Teste', 'Teste', 'teste', 13);