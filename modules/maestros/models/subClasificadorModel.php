<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 25-01-2015 15:01:09 
* Descripcion : SubClasificadorModel.php
* ---------------------------------------
*/ 

class subClasificadorModel extends Model{

    private $_flag;
    private $_idSubClasificador;
    private $_clasificador;
    private $_subClasificador;
    private $_codigo;
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
        $this->_idSubClasificador   = Aes::de(SimpleForm::getParam("_idSubClasificador"));    /*se decifra*/
        $this->_codigo =   SimpleForm::getParam(SBCLF."txt_codigo");
        $this->_subClasificador =   SimpleForm::getParam(SBCLF."txt_subclasificador");
        $this->_clasificador =   SimpleForm::getParam(SBCLF."lst_clasificador");
        $this->_activo =   SimpleForm::getParam(SBCLF."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: SubClasificador*/
    public function getGridSubClasificador(){
        $query = "call sp_maeSubClasificadorGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*grabar nuevo registro: SubClasificador*/
    public function mantenimientoSubClasificador(){
        $query = "call sp_maeSubClasificadorMantenimiento(:flag,:idSubClasificador,:codigo,:subClasificador,:clasificador,:activo,:usuario);";
        $parms = array(
            ':flag' => $this->_flag,
            ':idSubClasificador' => $this->_idSubClasificador,
            ':codigo' => $this->_codigo,
            ':subClasificador' => $this->_subClasificador,
            ':clasificador' => $this->_clasificador,
            ':activo' => (!empty($this->_activo))?$this->_activo:'I',
            ':usuario' => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: SubClasificador*/
    public function findSubClasificador(){
        $query = "CALL sp_maeMaestrosConsultas(:flag,:idSubClasificador);";
        
        $parms = array(
            ":flag" => 6,
            ":idSubClasificador" => $this->_idSubClasificador
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    public function allClasificador(){
        $query = "CALL sp_maeMaestrosConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 2,
            ":criterio" => ''
        );
        $data = $this->queryAll($query,$parms);
        return $data;
    }
    
}
