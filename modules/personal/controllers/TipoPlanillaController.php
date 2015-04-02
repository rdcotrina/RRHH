<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 02-04-2015 21:04:20 
* Descripcion : TipoPlanillaController.php
* ---------------------------------------
*/    

class TipoPlanillaController extends Controller{
    
    private static $TipoPlanillaModel;
    
    public function __construct() {
        self::$TipoPlanillaModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridTipoPlanilla(){
        $rows = array();
        $data =  self::$TipoPlanillaModel->getGridTipoPlanilla();
        foreach ($data as $value) {
            $rows[] = array(
                "id_tipoplanilla"=>AesCtr::en($value["id_tipoplanilla"]),
                "tipoplanilla"=> $value["tipoplanilla"],
                "estado"=> Functions::labelState($value["estado"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewTipoPlanilla.phtml) para nuevo registro: TipoPlanilla*/
    public function formNewTipoPlanilla(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditTipoPlanilla.phtml) para editar registro: TipoPlanilla*/
    public function formEditTipoPlanilla(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: TipoPlanilla*/
    public function findTipoPlanilla(){
        $data = self::$TipoPlanillaModel->findTipoPlanilla();
            
        return $data;
    }
    
    /*envia datos para grabar registro: TipoPlanilla*/
    public function newTipoPlanilla(){
        $data = self::$TipoPlanillaModel->mantenimientoTipoPlanilla();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: TipoPlanilla*/
    public function editTipoPlanilla(){
        $data = self::$TipoPlanillaModel->mantenimientoTipoPlanilla();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: TipoPlanilla*/
    public function deleteTipoPlanilla(){
        $data = self::$TipoPlanillaModel->mantenimientoTipoPlanilla();
        
        echo json_encode($data);
    }
    
}
