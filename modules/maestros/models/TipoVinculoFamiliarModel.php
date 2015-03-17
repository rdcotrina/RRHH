<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 16-03-2015 22:03:56 
* Descripcion : TipoVinculoFamiliarModel.php
* ---------------------------------------
*/ 

class TipoVinculoFamiliarModel extends Model{

    private $_flag;
    private $_idTipoVinculoFamiliar;
    private $_vinculo;
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
        $this->_idTipoVinculoFamiliar   = Aes::de(SimpleForm::getParam("_idTipoVinculoFamiliar"));    /*se decifra*/
        $this->_vinculo =   SimpleForm::getParam(VNFA."txt_tipovinculo");
        $this->_activo =   SimpleForm::getParam(VNFA."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: TipoVinculoFamiliar*/
    public function getGridTipoVinculoFamiliar(){
        $query = "call sp_maeTipoVinculoFamiliarGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*mantenimiento (CRUD) registro: TipoVinculoFamiliar*/
    public function mantenimientoTipoVinculoFamiliar(){
        $query = "call sp_maeTipoVinculoFamiliarMantenimiento(:flag,:key,:vinculo,:activo,:usuario);";
        $parms = array(
            ':flag' => $this->_flag,
            ':key' => $this->_idTipoVinculoFamiliar,
            ':vinculo' => $this->_vinculo,
            ':activo' => (!empty($this->_activo))?$this->_activo:'I',
            ':usuario' => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: TipoVinculoFamiliar*/
    public function findTipoVinculoFamiliar(){
        $query = "call sp_maeMaestrosConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 25,
            ":criterio" => $this->_idTipoVinculoFamiliar
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
}
