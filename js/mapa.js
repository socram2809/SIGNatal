var map;
var camadasMapa = [];
var camadasEditaveis = new L.FeatureGroup();

function atualizaCamadas(){
    camadasEditaveis.eachLayer(function(layer){
        var json = layer.toGeoJSON();
        $.ajax("php/atualizaDadosCamada.php", {
                data: {
                        tabela: layer.properties.identificador,
                        id: layer.properties.id,
                        geom: json.geometry
                },
                type: "POST"/*,
                success: function(data){
                        console.log(data);
                }*/
        });
    });
}

function construirMapa(){
    
    map = L.map('map').setView([-5.822089, -35.215033], 12);

    L.tileLayer('https://{s}.tiles.mapbox.com/v3/rowanwins.ka9knfid/{z}/{x}/{y}.png', {
            maxZoom: 18,
    }).addTo(map);
    map.attributionControl.setPrefix('SIGNatal powered by LASID'); // Não mostra o texto 'Powered by Leaflet'.

    adicionarControladores();
}

function adicionarControladores(){

    map.addLayer(camadasEditaveis);

    // Inicializa o controlador de desenhos e passa o FeatureGroup de camadas editáveis
    var drawControl = new L.Control.Draw({
        edit: {
            featureGroup: camadasEditaveis
        }
    });
    
    L.drawLocal.draw.toolbar.buttons.polygon = "Desenha um polígono";
    
    L.drawLocal.draw.toolbar.buttons.polyline = "Desenha uma linha";
    
    L.drawLocal.draw.toolbar.buttons.marker = "Desenha um marcador";
    
    L.drawLocal.draw.toolbar.buttons.circle = "Desenha um círculo";
    
    L.drawLocal.draw.toolbar.buttons.rectangle = "Desenha um retângulo";
    
    map.addControl(drawControl);
    
    map.on('draw:created', function (e) {
        var layer = e.layer;
        camadasEditaveis.addLayer(layer);
    });
    
    map.on('draw:edited', function (e) {
        atualizaCamadas(e);
    });
    
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
    
    var identificador = dataArray[dataArray.length - 2];
    
    var cor = dataArray[dataArray.length - 1];
    
    dataArray.pop();
    
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
                    "properties": {"identificador" : "", "id" : ""}, //Propriedades
                    "geometry": JSON.parse(d[1]) //Converte geometria
            };
            
            feature.properties.identificador = identificador;
            feature.properties.id = d[0];
            
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
    estilo.fillColor = cor;
    estilo.color = cor;
    
    var mapDataLayer = null;
    
    if(isPonto){
        mapDataLayer = L.geoJson(geojson, {
            pointToLayer: function (feature, latlng) {
                var ponto = L.circleMarker(latlng, estilo);
                ponto.properties = feature.properties;
                camadasEditaveis.addLayer(ponto);
                return ponto;
            }
        }).addTo(map);
    }else if(isPoligono){
        function emCadaPoligono(feature, layer) {
            layer.eachLayer(function(child_layer){
                child_layer.properties = feature.properties;
                camadasEditaveis.addLayer(child_layer);
            });
        }
        mapDataLayer = L.geoJson(geojson, {
            style : estilo,
            onEachFeature: emCadaPoligono
        }).addTo(map);
    }else if(isLinha){
        function emCadaLinha(feature, layer) {
            layer.eachLayer(function(child_layer){
                camadasEditaveis.addLayer(child_layer);
            });
        }
        mapDataLayer = L.geoJson(geojson, {
            style : estilo,
            onEachFeature: emCadaLinha
        }).addTo(map);
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
    var resultado = $.grep(camadasMapa, function(e){ return e.id === elemento.value; });
    var camadaEscolhida = resultado[0].layer;
    camadaEscolhida.eachLayer(function(layer) {
        layer.eachLayer(function(child_layer){
            camadasEditaveis.removeLayer(child_layer);
        });
    });
    camadaEscolhida.clearLayers();
    map.removeLayer(camadaEscolhida);
    camadasMapa = camadasMapa.filter(function(e){ return e.id !== elemento.value; });
}

$(document).ready(construirMapa);

