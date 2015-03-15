<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 07-03-2015 16:03:00 
* Descripcion : CargoModel.php
* ---------------------------------------
*/ 

class CargoModel extends Model{

    private $_flag;
    private $_idCargo;
    private $_cargo;
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
        $this->_idCargo   = Aes::de(SimpleForm::getParam("_idCargo"));    /*se decifra*/
        $this->_cargo =   SimpleForm::getParam(KRGO."txt_cargo");
        $this->_activo =   SimpleForm::getParam(KRGO."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: Cargo*/
    public function getGridCargo(){
        $query = "call sp_maeCargoGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
        $parms = array(
            ":iDisplayStart" => $this->_pDisplayStart,
            ":iDisplayLength" => $this->_pDisplayLength,
            ":sOrder" => $this->_pOrder,
            ":sSearch" => $this->_pSearch ,
            ":sFilterCols" => $this->_sFilterCols,
        );
        $data = $this->queryAll($query,$parms);
        return $data;
    }
    
    /*grabar nuevo registro: Cargo*/
    public function mantenimientoCargo(){
        $query = "call sp_maeCargoMantenimiento(:flag,:idCargo,:cargo,:activo,:usuario);";
        $parms = array(
            ':flag' => $this->_flag,
            ':idCargo' => $this->_idCargo,
            ':cargo' => $this->_cargo,
            ':activo' => (!empty($this->_activo))?$this->_activo:'I',
            ':usuario' => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: Cargo*/
    public function findCargo(){
        $query = "call sp_maeMaestrosConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 17,
            ":criterio" => $this->_idCargo
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
}
