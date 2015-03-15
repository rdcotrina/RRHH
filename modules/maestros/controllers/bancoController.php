<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 27-02-2015 09:02:37 
* Descripcion : BancoController.php
* ---------------------------------------
*/    

class bancoController extends Controller{
    
    private static $bancoModel;
    
    public function __construct() {
        self::$bancoModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridBanco(){
        $rows = array();
        $data =  self::$bancoModel->getGridBanco();
        foreach ($data as $value) {
            $rows[] = array(
                "id_banco"=>AesCtr::en($value["id_banco"]),
                "banco"=> $value["banco"],
                "estado"=> Functions::labelState($value["estado"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewBanco.phtml) para nuevo registro: Banco*/
    public function formNewBanco(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditBanco.phtml) para editar registro: Banco*/
    public function formEditBanco(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: Banco*/
    public function findBanco(){
        $data = self::$bancoModel->findBanco();
            
        return $data;
    }
    
    /*envia datos para grabar registro: Banco*/
    public function newBanco(){
        $data = self::$bancoModel->mantenimientoBanco();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: Banco*/
    public function editBanco(){
        $data = self::$bancoModel->mantenimientoBanco();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: Banco*/
    public function deleteBanco(){
        $data = self::$bancoModel->mantenimientoBanco();
        
        echo json_encode($data);
    }
    
}
