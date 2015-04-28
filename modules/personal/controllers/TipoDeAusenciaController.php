<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 27-03-2015 16:03:35 
* Descripcion : TipoDeAusenciaController.php
* ---------------------------------------
*/    

class TipoDeAusenciaController extends Controller{
    
    private static $TipoDeAusenciaModel;
    
    public function __construct() {
        self::$TipoDeAusenciaModel = $this->loadModel(array('modulo'=>'personal','modelo'=>'TipoDeAusencia'));
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridTipoDeAusencia(){
        $rows = array();
        $data =  self::$TipoDeAusenciaModel->getGridTipoDeAusencia();
        foreach ($data as $value) {
            $rows[] = array(
                "id_tipo_ausencia"=>AesCtr::en($value["id_tipo_ausencia"]),
                "tipo_ausencia"=> $value["tipo_ausencia"],
                "grupo_ausencia"=> $value["grupo_ausencia"],
                "estado"=> Functions::labelState($value["estado"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewTipoDeAusencia.phtml) para nuevo registro: TipoDeAusencia*/
    public function formNewTipoDeAusencia(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditTipoDeAusencia.phtml) para editar registro: TipoDeAusencia*/
    public function formEditTipoDeAusencia(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: TipoDeAusencia*/
    public function findTipoDeAusencia(){
        $data = self::$TipoDeAusenciaModel->findTipoDeAusencia();
            
        return $data;
    }
    
    /*envia datos para grabar registro: TipoDeAusencia*/
    public function newTipoDeAusencia(){
        $data = self::$TipoDeAusenciaModel->mantenimientoTipoDeAusencia();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: TipoDeAusencia*/
    public function editTipoDeAusencia(){
        $data = self::$TipoDeAusenciaModel->mantenimientoTipoDeAusencia();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: TipoDeAusencia*/
    public function deleteTipoDeAusencia(){
        $data = self::$TipoDeAusenciaModel->mantenimientoTipoDeAusencia();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registros: TipoDeAusencia*/
    public function deleteTipoDeAusenciaAll(){
        $data = self::$TipoDeAusenciaModel->deleteTipoDeAusenciaAll();
        
        echo json_encode($data);
    }
    
    public function getAllTipoDeAusencia(){
        $data = self::$TipoDeAusenciaModel->getAllTipoDeAusencia();
        
        return $data;
    }
}