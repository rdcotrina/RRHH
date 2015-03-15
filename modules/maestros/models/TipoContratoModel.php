<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 27-02-2015 23:02:52 
* Descripcion : TipoContratoModel.php
* ---------------------------------------
*/ 

class TipoContratoModel extends Model{

    private $_flag;
    private $_idTipoContrato;
    private $_contrato;
    private $_contenido;
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
        $this->_idTipoContrato   = Aes::de(SimpleForm::getParam("_idTipoContrato"));    /*se decifra*/
        $this->_contrato =   SimpleForm::getParam(CTPCT."txt_contrato");
        $this->_contenido =   SimpleForm::getParam(CTPCT."txt_cuerpo");
        $this->_activo =   SimpleForm::getParam(CTPCT."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: TipoContrato*/
    public function getGridTipoContrato(){
        $query = "call sp_maeTipoContratoGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*grabar nuevo registro: TipoContrato*/
    public function matenimientoTipoContrato(){
        $query = "call sp_maeTipoContratoMantenimiento(:flag,:idTipoContrato,:contrato,:contenido,:activo,:usuario);";
        $parms = array(
            ':flag' => $this->_flag,
            ':idTipoContrato' => $this->_idTipoContrato,
            ':contrato' => $this->_contrato,
            ':contenido' => $this->_contenido,
            ':activo' => (!empty($this->_activo))?$this->_activo:'I',
            ':usuario' => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: TipoContrato*/
    public function findTipoContrato(){
        $query = "call sp_maeMaestrosConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 16,
            ":criterio" => $this->_idTipoContrato
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
}
