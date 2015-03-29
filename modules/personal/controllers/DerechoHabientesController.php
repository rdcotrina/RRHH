<?php

class DerechoHabientesController extends Controller{
    
    private static $DerechoHabienteModel;
    
    public function __construct() {
        self::$DerechoHabienteModel = $this->loadModel();
    }
    
    public function index() {}
    
    public function getGridDerechoHabientes(){
        $rows = array();
        $data =  self::$DerechoHabienteModel->getGridDerechoHabientes();
        foreach ($data as $value) {
            $rows[] = array(
                "id_derechohabiente"=>AesCtr::en($value["id_derechohabiente"]),
                "nombres"=> $value["nombres"],
                "vinculofamiliar"=> $value["vinculofamiliar"],
                "numerodocumento"=> $value["numerodocumento"],
                "email"=> $value["email"],
                "telefonos"=> $value["telefonos"],
                "estadod"=> Functions::labelState($value["estadod"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    public function newDerechoHabientes(){
        $data = self::$DerechoHabienteModel->mantenimientoDerechoHabientes();
        
        echo json_encode($data);
    }
    
    public function getDerechoHabiente(){
        $data = self::$DerechoHabienteModel->findDerechoHabiente();
        
        echo json_encode($data);
    }
    
    public function deleteDerechohabiente(){
        $data = self::$DerechoHabienteModel->mantenimientoDerechoHabientes();
        
        echo json_encode($data);
    }
    
}

