<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 02-04-2015 21:04:20 
* Descripcion : TipoPlanillaModel.php
* ---------------------------------------
*/ 

class TipoPlanillaModel extends Model{

    private $_flag;
    private $_idTipoPlanilla;
    private $_tipoplanilla;
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
        $this->_idTipoPlanilla   = Aes::de(SimpleForm::getParam("_idTipoPlanilla"));    /*se decifra*/
        $this->_tipoplanilla =   SimpleForm::getParam(TPLL."txt_tipoplanilla");
        $this->_activo =   SimpleForm::getParam(TPLL."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: TipoPlanilla*/
    public function getGridTipoPlanilla(){
        $query = "call sp_perTipoPlanillaGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*mantenimiento (CRUD) registro: TipoPlanilla*/
    public function mantenimientoTipoPlanilla(){
        $query = "call sp_perTipoPlanillaMantenimiento(:flag,:idTipoPlanilla,:tipoplanilla,:estado,:usuario);";
        
        $parms = array(
            ":flag" => $this->_flag,
            ":idTipoPlanilla" => $this->_idTipoPlanilla,
            ":tipoplanilla" => $this->_tipoplanilla,
            ":estado" => (!empty($this->_activo))?$this->_activo:'I',
            ":usuario" => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: TipoPlanilla*/
    public function findTipoPlanilla(){
        $query = "call sp_perPersonalConsultas(:flag,:idTipoPlanilla);";
        
        $parms = array(
            ":flag" => 11,
            ":idTipoPlanilla" => $this->_idTipoPlanilla
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
}
