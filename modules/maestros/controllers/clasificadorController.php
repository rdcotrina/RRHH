<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 22-01-2015 13:01:45 
* Descripcion : ClasificadorController.php
* ---------------------------------------
*/    

class clasificadorController extends Controller{
    
    private static $clasificadorModel;
    
    public function __construct() {
        self::$clasificadorModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridClasificador(){
        $rows = array();
        $data =  self::$clasificadorModel->getClasificador();
        foreach ($data as $value) {
            if($value["estado"] == 'A'){
                $e = '<label class="label label-success">Activo</label>';
            }elseif($value["estado"] == 'I'){
                $e = '<label class="label label-danger">Inactivo</label>';
            }
            
            if($value["tipo"] == 'G'){
                $t = '<label class="label label-danger">Gasto</label>';
            }elseif($value["tipo"] == 'I'){
                $t = '<label class="label label-success">Ingreso</label>';
            }
            
            $rows[] = array(
                "id_clasificador"=>AesCtr::en($value["id_clasificador"]),
                "codigo"=> $value["codigo"],
                "clasificador"=> $value["clasificador"],
                "estado"=> $e,
                "tipo"=> $t,
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewClasificador.phtml) para nuevo registro: Clasificador*/
    public function formNewClasificador(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditClasificador.phtml) para editar registro: Clasificador*/
    public function formEditClasificador(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: Clasificador*/
    public function findClasificador(){
        $data = self::$clasificadorModel->findClasificador();
            
        return $data;
    }
    
    /*envia datos para grabar registro: Clasificador*/
    public function newClasificador(){
        $data = self::$clasificadorModel->mantenimientoClasificador();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: Clasificador*/
    public function editClasificador(){
        $data = self::$clasificadorModel->mantenimientoClasificador();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: Clasificador*/
    public function deleteClasificador(){
        $data = self::$clasificadorModel->mantenimientoClasificador();
        
        echo json_encode($data);
    }
    
}
