var map;
var escolasCreches = new L.featureGroup();
var areasRisco = new L.featureGroup();
var poligonos = new L.featureGroup();

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

function mostrarEscolasCreches(){
        map.addLayer(escolasCreches);
        var iconEscolas = L.icon({
        iconUrl: 'images/pen.png',
        iconSize:     [22, 22] 
        });
        for (var i = 0; i < escolas_creches.length; i++) {
                esccre = new L.marker([escolas_creches[i][1],escolas_creches[i][2]], {icon: iconEscolas})
                        .bindPopup(escolas_creches[i][0]).addTo(escolasCreches);
                esccre.enableEdit();
        }
}

function removerEscolasCreches(){
        escolasCreches.clearLayers();
        map.removeLayer(escolasCreches);
}

function mostrarAreasDeRisco(){
        map.addLayer(areasRisco);
        var ar_polvector = new Array();
        var polygonPoints = new Array();
        var p = new Array();
        var i=0;
        for(var j=0; j<=75; j++){
                id = area_risco[j][0];
                while(area_risco[i][0]==(id)) {
                        p[i] = new L.LatLng(area_risco[i][2],area_risco[i][1]);
                        polygonPoints.push(p[i]);
                        i++;
                }
                ar_polvector[j] = new L.Polygon(polygonPoints)
                                .bindPopup("Area de Risco N"+j).addTo(areasRisco);
                ar_polvector[j].enableEdit();
                i=0;
        }
}

function removerAreasDeRisco(){
        areasRisco.clearLayers();
        map.removeLayer(areasRisco);
}

function mostrarPoligonos(){

        map.addLayer(poligonos);

        var triangulo = L.polygon([
                [-5.8239, -35.259],
                [-5.8230, -35.263],
                [-5.8252, -35.265]
        ]).addTo(poligonos);
        triangulo.enableEdit();

        var quadrado = L.polygon([
                [-5.8250, -35.277],
                [-5.8249, -35.280],
                [-5.8240, -35.273],
                [-5.8262, -35.275]
        ]).addTo(poligonos);
        quadrado.enableEdit();
}

function removerPoligonos(){
        poligonos.clearLayers();
        map.removeLayer(poligonos);
}

//Realiza o controle da seleção de camadas
function clicarEscola(){
        if(document.getElementById("esccre").checked){
                mostrarEscolasCreches();
        }else if(!document.getElementById("esccre").checked){
                removerEscolasCreches();
        }
}
function clicarArea(){
        if(document.getElementById("c1").checked){
                //mostrarAreasDeRisco();
        }else if(!document.getElementById("c1").checked){
                //removerAreasDeRisco();
        }
}
function clicarPoligono(){
        if(document.getElementById("poligono").checked){
                mostrarPoligonos();
        }else if(!document.getElementById("poligono").checked){
                removerPoligonos();
        }
}

function visualizaCamada(){
    //...
}

function recuperarCamadas(){
    $.ajax("php/pegaDados.php", {
		data: {
			camadas: "todas"
		},
		success: function(data){
			mapeiaDados(data);
		}
	});
}

$(document).ready(construirMapa);

function pegaDadosDaCamada(table){
	$.ajax("php/pegaDados.php", {
		data: {
			table: table
		},
		success: function(data){
			atualizaListaCamadas(data);
		}
	});
}

function atualizaListaCamadas(data){
    //...
}

function mapeiaDados(data){
	//remove existing map layers
	map.eachLayer(function(layer){
		//if not the tile layer
		if (typeof layer._url === "undefined"){
			map.removeLayer(layer);
		}
	});

	//create geojson container object
	var geojson = {
		"type": "FeatureCollection",
		"features": []
	};

	//split data into features
	var dataArray = data.split(", ;");
	dataArray.pop();
    
    //console.log(dataArray);
	
	//build geojson features
	dataArray.forEach(function(d){
		d = d.split(", "); //split the data up into individual attribute values and the geometry

		//feature object container
		var feature = {
			"type": "Feature",
			"properties": {}, //properties object container
			"geometry": JSON.parse(d[fields.length]) //parse geometry
		};

		for (var i=0; i<fields.length; i++){
			feature.properties[fields[i]] = d[i];
		};

		//add feature names to autocomplete list
		if ($.inArray(feature.properties.featname, autocomplete) == -1){
			autocomplete.push(feature.properties.featname);
		};

		geojson.features.push(feature);
	});
	
    //console.log(geojson);
    
    //activate autocomplete on featname input
    $("input[name=featname]").autocomplete({
        source: autocomplete
    });

	var mapDataLayer = L.geoJson(geojson, {
		pointToLayer: function (feature, latlng) {
			var markerStyle = { 
				fillColor: "#CC9900",
				color: "#FFF",
				fillOpacity: 0.5,
				opacity: 0.8,
				weight: 1,
				radius: 8
			};

			return L.circleMarker(latlng, markerStyle);
		},
		onEachFeature: function (feature, layer) {
			var html = "";
			for (prop in feature.properties){
				html += prop+": "+feature.properties[prop]+"<br>";
			};
	        layer.bindPopup(html);
	    }
	}).addTo(map);
}

function submitQuery(){
	//get the form data
	var formdata = $("form").serializeArray();

	//add to data request object
	var data = {
		table: "fracsandsites",
		fields: fields
	};
	formdata.forEach(function(dataobj){
		data[dataobj.name] = dataobj.value;
	});

	//call the php script
	$.ajax("php/getData.php", {
		data: data,
		success: function(data){
			mapData(data);
		}
	})
}

