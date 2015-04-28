<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 18-04-2015 22:04:13 
* Descripcion : GenerarMesController.php
* ---------------------------------------
*/    

class GenerarMesController extends Controller{
    
    private static $GenerarMesModel;
    
    public function __construct() {
        self::$GenerarMesModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridGenerarMes(){
        $rows = array();
        $data =  self::$GenerarMesModel->getGridGenerarMes();
        foreach ($data as $value) {
            $rows[] = array(
                "id_asistenciames"=>AesCtr::en($value["id_asistenciames"]),
                "anio"=> $value["anio"],
                "mes"=> $value["mes"],
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewGenerarMes.phtml) para nuevo registro: GenerarMes*/
    public function formNewGenerarMes(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditGenerarMes.phtml) para editar registro: GenerarMes*/
    public function formMeses(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: GenerarMes*/
    public function findGenerarMes(){
        $data = self::$GenerarMesModel->findGenerarMes();
            
        return $data;
    }
    
    /*envia datos para grabar registro: GenerarMes*/
    public function newGenerarMes(){
        $data = self::$GenerarMesModel->mantenimientoGenerarMes();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: GenerarMes*/
    public function editGenerarMes(){
        $data = self::$GenerarMesModel->mantenimientoGenerarMes();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: GenerarMes*/
    public function deleteGenerarMes(){
        $data = self::$GenerarMesModel->mantenimientoGenerarMes();
        
        echo json_encode($data);
    }
    
}
