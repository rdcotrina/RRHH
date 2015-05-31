<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 28-05-2015 07:05:13 
* Descripcion : AsistenciaManualModel.php
* ---------------------------------------
*/ 

class AsistenciaManualModel extends Model{

    private $_flag;
    private $_idAsistenciaManual;
    private $_activo;
    private $_usuario;
    private $_idTrabajador;
    private $_idAsistenciaMes;
    private $_manianaIngreso;
    private $_manianaSalida;
    private $_tardeIngreso;
    private $_tardeSalida;
    
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
        //print_r($_POST);
        $this->_flag                        = SimpleForm::getParam("_flag");
        $this->_idAsistenciaManual          = Aes::de(SimpleForm::getParam("_idAsistenciaManual"));    /*se decifra*/
        $this->_activo                      = SimpleForm::getParam(ASMN."chk_activo");
        $this->_usuario                     = Session::get("sys_idUsuario");
        $this->_idTrabajador                = SimpleForm::getParam("id_trabajador");
        $this->_idAsistenciaMes             = SimpleForm::getParam(ASMN."lst_diaIngreso");
        $this->_manianaIngreso              = SimpleForm::getParam(ASMN."txt_maniana_in");
        $this->_manianaSalida               = SimpleForm::getParam(ASMN."txt_maniana_sal");
        $this->_tardeIngreso                = SimpleForm::getParam(ASMN."txt_tarde_in");
        $this->_tardeSalida                 = SimpleForm::getParam(ASMN."txt_tarde_sal");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: AsistenciaManual*/
    public function getGridAsistenciaManual(){
        $query = "call sp_sp_conasAsistenciaTrabGrid(:idTrabajador,:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
        $parms = array(
            ":idTrabajador" => $this->_idTrabajador,
            ":iDisplayStart" => $this->_pDisplayStart,
            ":iDisplayLength" => $this->_pDisplayLength,
            ":sOrder" => $this->_pOrder,
            ":sSearch" => $this->_pSearch ,
            ":sFilterCols" => $this->_sFilterCols
        );
        $data = $this->queryAll($query,$parms);
        
        return $data;
    }
    
    /*mantenimiento (CRUD) registro: AsistenciaManual*/
    public function mantenimientoAsistenciaManual(){
         $query = "call sp_sp_conasAsistenciaTrabMantenimiento(:flag,:key,:idAsistenciaMes,:idTrabajador,:horaIngresom,:horasalidam,:horaIngresot,:horasalidat);";
        
        $parms = array(
            ":flag" => $this->_flag,
            ":key" => $this->_idAsistenciaManual,
            ":idAsistenciaMes" => $this->_idAsistenciaMes,
            ":idTrabajador" => $this->_idTrabajador,
            ":horaIngresom" => $this->_manianaIngreso,
            ":horasalidam" => $this->_manianaSalida,
            ":horaIngresot" => $this->_tardeIngreso,
            ":horasalidat" => $this->_tardeSalida
        );
       
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: AsistenciaManual*/
    public function findAsistenciaManual(){
        $query = "call sp_sp_conasAsistenciaTrabConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 3,
            ":criterio" => $this->_idAsistenciaManual
        );
        $data = $this->queryOne($query,$parms);
        //print_r($parms);
        return $data;
    }
    
    public function getAsistenciaTrab($flag,$criterio=''){
        $query = "call sp_sp_conasAsistenciaTrabConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => $flag,
            ":criterio" => $criterio
        );
        $data = $this->queryAll($query,$parms);
        //print_r($parms);
        return $data;
    }
    
}
