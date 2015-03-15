<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 27-02-2015 18:02:03 
* Descripcion : TipoDocIdController.php
* ---------------------------------------
*/    

class TipoDocIdController extends Controller{
    
    private static $TipoDocIdModel;
    
    public function __construct() {
        self::$TipoDocIdModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridTipoDocId(){
        $rows = array();
        $data =  self::$TipoDocIdModel->getGridTipoDocId();
        foreach ($data as $value) {
            $rows[] = array(
                "id_tipodocumentoidentidad"=>AesCtr::en($value["id_tipodocumentoidentidad"]),
                "tipodocumentoidentidad"=> $value["tipodocumentoidentidad"],
                "estado"=> Functions::labelState($value["estado"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewTipoDocId.phtml) para nuevo registro: TipoDocId*/
    public function formNewTipoDocId(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditTipoDocId.phtml) para editar registro: TipoDocId*/
    public function formEditTipoDocId(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: TipoDocId*/
    public function findTipoDocId(){
        $data = self::$TipoDocIdModel->findTipoDocId();
            
        return $data;
    }
    
    /*envia datos para grabar registro: TipoDocId*/
    public function newTipoDocId(){
        $data = self::$TipoDocIdModel->mantenimientoTipoDocId();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: TipoDocId*/
    public function editTipoDocId(){
        $data = self::$TipoDocIdModel->mantenimientoTipoDocId();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: TipoDocId*/
    public function deleteTipoDocId(){
        $data = self::$TipoDocIdModel->mantenimientoTipoDocId();
        
        echo json_encode($data);
    }
    
}
