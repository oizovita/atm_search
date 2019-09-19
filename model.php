<?php

class Model{

    function __construct(){
        $this->link = mysqli_connect('localhost', 'root', 'lesclaypool', 'atm') or die("error");

        mysqli_set_charset($this->link,'utf8');
    }

    function __destruct() {
        mysqli_close($this->link);
    }

    public function getAtm($city,$street=null) {
        if($street != null){
            $get = "https://api.privatbank.ua/p24api/infrastructure?json&atm&address=".$street."&city=".$city;
        }else{
            $get = "https://api.privatbank.ua/p24api/infrastructure?json&atm&address=&city=".$city;
        }
        $content = file_get_contents($get);
        $data = json_decode($content, true);

        return json_encode($data['devices'],JSON_UNESCAPED_UNICODE);

    }


    public function select_data($dataFromTheMainTable, $dataFromTheForeignTable = null, $idFromTable=null, $fromWhichTable=null, $id=null){

        if ($dataFromTheForeignTable != null){
            $query = "Select id from $idFromTable where name = '$dataFromTheForeignTable'";
            $result = mysqli_query($this->link, $query);
            $foreign_id = $result->fetch_row();
            $qure1 = "Select * from $fromWhichTable where $id = $foreign_id[0] and name like '%".$dataFromTheMainTable."%'";
        }else{
            $qure1 = "Select * from region where name like'%".$dataFromTheMainTable."%'";
        }

        $result = mysqli_query($this->link, $qure1);
        $response = array();

        while ($row = $result->fetch_assoc()) {

            $response[] = array($row['name']);
        }
       return json_encode($response,JSON_UNESCAPED_UNICODE);
    }



}