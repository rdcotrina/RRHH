<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 07-06-2015 19:06:09 
* Descripcion : AsistenciaAutomaticaModel.php
* ---------------------------------------
*/ 

class AsistenciaAutomaticaModel extends Model{

    private $_flag;
    private $_idAsistenciaAutomatica;
    private $_activo;
    private $_usuario;
    private $_codDetectado;
    
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
        $this->_flag                    = SimpleForm::getParam("_flag");
        $this->_idAsistenciaAutomatica  = Aes::de(SimpleForm::getParam("_idAsistenciaAutomatica"));    /*se decifra*/
        $this->_activo                  = SimpleForm::getParam(ASAUT."chk_activo");
        $this->_usuario                 = Session::get("sys_idUsuario");
        $this->_codDetectado            = SimpleForm::getParam(ASAUT."txt_codDetectado"); ;
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }

    /*mantenimiento (CRUD) registro: AsistenciaAutomatica*/
    public function mantenimientoAsistenciaAutomatica(){
        $query = "call sp_conasAsistenciaAutomaticaMantenimiento(:flag,:huella);";
        $parms = array(
            ':flag' => $this->_flag,
            ':huella' => $this->_codDetectado
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
}
