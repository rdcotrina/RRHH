<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 28-05-2015 07:05:13 
* Descripcion : AsistenciaManualController.php
* ---------------------------------------
*/    

class AsistenciaManualController extends Controller{
    
    private static $AsistenciaManualModel;
    
    public function __construct() {
        self::$AsistenciaManualModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridAsistenciaManual(){
        $rows = array();
        $data =  self::$AsistenciaManualModel->getGridAsistenciaManual();
        foreach ($data as $value) {
            $rows[] = array(
                "id_asistenciatrabajador"=>AesCtr::en($value["id_asistenciatrabajador"]),
                "fecha"=> $value["fecha"],
                "hora_ingreso_m"=> $value["hora_ingreso_m"],
                "hora_salida_m"=> $value["hora_salida_m"],
                "hora_ingreso_t"=> $value["hora_ingreso_t"],
                "hora_salida_t"=> $value["hora_salida_t"],
                "origen"=> $value["origen"],
                "estado"=> Functions::labelState($value["estado"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewAsistenciaManual.phtml) para nuevo registro: AsistenciaManual*/
    public function formNewAsistenciaManual(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditAsistenciaManual.phtml) para editar registro: AsistenciaManual*/
    public function formEditAsistenciaManual(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: AsistenciaManual*/
    public function findAsistenciaManual(){
        $data = self::$AsistenciaManualModel->findAsistenciaManual();
            
        return $data;
    }
    
    /*envia datos para grabar registro: AsistenciaManual*/
    public function newAsistenciaManual(){
        $data = self::$AsistenciaManualModel->mantenimientoAsistenciaManual();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: AsistenciaManual*/
    public function editAsistenciaManual(){
        $data = self::$AsistenciaManualModel->mantenimientoAsistenciaManual();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: AsistenciaManual*/
    public function deleteAsistenciaManual(){
        $data = self::$AsistenciaManualModel->mantenimientoAsistenciaManual();
        
        echo json_encode($data);
    }
    
    public function getTrabajador(){
        $data = self::$AsistenciaManualModel->getAsistenciaTrab(1);
        
        return $data;
    }
    
    public function getFechaxAnioActual(){
        $data = self::$AsistenciaManualModel->getAsistenciaTrab(2);
        
        return $data;
    }
}
