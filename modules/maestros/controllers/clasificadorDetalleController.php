<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 26-01-2015 23:01:32 
* Descripcion : ClasificadorDetalleController.php
* ---------------------------------------
*/    

class clasificadorDetalleController extends Controller{
    
    private static $clasificadorDetalleModel;
    
    public function __construct() {
        self::$clasificadorDetalleModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridClasificadorDetalle(){
        $rows = array();
        $data =  self::$clasificadorDetalleModel->getGridClasificadorDetalle();
        foreach ($data as $value) {
            if($value["estadocd"] == 'A'){
                $e = '<label class="label label-success">Activo</label>';
            }elseif($value["estadocd"] == 'I'){
                $e = '<label class="label label-danger">Inactivo</label>';
            }
            
            $rows[] = array(
                "id_clasificadordetalle"=>AesCtr::en($value["id_clasificadordetalle"]),
                "clasificadordetalle"=> $value["clasificadordetalle"],
                "subclasificador"=> $value["subclasificador"],
                "clasificador"=> $value["clasificador"],
                "codigocd"=> $value["codigocd"],
                "estadocd"=> $e,
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewClasificadorDetalle.phtml) para nuevo registro: ClasificadorDetalle*/
    public function formNewClasificadorDetalle(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditClasificadorDetalle.phtml) para editar registro: ClasificadorDetalle*/
    public function formEditClasificadorDetalle(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: ClasificadorDetalle*/
    public function findClasificadorDetalle(){
        $data = self::$clasificadorDetalleModel->findClasificadorDetalle();
            
        return $data;
    }
    
    /*envia datos para grabar registro: ClasificadorDetalle*/
    public function newClasificadorDetalle(){
        $data = self::$clasificadorDetalleModel->mantenimientoClasificadorDetalle();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: ClasificadorDetalle*/
    public function editClasificadorDetalle(){
        $data = self::$clasificadorDetalleModel->mantenimientoClasificadorDetalle();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: ClasificadorDetalle*/
    public function deleteClasificadorDetalle(){
        $data = self::$clasificadorDetalleModel->mantenimientoClasificadorDetalle();
        
        echo json_encode($data);
    }
    
    public function getAllSubClasificador(){
        $data = self::$clasificadorDetalleModel->getAllSubClasificador();
        
        return $data;
    }
    
}
