<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 29-03-2015 23:03:37 
* Descripcion : HorarioController.php
* ---------------------------------------
*/    

class HorarioController extends Controller{
    
    private static $HorarioModel;
    
    public function __construct() {
        self::$HorarioModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridHorario(){
        $rows = array();
        $data =  self::$HorarioModel->getGridHorario();
        foreach ($data as $value) {
            $rows[] = array(
                "id_horario"=>AesCtr::en($value["id_horario"]),
                "horario"=> $value["horario"],
                "hora_ingreso_m"=> $value["hora_ingreso_m"],
                "hora_salida_m"=> $value["hora_salida_m"],
                "hora_ingreso_t"=> $value["hora_ingreso_t"],
                "hora_salida_t"=> $value["hora_salida_t"],
                "estado"=> Functions::labelState($value["estado"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewHorario.phtml) para nuevo registro: Horario*/
    public function formNewHorario(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditHorario.phtml) para editar registro: Horario*/
    public function formEditHorario(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: Horario*/
    public function findHorario(){
        $data = self::$HorarioModel->findHorario();
            
        return $data;
    }
    
    /*envia datos para grabar registro: Horario*/
    public function newHorario(){
        $data = self::$HorarioModel->mantenimientoHorario();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: Horario*/
    public function editHorario(){
        $data = self::$HorarioModel->mantenimientoHorario();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: Horario*/
    public function deleteHorario(){
        $data = self::$HorarioModel->mantenimientoHorario();
        
        echo json_encode($data);
    }
    
}
