<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 18-03-2015 23:03:01 
* Descripcion : EmpleadosController.php
* ---------------------------------------
*/    

class EmpleadosController extends Controller{
    
    private static $EmpleadosModel;
    
    public function __construct() {
        self::$EmpleadosModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridEmpleados(){
        $rows = array();
        $data =  self::$EmpleadosModel->getGridEmpleados();
        foreach ($data as $value) {
            $rows[] = array(
                "LLAVE1"=>AesCtr::en($value["CAMPO1"]),
                "LLAVE2"=> $value["CAMPO2"],
                "LLAVE3"=> $value["CAMPO3"],
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewEmpleados.phtml) para nuevo registro: Empleados*/
    public function formNewEmpleados(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditEmpleados.phtml) para editar registro: Empleados*/
    public function formEditEmpleados(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: Empleados*/
    public function findEmpleados(){
        $data = self::$EmpleadosModel->findEmpleados();
            
        return $data;
    }
    
    /*envia datos para grabar registro: Empleados*/
    public function newEmpleados(){
        $data = self::$EmpleadosModel->mantenimientoEmpleados();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: Empleados*/
    public function editEmpleados(){
        $data = self::$EmpleadosModel->mantenimientoEmpleados();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: Empleados*/
    public function deleteEmpleados(){
        $data = self::$EmpleadosModel->mantenimientoEmpleados();
        
        echo json_encode($data);
    }
    
    public function getTipoDocumento(){
        $data = self::$EmpleadosModel->getData(1);
        
        return $data;
    }
    
    public function getActividad(){
        $data = self::$EmpleadosModel->getData(2);
        
        return $data;
    }
    
    public function getDepartamento(){
        $data = self::$EmpleadosModel->getData(3);
        
        return $data;
    }
}
