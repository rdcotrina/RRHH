<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 10-04-2015 17:04:01 
* Descripcion : GenerarContratoModel.php
* ---------------------------------------
*/ 

class GenerarContratoModel extends Model{

    private $_flag;
    private $_idGenerarContrato;
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
        $this->_idGenerarContrato   = Aes::de(SimpleForm::getParam("_idGenerarContrato"));    /*se decifra*/
        $this->_activo =   SimpleForm::getParam(GNCTR."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: GenerarContrato*/
    public function getGridGenerarContrato(){
        $query = "call sp_perPersonalContratoGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    public function getGridSinContrato(){
        $query = "call sp_perPersonalSinContratoGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*mantenimiento (CRUD) registro: GenerarContrato*/
    public function mantenimientoGenerarContrato(){
        /*-------------------------LOGICA PARA EL INSERT------------------------*/
    }
    
    /*seleccionar registro a editar: GenerarContrato*/
    public function findGenerarContrato(){
        /*-----------------LOGICA PARA SELECT REGISTRO A EDITAR-----------------*/
    }
    
}
