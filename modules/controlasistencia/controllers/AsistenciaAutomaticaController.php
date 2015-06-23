<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 07-06-2015 19:06:09 
* Descripcion : AsistenciaAutomaticaController.php
* ---------------------------------------
*/    

class AsistenciaAutomaticaController extends Controller{
    
    private static $AsistenciaAutomaticaModel;
    
    public function __construct() {
        self::$AsistenciaAutomaticaModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
  
    /*envia datos para grabar registro: AsistenciaAutomatica*/
    public function newAsistenciaAutomatica(){
        $data = self::$AsistenciaAutomaticaModel->mantenimientoAsistenciaAutomatica();
        
        echo json_encode($data);
    }

}
