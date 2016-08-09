<?php include 'php/conexao.php'; ?>

<?php include 'php/camadas.php'; ?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>SIGNatal</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link href="http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
  <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
  <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
  <script src="js/Leaflet.Editable.js"></script>
  <script src="js/jquery.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  
  <style type="text/css">
    #map{ width: 100%; height: 93%; }
    
    .legenda {
        width: 16px;
        height: 16px;
        display:block;
    }
  </style>
</head>
<body>
    
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
                            . "value='$row[3]' name='camadasDoMapa' onchange='visualizaCamada(this);'>"
                            . "<label>$row[1]</label></li>";

                }
            ?>
            <li role="separator" class="divider"></li>
            <li><input type="checkbox" value="all" onclick="selecionaTudo(this)"><label for="c3">Todas</label></li>
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

<script type="text/javascript" src='js/mapa.js'></script>
	
</body>
</html>