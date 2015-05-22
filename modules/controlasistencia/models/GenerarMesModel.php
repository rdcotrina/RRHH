<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 18-04-2015 22:04:13 
* Descripcion : GenerarMesModel.php
* ---------------------------------------
*/ 

class GenerarMesModel extends Model{

    private $_flag;
    private $_idGenerarMes;
    private $_anio;
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
        $this->_idGenerarMes   = Aes::de(SimpleForm::getParam("_idGenerarMes"));    /*se decifra*/
        $this->_anio =   SimpleForm::getParam(MSGN."lst_anio");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: GenerarMes*/
    public function getGridGenerarMes(){
        $query = "call sp_conasGenerarMesGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*data para el grid: Dias no laborables*/
    public function getGridDiasNoLaborables(){
        $query = "call sp_conasDiasNoLaborablesGrid(:mesAnio,:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
        $parms = array(
            ":mesAnio"=>$this->_idGenerarMes,
            ":iDisplayStart" => $this->_pDisplayStart,
            ":iDisplayLength" => $this->_pDisplayLength,
            ":sOrder" => $this->_pOrder,
            ":sSearch" => $this->_pSearch ,
            ":sFilterCols" => $this->_sFilterCols
        );
       // print_r($parms);
        $data = $this->queryAll($query,$parms);
        return $data;
    }
    
    /*mantenimiento (CRUD) registro: GenerarMes*/
    public function mantenimientoGenerarMes(){
        $query = "call sp_conasGenerarMesMantenimiento(:flag,:key,:anio,:usuario);";
        
        $parms = array(
            ":flag" => $this->_flag,
            ":key" => $this->_idGenerarMes,
            ":anio" => $this->_anio,
            ":usuario" => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    public function mantenimientoAsistenciaMes(){
        $query = "call sp_maeAsistenciaMesMantenimiento(:flag,:key);";
        
        $parms = array(
            ":flag" => $this->_flag,
            ":key" => $this->_idGenerarMes
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    
    /*seleccionar registro a editar: GenerarMes*/
    public function findGenerarMes(){
        /*-----------------LOGICA PARA SELECT REGISTRO A EDITAR-----------------*/
    }
    
}
