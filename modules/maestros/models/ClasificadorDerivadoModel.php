<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 13-03-2015 18:03:31 
* Descripcion : ClasificadorDerivadoModel.php
* ---------------------------------------
*/ 

class ClasificadorDerivadoModel extends Model{

    private $_flag;
    private $_idClasificadorDerivado;
    private $_codigo;
    private $_idEspecifica;
    private $_clasificador;
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
        $this->_idClasificadorDerivado   = Aes::de(SimpleForm::getParam("_idClasificadorDerivado"));    /*se decifra*/
        $this->_codigo =   SimpleForm::getParam(DVCL."txt_codigo");
        $this->_idEspecifica =   SimpleForm::getParam(DVCL."lst_especifica");
        $this->_clasificador =   SimpleForm::getParam(DVCL."txt_clasificador");
        $this->_activo =   SimpleForm::getParam(DVCL."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: ClasificadorDerivado*/
    public function getGridClasificadorDerivado(){
        $query = "call sp_maeClasificadorDerivadoGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*mantenimiento (CRUD) registro: ClasificadorDerivado*/
    public function mantenimientoClasificadorDerivado(){
        $query = "call sp_maeClasificadorDerivadoMantenimiento(:flag,:idClasificadorDerivado,:codigo,:clasificador,:idEspecifica,:activo,:usuario);";
        $parms = array(
            ':flag' => $this->_flag,
            ':idClasificadorDerivado' => $this->_idClasificadorDerivado,
            ':codigo' => $this->_codigo,
            ':clasificador' => $this->_clasificador,
            ':idEspecifica' => $this->_idEspecifica,
            ':activo' => (!empty($this->_activo))?$this->_activo:'I',
            ':usuario' => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: ClasificadorDerivado*/
    public function findClasificadorDerivado(){
        $query = "call sp_maeMaestrosConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 22,
            ":criterio" => $this->_idClasificadorDerivado
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
}
