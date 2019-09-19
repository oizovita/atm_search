<?php

include 'model.php';

$model = new Model();


if(isset($_POST['query'])) {
   echo $model->select_data($_POST['query']);

}

if(isset($_POST['city']) && isset($_POST['region']) ) {
    echo $model->select_data($_POST['city'],$_POST['region'],'region','city', 'region_id');

}

if(isset($_POST['city']) && isset($_POST['street']) ) {
    echo $model->select_data($_POST['street'],$_POST['city'],'city','street', 'city_id');

}

if(isset($_POST['city_api']) && isset($_POST['street_api'])) {
    $street = $_POST['street_api'];
    if($street[0] . $street[1]  == 'п'){
        $rest = substr($street,10);
    }else{
        $rest = substr($street,8);
    }
    $rest = str_replace(' ', '%20', $rest);
    echo $model->getAtm(substr($_POST['city_api'],4), $rest);
}



