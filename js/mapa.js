var map;
var camadasMapa = [];
var camadasEditaveis = new L.FeatureGroup();
var drawControl;
var tabela;
var campos = new Array();
var atributosGeometria = [];

function atualizaCamadas(){
    camadasEditaveis.eachLayer(function(layer){
        var json = layer.toGeoJSON();
        $.ajax("php/atualizaDadosCamada.php", {
                data: {
                        tabela: layer.properties.identificador,
                        id: layer.properties.id,
                        geom: json.geometry
                },
                type: "POST"
        });
    });
}

function refinaControlador(){
    map.removeControl(drawControl);
    var checkboxes = document.getElementsByName("camadasDoMapa");
    var cont = 0;
    for(var i=0;i<checkboxes.length;i++){
        if(checkboxes[i].checked){
            cont++;
        }
    }
    if(cont === 1){
        for(var i = 0; i < camadasMapa.length ; i ++){
            if(camadasMapa[i].tipo !== "undefined"){
                if(camadasMapa[i].tipo === "MultiPoint"){
                    liberaPonto();
                }else if(camadasMapa[i].tipo === "MultiPolygon"){
                    liberaPoligono();
                }else if(camadasMapa[i].tipo === "MultiLineString"){
                    liberaLinha();
                }
            }
        }
    }else{
        inicializaControlador();
    }
    map.addControl(drawControl);
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
                },
                beforeSend: function() {
                    $(".spinner").show();         
                },
                complete: function(){
                    $(".spinner").hide();
                }
        });
    }else{
        $.ajax("signatal.php",{
                success: function(){
                    limpaDadosCamada(elemento);
                },
                beforeSend: function() {
                    $(".spinner").show();         
                },
                complete: function(){
                    $(".spinner").hide();
                }
        });
    }
}

function construirMapa(){
    
    map = L.map('map').setView([-5.822089, -35.215033], 12);

    L.tileLayer('https://{s}.tiles.mapbox.com/v3/rowanwins.ka9knfid/{z}/{x}/{y}.png', {
            maxZoom: 18,
    }).addTo(map);
    map.attributionControl.setPrefix('SIGNatal powered by LASID'); // Não mostra o texto 'Powered by Leaflet'.

    adicionarControladores();
}

function inicializaControlador(){
    drawControl = new L.Control.Draw({
        edit: {
            featureGroup: camadasEditaveis
        },
        draw: {
            circle: false,
            rectangle: false,
            polygon: false,
            polyline: false,
            marker: false
        }
    });
}

function liberaPonto(){
    drawControl = new L.Control.Draw({
        edit: {
            featureGroup: camadasEditaveis
        },
        draw: {
            circle: false,
            rectangle: false,
            polygon: false,
            polyline: false
        }
    });
}

function liberaPoligono(){
    drawControl = new L.Control.Draw({
        edit: {
            featureGroup: camadasEditaveis
        },
        draw: {
            circle: false,
            rectangle: false,
            polyline: false,
            marker: false
        }
    });
}

function liberaLinha(){
    drawControl = new L.Control.Draw({
        edit: {
            featureGroup: camadasEditaveis
        },
        draw: {
            circle: false,
            rectangle: false,
            marker: false,
            polygon: false
        }
    });
}

