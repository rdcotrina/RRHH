<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 16-03-2015 22:03:56 
* Descripcion : TipoVinculoFamiliarController.php
* ---------------------------------------
*/    

class TipoVinculoFamiliarController extends Controller{
    
    private static $TipoVinculoFamiliarModel;
    
    public function __construct() {
        self::$TipoVinculoFamiliarModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridTipoVinculoFamiliar(){
        $rows = array();
        $data =  self::$TipoVinculoFamiliarModel->getGridTipoVinculoFamiliar();
        foreach ($data as $value) {
            $rows[] = array(
                "id_tipovinculofamiliar"=>AesCtr::en($value["id_tipovinculofamiliar"]),
                "vinculofamiliar"=> $value["vinculofamiliar"],
                "estado"=> Functions::labelState($value["estado"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewTipoVinculoFamiliar.phtml) para nuevo registro: TipoVinculoFamiliar*/
    public function formNewTipoVinculoFamiliar(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditTipoVinculoFamiliar.phtml) para editar registro: TipoVinculoFamiliar*/
    public function formEditTipoVinculoFamiliar(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: TipoVinculoFamiliar*/
    public function findTipoVinculoFamiliar(){
        $data = self::$TipoVinculoFamiliarModel->findTipoVinculoFamiliar();
            
        return $data;
    }
    
    /*envia datos para grabar registro: TipoVinculoFamiliar*/
    public function newTipoVinculoFamiliar(){
        $data = self::$TipoVinculoFamiliarModel->mantenimientoTipoVinculoFamiliar();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: TipoVinculoFamiliar*/
    public function editTipoVinculoFamiliar(){
        $data = self::$TipoVinculoFamiliarModel->mantenimientoTipoVinculoFamiliar();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: TipoVinculoFamiliar*/
    public function deleteTipoVinculoFamiliar(){
        $data = self::$TipoVinculoFamiliarModel->mantenimientoTipoVinculoFamiliar();
        
        echo json_encode($data);
    }
    
}
