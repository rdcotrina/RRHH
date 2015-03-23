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
                "id_persona"=>AesCtr::en($value["id_persona"]),
                "nombrecompleto"=> $value["nombrecompleto"],
                "numerodocumento"=> $value["numerodocumento"],
                "email"=> $value["email"],
                "estadot"=> Functions::labelState($value["estadot"]),
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
    
    public function getProvincia($dep=''){
        $depar = $dep;
        if($dep == ''){
            $depar = SimpleForm::getParam('_idDepartamento');
        }
        
        $data = self::$EmpleadosModel->getData(4,$depar);
        
        if($dep == ''){
            echo json_encode($data);
        }else{
            return $data;
        }
    }
    
    public function getDistrito($pro=''){
        $provi = $pro;
        if(empty($pro)){
            $provi = SimpleForm::getParam('_idProvincia');
        }
        $data = self::$EmpleadosModel->getData(5,$provi);
        
        if(!empty($pro)){
            return $data;
        }else{
            echo json_encode($data);
        }
    }
    
}
