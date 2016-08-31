<?php include 'php/conexao.php'; ?>

<?php include 'php/camadas.php'; ?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>SIGNatal</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css">
  <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
  <link rel="stylesheet" href="http://leaflet.github.io/Leaflet.draw/leaflet.draw.css"/>
  <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
  <script src="http://leaflet.github.io/Leaflet.draw/leaflet.draw.js"></script>
  
  <script src="js/jquery.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  
  <style type="text/css">
    #map{ width: 100%; height: 93%; }
    
    #setaAtributos{
        display: none;
    }
    
    .legenda {
        width: 16px;
        height: 16px;
        display:block;
    }
    
    .spinner {
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 1;
      display: none;
      background-position: center;
      background-repeat: no-repeat;  
      
      margin: 100px auto 0;
      //width: 70px;
      text-align: center;
      //display: none;
    }

    .spinner > div {
      width: 100px;
      height: 100px;
      background-color: #333;

      border-radius: 100%;
      display: inline-block;
      -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
      animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }

    .spinner .bounce1 {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }
    
    .spinner .bounce2 {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }

    @-webkit-keyframes sk-bouncedelay {
      0%, 80%, 100% { -webkit-transform: scale(0) }
      40% { -webkit-transform: scale(1.0) }
    }

    @keyframes sk-bouncedelay {
      0%, 80%, 100% { 
        -webkit-transform: scale(0);
        transform: scale(0);
      } 40% { 
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
      }
    }
    
  </style>
</head>
<body>
    
<div class="spinner">
  <div class="bounce1"></div>
  <div class="bounce2"></div>
  <div class="bounce3"></div>
</div>
    
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#"><b>SIGNatal</b></a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
 
        <ul class="nav navbar-nav navbar-right">
            
        <li><a href="#"><span class="glyphicon glyphicon-exclamation-sign"></span>Ajuda</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-map-marker"></span>Lista de Camadas<span class="caret"></span></a>
          <ul class="dropdown-menu">
            <?php
                while($row = pg_fetch_row($camadas)){

                    echo "<li><input type='checkbox' id='$row[6]' "
                            . "value='$row[3]' name='camadasDoMapa' class='camadas' onchange='visualizaCamada(this);'>"
                            . "<label>$row[1]</label></li>";

                }
            ?>
          </ul>
        </li>
        <li class="dropdown" style = "width: 200px;">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-pushpin"></span>Legendas<span class="caret"></span></a>
          <ul class="dropdown-menu"><br>
            <?php
                while($row = pg_fetch_row($legendas)){
                    
                    echo "<li><div style='display:inline;'>"
                    . "<span class='legenda' style='background-color: $row[6]; float:left;'></span><i>$row[1]</i></div></li><br>";

                }
            ?>
          </ul>
        </li>
    </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>   
    
<div id="map"></div>

<!-- Modal -->
<div class="modal fade" id="myModal" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 id="tituloModal" class="modal-title"></h4>
      </div>
      <div class="modal-body">
          <ol id="listaAtributos">
          </ol>
      </div>
      <div class="modal-footer">
        <button id="salvarGeometria" onclick="salva();" type="button" class="btn btn-default" data-dismiss="modal">Salvar</button>
        <button id="editarGeometria" onclick="edita();" type="button" class="btn btn-default" data-dismiss="modal">Editar</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
      </div>
    </div>

  </div>
</div>

<!-- Trigger the modal with a button -->
<button id="setaAtributos" type="button" class="btn btn-info btn-lg" data-toggle="modal" 
        data-target="#myModal">Open Modal</button>

<script type="text/javascript" src='js/mapa.js'></script>
	
</body>
</html>