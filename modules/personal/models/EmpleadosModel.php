<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 18-03-2015 23:03:01 
* Descripcion : EmpleadosModel.php
* ---------------------------------------
*/ 

class EmpleadosModel extends Model{

    private $_flag;
    private $_idEmpleados;
    private $_primerNombre;
    private $_segundoNombre;
    private $_apellidoPaterno;
    private $_apellidoMaterno;
    private $_sexo;
    private $_email;
    private $_telefonos;
    private $_tipoDocumento;
    private $_numeroDocumento;
    private $_ubigeoNacimiento;
    private $_fechaNacimiento;
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
        $this->_primerNombre =   SimpleForm::getParam(EMPL."txt_primernombre");
        $this->_segundoNombre =   SimpleForm::getParam(EMPL."txt_segundonombre");
        $this->_apellidoPaterno =   SimpleForm::getParam(EMPL."txt_apellidopaterno");
        $this->_apellidoMaterno =   SimpleForm::getParam(EMPL."txt_apellidomaterno");
        $this->_sexo =   SimpleForm::getParam(EMPL."chk_sexo");
        $this->_email =   SimpleForm::getParam(EMPL."txt_email");
        $this->_telefonos =   SimpleForm::getParam(EMPL."txt_telefono");
        $this->_tipoDocumento =   SimpleForm::getParam(EMPL."lst_tipodoc");
        $this->_numeroDocumento =   SimpleForm::getParam(EMPL."txt_numdocumento");
        $this->_ubigeoNacimiento =   SimpleForm::getParam(EMPL."lst_ubigeonac");
        $this->_fechaNacimiento = Functions::dateFormat(SimpleForm::getParam(EMPL."txt_fechanacimiento"),'Y-m-d');
        $this->_ubigeoDireccion =   SimpleForm::getParam(EMPL."lst_ubigeodom");
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
    
    /*data para el grid: Empleados*/
    public function getGridEmpleados(){
        $query = "call sp_perPersonaGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*mantenimiento (CRUD) registro: Empleados*/
    public function mantenimientoEmpleados(){
        $query = "call sp_perPersonalMantenimiento("
                . ":flag,"
                . ":idEmpleado,"
                . ":primerNombre,"
                . ":segundoNombre,"
                . ":apellidoPaterno,"
                . ":apellidoMaterno,"
                . ":sexo,"
                . ":email,"
                . ":telefonos,"
                . ":tipoDocumento,"
                . ":numeroDocumento,"
                . ":ubigeoNacimiento,"
                . ":fechaNacimiento,"
                . ":ubigeoDireccion,"
                . ":direccion,"
                . ":estado,"
                . ":usuario"
            . ");";
        
        $parms = array(
            ":flag" => $this->_flag,
            ":idEmpleado" => $this->_idEmpleados,
            ":primerNombre" => $this->_primerNombre,
            ":segundoNombre" => $this->_segundoNombre,
            ":apellidoPaterno" => $this->_apellidoPaterno,
            ":apellidoMaterno" => $this->_apellidoMaterno,
            ":sexo" => $this->_sexo,
            ":email" => $this->_email,
            ":telefonos" => $this->_telefonos,
            ":tipoDocumento" => $this->_tipoDocumento,
            ":numeroDocumento" => $this->_numeroDocumento,
            ":ubigeoNacimiento" => $this->_ubigeoNacimiento,
            ":fechaNacimiento" => $this->_fechaNacimiento,
            ":ubigeoDireccion" => $this->_ubigeoDireccion,
            ":direccion" => $this->_direccion,
            ":estado" => $this->_activo,
            ":usuario" => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: Empleados*/
    public function findEmpleados(){
        $query = "call sp_perPersonalConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 6,
            ":criterio" => $this->_idEmpleados
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    public function getData($flag,$criterio=''){
        $query = "call sp_perPersonalConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => $flag,
            ":criterio" => $criterio
        );
        $data = $this->queryAll($query,$parms);
        return $data;
    }
    
}
