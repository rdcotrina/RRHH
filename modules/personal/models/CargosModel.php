<?php

class CargosModel extends Model{
    
    private $_flag;
    private $_idEmpleado;
    private $_idCargoTrabajador;
    private $_area;
    private $_cargo;
    private $_principal;
    private $_estado;
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
        $this->_idEmpleado   = Aes::de(SimpleForm::getParam("_idEmpleados"));    /*se decifra*/
        $this->_idCargoTrabajador  = Aes::de(SimpleForm::getParam("_idCargoTrabajador"));    /*se decifra*/
        $this->_area =   SimpleForm::getParam(EMPL."lst_area");
        $this->_cargo =   SimpleForm::getParam(EMPL."lst_cargo");
        $this->_principal =   SimpleForm::getParam(EMPL."chk_principal");
        $this->_estado =   SimpleForm::getParam(EMPL."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    public function getGridCargos(){
        $query = "call sp_perPersonalCargoGrid(:idEmpleado,:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
        $parms = array(
            ":idEmpleado" => $this->_idEmpleado,
            ":iDisplayStart" => $this->_pDisplayStart,
            ":iDisplayLength" => $this->_pDisplayLength,
            ":sOrder" => $this->_pOrder,
            ":sSearch" => $this->_pSearch ,
            ":sFilterCols" => $this->_sFilterCols
        );
        $data = $this->queryAll($query,$parms);
        return $data;
    }
    
    public function mantenimientoCargo(){
        $query = "call sp_perPersonalCargoMantenimiento(:flag,:key,:idTtrabajador,:idCargo,:idArea,:principal,:estado,:usuario);";
        
        $parms = array(
            ":flag" => $this->_flag,
            ":key" => $this->_idCargoTrabajador,
            ":idTtrabajador" => $this->_idEmpleado,
            ":idCargo" => $this->_cargo,
            ":idArea" => $this->_area ,
            ":principal" => (!empty($this->_principal))?$this->_principal:'0',
            ":estado" => (!empty($this->_estado))?$this->_estado:'I',
            ":usuario" => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    
    
}