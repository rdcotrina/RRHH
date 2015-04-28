<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 05-04-2015 19:04:19 
* Descripcion : VacacionesModel.php
* ---------------------------------------
*/ 

class VacacionesModel extends Model{

    private $_flag;
    private $_idVacaciones;
    private $_idMovimiento;
    private $_idTrabajador;
    private $_lst_tipovac;
    private $_txt_fechainicio;
    private $_txt_fechafin;
    private $_txt_dias;
    private $_txt_fechaproceso;
    private $_txt_comentario;
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
        $this->_flag             = SimpleForm::getParam("_flag");
        $this->_idVacaciones     = Aes::de(SimpleForm::getParam("_idVacaciones"));    /*se decifra*/
        $this->_idMovimiento     = Aes::de(SimpleForm::getParam("_idMovimiento"));    /*se decifra*/
        $this->_idTrabajador     = Aes::de(SimpleForm::getParam("_idTrabajador"));    /*se decifra*/
        $this->_lst_tipovac      = SimpleForm::getParam(VACA."lst_tipovac");
        $this->_txt_fechainicio  = Functions::dateFormat(SimpleForm::getParam(VACA."txt_fechainicio"),'Y-m-d');
        $this->_txt_fechafin     = Functions::dateFormat(SimpleForm::getParam(VACA."txt_fechafin"),'Y-m-d');
        $this->_txt_dias         = SimpleForm::getParam(VACA."txt_dias");
        $this->_txt_fechaproceso = Functions::dateFormat(SimpleForm::getParam(VACA."txt_fechaproceso"),'Y-m-d');
        $this->_txt_comentario   = SimpleForm::getParam(VACA."txt_comentario");
        $this->_activo           = SimpleForm::getParam(VACA."chk_activo");
        $this->_usuario          = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: Vacaciones*/
    public function getGridVacaciones(){
        $query = "call sp_maeVacListaTrabGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    public function getGridGestionar(){
        $query = "call sp_maeVacMovTrabGrid(:idTrabajador,:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols,:flag,:criterio);";
        
        $parms = array(
            ":idTrabajador" => $this->_idTrabajador,
            ":iDisplayStart" => $this->_pDisplayStart,
            ":iDisplayLength" => $this->_pDisplayLength,
            ":sOrder" => $this->_pOrder,
            ":sSearch" => $this->_pSearch ,
            ":sFilterCols" => $this->_sFilterCols,
            ":flag" => 2,
            ":criterio" => $this->_idTrabajador
        );
        $data = $this->queryAll($query,$parms);
        return $data;
    }
    
    /*grabar nuevo registro: Vacaciones*/
    public function mantenimientoMovimiento(){
        /*-------------------------LOGICA PARA EL INSERT------------------------*/
        /*':flag' => $this->_flag,*/
        $query = "call sp_maeVacMovTrabMantenimiento(:flag,:key,:id_trabajador,:id_tipo_ausencia,:fecha_inicio,:fecha_fin,:dias_ausencia,:fec_proc_planilla,:comentario,:estado,:usuario);";
        
        $parms = array(
            ':flag' => $this->_flag,
            ':key' => $this->_idMovimiento,
            ':id_trabajador' => $this->_idTrabajador,
            ':id_tipo_ausencia' => $this->_lst_tipovac,
            ':fecha_inicio' => $this->_txt_fechainicio,
            ':fecha_fin' => $this->_txt_fechafin,
            ':dias_ausencia' => $this->_txt_dias,
            ':fec_proc_planilla' => $this->_txt_fechaproceso,
            ':comentario' => $this->_txt_comentario,
            ':estado' => (!empty($this->_activo))?$this->_activo:'I',
            ':usuario' => $this->_usuario
        );
//        print_r($parms);
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: Vacaciones*/
    public function findTrabajador(){
        $query = "call sp_maeGestionarAusenciasConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 3,
            ":criterio" => $this->_idTrabajador
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*editar registro: Vacaciones*/
    public function editVacaciones(){
        /*-------------------------LOGICA PARA EL UPDATE------------------------*/
    }
    
    /*eliminar varios registros: Vacaciones*/
    public function deleteVacacionesAll(){
        /*--------------------------LOGICA PARA DELETE--------------------------*/
    }
    
}
