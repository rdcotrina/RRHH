<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 27-02-2015 10:02:22 
* Descripcion : CuentaCorrienteModel.php
* ---------------------------------------
*/ 

class CuentaCorrienteModel extends Model{

    private $_flag;
    private $_idCuentaCorriente;
    private $_idBanco;
    private $_cuentaCorriente;
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
        $this->_idCuentaCorriente   = Aes::de(SimpleForm::getParam("_idCuentaCorriente"));    /*se decifra*/
        $this->_idBanco =   SimpleForm::getParam(CTACT."lst_banco");
        $this->_cuentaCorriente =   SimpleForm::getParam(CTACT."txt_cuentacorriente");
        $this->_activo =   SimpleForm::getParam(CTACT."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: CuentaCorriente*/
    public function getGridCuentaCorriente(){
        $query = "call sp_maeCuentaCorrienteGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*mantenimientoCuentaCorriente registro: CuentaCorriente*/
    public function mantenimientoCuentaCorriente(){
        $query = "call sp_maeCuentaCorrienteMantenimiento(:flag,:idCuentaCorriente,:idBanco,:cuentaCorriente,:activo,:usuario);";
        $parms = array(
            ':flag' => $this->_flag,
            ':idCuentaCorriente' => $this->_idCuentaCorriente,
            ':idBanco' => $this->_idBanco,
            ':cuentaCorriente' => $this->_cuentaCorriente,
            ':activo' => (!empty($this->_activo))?$this->_activo:'I',
            ':usuario' => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: CuentaCorriente*/
    public function findCuentaCorriente(){
        $query = "call sp_maeMaestrosConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 13,
            ":criterio" => $this->_idCuentaCorriente
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    public function getBancos(){
        $query = "call sp_maeMaestrosConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 12,
            ":criterio" => ''
        );
        $data = $this->queryAll($query,$parms);
        return $data;
    }
    
}
