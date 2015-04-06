<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 06-04-2015 23:04:06 
* Descripcion : MotivoBajaController.php
* ---------------------------------------
*/    

class MotivoBajaController extends Controller{
    
    private static $MotivoBajaModel;
    
    public function __construct() {
        self::$MotivoBajaModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridMotivoBaja(){
        $rows = array();
        $data =  self::$MotivoBajaModel->getGridMotivoBaja();
        foreach ($data as $value) {
            $rows[] = array(
                "id_motivobaja"=>AesCtr::en($value["id_motivobaja"]),
                "motivobaja"=> $value["motivobaja"],
                "estado"=> Functions::labelState($value["estado"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewMotivoBaja.phtml) para nuevo registro: MotivoBaja*/
    public function formNewMotivoBaja(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditMotivoBaja.phtml) para editar registro: MotivoBaja*/
    public function formEditMotivoBaja(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: MotivoBaja*/
    public function findMotivoBaja(){
        $data = self::$MotivoBajaModel->findMotivoBaja();
            
        return $data;
    }
    
    /*envia datos para grabar registro: MotivoBaja*/
    public function newMotivoBaja(){
        $data = self::$MotivoBajaModel->mantenimientoMotivoBaja();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: MotivoBaja*/
    public function editMotivoBaja(){
        $data = self::$MotivoBajaModel->mantenimientoMotivoBaja();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: MotivoBaja*/
    public function deleteMotivoBaja(){
        $data = self::$MotivoBajaModel->mantenimientoMotivoBaja();
        
        echo json_encode($data);
    }
    
}
