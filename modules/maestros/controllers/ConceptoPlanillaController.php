<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 12-03-2015 08:03:42 
* Descripcion : ConceptoPlanillaController.php
* ---------------------------------------
*/    

class ConceptoPlanillaController extends Controller{
    
    private static $ConceptoPlanillaModel;
    
    public function __construct() {
        self::$ConceptoPlanillaModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridConceptoPlanilla(){
        $rows = array();
        $data =  self::$ConceptoPlanillaModel->getGridConceptoPlanilla();
        foreach ($data as $value) {
            $rows[] = array(
                "id_conceptoplanilla"=>AesCtr::en($value["id_conceptoplanilla"]),
                "conceptoplanilla"=> $value["conceptoplanilla"],
                "descripcion_corta"=> $value["descripcion_corta"],
                "clasificacion"=> Functions::labelClasificacionCP($value["clasificacion"]),
                "estado"=> Functions::labelState($value["estado"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewConceptoPlanilla.phtml) para nuevo registro: ConceptoPlanilla*/
    public function formNewConceptoPlanilla(){
        Obj::run()->View->render();
    }
    
    /*carga formulario (formEditConceptoPlanilla.phtml) para editar registro: ConceptoPlanilla*/
    public function formEditConceptoPlanilla(){
        Obj::run()->View->render();
    }
    
    /*busca data para editar registro: ConceptoPlanilla*/
    public function findConceptoPlanilla(){
        $data = self::$ConceptoPlanillaModel->findConceptoPlanilla();
            
        return $data;
    }
    
    /*envia datos para grabar registro: ConceptoPlanilla*/
    public function newConceptoPlanilla(){
        $data = self::$ConceptoPlanillaModel->mantenimientoConceptoPlanilla();
        
        echo json_encode($data);
    }
    
    /*envia datos para editar registro: ConceptoPlanilla*/
    public function editConceptoPlanilla(){
        $data = self::$ConceptoPlanillaModel->mantenimientoConceptoPlanilla();
        
        echo json_encode($data);
    }
    
    /*envia datos para eliminar registro: ConceptoPlanilla*/
    public function deleteConceptoPlanilla(){
        $data = self::$ConceptoPlanillaModel->mantenimientoConceptoPlanilla();
        
        echo json_encode($data);
    }
    
}
