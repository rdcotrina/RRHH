<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 27-02-2015 23:02:52 
* Descripcion : TipoContratoController.php
* ---------------------------------------
*/    

class TipoContratoController extends Controller{
    
    private static $TipoContratoModel;
    
    public function __construct() {
        self::$TipoContratoModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridTipoContrato(){
        $rows = array();
        $data =  self::$TipoContratoModel->getGridTipoContrato();
        foreach ($data as $value) {
            $rows[] = array(
                "id_tipocontrato"=>AesCtr::en($value["id_tipocontrato"]),
                "contrato"=> $value["contrato"],
                "estado"=> Functions::labelState($value["estado"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewTipoContrato.phtml) para nuevo registro: TipoContrato*/
    public function formNewTipoContrato(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditTipoContrato.phtml) para editar registro: TipoContrato*/
    public function formEditTipoContrato(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: TipoContrato*/
    public function findTipoContrato(){
        $data = self::$TipoContratoModel->findTipoContrato();
            
        return $data;
    }
    
    /*envia datos para grabar registro: TipoContrato*/
    public function newTipoContrato(){
        $data = self::$TipoContratoModel->matenimientoTipoContrato();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: TipoContrato*/
    public function editTipoContrato(){
        $data = self::$TipoContratoModel->matenimientoTipoContrato();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: TipoContrato*/
    public function deleteTipoContrato(){
        $data = self::$TipoContratoModel->matenimientoTipoContrato();
        
        echo json_encode($data);
    }
    
}
