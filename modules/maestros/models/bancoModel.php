<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 27-02-2015 09:02:37 
* Descripcion : BancoModel.php
* ---------------------------------------
*/ 

class BancoModel extends Model{

    private $_flag;
    private $_idBanco;
    private $_banco;
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
        $this->_idBanco   = Aes::de(SimpleForm::getParam("_idBanco"));    /*se decifra*/
        $this->_banco =   SimpleForm::getParam(BANK."txt_banco");
        $this->_activo =   SimpleForm::getParam(BANK."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: Banco*/
    public function getGridBanco(){
        $query = "call sp_maeBancoGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*mantenimiento registro: Banco*/
    public function mantenimientoBanco(){
        $query = "call sp_maeBancoMantenimiento(:flag,:idBanco,:banco,:activo,:usuario);";
        $parms = array(
            ':flag' => $this->_flag,
            ':idBanco' => $this->_idBanco,
            ':banco' => $this->_banco,
            ':activo' => (!empty($this->_activo))?$this->_activo:'I',
            ':usuario' => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: Banco*/
    public function findBanco(){
        $query = "call sp_maeMaestrosConsultas(:flag,:idClasificadorDetalle);";
        
        $parms = array(
            ":flag" => 11,
            ":idClasificadorDetalle" => $this->_idBanco
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
}
