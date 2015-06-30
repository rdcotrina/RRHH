<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 24-06-2015 16:06:47 
* Descripcion : ProcesarPlanillaModel.php
* ---------------------------------------
*/ 

class ProcesarPlanillaModel extends Model{

    private $_flag;
    private $_idTipoProcesoPlanilla;
    private $_idProcesarPlanilla;
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
        $this->_idTipoProcesoPlanilla   = SimpleForm::getParam("_idTipoProcesoPlanilla");    /*se decifra*/
        $this->_idProcesarPlanilla   = SimpleForm::getParam("_idProcesarPlanilla");    /*se decifra*/
        $this->_activo =   SimpleForm::getParam(PRPLL."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: ProcesarPlanilla*/
    public function getGridProcesarPlanilla(){
        $query = "call sp_maeTipoProcesoPanillaGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*mantenimiento (CRUD) registro: ProcesarPlanilla*/
    public function mantenimientoProcesarPlanilla(){
        /*-------------------------LOGICA PARA EL INSERT------------------------*/
         $query = "call sp_maeCalculaPlanillaTrabajador(:flag,:key,:usuario);";
        
        $parms = array(
            ':flag' => $this->_flag,
            ':key' => $this->_idProcesarPlanilla,
            ':usuario' => $this->_usuario
        );
    //   print_r($parms);
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: ProcesarPlanilla*/
    public function findProcesarPlanilla(){
        /*-----------------LOGICA PARA SELECT REGISTRO A EDITAR-----------------*/
    }
    
}
