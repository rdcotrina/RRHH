<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 22-03-2015 01:03:50 
* Descripcion : EstructuraOrganicaModel.php
* ---------------------------------------
*/ 

class EstructuraOrganicaModel extends Model{

    private $_flag;
    private $_idEstructuraOrganica;
    private $_estructura;
    private $_dependencia;
    private $_activo;
    private $_usuario;
    
    /*para el grid*/
    private $_pDisplayStart;
    private $_pDisplayLength;
    private $_pSortingCols;
    private $_pSearch;
    private $_pOrder;
    private $_sFilterCols;
    
    public function __construct() {
        parent::__construct();
        $this->_set();
    }
    
    private function _set(){
        $this->_flag        = SimpleForm::getParam("_flag");
        //$this->_idEstructuraOrganica   = Aes::de(SimpleForm::getParam("_idEstructuraOrganica"));    /*se decifra*/
        $this->_estructura =   SimpleForm::getParam(ESOG."txt_estructuraorg");
        $this->_idEstructuraOrganica =   SimpleForm::getParam("_idEstructuraOrganica");
        $this->_activo =   SimpleForm::getParam(ESOG."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
    }
    
    public function mantenimientoEstructuraOrganica(){
        $query = "call sp_maeEstructuraOrganicaMantenimiento(:flag,:idEstructuraOrganica,:estructura,:estado,:usuario);";
        
        $parms = array(
            ":flag" => $this->_flag,
            ":idEstructuraOrganica" => $this->_idEstructuraOrganica,
            ":estructura" => $this->_estructura,
            ":estado" => 'A',
            ":usuario" => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: EstructuraOrganica*/
    public function findEstructuraOrganica(){
        $query = "call sp_maeMaestrosConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 18,
            ":criterio" => $this->_idEstructuraOrganica
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    public function getOrganigrama(){
        $query = "call sp_maeMaestrosConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 26,
            ":criterio" => ''
        );
        $data = $this->queryAll($query,$parms);
        return $data;
    }
    
}