function adicionarControladores(){

    map.addLayer(camadasEditaveis);

    // Inicializa o controlador de desenhos e passa o FeatureGroup de camadas editáveis
    inicializaControlador();

    map.addControl(drawControl);
    
    map.on('draw:created', function (e) {
        var layer = e.layer;
        var checkboxes = document.getElementsByName("camadasDoMapa");
        var tabela = null;
        var cor = null;
        var elemento = null;
        for(var i=0;i<checkboxes.length;i++){
            if(checkboxes[i].checked){
                tabela = checkboxes[i].value;
                cor = checkboxes[i].id;
                elemento = checkboxes[i];
            }
        }
        var json = layer.toGeoJSON();
        var estilo = {
            "fillColor" : "",
            "color" : ""
        };
        estilo.fillColor = cor;
        estilo.color = cor;
        var geometria = null;
        if(json.geometry.type === "Polygon"){
            layer.options.color = cor;
            layer.options.fillColor = cor;
            geometria = layer;
        }else if(json.geometry.type === "LineString"){
            layer.options.color = cor;
            layer.options.fillColor = cor;
            geometria = layer;
        }else{
            geometria = L.circleMarker(layer.getLatLng(), estilo);
        }
        $.ajax("php/inserirDadosCamada.php", {
                data: {
                        tabela: tabela,
                        geom: json.geometry,
                        valores: JSON.stringify(atributosGeometria)
                },
                type: "POST"
        });
        limpaDadosCamada(elemento);
        visualizaCamada(elemento);
    });
    
    map.on('draw:edited', function (e) {
        $.ajax("signatal.php",{
                success: function(){
                    atualizaCamadas(e);
                },
                beforeSend: function() {
                    $(".spinner").show();         
                },
                complete: function(){
                    $(".spinner").hide();
                }
        });
    });
    
    map.on('draw:drawstart', function (e) {
        $("#setaAtributos").click();
        $("#tituloModal").html(tabela);
        var listaAtributos = document.getElementById("listaAtributos");
        while (listaAtributos.firstChild) {
            listaAtributos.removeChild(listaAtributos.firstChild);
        }
        for(var i = 0; i < campos.length; i++){
            var campo = document.createElement("LI");
            var valor = document.createTextNode(campos[i]+": ");
            var input = document.createElement("INPUT");
            input.setAttribute("type","text");
            input.setAttribute("name","atributosGeometria");
            input.setAttribute("maxlength","255");
            campo.appendChild(valor);
            campo.appendChild(input);
            listaAtributos.appendChild(campo);
        }
        $("#salvarGeometria").click(function(){
            var geometrias = document.getElementsByName("atributosGeometria");
            for(var i = 0; i < geometrias.length; i++){
                atributosGeometria.push(geometrias[i].value);
            }
        });
    });
    
    $(".leaflet-draw-edit-edit").mousedown(function(){
        $(".spinner").show();
    });
    
    $(".leaflet-draw-edit-edit").click(function(){
        $(".spinner").hide();
    });
    
}

function plotaNoMapa(data){
        
    //Divide dados em features
    var dataArray = data.split(", ;");
    
    var fields = new Array();
    
    fields = JSON.parse(dataArray[dataArray.length - 3]);
    
    campos = fields;
    
    var identificador = dataArray[dataArray.length - 2];
    
    tabela = identificador;
    
    var cor = dataArray[dataArray.length - 1];
    
    dataArray.pop();
    
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
    var tipo = null;
    
    //Constroi as features do geojson
    dataArray.forEach(function(d){
            d = d.split(", "); //Divide os dados em atributos individuais e geometria
            
            //Remove o id e a coluna geometrica
            d.splice(0,1);
            d.splice(0,1);

            //Container de objeto feature
            var feature = {
                    "type": "Feature",
                    "properties": {"identificador" : "", "id" : "", "popup" : {}}, //Propriedades
                    "geometry": JSON.parse(d[d.length - 1]) //Converte geometria
            };
            
            for(var i=0;i<fields.length;i++){
                feature.properties.popup[fields[i]] = d[i];
            }
            
            feature.properties.identificador = identificador;
            feature.properties.id = d[0];
            
            if(feature.geometry.type === "MultiPoint"){
                isPonto = true;
                tipo = "MultiPoint";
            }else if(feature.geometry.type === "MultiPolygon"){
                isPoligono = true;
                tipo = "MultiPolygon";
            }else if(feature.geometry.type === "MultiLineString"){
                isLinha = true;
                tipo = "MultiLineString";
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
            },
            onEachFeature: function (feature,layer){
                var html = "";
                for(prop in feature.properties.popup){
                    html += prop+": "+feature.properties.popup[prop]+"<br>";
                }
                layer.bindPopup(html);
            }
        }).addTo(map);
    }else if(isPoligono){
        function emCadaPoligono(feature, layer) {
            var html = "";
            for(prop in feature.properties.popup){
                html += prop+": "+feature.properties.popup[prop]+"<br>";
            }
            layer.bindPopup(html);
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
            var html = "";
            for(prop in feature.properties.popup){
                html += prop+": "+feature.properties.popup[prop]+"<br>";
            }
            layer.bindPopup(html);
            layer.eachLayer(function(child_layer){
                child_layer.properties = feature.properties;
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
        "id" : "",
        "tipo": "" 
    };
    objetoCamada.layer = mapDataLayer;
    objetoCamada.id = identificador;
    objetoCamada.tipo = tipo;
    
    camadasMapa.push(objetoCamada);
    
    refinaControlador();
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
    refinaControlador();
}

$(document).ready(construirMapa);