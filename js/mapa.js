var map;
var camadasMapa = [];
var camadasEditaveis = new L.FeatureGroup();

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
    map.addControl(drawControl);
    
    map.on('draw:created', function (e) {
        var layer = e.layer;
        camadasEditaveis.addLayer(layer);
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
                    "properties": {"identificador" : ""}, //Propriedades
                    "geometry": JSON.parse(d[0]) //Converte geometria
            };
            
            feature.properties.identificador = identificador;
            
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
                camadasEditaveis.addLayer(ponto);
                return ponto;
            }
        }).addTo(map);
    }else if(isPoligono){
        function emCadaPoligono(feature, layer) {
            var multiPoligono = new L.MultiPolygon(feature.geometry.coordinates);
            return multiPoligono;
        }
        mapDataLayer = L.geoJson(geojson, {
            style : estilo,
            onEachFeature: emCadaPoligono
        }).addTo(map);
    }else{
        mapDataLayer = L.geoJson(geojson, {
            style : estilo
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
    camadaEscolhida.clearLayers();
    map.removeLayer(camadaEscolhida);
    camadasMapa = camadasMapa.filter(function(e){ return e.id !== elemento.value; });
}

$(document).ready(construirMapa);

