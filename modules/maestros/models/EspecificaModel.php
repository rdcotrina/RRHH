<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 30-01-2015 12:01:46 
* Descripcion : EspecificaModel.php
* ---------------------------------------
*/ 

class EspecificaModel extends Model{

    private $_flag;
    private $_idClasificador;
    private $_idSubClasificador;
    private $_idClasificadorDetalle;
    private $_idEspecifica;
    private $_codigo;
    private $_especifica;
    private $_idSubClasificadorDetalle;
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
        $this->_idEspecifica   = Aes::de(SimpleForm::getParam("_idEspecifica"));    /*se decifra*/
        $this->_idClasificador = SimpleForm::getParam("_idClasificador"); 
        $this->_idSubClasificador = SimpleForm::getParam("_idSubClasificador"); 
        $this->_idClasificadorDetalle = SimpleForm::getParam("_idClasificadorDetalle"); 
        $this->_codigo = SimpleForm::getParam(ESPE."txt_codigo"); 
        $this->_especifica = SimpleForm::getParam(ESPE."txt_especifica"); 
        $this->_idSubClasificadorDetalle = SimpleForm::getParam(ESPE."lst_subclasificadordetalle"); 
        $this->_activo =   SimpleForm::getParam(ESPE."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: Especifica*/
    public function getGridEspecifica(){
        $query = "call sp_maeEspecificadorGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*grabar nuevo registro: Especifica*/
    public function mantenimientoEspecifica(){
        $query = "call sp_maeEspecificaMantenimiento(:flag,:idEspecifica,:codigo,:especifica,:idSubClasificadorDetalle,:estado,:usuario);";
        
        $parms = array(
            ":flag" => $this->_flag,
            ":idEspecifica" => $this->_idEspecifica,
            ":codigo" => $this->_codigo,
            ":especifica" => $this->_especifica ,
            ":idSubClasificadorDetalle" => $this->_idSubClasificadorDetalle,
            ":estado" => (!empty($this->_activo))?$this->_activo:'I',
            ":usuario" => $this->_usuario,
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: Especifica*/
    public function findEspecifica(){
        $query = "call sp_maeMaestrosConsultas(:flag,:_idEspecifica);";
        
        $parms = array(
            ":flag" => 10,
            ":_idEspecifica" => $this->_idEspecifica
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    public function getAllClasificador(){
        $query = "call sp_maeMaestrosConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 2,
            ":criterio" => ''
        );
        $data = $this->queryAll($query,$parms);
        return $data;
    }
    
    public function getSubClasificador(){
        $query = "call sp_maeMaestrosConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 3,
            ":criterio" => $this->_idClasificador
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
    
    public function getSubClasificadorDetalle(){
        $query = "call sp_maeMaestrosConsultas(:flag,:idSubclasificador);";
        
        $parms = array(
            ":flag" => 5,
            ":idSubclasificador" => $this->_idClasificadorDetalle
        );
        $data = $this->queryAll($query,$parms);
        return $data;
    }
    
}
