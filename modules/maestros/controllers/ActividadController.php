<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 12-03-2015 16:03:52 
* Descripcion : ActividadController.php
* ---------------------------------------
*/    

class ActividadController extends Controller{
    
    private static $ActividadModel;
    
    public function __construct() {
        self::$ActividadModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridActividad(){
        $rows = array();
        $data =  self::$ActividadModel->getGridActividad();
        foreach ($data as $value) {
            $rows[] = array(
                "id_actividad"=>AesCtr::en($value["id_actividad"]),
                "actividad"=> $value["actividad"],
                "codigo"=> $value["codigo"],
                "estadoact"=> Functions::labelState($value["estadoact"]),
                "clasificadorderivado"=> $value["clasificadorderivado"],
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewActividad.phtml) para nuevo registro: Actividad*/
    public function formNewActividad(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditActividad.phtml) para editar registro: Actividad*/
    public function formEditActividad(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: Actividad*/
    public function findActividad(){
        $data = self::$ActividadModel->findActividad();
            
        return $data;
    }
    
    /*envia datos para grabar registro: Actividad*/
    public function newActividad(){
        $data = self::$ActividadModel->mantenimientoActividad();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: Actividad*/
    public function editActividad(){
        $data = self::$ActividadModel->mantenimientoActividad();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: Actividad*/
    public function deleteActividad(){
        $data = self::$ActividadModel->mantenimientoActividad();
        
        echo json_encode($data);
    }
    
    public function getEspecificas($flag){
        $data = self::$ActividadModel->getEspecificas($flag);
            
        return $data;
    }
    
}
