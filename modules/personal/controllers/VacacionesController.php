<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 05-04-2015 19:04:19 
* Descripcion : VacacionesController.php
* ---------------------------------------
*/    

class VacacionesController extends Controller{
    
    private static $VacacionesModel;
    
    public function __construct() {
        self::$VacacionesModel = $this->loadModel();
        $this->loadController(array('modulo'=>'personal','controller'=>'TipoDeAusencia'));
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridVacaciones(){
        $rows = array();
        $data =  self::$VacacionesModel->getGridVacaciones();
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
        echo json_encode($rows);
    }
    
    public function getGridGestionar(){
        $rows = array();
        $data =  self::$VacacionesModel->getGridGestionar();
        foreach ($data as $value) {
            $rows[] = array(
                //"id_vac_movimiento"=>  AesCtr::en($value["id_vac_movimiento"]),
                "id_ausencias_trabajador"=>  AesCtr::en($value["id_ausencias_trabajador"]),
                "tipo_ausencia"=>$value["tipo_ausencia"],
                "fecha_inicio"=>Functions::dateFormat($value["fecha_inicio"], "d-m-Y"),
                "fecha_fin"=> Functions::dateFormat($value["fecha_fin"], "d-m-Y"),
                "dias_ausencia"=> $value["dias_ausencia"],
                "id_tipo_ausencia"=> $value["id_tipo_ausencia"],
                "fec_proc_planilla"=> $value["fec_proc_planilla"],
                "comentario"=> $value["comentario"],
                //dias_vac
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    public function IndexGestionar(){
        Obj::run()->View->render();
    }
    
    public function findTrabajador(){
        $data = self::$VacacionesModel->findTrabajador();
            
        return $data;
    }
    
    /*envia datos para grabar registro: Vacaciones*/
    public function newMovimiento(){
        $data = self::$VacacionesModel->mantenimientoMovimiento();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: Vacaciones*/
    public function editMovimiento(){
        $data = self::$VacacionesModel->mantenimientoMovimiento();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: Vacaciones*/
    public function deleteMovimiento(){
        $data = self::$VacacionesModel->mantenimientoMovimiento();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registros: Vacaciones*/
    public function deleteVacacionesAll(){
        $data = self::$VacacionesModel->deleteVacacionesAll();
        
        echo json_encode($data);
    }
    
}
