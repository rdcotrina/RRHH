<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 06-04-2015 23:04:06 
* Descripcion : MotivoBajaModel.php
* ---------------------------------------
*/ 

class MotivoBajaModel extends Model{

    private $_flag;
    private $_idMotivoBaja;
    private $_motivo;
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
        $this->_idMotivoBaja   = Aes::de(SimpleForm::getParam("_idMotivoBaja"));    /*se decifra*/
        $this->_motivo =   SimpleForm::getParam(MTBA."txt_motivo");
        $this->_activo =   SimpleForm::getParam(MTBA."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: MotivoBaja*/
    public function getGridMotivoBaja(){
        $query = "call sp_perMotivoBajaGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*mantenimiento (CRUD) registro: MotivoBaja*/
    public function mantenimientoMotivoBaja(){
        $query = "call sp_perMotivoBajaMantenimiento(:flag,:idMotivoBaja,:motivoBaja,:estado,:usuario);";
        
        $parms = array(
            ":flag" => $this->_flag,
            ":idMotivoBaja" => $this->_idMotivoBaja,
            ":motivoBaja" => $this->_motivo,
            ":estado" => (!empty($this->_activo))?$this->_activo:'I',
            ":usuario" => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: MotivoBaja*/
    public function findMotivoBaja(){
        $query = "call sp_perPersonalConsultas(:flag,:idMotivoBaja);";
        
        $parms = array(
            ":flag" => 25,
            ":idMotivoBaja" => $this->_idMotivoBaja
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
}
