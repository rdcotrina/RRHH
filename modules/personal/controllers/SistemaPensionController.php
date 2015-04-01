<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 30-03-2015 01:03:44 
* Descripcion : SistemaPensionController.php
* ---------------------------------------
*/    

class SistemaPensionController extends Controller{
    
    private static $SistemaPensionModel;
    
    public function __construct() {
        self::$SistemaPensionModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridSistemaPension(){
        $rows = array();
        $data =  self::$SistemaPensionModel->getGridSistemaPension();
        foreach ($data as $value) {
            $rows[] = array(
                "id_sistemapension"=>AesCtr::en($value["id_sistemapension"]),
                "ruc"=> $value["ruc"],
                "sistemapension"=> $value["sistemapension"],
                "estado"=> Functions::labelState($value["estado"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewSistemaPension.phtml) para nuevo registro: SistemaPension*/
    public function formNewSistemaPension(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditSistemaPension.phtml) para editar registro: SistemaPension*/
    public function formEditSistemaPension(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: SistemaPension*/
    public function findSistemaPension(){
        $data = self::$SistemaPensionModel->findSistemaPension();
            
        return $data;
    }
    
    /*envia datos para grabar registro: SistemaPension*/
    public function newSistemaPension(){
        $data = self::$SistemaPensionModel->mantenimientoSistemaPension();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: SistemaPension*/
    public function editSistemaPension(){
        $data = self::$SistemaPensionModel->mantenimientoSistemaPension();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: SistemaPension*/
    public function deleteSistemaPension(){
        $data = self::$SistemaPensionModel->mantenimientoSistemaPension();
        
        echo json_encode($data);
    }
    
}
