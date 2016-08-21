-- Área de Risco
ALTER TABLE area_risco ALTER COLUMN des TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN qba TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN cli TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN er TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN in_ TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN ap TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN oir TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN app TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN perimeter TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN area_m_ TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN d_hab_km_ TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN d_res_hec TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN ir_ TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN area TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN hectares TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN layer TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN nome TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN zona TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN "comentário" TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN "intervenèõ" TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN habitantes TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN bairro TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN abrang TYPE character varying(255);
ALTER TABLE area_risco ALTER COLUMN acres TYPE character varying(255);

-- Escolas e Creches
ALTER TABLE escola_creche ALTER COLUMN id TYPE character varying(255);
ALTER TABLE escola_creche ALTER COLUMN x TYPE character varying(255);
ALTER TABLE escola_creche ALTER COLUMN y TYPE character varying(255);
ALTER TABLE escola_creche ALTER COLUMN layer TYPE character varying(255);
ALTER TABLE escola_creche ALTER COLUMN dep_admin TYPE character varying(255);
ALTER TABLE escola_creche ALTER COLUMN "endereço" TYPE character varying(255);
ALTER TABLE escola_creche ALTER COLUMN nome_insti TYPE character varying(255);
ALTER TABLE escola_creche ALTER COLUMN bairro TYPE character varying(255);
ALTER TABLE escola_creche ALTER COLUMN ordem TYPE character varying(255);
ALTER TABLE escola_creche ALTER COLUMN rotulo TYPE character varying(255);

-- Praças
ALTER TABLE praca ALTER COLUMN layer TYPE character varying(255);
ALTER TABLE praca ALTER COLUMN id TYPE character varying(255);
ALTER TABLE praca ALTER COLUMN tipo TYPE character varying(255);
ALTER TABLE praca ALTER COLUMN bairro TYPE character varying(255);
ALTER TABLE praca ALTER COLUMN nome TYPE character varying(255);
ALTER TABLE praca ALTER COLUMN "endereço" TYPE character varying(255);
ALTER TABLE praca ALTER COLUMN parque_inf TYPE character varying(255);
ALTER TABLE praca ALTER COLUMN reg_adm TYPE character varying(255);
ALTER TABLE praca ALTER COLUMN conferenci TYPE character varying(255);
ALTER TABLE praca ALTER COLUMN "lei_criaçã" TYPE character varying(255);
ALTER TABLE praca ALTER COLUMN "observação" TYPE character varying(255);
ALTER TABLE praca ALTER COLUMN quantidade TYPE character varying(255);

-- Favela
ALTER TABLE favela ALTER COLUMN gm_layer TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN gm_type TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN fid_ TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN entity TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN gm_type TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN fid_ TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN entity TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN handle TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN layer TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN lyrfrzn TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN lyrlock TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN lyron TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN lyrvpfrzn TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN lyrhandle TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN color TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN entcolor TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN lyrcolor TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN blkcolor TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN linetype TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN entlinetyp TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN lyrlntype TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN blklinetyp TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN elevation TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN thickness TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN linewt TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN entlinewt TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN lyrlinewt TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN blklinewt TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN refname TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN ltscale TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN extx TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN exty TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN extz TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN docname TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN docpath TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN doctype TYPE character varying(255);
ALTER TABLE favela ALTER COLUMN docver TYPE character varying(255);

-- Zona Eleitoral
ALTER TABLE zona_eleitoral ALTER COLUMN layer TYPE character varying(255);
ALTER TABLE zona_eleitoral ALTER COLUMN id TYPE character varying(255);
ALTER TABLE zona_eleitoral ALTER COLUMN zona TYPE character varying(255);

-- Hospital
ALTER TABLE saude ALTER COLUMN layer TYPE character varying(255);
ALTER TABLE saude ALTER COLUMN id TYPE character varying(255);
ALTER TABLE saude ALTER COLUMN regiao_adm TYPE character varying(255);
ALTER TABLE saude ALTER COLUMN tipo_de_un TYPE character varying(255);
ALTER TABLE saude ALTER COLUMN bairro TYPE character varying(255);
ALTER TABLE saude ALTER COLUMN prestadora TYPE character varying(255);
ALTER TABLE saude ALTER COLUMN endereco TYPE character varying(255);
ALTER TABLE saude ALTER COLUMN observacoe TYPE character varying(255);
ALTER TABLE saude ALTER COLUMN tipo2 TYPE character varying(255);

