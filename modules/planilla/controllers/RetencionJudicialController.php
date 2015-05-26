<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 24-05-2015 01:05:46 
* Descripcion : RetencionJudicialController.php
* ---------------------------------------
*/    

class RetencionJudicialController extends Controller{
    
    private static $RetencionJudicialModel;
    
    public function __construct() {
        self::$RetencionJudicialModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridRetencionJudicial(){
        $rows = array();
        $data =  self::$RetencionJudicialModel->getGridRetencionJudicial();
        foreach ($data as $value) {
            $rows[] = array(
                "id_retencionjudicial"=>AesCtr::en($value["id_retencionjudicial"]),
                "dni"=> $value["dni"], 
                "nombrecompleto"=> $value["nombrecompleto"],
                "conceptoplanilla"=> $value["conceptoplanilla"],
                "beneficiario"=> $value["beneficiario"],
                "tipoaplicacion"=> $value["tipoaplicacion"],
                "fecha_inicio"=> $value["fecha_inicio"],
                "fecha_fin"=> $value["fecha_fin"],
                "monto"=> $value["monto"],
                "estado"=> Functions::labelState($value["estado"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewRetencionJudicial.phtml) para nuevo registro: RetencionJudicial*/
    public function formNewRetencionJudicial(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditRetencionJudicial.phtml) para editar registro: RetencionJudicial*/
    public function formEditRetencionJudicial(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: RetencionJudicial*/
    public function findRetencionJudicial(){
        $data = self::$RetencionJudicialModel->findRetencionJudicial();
            
        return $data;
    }
    
    /*envia datos para grabar registro: RetencionJudicial*/
    public function newRetencionJudicial(){
        $data = self::$RetencionJudicialModel->mantenimientoRetencionJudicial();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: RetencionJudicial*/
    public function editRetencionJudicial(){
        $data = self::$RetencionJudicialModel->mantenimientoRetencionJudicial();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: RetencionJudicial*/
    public function deleteRetencionJudicial(){
        $data = self::$RetencionJudicialModel->mantenimientoRetencionJudicial();
        
        echo json_encode($data);
    }
    
    public function getTrabajador(){
        $data = self::$RetencionJudicialModel->getRetencionJudicial(1);
        
        return $data;
    }
    
    public function getBeneficiario($criterio=''){
        /*
        $data = self::$RetencionJudicialModel->getRetencionJudicial(2,$criterio);
        
            echo json_encode($data);
            */
        //$this->_idCriterio
        $beni = $criterio;
        if(empty($criterio)){
            $beni = SimpleForm::getParam('_idCriterio');
        }
        $data = self::$RetencionJudicialModel->getRetencionJudicial(2,$beni);
        
        if(!empty($criterio)){
            return $data;
        }else{
            echo json_encode($data);
        }
    }
    
    public function getConcepto(){
        $data = self::$RetencionJudicialModel->getRetencionJudicial(3);
        
            return $data;
    }
    
    public function getBancos(){
        $data = self::$RetencionJudicialModel->getRetencionJudicial(4);
        
            return $data;
    }
    
    public function getCuentaCorriente($criterio=''){
        /*
        $data = self::$RetencionJudicialModel->getRetencionJudicial(5);
            echo json_encode($data);
            */
        
        $cta = $criterio;
        if(empty($criterio)){
            $cta = SimpleForm::getParam('_idCriterio');
        }
        $data = self::$RetencionJudicialModel->getRetencionJudicial(5,$cta);
        
        if(!empty($criterio)){
            return $data;
        }else{
            echo json_encode($data);
        }
    }
    
}
