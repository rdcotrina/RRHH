<?php

class DerechoHabientesModel extends Model{

    private $_flag;
    private $_idEmpleados;
    private $_idDerechoHabiente;
    private $_idVinculoFamiliar;
    private $_nombres;
    private $_apellidos;
    private $_sexo;
    private $_email;
    private $_telefonos;
    private $_tipoDocumento;
    private $_numeroDocumento;
    private $_ubigeoDireccion;
    private $_direccion;
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
        $this->_idEmpleados   = Aes::de(SimpleForm::getParam("_idEmpleados"));    /*se decifra*/
        $this->_idDerechoHabiente   = Aes::de(SimpleForm::getParam("_idDerechoHabiente"));    /*se decifra*/
        $this->_idVinculoFamiliar =   SimpleForm::getParam(EMPL."lst_tiovinculofamiliar");
        $this->_nombres =   SimpleForm::getParam(EMPL."txt_nombres");
        $this->_apellidos =   SimpleForm::getParam(EMPL."txt_apellidos");
        $this->_sexo =   SimpleForm::getParam(EMPL."chk_sexo");
        $this->_email =   SimpleForm::getParam(EMPL."txt_email");
        $this->_telefonos =   SimpleForm::getParam(EMPL."txt_telefono");
        $this->_tipoDocumento =   SimpleForm::getParam(EMPL."lst_tipodoc");
        $this->_numeroDocumento =   SimpleForm::getParam(EMPL."txt_numdocumento");
        $this->_ubigeoDireccion =   SimpleForm::getParam(EMPL."lst_ubigeodh");
        $this->_direccion =   SimpleForm::getParam(EMPL."txt_direccion");
        $this->_activo =   SimpleForm::getParam(EMPL."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    public function getGridDerechoHabientes(){
        $query = "call sp_perDerechohabienteGrid(:idTrabajador,:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
        $parms = array(
            ":idTrabajador" => $this->_idEmpleados,
            ":iDisplayStart" => $this->_pDisplayStart,
            ":iDisplayLength" => $this->_pDisplayLength,
            ":sOrder" => $this->_pOrder,
            ":sSearch" => $this->_pSearch ,
            ":sFilterCols" => $this->_sFilterCols,
        );
        $data = $this->queryAll($query,$parms);
        return $data;
    }
    
    public function mantenimientoDerechoHabientes(){
        $query = "call sp_perDerechohabienteMantenimiento("
                . ":flag,"
                . ":idDerechoHabiente,"
                . ":idTrabajador,"
                . ":idTipoVinculoFamiliar,"
                . ":tipoDocIdentidad,"
                . ":numerodocumento,"
                . ":nombres,"
                . ":apellidos,"
                . ":sexo,"
                . ":ubigeoDireccion,"
                . ":direccion,"
                . ":email,"
                . ":telefonos,"
                . ":estado,"
                . ":usuario"
            . ");";
        
        $parms = array(
            ":flag" => $this->_flag,
            ":idDerechoHabiente" => $this->_idDerechoHabiente,
            ":idTrabajador" => $this->_idEmpleados,
            ":idTipoVinculoFamiliar" => $this->_idVinculoFamiliar,
            ":tipoDocIdentidad" => $this->_tipoDocumento,
            ":numerodocumento" => $this->_numeroDocumento,
            ":nombres" => $this->_nombres,
            ":apellidos" => $this->_apellidos,
            ":sexo" => $this->_sexo,
            ":ubigeoDireccion" => $this->_ubigeoDireccion,
            ":direccion" => $this->_direccion,
            ":email" => $this->_email,
            ":telefonos" => $this->_telefonos,
            ":estado" => $this->_activo,
            ":usuario" => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    public function findDerechoHabiente(){
         $query = "call sp_perPersonalConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 8,
            ":criterio" => $this->_idDerechoHabiente
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
}

