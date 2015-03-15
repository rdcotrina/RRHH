<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 26-01-2015 23:01:32 
* Descripcion : ClasificadorDetalleModel.php
* ---------------------------------------
*/ 

class clasificadorDetalleModel extends Model{

    private $_flag;
    private $_idClasificadorDetalle;
    private $_codigo;
    private $_subClasificador;
    private $_clasificadorDetalle;
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
        $this->_idClasificadorDetalle   = Aes::de(SimpleForm::getParam("_idClasificadorDetalle"));    /*se decifra*/
        $this->_codigo =   SimpleForm::getParam(CLSFD."txt_codigo");
        $this->_subClasificador =   SimpleForm::getParam(CLSFD."lst_subclasificador");
        $this->_clasificadorDetalle =   SimpleForm::getParam(CLSFD."txt_clasificadordetalle");
        $this->_activo =   SimpleForm::getParam(CLSFD."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: ClasificadorDetalle*/
    public function getGridClasificadorDetalle(){
        $query = "call sp_maeClasificadorDetalleGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*grabar nuevo registro: ClasificadorDetalle*/
    public function mantenimientoClasificadorDetalle(){
        $query = "call sp_maeClasificadorDetalleMantenimiento("
                        . ":flag,"
                        . ":idClasificadorDetalle,"
                        . ":codigo,"
                        . ":clasificadorDetalle,"
                        . ":idSubClasificador,"
                        . ":activo,"
                        . ":usuario"
                . ");";
        $parms = array(
            ':flag' => $this->_flag,
            ':idClasificadorDetalle' => $this->_idClasificadorDetalle,
            ':codigo' => $this->_codigo,
            ':clasificadorDetalle' => $this->_clasificadorDetalle,
            ':idSubClasificador' => $this->_subClasificador,
            ':activo' => (!empty($this->_activo))?$this->_activo:'I',
            ':usuario' => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: ClasificadorDetalle*/
    public function findClasificadorDetalle(){
        $query = "call sp_maeMaestrosConsultas(:flag,:idClasificadorDetalle);";
        
        $parms = array(
            ":flag" => 7,
            ":idClasificadorDetalle" => $this->_idClasificadorDetalle
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    public function getAllSubClasificador(){
        $query = "call sp_maeMaestrosConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 3,
            ":criterio" => ''
        );
        $data = $this->queryAll($query,$parms);
        return $data;
    }
    
}
