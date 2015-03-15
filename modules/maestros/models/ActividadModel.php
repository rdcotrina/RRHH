<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 12-03-2015 16:03:52 
* Descripcion : ActividadModel.php
* ---------------------------------------
*/ 

class ActividadModel extends Model{

    private $_flag;
    private $_idActividad;
    private $_clasificador;
    private $_actividad;
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
        $this->_idActividad   = Aes::de(SimpleForm::getParam("_idActividad"));    /*se decifra*/
        $this->_clasificador =   SimpleForm::getParam(HACT."lst_clasificador");
        $this->_actividad =   SimpleForm::getParam(HACT."txt_actividad");
        $this->_activo =   SimpleForm::getParam(HACT."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: Actividad*/
    public function getGridActividad(){
        $query = "call sp_maeActividadGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*mantenimiento (CRUD) registro: Actividad*/
    public function mantenimientoActividad(){
        $query = "call sp_maeActividadMantenimiento(:flag,:idActividad,:actividad,:clasificador,:activo,:usuario);";
        $parms = array(
            ':flag' => $this->_flag,
            ':idActividad' => $this->_idActividad,
            ':actividad' => $this->_actividad,
            ':clasificador' => $this->_clasificador,
            ':activo' => (!empty($this->_activo))?$this->_activo:'I',
            ':usuario' => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: Actividad*/
    public function findActividad(){
        $query = "call sp_maeMaestrosConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 24,
            ":criterio" => $this->_idActividad
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    public function getEspecificas($flag){
        $query = "call sp_maeMaestrosConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => $flag,
            ":criterio" => ''
        );
        $data = $this->queryAll($query,$parms);
        return $data;
    }
    
}
