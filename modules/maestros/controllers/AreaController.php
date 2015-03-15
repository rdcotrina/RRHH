<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 07-03-2015 18:03:04 
* Descripcion : AreaController.php
* ---------------------------------------
*/    

class AreaController extends Controller{
    
    private static $AreaModel;
    
    public function __construct() {
        self::$AreaModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridArea(){
        $rows = array();
        $data =  self::$AreaModel->getGridArea();
        foreach ($data as $value) {
            $rows[] = array(
                "id_area"=>AesCtr::en($value["id_area"]),
                "area"=> $value["area"],
                "estado"=> Functions::labelState($value["estado"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewArea.phtml) para nuevo registro: Area*/
    public function formNewArea(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditArea.phtml) para editar registro: Area*/
    public function formEditArea(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: Area*/
    public function findArea(){
        $data = self::$AreaModel->findArea();
            
        return $data;
    }
    
    /*envia datos para grabar registro: Area*/
    public function newArea(){
        $data = self::$AreaModel->matenimientoArea();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: Area*/
    public function editArea(){
        $data = self::$AreaModel->matenimientoArea();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: Area*/
    public function deleteArea(){
        $data = self::$AreaModel->matenimientoArea();
        
        echo json_encode($data);
    }
    
}
