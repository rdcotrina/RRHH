<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 15-06-2015 20:06:41 
* Descripcion : TipoProcesoPlanillaController.php
* ---------------------------------------
*/    

class TipoProcesoPlanillaController extends Controller{
    
    private static $TipoProcesoPlanillaModel;
    
    public function __construct() {
        self::$TipoProcesoPlanillaModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridTipoProcesoPlanilla(){
        $rows = array();
        $data =  self::$TipoProcesoPlanillaModel->getGridTipoProcesoPlanilla();
      //  foreach ($data as $value) {
     //       $rows[] = array(
     //           "id_tipo_proceso_planilla"=>AesCtr::en($value["id_tipo_proceso_planilla"]),
     //           "tipo_proceso_planilla"=> $value["tipo_proceso_planilla"],
      //          "estado"=> Functions::labelState($value["estado"]),
     //           "total"=> $value["total"]
     //       );
      ///  }
        echo json_encode($data);
    }
    
    /*carga formulario (formNewTipoProcesoPlanilla.phtml) para nuevo registro: TipoProcesoPlanilla*/
    public function formNewTipoProcesoPlanilla(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditTipoProcesoPlanilla.phtml) para editar registro: TipoProcesoPlanilla*/
    public function formEditTipoProcesoPlanilla(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: TipoProcesoPlanilla*/
    public function findTipoProcesoPlanilla(){
        
        $data = self::$TipoProcesoPlanillaModel->findTipoProcesoPlanilla();
            
        return $data;
    }
    
    /*envia datos para grabar registro: TipoProcesoPlanilla*/
    public function newTipoProcesoPlanilla(){
        $data = self::$TipoProcesoPlanillaModel->mantenimientoTipoProcesoPlanilla();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: TipoProcesoPlanilla*/
    public function editTipoProcesoPlanilla(){
        $data = self::$TipoProcesoPlanillaModel->mantenimientoTipoProcesoPlanilla();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: TipoProcesoPlanilla*/
    public function deleteTipoProcesoPlanilla(){
        $data = self::$TipoProcesoPlanillaModel->mantenimientoTipoProcesoPlanilla();
        
        echo json_encode($data);
    }
    public function getAllTipoPlanilla(){
        $data = self::$TipoProcesoPlanillaModel->getAllTipoPlanilla();
        
        return $data;
    }
}
