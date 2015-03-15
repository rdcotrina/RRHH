<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 07-03-2015 16:03:00 
* Descripcion : CargoController.php
* ---------------------------------------
*/    

class CargoController extends Controller{
    
    private static $CargoModel;
    
    public function __construct() {
        self::$CargoModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridCargo(){
        $rows = array();
        $data =  self::$CargoModel->getGridCargo();
        foreach ($data as $value) {
            $rows[] = array(
                "id_cargo"=>AesCtr::en($value["id_cargo"]),
                "cargo"=> $value["cargo"],
                "estado"=> Functions::labelState($value["estado"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewCargo.phtml) para nuevo registro: Cargo*/
    public function formNewCargo(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditCargo.phtml) para editar registro: Cargo*/
    public function formEditCargo(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: Cargo*/
    public function findCargo(){
        $data = self::$CargoModel->findCargo();
            
        return $data;
    }
    
    /*envia datos para grabar registro: Cargo*/
    public function newCargo(){
        $data = self::$CargoModel->mantenimientoCargo();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: Cargo*/
    public function editCargo(){
        $data = self::$CargoModel->mantenimientoCargo();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: Cargo*/
    public function deleteCargo(){
        $data = self::$CargoModel->mantenimientoCargo();
        
        echo json_encode($data);
    }
    
}
