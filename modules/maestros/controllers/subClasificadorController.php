<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 25-01-2015 15:01:09 
* Descripcion : SubClasificadorController.php
* ---------------------------------------
*/    

class subClasificadorController extends Controller{
    
    private static $subClasificadorModel;
    
    public function __construct() {
        self::$subClasificadorModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridSubClasificador(){
        $rows = array();
        $data =  self::$subClasificadorModel->getGridSubClasificador();
        foreach ($data as $value) {
            if($value["estadosc"] == 'A'){
                $e = '<label class="label label-success">Activo</label>';
            }elseif($value["estadosc"] == 'I'){
                $e = '<label class="label label-danger">Inactivo</label>';
            }
            
            $rows[] = array(
                "id_subclasificador"=>AesCtr::en($value["id_subclasificador"]),
                "codigosc"=> $value["codigosc"],
                "subclasificador"=> $value["subclasificador"],
                "clasificador"=> $value["clasificador"],
                "estadosc"=> $e,
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewSubClasificador.phtml) para nuevo registro: SubClasificador*/
    public function formNewSubClasificador(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditSubClasificador.phtml) para editar registro: SubClasificador*/
    public function formEditSubClasificador(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: SubClasificador*/
    public function findSubClasificador(){
        $data = self::$subClasificadorModel->findSubClasificador();
            
        return $data;
    }
    
    /*envia datos para grabar registro: SubClasificador*/
    public function newSubClasificador(){
        $data = self::$subClasificadorModel->mantenimientoSubClasificador();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: SubClasificador*/
    public function editSubClasificador(){
        $data = self::$subClasificadorModel->mantenimientoSubClasificador();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: SubClasificador*/
    public function deleteSubClasificador(){
        $data = self::$subClasificadorModel->mantenimientoSubClasificador();
        
        echo json_encode($data);
    }
    
    public function getAllClasificador(){
        $data = self::$subClasificadorModel->allClasificador();
        
        return $data;
    }
    
}
