var map;
var escolasCreches = new L.featureGroup();
var areasRisco = new L.featureGroup();
var poligonos = new L.featureGroup();
var camadasMapa = [];

function construirMapa(){
                map = L.map('map', {editable: true}).setView([-5.822089, -35.215033], 12);

                L.tileLayer('https://{s}.tiles.mapbox.com/v3/rowanwins.ka9knfid/{z}/{x}/{y}.png', {
                        maxZoom: 18,
                }).addTo(map);
                map.attributionControl.setPrefix('SIGNatal powered by LASID'); // Não mostra o texto 'Powered by Leaflet'.
                
                adicionarControladores();
}

function adicionarControladores(){

        //Adiciona o botão de Nova Linha
        L.NewLineControl = L.Control.extend({

        options: {
                position: 'topleft'
        },

        onAdd: function (map) {
                var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
                        link = L.DomUtil.create('a', '', container);

                link.href = '#';
                link.title = 'Cria uma nova linha';
                link.innerHTML = '/\\/';
                L.DomEvent.on(link, 'click', L.DomEvent.stop)
                                  .on(link, 'click', function () {
                                        map.editTools.startPolyline();
                                  });

                return container;
        }
        });

        //Adiciona o botão de criação de polígono
        L.NewPolygonControl = L.Control.extend({

        options: {
                position: 'topleft'
        },

        onAdd: function (map) {
                var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
                        link = L.DomUtil.create('a', '', container);

                link.href = '#';
                link.title = 'Cria um novo polígono';
                link.innerHTML = '▱';
                L.DomEvent.on(link, 'click', L.DomEvent.stop)
                                  .on(link, 'click', function () {
                                        map.editTools.startPolygon();
                                  });

                return container;
        }
        });

        //Adiciona o botão de criação de marcadores
        L.NewMarkerControl = L.Control.extend({

        options: {
                position: 'topleft'
        },

        onAdd: function (map) {
                var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
                        link = L.DomUtil.create('a', '', container);

                link.href = '#';
                link.title = 'Adiciona um novo marcador';
                link.innerHTML = '⚫';
                L.DomEvent.on(link, 'click', L.DomEvent.stop)
                                  .on(link, 'click', function () {
                                        map.editTools.startMarker();
                                  });

                return container;
        }
        });

        map.addControl(new L.NewMarkerControl());
        map.addControl(new L.NewLineControl());
        map.addControl(new L.NewPolygonControl());
}  

function visualizaCamada(elemento){
    if(elemento.checked){
        $.ajax("php/carregaDadosCamada.php", {
		data: {
			tabela: elemento.value,
                        legenda: elemento.id
		},
		success: function(data){
			plotaNoMapa(data);
		}
        });
    }else{
        limpaDadosCamada(elemento);
    }
}

function selecionaTudo(elemento){
    checkboxes = document.getElementsByName('camadasDoMapa');
    for(var i=0, n=checkboxes.length;i<n;i++) {
        if(checkboxes[i].checked !== elemento.checked){
            checkboxes[i].checked = elemento.checked;
            visualizaCamada(checkboxes[i]);
        }
    }
}

function plotaNoMapa(data){
    
    //Divide dados em features
    var dataArray = data.split(", ;");
    
    var identificador = dataArray[dataArray.length - 1];
    
    dataArray.pop();

    //Cria um container de objetos geojson
    var geojson = {
            "type": "FeatureCollection",
            "features": []
    };
    
    var isPonto = false;
    var isPoligono = false;
    var isLinha = false;

    //Constroi as features do geojson
    dataArray.forEach(function(d){
            d = d.split(", "); //Divide os dados em atributos individuais e geometria

            //Container de objeto feature
            var feature = {
                    "type": "Feature",
                    "properties": {}, //Propriedades
                    "geometry": JSON.parse(d[0]) //Converte geometria
            };
            
            if(feature.geometry.type === "MultiPoint"){
                isPonto = true;
            }else if(feature.geometry.type === "MultiPolygon"){
                isPoligono = true;
            }else if(feature.geometry.type === "MultiLineString"){
                isLinha = true;
            }

            geojson.features.push(feature);
    });
    
    var estilo = {
        "fillColor" : "",
        "color" : ""
    };
    estilo.fillColor = identificador;
    estilo.color = identificador;
    
    var mapDataLayer = null;
    
    if(isPonto){
        mapDataLayer = L.geoJson(geojson, {
            pointToLayer: function (feature, latlng) {
                var ponto = L.circleMarker(latlng, estilo);
                ponto.on({
                    mousedown: function () {
                      map.on('mousemove', function (e) {
                        ponto.setLatLng(e.latlng);
                      });
                    }
                }); 
                map.on('mouseup',function(e){
                  map.removeEventListener('mousemove');
                });
                return ponto;
            }
        }).addTo(map);
    }else if(isPoligono){
        function emCadaPoligono(feature, layer) {
            var poligono = new L.MultiPolygon(feature.geometry.coordinates);
            return poligono;
        }
        mapDataLayer = L.geoJson(geojson, {
            style : estilo,
            onEachFeature: emCadaPoligono
        }).addTo(map);
    }else{
        mapDataLayer = L.geoJson(geojson, {style : estilo}).addTo(map);
    }
    
    var objetoCamada = {
        "layer" : "",
        "id" : ""
    };
    objetoCamada.layer = mapDataLayer;
    objetoCamada.id = identificador;
    
    camadasMapa.push(objetoCamada);
}

function limpaDadosCamada(elemento){
    var resultado = $.grep(camadasMapa, function(e){ return e.id === elemento.id; });
    var camadaEscolhida = resultado[0].layer;
    camadaEscolhida.clearLayers();
    map.removeLayer(camadaEscolhida);
    camadasMapa = camadasMapa.filter(function(e){ return e.id !== elemento.id; });
}

$(document).ready(construirMapa);

