<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 27-02-2015 19:02:59 
* Descripcion : TipoPagoController.php
* ---------------------------------------
*/    

class TipoPagoController extends Controller{
    
    private static $TipoPagoModel;
    
    public function __construct() {
        self::$TipoPagoModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridTipoPago(){
        $rows = array();
        $data =  self::$TipoPagoModel->getGridTipoPago();
        foreach ($data as $value) {
            $rows[] = array(
                "id_tipopago"=>AesCtr::en($value["id_tipopago"]),
                "tipopago"=> $value["tipopago"],
                "estado"=> Functions::labelState($value["estado"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewTipoPago.phtml) para nuevo registro: TipoPago*/
    public function formNewTipoPago(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditTipoPago.phtml) para editar registro: TipoPago*/
    public function formEditTipoPago(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: TipoPago*/
    public function findTipoPago(){
        $data = self::$TipoPagoModel->findTipoPago();
            
        return $data;
    }
    
    /*envia datos para grabar registro: TipoPago*/
    public function newTipoPago(){
        $data = self::$TipoPagoModel->mantenimientoTipoPago();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: TipoPago*/
    public function editTipoPago(){
        $data = self::$TipoPagoModel->mantenimientoTipoPago();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: TipoPago*/
    public function deleteTipoPago(){
        $data = self::$TipoPagoModel->mantenimientoTipoPago();
        
        echo json_encode($data);
    }
    
}
