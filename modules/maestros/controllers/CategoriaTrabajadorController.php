<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 11-03-2015 16:03:55 
* Descripcion : CategoriaTrabajadorController.php
* ---------------------------------------
*/    

class CategoriaTrabajadorController extends Controller{
    
    private static $CategoriaTrabajadorModel;
    
    public function __construct() {
        self::$CategoriaTrabajadorModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridCategoriaTrabajador(){
        $rows = array();
        $data =  self::$CategoriaTrabajadorModel->getGridCategoriaTrabajador();
        foreach ($data as $value) {
            $rows[] = array(
                "id_categoriatrabajador"=>AesCtr::en($value["id_categoriatrabajador"]),
                "categoriatrabajador"=> $value["categoriatrabajador"],
                "sicla"=> $value["sicla"],
                "estado"=> Functions::labelState($value["estado"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewCategoriaTrabajador.phtml) para nuevo registro: CategoriaTrabajador*/
    public function formNewCategoriaTrabajador(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditCategoriaTrabajador.phtml) para editar registro: CategoriaTrabajador*/
    public function formEditCategoriaTrabajador(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: CategoriaTrabajador*/
    public function findCategoriaTrabajador(){
        $data = self::$CategoriaTrabajadorModel->findCategoriaTrabajador();
            
        return $data;
    }
    
    /*envia datos para grabar registro: CategoriaTrabajador*/
    public function newCategoriaTrabajador(){
        $data = self::$CategoriaTrabajadorModel->mantenimientoCategoriaTrabajador();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: CategoriaTrabajador*/
    public function editCategoriaTrabajador(){
        $data = self::$CategoriaTrabajadorModel->mantenimientoCategoriaTrabajador();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: CategoriaTrabajador*/
    public function deleteCategoriaTrabajador(){
        $data = self::$CategoriaTrabajadorModel->mantenimientoCategoriaTrabajador();
        
        echo json_encode($data);
    }
    
}
