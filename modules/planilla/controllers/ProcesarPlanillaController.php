<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 24-06-2015 16:06:47 
* Descripcion : ProcesarPlanillaController.php
* ---------------------------------------
*/    

class ProcesarPlanillaController extends Controller{
    
    private static $ProcesarPlanillaModel;
    
    public function __construct() {
        self::$ProcesarPlanillaModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridProcesarPlanilla(){
        $rows = array();
        $data =  self::$ProcesarPlanillaModel->getGridProcesarPlanilla();
      //  print_r($data);
     /*   foreach ($data as $value) {
            $rows[] = array(
                "LLAVE1"=>AesCtr::en($value["CAMPO1"]),
                "LLAVE2"=> $value["CAMPO2"],
                "LLAVE3"=> $value["CAMPO3"],
                "total"=> $value["total"]
            );
        }
      
      */
        echo json_encode($data);
    }
    
    /*carga formulario (formNewProcesarPlanilla.phtml) para nuevo registro: ProcesarPlanilla*/
    public function formNewProcesarPlanilla(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditProcesarPlanilla.phtml) para editar registro: ProcesarPlanilla*/
    public function formEditProcesarPlanilla(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: ProcesarPlanilla*/
    public function findProcesarPlanilla(){
        $data = self::$ProcesarPlanillaModel->findProcesarPlanilla();
            
        return $data;
    }
    
    /*envia datos para grabar registro: ProcesarPlanilla*/
    public function newProcesarPlanilla(){
        $data = self::$ProcesarPlanillaModel->mantenimientoProcesarPlanilla();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: ProcesarPlanilla*/
    public function editProcesarPlanilla(){
        $data = self::$ProcesarPlanillaModel->mantenimientoProcesarPlanilla();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: ProcesarPlanilla*/
    /*SE ESTA UTILIZANDO PARA  Procesar Planilla*/
    public function deleteProcesarPlanilla(){
        $data = self::$ProcesarPlanillaModel->mantenimientoProcesarPlanilla();
        
        echo json_encode($data);
    }
    
}
