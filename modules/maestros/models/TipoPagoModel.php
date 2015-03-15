<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 27-02-2015 19:02:59 
* Descripcion : TipoPagoModel.php
* ---------------------------------------
*/ 

class TipoPagoModel extends Model{

    private $_flag;
    private $_idTipoPago;
    private $_tipoPago;
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
        $this->_idTipoPago   = Aes::de(SimpleForm::getParam("_idTipoPago"));    /*se decifra*/
        $this->_tipoPago =   SimpleForm::getParam(PTPG."txt_tipopago");
        $this->_activo =   SimpleForm::getParam(PTPG."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: TipoPago*/
    public function getGridTipoPago(){
        $query = "call sp_maeTipoPagoGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*mantenimientoTipoPago registro: TipoPago*/
    public function mantenimientoTipoPago(){
        $query = "call sp_maeTipoPagoMantenimiento(:flag,:idTipoPago,:tipoPago,:activo);";
        $parms = array(
            ':flag' => $this->_flag,
            ':idTipoPago' => $this->_idTipoPago,
            ':tipoPago' => $this->_tipoPago,
            ':activo' => (!empty($this->_activo))?$this->_activo:'I'
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: TipoPago*/
    public function findTipoPago(){
        $query = "call sp_maeMaestrosConsultas(:flag,:criterio);";
        $parms = array(
            ':flag' => 15,
            ':criterio' => $this->_idTipoPago
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
}
