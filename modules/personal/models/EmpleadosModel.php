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
    private $_idCargoTrabajador;
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
    private $_idActividad;
    private $_idTipoPpago;
    private $_idTipoContrato;
    private $_idHorario;
    private $_estabilidad;
    private $_idCategoria;
    private $_idCtaCte;
    private $_idCuentacorrienteH;
    private $_idCuentacorrienteCTS;
    private $_sistemapension;
    private $_codigopension;
    private $_fechainscripcion;
    private $_tipodecuentopension;
    private $_montopension;
    private $_codigoessalud;
    private $_fechaIngreso;
    private $_tipoPlanilla;
    private $_remuneracion;
    private $_motivoBaja;
    private $_fechaBaja;
    private $_idConceptoPlanilla;
    private $_concepto;
    private $_tipoAplicaion;
    private $_permanente;
    private $_fechaIniConcepto;
    private $_fechaFinConcepto;
    private $_montoConcepto;
    private $_variante;
    private $_variantecp;
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
        $this->_idCargoTrabajador   = Aes::de(SimpleForm::getParam("_idCargoTrabajador"));    /*se decifra*/
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
        $this->_idActividad =   SimpleForm::getParam(EMPL."lst_actividad");
        $this->_idTipoPpago =   SimpleForm::getParam(EMPL."lst_tipopago");
        $this->_idTipoContrato =   SimpleForm::getParam(EMPL."lst_tipocontrato");
        $this->_idHorario =   SimpleForm::getParam(EMPL."lst_horario");
        $this->_idCategoria =   SimpleForm::getParam(EMPL."lst_categoriatrabajador");
        $this->_estabilidad =   SimpleForm::getParam(EMPL."chk_estabilidad");
        $this->_idCtaCte =   SimpleForm::getParam("_idCtaCte");
        $this->_idCuentacorrienteH =   SimpleForm::getParam(EMPL."lst_ctacteH");
        $this->_idCuentacorrienteCTS =   SimpleForm::getParam(EMPL."lst_ctacteCTS");
        $this->_sistemapension =   SimpleForm::getParam(EMPL."lst_sistemapension");
        $this->_codigopension =   SimpleForm::getParam(EMPL."txt_codigo");
        $this->_fechainscripcion = Functions::dateFormat(SimpleForm::getParam(EMPL."txt_fechainscripcion"),'Y-m-d');
        $this->_tipodecuentopension =   SimpleForm::getParam(EMPL."lst_aplicacion");
        $this->_montopension =   SimpleForm::getParam(EMPL."txt_montopension");
        $this->_codigoessalud =   SimpleForm::getParam(EMPL."txt_codigoessalud");
        $this->_fechaIngreso =   Functions::dateFormat(SimpleForm::getParam(EMPL."txt_fechaingreso"),'Y-m-d');
        $this->_tipoPlanilla =   SimpleForm::getParam(EMPL."lst_tipoplanilla");
        $this->_remuneracion =   SimpleForm::getParam(EMPL."txt_remuneracion");
        $this->_motivoBaja =   SimpleForm::getParam(EMPL."lst_motivobaja");
        $this->_fechaBaja =   Functions::dateFormat(SimpleForm::getParam(EMPL."txt_fechabaja"),'Y-m-d');
        $this->_activo =   SimpleForm::getParam(EMPL."chk_activo");
        $this->_variante =   SimpleForm::getParam(EMPL."chk_variante");
        $this->_variantecp =   SimpleForm::getParam(EMPL."chk_variantec");
        
        $this->_idConceptoPlanilla   = Aes::de(SimpleForm::getParam("_idConceptoPlanilla"));    /*se decifra*/
        $this->_concepto =   SimpleForm::getParam(EMPL."lst_concepto");
        $this->_tipoAplicaion =   SimpleForm::getParam(EMPL."lst_tipoaplicacion");
        $this->_permanente =   SimpleForm::getParam(EMPL."chk_permanente");
        $this->_montoConcepto =   SimpleForm::getParam(EMPL."txt_montoc");
        $this->_fechaIniConcepto =   Functions::dateFormat(SimpleForm::getParam(EMPL."txt_fecini"),'Y-m-d');
        $this->_fechaFinConcepto =   Functions::dateFormat(SimpleForm::getParam(EMPL."txt_fefin"),'Y-m-d');
        
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
    
    public function getGridConceptos(){
        $query = "call sp_perPersonalConceptosPlanillaGrid(:idEmpleados,:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
        $parms = array(
            ":idEmpleados" => $this->_idEmpleados,
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
    
    public function mantenimientoDatos(){
        $query = "call sp_perPersonalDatosMantenimiento("
                . ":flag,"
                . ":idEmpleado,"
                . ":idActividad,"
                . ":idTipoPago,"
                . ":idTipoContrato,"
                . ":idHorario,"
                . ":idCategoria,"
                . ":estabilidad,"
                . ":idCuentacorrienteH,"
                . ":idCuentacorrienteCTS,"
                . ":idSispension,"
                . ":codigoSispension,"
                . ":fechaInscripcion,"
                . ":tipoDescuento,"
                . ":montosuspension,"
                . ":codigoEssalud,"
                . ":fechaAlta,"
                . ":tipoPlanilla,"
                . ":sueldo,"
                . ":motivoBaja,"
                . ":fechaBaja,"
                . ":variante"
            . ");";
        
        $parms = array(
            ":flag" => $this->_flag,
            ":idEmpleado" => $this->_idEmpleados,
            ":idActividad" => $this->_idActividad,
            ":idTipoPago" => $this->_idTipoPpago,
            ":idTipoContrato" => $this->_idTipoContrato,
            ":idHorario" => $this->_idHorario,
            ":idCategoria" => $this->_idCategoria,
            ":estabilidad" => $this->_estabilidad,
            ":idCuentacorrienteH" => $this->_idCuentacorrienteH,
            ":idCuentacorrienteCTS" => $this->_idCuentacorrienteCTS,
            ":idSispension" => $this->_sistemapension,
            ":codigoSispension" => $this->_codigopension,
            ":fechaInscripcion" => $this->_fechainscripcion,
            ":tipoDescuento" => $this->_tipodecuentopension,
            ":montosuspension" => $this->_montopension,
            ":codigoEssalud" => $this->_codigoessalud,
            ":fechaAlta" => $this->_fechaIngreso,
            ":tipoPlanilla" => $this->_tipoPlanilla,
            ":sueldo" => $this->_remuneracion,
            ":motivoBaja" => $this->_motivoBaja,
            ":fechaBaja" => $this->_fechaBaja,
            ":variante" => (!empty($this->_variante))?$this->_variante:'0'
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    public function mantenimientoConcepto() {
        $query = "call sp_perPersonalConceptoPlanillaEmpleadoMantenimiento("
                . ":flag,"
                . ":key,"
                . ":idEmpleado,"
                . ":idConcepto,"
                . ":tipoAplicacion,"
                . ":permanente,"
                . ":fechaInicio,"
                . ":fechaFin,"
                . ":monto,"
                . ":variante,"
                . ":usuario"
            . ");";
        
        $parms = array(
            ":flag" => $this->_flag,
            ":key" => $this->_idConceptoPlanilla,
            ":idEmpleado" => $this->_idEmpleados,
            ":idConcepto" => $this->_concepto,
            ":tipoAplicacion" => $this->_tipoAplicaion,
            ":permanente" => $this->_permanente,
            ":fechaInicio" => $this->_fechaIniConcepto,
            ":fechaFin" => $this->_fechaFinConcepto,
            ":monto" => $this->_montoConcepto,
            ":variante" => (!empty($this->_variantecp))?$this->_variantecp:'0',
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
    
    public function getCuentaCorriente($b=''){
        $banco = $this->_idCtaCte;
        if(!empty($b)){
            $banco = $b;
        }
        $query = "call sp_perPersonalConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 21,
            ":criterio" => $banco
        );
        $data = $this->queryAll($query,$parms);
        return $data;
    }
    
    public function findCargo(){
        $query = "call sp_perPersonalConsultas(:flag,:key);";
        
        $parms = array(
            ":flag" => 18,
            ":key" => $this->_idCargoTrabajador
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    public function findDatos(){
        $query = "call sp_perPersonalConsultas(:flag,:key);";
        
        $parms = array(
            ":flag" => 19,
            ":key" => $this->_idEmpleados
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
}
