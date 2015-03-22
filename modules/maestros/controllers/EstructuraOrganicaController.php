<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 22-03-2015 01:03:50 
* Descripcion : EstructuraOrganicaController.php
* ---------------------------------------
*/    

class EstructuraOrganicaController extends Controller{
    
    private static $EstructuraOrganicaModel;
    
    public function __construct() {
        self::$EstructuraOrganicaModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    /*carga formulario (formNewEstructuraOrganica.phtml) para nuevo registro: EstructuraOrganica*/
    public function formNewEstructuraOrganica(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditEstructuraOrganica.phtml) para editar registro: EstructuraOrganica*/
    public function formEditEstructuraOrganica(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: EstructuraOrganica*/
    public function findEstructuraOrganica(){
        $data = self::$EstructuraOrganicaModel->findEstructuraOrganica();
            
        return $data;
    }
    
    /*envia datos para grabar registro: EstructuraOrganica*/
    public function newEstructuraOrganica(){
        $data = self::$EstructuraOrganicaModel->mantenimientoEstructuraOrganica();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: EstructuraOrganica*/
    public function editEstructuraOrganica(){
        $data = self::$EstructuraOrganicaModel->mantenimientoEstructuraOrganica();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: EstructuraOrganica*/
    public function deleteEstructuraOrganica(){
        $data = self::$EstructuraOrganicaModel->mantenimientoEstructuraOrganica();
        
        echo json_encode($data);
    }
    
    public function getOrganigrama(){
        $data = self::$EstructuraOrganicaModel->getOrganigrama();
            
        echo json_encode($data);
    }
    
}
