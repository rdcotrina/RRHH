<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 29-03-2015 23:03:37 
* Descripcion : HorarioModel.php
* ---------------------------------------
*/ 

class HorarioModel extends Model{

    private $_flag;
    private $_idHorario;
    private $_horario;
    private $_manianaIn;
    private $_manianaSal;
    private $_tardeIn;
    private $_tardeSal;
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
        $this->_idHorario   = Aes::de(SimpleForm::getParam("_idHorario"));    /*se decifra*/
        $this->_horario =   SimpleForm::getParam(HRIO."txt_horario");
        $this->_manianaIn =   SimpleForm::getParam(HRIO."txt_maniana_in");
        $this->_manianaSal =   SimpleForm::getParam(HRIO."txt_maniana_sal");
        $this->_tardeIn =   SimpleForm::getParam(HRIO."txt_tarde_in");
        $this->_tardeSal =   SimpleForm::getParam(HRIO."txt_tarde_sal");
        $this->_activo =   SimpleForm::getParam(HRIO."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: Horario*/
    public function getGridHorario(){
        $query = "call sp_perHorarioGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*mantenimiento (CRUD) registro: Horario*/
    public function mantenimientoHorario(){
        $query = "call sp_perHorarioMantenimiento(:flag,:key,:horario,:ingresoM,:salidaM,:ingresoT,:salidaT,:estado,:usuario);";
        
        $parms = array(
            ":flag" => $this->_flag,
            ":key" => $this->_idHorario,
            ":horario" => $this->_horario,
            ":ingresoM" => $this->_manianaIn ,
            ":salidaM" => $this->_manianaSal,
            ":ingresoT" => $this->_tardeIn,
            ":salidaT" => $this->_tardeSal,
            ":estado" => (!empty($this->_activo))?$this->_activo:'I',
            ":usuario" => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: Horario*/
    public function findHorario(){
        $query = "call sp_perPersonalConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 9,
            ":criterio" => $this->_idHorario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
}
