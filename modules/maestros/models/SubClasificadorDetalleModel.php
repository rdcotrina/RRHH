<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 28-01-2015 00:01:08 
* Descripcion : SubClasificadorDetalleModel.php
* ---------------------------------------
*/ 

class SubClasificadorDetalleModel extends Model{

    private $_flag;
    private $_idSubClasificadorDetalle;
    private $_idSubClasificador;
    private $_codigo;
    private $_subClasificadorDetalle;
    private $_clasificadordetalle;
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
        $this->_idSubClasificadorDetalle   = Aes::de(SimpleForm::getParam("_idSubClasificadorDetalle"));    /*se decifra*/
        $this->_idSubClasificador =   SimpleForm::getParam(SBCLD."lst_subclasificador");
        $this->_codigo =   SimpleForm::getParam(SBCLD."txt_codigo");
        $this->_clasificadordetalle =   SimpleForm::getParam(SBCLD."lst_clasificadordetalle");
        $this->_subClasificadorDetalle =   SimpleForm::getParam(SBCLD."txt_subclasificadordetalle");
        $this->_activo =   SimpleForm::getParam(SBCLD."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: SubClasificadorDetalle*/
    public function getGridSubClasificadorDetalle(){
        $query = "call sp_maeSubClasificadorDetalleGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*grabar nuevo registro: SubClasificadorDetalle*/
    public function mantenimientoSubClasificadorDetalle(){
        $query = "call sp_maeSubClasificadorDetalleMantenimiento(:flag,:key,:codigo,:subClasificadorDetalle,:idClasificadorDetalle,:estado,:usuario);";
        
        $parms = array(
            ":flag" => $this->_flag,
            ":key" => $this->_idSubClasificadorDetalle,
            ":codigo" => $this->_codigo,
            ":subClasificadorDetalle" => $this->_subClasificadorDetalle ,
            ":idClasificadorDetalle" => $this->_clasificadordetalle,
            ":estado" => (!empty($this->_activo))?$this->_activo:'I',
            ":usuario" => $this->_usuario,
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: SubClasificadorDetalle*/
    public function findSubClasificadorDetalle(){
        $query = "call sp_maeMaestrosConsultas(:flag,:idSubClasificadorDetalle);";
        
        $parms = array(
            ":flag" => 9,
            ":idSubClasificadorDetalle" => $this->_idSubClasificadorDetalle
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    public function getAllClasificadorDetalle($id){
        $query = "call sp_maeMaestrosConsultas(:flag,:idSubClasificadorDetalle);";
        
        $parms = array(
            ":flag" => 8,
            ":idSubClasificadorDetalle" => $id
        );
        $data = $this->queryAll($query,$parms);
        return $data;
    }
    
    public function getClasificadorDetalle(){
        $query = "call sp_maeMaestrosConsultas(:flag,:idSubclasificador);";
        
        $parms = array(
            ":flag" => 8,
            ":idSubclasificador" => $this->_idSubClasificador
        );
        $data = $this->queryAll($query,$parms);
        return $data;
    }
    
}
