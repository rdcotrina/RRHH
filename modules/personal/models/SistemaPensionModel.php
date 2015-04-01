<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 30-03-2015 01:03:44 
* Descripcion : SistemaPensionModel.php
* ---------------------------------------
*/ 

class SistemaPensionModel extends Model{

    private $_flag;
    private $_idSistemaPension;
    private $_ruc;
    private $_descripcion;
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
        $this->_idSistemaPension   = Aes::de(SimpleForm::getParam("_idSistemaPension"));    /*se decifra*/
        $this->_ruc =   SimpleForm::getParam(SISPE."txt_ruc");
        $this->_descripcion =   SimpleForm::getParam(SISPE."txt_sistemapension");
        $this->_activo =   SimpleForm::getParam(SISPE."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: SistemaPension*/
    public function getGridSistemaPension(){
        $query = "call sp_perSistemaPensionGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
        $parms = array(
            ":iDisplayStart" => $this->_pDisplayStart,
            ":iDisplayLength" => $this->_pDisplayLength,
            ":sOrder" => $this->_pOrder,
            ":sSearch" => $this->_pSearch ,
            ":sFilterCols" => $this->_sFilterCols
        );
        $data = $this->queryAll($query,$parms);
        return $data;
    }
    
    /*mantenimiento (CRUD) registro: SistemaPension*/
    public function mantenimientoSistemaPension(){
        $query = "call sp_perSistemaPensionMantenimiento(:flag,:idSistemaPension,:ruc,:descripcion,:estado,:usuario);";
        
        $parms = array(
            ":flag" => $this->_flag,
            ":idSistemaPension" => $this->_idSistemaPension,
            ":ruc" => $this->_ruc,
            ":descripcion" => $this->_descripcion,
            ":estado" => (!empty($this->_activo))?$this->_activo:'I',
            ":usuario" => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: SistemaPension*/
    public function findSistemaPension(){
        $query = "call sp_perPersonalConsultas(:flag,:idSistemaPension);";
        
        $parms = array(
            ":flag" => 10,
            ":idSistemaPension" => $this->_idSistemaPension
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
}
