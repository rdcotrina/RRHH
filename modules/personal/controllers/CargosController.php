<?php

class CargosController extends Controller {
    
    private static $CargosModel;
    
    public function __construct() {
        self::$CargosModel = $this->loadModel();
    }
    
    public function index(){}
    
    public function getGridCargos(){
        $rows = array();
        $data =  self::$CargosModel->getGridCargos();
        foreach ($data as $value) {
            $p = '<label class="label label-danger">No</label>';
            if($value["principal"]){
                $p = '<label class="label label-success">Si</label>';
            }
            $rows[] = array(
                "id_cargotrabajador"=>AesCtr::en($value["id_cargotrabajador"]),
                "cargo"=> $value["cargo"],
                "area"=> $value["area"],
                "principal"=> $p,
                "estadoct"=> Functions::labelState($value["estadoct"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    public function newCargo(){
        $data = self::$CargosModel->mantenimientoCargo();
        
        echo json_encode($data);
    }
    
    public function editCargo(){
        $data = self::$CargosModel->mantenimientoCargo();
        
        echo json_encode($data);
    }
    
    public function deleteCargo(){
        $data = self::$CargosModel->mantenimientoCargo();
        
        echo json_encode($data);
    }
    
}