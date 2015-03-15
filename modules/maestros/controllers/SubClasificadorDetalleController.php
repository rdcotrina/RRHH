<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 28-01-2015 00:01:08 
* Descripcion : SubClasificadorDetalleController.php
* ---------------------------------------
*/    

class SubClasificadorDetalleController extends Controller{
    
    private static $SubClasificadorDetalleModel;
    
    public function __construct() {
        $this->loadController(array('modulo'=>'maestros','controller'=>'clasificadorDetalle'));
        self::$SubClasificadorDetalleModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridSubClasificadorDetalle(){
        $rows = array();
        $data =  self::$SubClasificadorDetalleModel->getGridSubClasificadorDetalle();
        foreach ($data as $value) {
            if($value["estadoscd"] == 'A'){
                $e = '<label class="label label-success">Activo</label>';
            }elseif($value["estadoscd"] == 'I'){
                $e = '<label class="label label-danger">Inactivo</label>';
            }
            
            $rows[] = array(
                "id_subclasificadordetalle"=>AesCtr::en($value["id_subclasificadordetalle"]),
                "subclasificadordetalle"=> $value["subclasificadordetalle"],
                "clasificadordetalle"=> $value["clasificadordetalle"],
                "subclasificador"=> $value["subclasificador"],
                "clasificador"=> $value["clasificador"],
                "codigoscd"=> $value["codigoscd"],
                "estadoscd"=> $e,
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewSubClasificadorDetalle.phtml) para nuevo registro: SubClasificadorDetalle*/
    public function formNewSubClasificadorDetalle(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditSubClasificadorDetalle.phtml) para editar registro: SubClasificadorDetalle*/
    public function formEditSubClasificadorDetalle(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: SubClasificadorDetalle*/
    public function findSubClasificadorDetalle(){
        $data = self::$SubClasificadorDetalleModel->findSubClasificadorDetalle();
            
        return $data;
    }
    
    public function getClasificadorDetalle(){
        $data = self::$SubClasificadorDetalleModel->getClasificadorDetalle();
            
        echo json_encode($data);
    }
    
    public function getAllClasificadorDetalle($id){
        $data = self::$SubClasificadorDetalleModel->getAllClasificadorDetalle($id);
            
        return ($data);
    }
    
    /*envia datos para grabar registro: SubClasificadorDetalle*/
    public function newSubClasificadorDetalle(){
        $data = self::$SubClasificadorDetalleModel->mantenimientoSubClasificadorDetalle();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: SubClasificadorDetalle*/
    public function editSubClasificadorDetalle(){
        $data = self::$SubClasificadorDetalleModel->mantenimientoSubClasificadorDetalle();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: SubClasificadorDetalle*/
    public function deleteSubClasificadorDetalle(){
        $data = self::$SubClasificadorDetalleModel->mantenimientoSubClasificadorDetalle();
        
        echo json_encode($data);
    }
    
}
