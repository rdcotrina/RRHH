<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 30-01-2015 12:01:46 
* Descripcion : EspecificaController.php
* ---------------------------------------
*/    

class EspecificaController extends Controller{
    
    private static $EspecificaModel;
    
    public function __construct() {
        self::$EspecificaModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridEspecifica(){
        $rows = array();
        $data =  self::$EspecificaModel->getGridEspecifica();
        foreach ($data as $value) {
            if($value["estadoespe"] == 'A'){
                $e = '<label class="label label-success">Activo</label>';
            }elseif($value["estadoespe"] == 'I'){
                $e = '<label class="label label-danger">Inactivo</label>';
            }
            
            $rows[] = array(
                "id_especifica"=>AesCtr::en($value["id_especifica"]),
                "codigoespe"=> $value["codigoespe"],
                "especifica"=> $value["especifica"],
                "estadoespe"=> $e,
                "subclasificadordetalle"=> $value["subclasificadordetalle"],
                "clasificadordetalle"=> $value["clasificadordetalle"],
                "subclasificador"=> $value["subclasificador"],
                "clasificador"=> $value["clasificador"],
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewEspecifica.phtml) para nuevo registro: Especifica*/
    public function formNewEspecifica(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditEspecifica.phtml) para editar registro: Especifica*/
    public function formEditEspecifica(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: Especifica*/
    public function findEspecifica(){
        $data = self::$EspecificaModel->findEspecifica();
            
        return $data;
    }
    
    /*envia datos para grabar registro: Especifica*/
    public function newEspecifica(){
        $data = self::$EspecificaModel->mantenimientoEspecifica();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: Especifica*/
    public function editEspecifica(){
        $data = self::$EspecificaModel->mantenimientoEspecifica();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: Especifica*/
    public function deleteEspecifica(){
        $data = self::$EspecificaModel->mantenimientoEspecifica();
        
        echo json_encode($data);
    }
    
    public function getAllClasificador(){
        $data = self::$EspecificaModel->getAllClasificador();
        
        return $data;
    }
    
    public function getSubClasificador(){
        $data = self::$EspecificaModel->getSubClasificador();
        
        echo json_encode($data);
    }
    
    public function getClasificadorDetalle(){
        $data = self::$EspecificaModel->getClasificadorDetalle();
            
        echo json_encode($data);
    }
    
    public function getSubClasificadorDetalle(){
        $data = self::$EspecificaModel->getSubClasificadorDetalle();
            
        echo json_encode($data);
    }
    
}
