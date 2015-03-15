<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 13-03-2015 18:03:31 
* Descripcion : ClasificadorDerivadoController.php
* ---------------------------------------
*/    

class ClasificadorDerivadoController extends Controller{
    
    private static $ClasificadorDerivadoModel;
    
    public function __construct() {
        self::$ClasificadorDerivadoModel = $this->loadModel();
        $this->loadController(array('modulo' => 'maestros', 'controller' => 'Actividad'));
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridClasificadorDerivado(){
        $rows = array();
        $data =  self::$ClasificadorDerivadoModel->getGridClasificadorDerivado();
       
        foreach ($data as $value) {
            $rows[] = array(
                "id_clasificadorderivado"=>AesCtr::en($value["id_clasificadorderivado"]),
                "codigocl"=> $value["codigocl"],
                "clasificadorderivado"=> $value["clasificadorderivado"],
                "estadocl"=> Functions::labelState($value["estadocl"]),
                "codigoespe"=> $value["codigoespe"],
                "especifica"=> $value["especifica"],
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewClasificadorDerivado.phtml) para nuevo registro: ClasificadorDerivado*/
    public function formNewClasificadorDerivado(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditClasificadorDerivado.phtml) para editar registro: ClasificadorDerivado*/
    public function formEditClasificadorDerivado(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: ClasificadorDerivado*/
    public function findClasificadorDerivado(){
        $data = self::$ClasificadorDerivadoModel->findClasificadorDerivado();
            
        return $data;
    }
    
    /*envia datos para grabar registro: ClasificadorDerivado*/
    public function newClasificadorDerivado(){
        $data = self::$ClasificadorDerivadoModel->mantenimientoClasificadorDerivado();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: ClasificadorDerivado*/
    public function editClasificadorDerivado(){
        $data = self::$ClasificadorDerivadoModel->mantenimientoClasificadorDerivado();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: ClasificadorDerivado*/
    public function deleteClasificadorDerivado(){
        $data = self::$ClasificadorDerivadoModel->mantenimientoClasificadorDerivado();
        
        echo json_encode($data);
    }
    
}
