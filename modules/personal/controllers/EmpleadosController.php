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
                "id_trabajador"=>AesCtr::en($value["id_trabajador"]),
                "nombrecompleto"=> $value["nombrecompleto"],
                "numerodocumento"=> $value["numerodocumento"],
                "email"=> $value["email"],
                "estadot"=> Functions::labelState($value["estadot"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    public function getGridConceptos(){
        $rows = array();
        $data =  self::$EmpleadosModel->getGridConceptos();
        foreach ($data as $value) {
            $perm = '<label class="label label-danger">No</label>';
            if($value["permanente"]){
                $perm = '<label class="label label-success">Si</label>';
            }
            
            $aplica = '<label class="label label-info">Porcentaje</label>';
            if($value["tipo_aplicacion"] == 'F'){
                $aplica = '<label class="label label-warning">Fijo</label>';
            }
            
            $var = '<label class="label label-danger">No</label>';
            if($value["variable"]){
                $var = '<label class="label label-success">Si</label>';
            }
            
            $rows[] = array(
                "id_conceptosplanillatrabajador"=>AesCtr::en($value["id_conceptosplanillatrabajador"]),
                "tipo_aplicacion"=> $aplica,
                "permanente"=> $perm,
                "fecha_inicio"=> $value["fecha_inicio"],
                "fecha_fin"=> $value["fecha_fin"],
                "monto"=> $value["monto"],
                "variable"=> $var,
                "conceptoplanilla"=> $value["conceptoplanilla"],
                "estadocp"=> Functions::labelState($value["estadocp"]),
                "comisionafp"=> $value["comisionafp"],
                "primaseguro"=> $value["primaseguro"],
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
    
    public function formNewDerechoHabientes(){
        Obj::run()->View->render();
    }
    
    public function formDatosLaborales(){
        Obj::run()->View->render();
    }
    
    public function formNewCargo(){
        Obj::run()->View->render();
    }
    
    public function formEditCargo(){
        Obj::run()->View->render();
    }
    
    public function formNewConceptoPlanilla(){
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
    
    public function postDatos(){
        $data = self::$EmpleadosModel->mantenimientoDatos();
        
        echo json_encode($data);
    }
    
    public function postNewConcepto(){
        $data = self::$EmpleadosModel->mantenimientoConcepto();
        
        echo json_encode($data);
    }
    
    public function deleteConceptoPlanilla(){
        $data = self::$EmpleadosModel->mantenimientoConcepto();
        
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
    
    public function getTipoVinculoFamiliar(){
        $data = self::$EmpleadosModel->getData(7);
        return $data;
    }
    
    public function getTipoPago(){
        $data = self::$EmpleadosModel->getData(12);
        return $data;
    }
    
    public function getTipoContrato(){
        $data = self::$EmpleadosModel->getData(13);
        return $data;
    }
    
    public function getHorario(){
        $data = self::$EmpleadosModel->getData(14);
        return $data;
    }
    
    public function getCategoria(){
        $data = self::$EmpleadosModel->getData(15);
        return $data;
    }
    
    public function getArea(){
        $data = self::$EmpleadosModel->getData(16);
        return $data;
    }
    
    public function getCargo(){
        $data = self::$EmpleadosModel->getData(17);
        return $data;
    }
    
    public function getBancos(){
        $data = self::$EmpleadosModel->getData(20);
        return $data;
    }
    
    public function getSistemaPensiones(){
        $data = self::$EmpleadosModel->getData(22);
        return $data;
    }
    
    public function getTipoPlanilla(){
        $data = self::$EmpleadosModel->getData(23);
        return $data;
    }
    
    public function getMotivoBaja(){
        $data = self::$EmpleadosModel->getData(24);
        return $data;
    }
    
    public function getConcepto(){
        $data = self::$EmpleadosModel->getData(26);
        return $data;
    }
    
    public function getCuentaCorriente($banco=''){
        $data = self::$EmpleadosModel->getCuentaCorriente($banco);
        
        if(!empty($banco)){
            return $data;
        }else{
            echo json_encode($data);
        }
    }
    
    public function findCargo(){
        $data = self::$EmpleadosModel->findCargo();
        
        return $data;
    }
    
    public function findDatos(){
        $data = self::$EmpleadosModel->findDatos();
        
        return $data;
    }
    
}
