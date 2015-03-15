<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 27-02-2015 10:02:22 
* Descripcion : CuentaCorrienteController.php
* ---------------------------------------
*/    

class cuentaCorrienteController extends Controller{
    
    private static $cuentaCorrienteModel;
    
    public function __construct() {
        self::$cuentaCorrienteModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridCuentaCorriente(){
        $rows = array();
        $data =  self::$cuentaCorrienteModel->getGridCuentaCorriente();
        foreach ($data as $value) {
            $rows[] = array(
                "id_cuentacorriente"=>AesCtr::en($value["id_cuentacorriente"]),
                "cuentacorriente"=> $value["cuentacorriente"],
                "banco"=> $value["banco"],
                "estadocu"=> Functions::labelState($value["estadocu"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewCuentaCorriente.phtml) para nuevo registro: CuentaCorriente*/
    public function formNewCuentaCorriente(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditCuentaCorriente.phtml) para editar registro: CuentaCorriente*/
    public function formEditCuentaCorriente(){
        Obj::run()->View->render();
    }
    
    public function getBancos(){
        $data = self::$cuentaCorrienteModel->getBancos();
            
        return $data;
    }
    
    /*busca data para editar registro: CuentaCorriente*/
    public function findCuentaCorriente(){
        $data = self::$cuentaCorrienteModel->findCuentaCorriente();
            
        return $data;
    }
    
    /*envia datos para grabar registro: CuentaCorriente*/
    public function newCuentaCorriente(){
        $data = self::$cuentaCorrienteModel->mantenimientoCuentaCorriente();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: CuentaCorriente*/
    public function editCuentaCorriente(){
        $data = self::$cuentaCorrienteModel->mantenimientoCuentaCorriente();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: CuentaCorriente*/
    public function deleteCuentaCorriente(){
        $data = self::$cuentaCorrienteModel->mantenimientoCuentaCorriente();
        
        echo json_encode($data);
    }
    
}
