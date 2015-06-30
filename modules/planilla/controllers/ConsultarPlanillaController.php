<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 25-06-2015 01:06:47 
* Descripcion : ConsultarPlanillaController.php
* ---------------------------------------
*/    

class ConsultarPlanillaController extends Controller{
    
    private static $ConsultarPlanillaModel;
    
    public function __construct() {
        self::$ConsultarPlanillaModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridConsultarPlanilla(){
        $rows = array();
        $data =  self::$ConsultarPlanillaModel->getGridConsultarPlanilla();
        /*
        foreach ($data as $value) {
            $rows[] = array(
                "id_trabajador"=>AesCtr::en($value["id_trabajador"]),
                "apellidopaterno"=> $value["apellidopaterno"],
                "apellidomaterno"=> $value["apellidomaterno"],
                "primernombre"=> $value["primernombre"],
                "segundonombre"=> $value["segundonombre"],
                "estado"=> Functions::labelState($value["estado"]),
                "total"=> $value["total"]
            );
        }
         * */
         
        echo json_encode($data);
    }
    
    /*carga formulario (formNewConsultarPlanilla.phtml) para nuevo registro: ConsultarPlanilla*/
    public function formNewConsultarPlanilla(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditConsultarPlanilla.phtml) para editar registro: ConsultarPlanilla*/
    public function formEditConsultarPlanilla(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: ConsultarPlanilla*/
    public function findConsultarPlanilla(){
        $data = self::$ConsultarPlanillaModel->findConsultarPlanilla();
            
        return $data;
    }
    
    /*envia datos para grabar registro: ConsultarPlanilla*/
    public function newConsultarPlanilla(){
        $data = self::$ConsultarPlanillaModel->mantenimientoConsultarPlanilla();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: ConsultarPlanilla*/
    public function editConsultarPlanilla(){
        $data = self::$ConsultarPlanillaModel->mantenimientoConsultarPlanilla();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: ConsultarPlanilla*/
    public function deleteConsultarPlanilla(){
        $data = self::$ConsultarPlanillaModel->mantenimientoConsultarPlanilla();
        
        echo json_encode($data);
    }
    
    public function getAllProcesoPlanilla(){
        $rows = array();
        $data =  self::$ConsultarPlanillaModel->getAllProcesoPlanilla();
        
        return ($data);
    }
}