-- Limite de Bairros
ALTER TABLE limite_bairro ALTER COLUMN gm_layer TYPE character varying(255);
ALTER TABLE limite_bairro ALTER COLUMN gm_type TYPE character varying(255);
ALTER TABLE limite_bairro ALTER COLUMN layer TYPE character varying(255);
ALTER TABLE limite_bairro ALTER COLUMN bairro TYPE character varying(255);
ALTER TABLE limite_bairro ALTER COLUMN reg_adm TYPE character varying(255);
ALTER TABLE limite_bairro ALTER COLUMN n_ TYPE character varying(255);
ALTER TABLE limite_bairro ALTER COLUMN coeficient TYPE character varying(255);
ALTER TABLE limite_bairro ALTER COLUMN "população" TYPE character varying(255);
ALTER TABLE limite_bairro ALTER COLUMN lei_n_ TYPE character varying(255);
ALTER TABLE limite_bairro ALTER COLUMN area TYPE character varying(255);
ALTER TABLE limite_bairro ALTER COLUMN hectares TYPE character varying(255);

-- Ruas e Logradouros
ALTER TABLE logradouro ALTER COLUMN layer TYPE character varying(255);
ALTER TABLE logradouro ALTER COLUMN id TYPE character varying(255);
ALTER TABLE logradouro ALTER COLUMN streetname TYPE character varying(255);
ALTER TABLE logradouro ALTER COLUMN categoria TYPE character varying(255);
ALTER TABLE logradouro ALTER COLUMN classes TYPE character varying(255);
ALTER TABLE logradouro ALTER COLUMN lei TYPE character varying(255);
ALTER TABLE logradouro ALTER COLUMN biografia TYPE character varying(255);
ALTER TABLE logradouro ALTER COLUMN data TYPE character varying(255);
ALTER TABLE logradouro ALTER COLUMN hyperlink TYPE character varying(255);
ALTER TABLE logradouro ALTER COLUMN bairro TYPE character varying(255);
ALTER TABLE logradouro ALTER COLUMN conjunto TYPE character varying(255);
ALTER TABLE logradouro ALTER COLUMN cep TYPE character varying(255);
ALTER TABLE logradouro ALTER COLUMN "código" TYPE character varying(255);
ALTER TABLE logradouro ALTER COLUMN outros_cep TYPE character varying(255);
ALTER TABLE logradouro ALTER COLUMN placas TYPE character varying(255);
ALTER TABLE logradouro ALTER COLUMN nome_antig TYPE character varying(255);
ALTER TABLE logradouro ALTER COLUMN "início" TYPE character varying(255);
ALTER TABLE logradouro ALTER COLUMN final TYPE character varying(255);
ALTER TABLE logradouro ALTER COLUMN "numeração" TYPE character varying(255);

-- Área verde
ALTER TABLE area_verde ALTER COLUMN layer TYPE character varying(255);
ALTER TABLE area_verde ALTER COLUMN id TYPE character varying(255);
ALTER TABLE area_verde ALTER COLUMN blklinetyp TYPE character varying(255);
ALTER TABLE area_verde ALTER COLUMN "descriçã_1" TYPE character varying(255);
ALTER TABLE area_verde ALTER COLUMN "área_1" TYPE character varying(255);
ALTER TABLE area_verde ALTER COLUMN conjunto TYPE character varying(255);
ALTER TABLE area_verde ALTER COLUMN bairro TYPE character varying(255);
ALTER TABLE area_verde ALTER COLUMN hyperlink TYPE character varying(255);
ALTER TABLE area_verde ALTER COLUMN "situação" TYPE character varying(255);
ALTER TABLE area_verde ALTER COLUMN "destinação" TYPE character varying(255);
ALTER TABLE area_verde ALTER COLUMN percentual TYPE character varying(255);
ALTER TABLE area_verde ALTER COLUMN area TYPE character varying(255);
ALTER TABLE area_verde ALTER COLUMN shape_leng TYPE character varying(255);
ALTER TABLE area_verde ALTER COLUMN shape_area TYPE character varying(255);

-- Feira Livre
ALTER TABLE feira_livre ALTER COLUMN id TYPE character varying(255);
ALTER TABLE feira_livre ALTER COLUMN feiras TYPE character varying(255);
ALTER TABLE feira_livre ALTER COLUMN zona TYPE character varying(255);
ALTER TABLE feira_livre ALTER COLUMN bairro TYPE character varying(255);
ALTER TABLE feira_livre ALTER COLUMN horario TYPE character varying(255);
ALTER TABLE feira_livre ALTER COLUMN dia TYPE character varying(255);

-- Teste
ALTER TABLE teste ALTER COLUMN id TYPE character varying(255);

-- Zona Especial Norte
ALTER TABLE zona_norte ALTER COLUMN layer TYPE character varying(255);
ALTER TABLE zona_norte ALTER COLUMN zoneamento TYPE character varying(255);





