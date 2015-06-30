<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 25-06-2015 01:06:47 
* Descripcion : ConsultarPlanillaModel.php
* ---------------------------------------
*/ 

class ConsultarPlanillaModel extends Model{

    private $_flag;
    private $_idConsultarPlanilla;  // id trabajador
    private $_idProcesoPlanilla;  
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
        $this->_idConsultarPlanilla   = SimpleForm::getParam("_idConsultarPlanilla");    /*se decifra*/
        $this->_activo =   SimpleForm::getParam(CONPL."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        $this->_idProcesoPlanilla     = SimpleForm::getParam("_idProcesoPlanilla");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: ConsultarPlanilla*/
    public function getGridConsultarPlanilla(){
        $query = "call spConsultarPlanillaGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*mantenimiento (CRUD) registro: ConsultarPlanilla*/
    public function mantenimientoConsultarPlanilla(){
        /*-------------------------LOGICA PARA EL INSERT------------------------*/
    }
    
    /*seleccionar registro a editar: ConsultarPlanilla*/
    public function findConsultarPlanilla(){
       $query = "call spConsultarPlanillaBuscar(:id_proceso_planilla,:id_trabajador);";
        
        $parms = array(
            ":id_proceso_planilla" => $this->_idProcesoPlanilla,
            ":id_trabajador" => $this->_idConsultarPlanilla
        );
      //  print_r($parms);
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    public function getAllProcesoPlanilla(){
         $query = "call sp_maeTipoProcesoPlanillaConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 3,
            ":criterio" => 1
        );
        $data = $this->queryAll($query,$parms);
        return $data;
    }
}
