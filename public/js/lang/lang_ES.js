var lang = {};
lang.mensajes = {
    MSG_1: 'Usuario o contraseña incorrecto.',
    MSG_2: 'Ingreso satisfactorio.',
    MSG_3: 'Datos se grabaron correctamente.',
    MSG_4: 'Datos ya existen.',
    MSG_5: '¿Está seguro de eliminar registro?',
    MSG_6: 'Registro se elimino correctamente.',
    MSG_7: '¿Está seguro de eliminar registros seleccionados?',
    MSG_8: 'Registros se eliminaron correctamente.',
    MSG_9: 'Seleccione al menos un registro.',
    MSG_10: 'Datos se actualizaron correctamente.',
    MSG_11: 'Cesión terminada',
    MSG_12: 'Ingrese una fecha'
};

/*--------------------------GENERICOS---------------------------*/
lang.generic = {};
lang.generic.AX = 'Acciones';
lang.generic.AXC = 'Acc.';
lang.generic.ACT = 'Actualizar';
lang.generic.ACTI = 'Activo';
lang.generic.VEN = 'Vencido';
lang.generic.PEN = 'Pendiente';
lang.generic.EST = 'Estado';


/*-----------------------FABRICA/MODULOS-------------------------*/
lang.modulo = {};
lang.modulo.BSM = 'Buscar po módulo';
lang.modulo.MOD = 'Módulo';
lang.modulo.APP = 'Aplicación';
lang.modulo.USC = 'Usuario que creo';
lang.modulo.FECRE = 'Fecha Creación';
lang.modulo.ALNEW = 'Se creará directorios para estructura base de Módulo ¿Está seguro de grabar?';
lang.modulo.MODEX = 'Módulo ya existe en la raíz de la aplicación.';

/*-----------------------FABRICA/OPCION-------------------------*/
lang.opcion = {};
lang.opcion.OPOK = 'Opción se creó correctamente';
lang.opcion.OPEX = 'Opción ya existe en base de datos o raíz de la aplicación';
lang.opcion.PREEX = 'Prefijo ya existe';
lang.opcion.RANGMA = 'Segundo rango debe ser mayor al primer rango';

/*-----------------------MENU/CONFIGURAR MENU-------------------------*/
lang.confMenu = {};
lang.confMenu.NOSELMOD = 'No se ha seleccionado Módulo';
lang.confMenu.NOSELMNU = 'No se ha seleccionado Menú';
lang.confMenu.DOMSI = 'Dominio ya existe';
lang.confMenu.MODSI = 'Módulo ya existe';
lang.confMenu.MNUSI = 'Menú ya existe';
lang.confMenu.ALISI = 'Alias ya existe';
lang.confMenu.URLSI = 'URL ya existe';

/*-----------------------USUAIROS/CONFIGURAR USUARIO-------------------------*/
lang.confUsuario = {};
lang.confUsuario.USUSI = 'Empleado ya tiene usuario.';
lang.confUsuario.EMASI = 'E-mail ya tiene usuario.';
lang.confUsuario.BUSEMP= 'Tiene que buscar y seleccionar un empleado.';
lang.confUsuario.EMAREQ= 'Ingrese un correo válido.';
lang.confUsuario.ROLREQ= 'Seleccione al menos un rol.';

/*-----------------------MAESTROS/CLASIFICADOR-------------------------*/
lang.clasificador = {};
lang.clasificador.CODIGO = 'Código';
lang.clasificador.CLASIFICADOR = 'Clasificador';
lang.clasificador.TIPO = 'Tipo';
lang.clasificador.EXIST = 'Clasificador o código ya existe.';

/*-----------------------MAESTROS/SUBCLASIFICADOR-------------------------*/
lang.subClasificador = {};
lang.subClasificador.SUBCLASI = 'Sub Clasificador';
lang.subClasificador.EXIST = 'Sub clasificador ya existe.';

/*-----------------------MAESTROS/CLASIFICADOR DETALLE----------------------*/
lang.clasificadorDetalle = {};
lang.clasificadorDetalle.CLASIFICADORDET = 'Clasificador Detalle';
lang.clasificadorDetalle.EXIST = 'Clasificador detalle ya existe.';

/*---------------------MAESTROS/SUB CLASIFICADOR DETALLE--------------------*/
lang.SubClasificadorDetalle = {};
lang.SubClasificadorDetalle.SUBCLASDET = 'Sub clasificador detalle';
lang.SubClasificadorDetalle.EXIST = 'Sub clasificador detalle ya existe.';

/*---------------------MAESTROS/ESPECIFICA--------------------*/
lang.Especifica = {};
lang.Especifica.ESPECIFICA = 'Específica';
lang.Especifica.EXIST = 'Específica ya existe';

/*---------------------MAESTROS/BANCO--------------------*/
lang.banco = {};
lang.banco.BANCO = 'Banco';
lang.banco.EXIST = 'Banco ya existe';

/*---------------------MAESTROS/CUENTA CORRIENTE--------------------*/
lang.cuentaCorriente = {};
lang.cuentaCorriente.CTACTE = 'Cuenta';
lang.cuentaCorriente.EXIST = 'Cuenta ya existe';

/*---------------------MAESTROS/TIPO DE DOCUMENTO DE IDENTIDAD--------------------*/
lang.TipoDocId = {};
lang.TipoDocId.TIPODOC = 'Tipo de Documento';
lang.TipoDocId.EXIST = 'Tipo de documento ya existe';

/*---------------------MAESTROS/TIPO DE PAGO--------------------*/
lang.TipoPago = {};
lang.TipoPago.TIPOPAGO = 'Tipo de Pago';
lang.TipoPago.EXIST = 'Tipo de pago ya existe';

/*---------------------MAESTROS/TIPO DE CONTRATO--------------------*/
lang.TipoContrato = {};
lang.TipoContrato.NEW = 'Nuevo Tipo de Contrato';
lang.TipoContrato.EDIT = 'Editar Tipo de Contrato';
lang.TipoContrato.TIPOCON = 'Tipo de Contrato';
lang.TipoContrato.REQCONT = 'Ingrese contenido de plantilla de contrato';
lang.TipoContrato.EXIST = 'Tipo de contrato ya existe';

/*---------------------MAESTROS/CARGO--------------------*/
lang.Cargo = {};
lang.Cargo.KARGO = 'Cargo';
lang.Cargo.EXIST = 'Cargo ya existe';
lang.Cargo.EXIST2 = 'Cargo ya existe en el área';

/*---------------------MAESTROS/AREA--------------------*/
lang.Area = {};
lang.Area.Area = 'Area';
lang.Area.EXIST = 'Area ya existe';

/*---------------------MAESTROS/CATEGORIA DE TRABAJADOR--------------------*/
lang.CategoriaTrabajador = {};
lang.CategoriaTrabajador.KAT = 'Categoría';
lang.CategoriaTrabajador.SICLA = 'Sicla';
lang.CategoriaTrabajador.EXIST = 'Categoría o sicla ya existe';

/*---------------------MAESTROS/CONCEPTOS DE PLANILLA--------------------*/
lang.ConceptoPlanilla = {};
lang.ConceptoPlanilla.CONC = 'Concepto';
lang.ConceptoPlanilla.DESCO = 'Descripción Corta';
lang.ConceptoPlanilla.CLASI = 'Clasificación';
lang.ConceptoPlanilla.EXIST = 'Concepto o descripción corta ya existe';

/*---------------------MAESTROS/ACTIVIDAD--------------------*/
lang.Actividad = {};
lang.Actividad.ACT = 'Actividad';
lang.Actividad.CLAS = 'Clasificador';
lang.Actividad.EXIST = 'Actividad ya existe';

/*---------------------MAESTROS/TIPO DE VINCULO FAMILIAR--------------------*/
lang.TipoVinculoFamiliar = {};
lang.TipoVinculoFamiliar.VICNULO = 'Vínculo Familiar';
lang.TipoVinculoFamiliar.EXIST = 'Vínculo Familiar ya existe';

/*---------------------MAESTROS/ESTRUCTURA ORGANICA--------------------*/
lang.EstructuraOrganica = {};
lang.EstructuraOrganica.EXIST = 'Estructura ya existe';

/*---------------------PERSONAL/EMPLEADOS--------------------*/
lang.Empleados = {};
lang.Empleados.NRODOC = 'N° Doc.';
lang.Empleados.APENOM = 'Apellidos y Nombres';
lang.Empleados.EMAIL  = 'Email';
lang.Empleados.TELS  = 'Teléfonos';
lang.Empleados.PRIN  = 'Principal';
lang.Empleados.TTAP  = 'Tipo Aplicaión';
lang.Empleados.PRM  = 'Permanente';
lang.Empleados.FEINI  = 'Fecha de Inico';
lang.Empleados.FEFIN  = 'Fecha de Término';
lang.Empleados.VARI  = 'Cambia cada mes';
lang.Empleados.MTO  = 'Monto';
lang.Empleados.COM  = 'Comisión AFP';
lang.Empleados.PRI  = 'Prima Seguro';
lang.Empleados.EXIST = 'Empleado, email o número de documento ya existe';
lang.Empleados.EXISTDH = 'Nombres y apellidos o número de documento de derechohabiente ya existe';

/*---------------------PERSONAL/HORARIOS--------------------*/
lang.Horario = {};
lang.Horario.HORA = 'Horario';
lang.Horario.INMA = 'Iingreso Mañana';
lang.Horario.SALMA = 'Salida Mañana';
lang.Horario.INTA = 'Ingreso Tarde';
lang.Horario.SALTA = 'Salida Tarde';
lang.Horario.EXIST = 'Horario ya existe';

/*---------------------PERSONAL/SISTEMA DE PENSIONES--------------------*/
lang.SistemaPension = {};
lang.SistemaPension.RUC = 'RUC';
lang.SistemaPension.SISPE = 'Sistema de Pensión';
lang.SistemaPension.EXIST = 'Sistema de pensión o RUC ya existe';

/*---------------------PERSONAL/SISTEMA DE PENSIONES--------------------*/
lang.TipoPlanilla = {};
lang.TipoPlanilla.TIPOP = 'Tipo de Planilla';
lang.TipoPlanilla.EXIST = 'Tipo de planilla ya existe';

/*---------------------PERSONAL/MOTIVO DE BAJA--------------------*/
lang.MotivoBaja = {};
lang.MotivoBaja.MTBJ = 'Motivo de baja';
lang.MotivoBaja.EXIST = 'Motivo de baja ya existe';

/*---------------------PERSONAL/CONTRATOS--------------------*/
lang.GenerarContrato = {};
lang.GenerarContrato.FEINI = 'Fecha de Inicio';
lang.GenerarContrato.FEFIN = 'Fecha de Término';
lang.GenerarContrato.VALCONT = 'Seleccione trabajadores e ingrese fechas de contrato';
lang.GenerarContrato.NOCT = 'Debe seleccionar un tipo de contrato para el trabajador, en Empleados - Datos Laborales';

/*---------------------CONTROL DE ASISTENCIA/GENERAR MES--------------------*/
lang.GenerarMes = {};
lang.GenerarMes.EXIST = 'Año ya existe';
lang.GenerarMes.DSNLB = 'Días No Laborables';
lang.GenerarMes.FEC = 'Fecha';

/*---------------------GESTIONAR AUSENCIAS/TIPO DE AUSENCIA--------------------*/
lang.TipoDeAusencia = {};
lang.TipoDeAusencia.TIPOAUSENCIA = 'Tipo de Ausencia';
lang.TipoDeAusencia.GRUPO = 'Grupo de Ausencia';
lang.TipoDeAusencia.EXIST = 'Ausencia ya existe';

/*---------------------GESTIONAR AUSENCIAS/VACACIONES LISTA--------------------*/
lang.Vacaciones = {};
lang.Vacaciones.IDTRABAJADOR = 'Id Trbajador';
lang.Vacaciones.APATERNO = 'Apellido Paterno';
lang.Vacaciones.AMATERNO = 'Apellido Materno';
lang.Vacaciones.PNOMBRE = 'Primer Nombre';
lang.Vacaciones.SNOMBRE = 'Segundo Nombre';
lang.Vacaciones.GST = 'Gestionar Ausencias';
lang.Vacaciones.EXIST = 'Existe una ausencia con las fechas ingresadas';

/*---------------------GESTIONAR AUSENCIAS/VACACIONES --------------------*/
lang.Vacaciones.TIPOVAC = 'Tipo Ausencia';
lang.Vacaciones.FECHAI = 'Fecha Inicio';
lang.Vacaciones.FECHAF = 'Fecha Fin';
lang.Vacaciones.DIAS = 'Días';

/*---------------------CONTROL ASISTENCIA/GENERAR MES--------------------*/
lang.GenerarMes = {};
lang.GenerarMes.ANIO = 'Año';
lang.GenerarMes.MES  = 'Mes';
lang.GenerarMes.FECHA  = 'Fecha';
lang.GenerarMes.DNLAB  = 'Día No Laborable';
lang.GenerarMes.DNLABCT  = 'Días No Laborables';


/*---------------------PLANILLA/RETENCIONES JUDICIALES--------------------*/
lang.RetencionJudicial = {};
lang.RetencionJudicial.DNI = 'DNI';
lang.RetencionJudicial.NOMBCOMP  = 'Apellidos y Nombres';
lang.RetencionJudicial.CONCEPTO  = 'Concepto';
lang.RetencionJudicial.BENEF  = 'Beneficiario';
lang.RetencionJudicial.TIPAPL  = 'Tipo Aplicación';
lang.RetencionJudicial.FECHAI  = 'Fecha Inicio';
lang.RetencionJudicial.FECHAF  = 'Fecha Fin';
lang.RetencionJudicial.MONTO  = 'Monto';
lang.RetencionJudicial.EXIST  = 'Retención Judicial ya Existe';

/*---------------------------ASISTENCIA MANUAL--------------------------*/
lang.AsistenciaManual = {};
lang.AsistenciaManual.ORIGEN  = 'Origen';
lang.AsistenciaManual.FECHA  = 'Fecha';
lang.AsistenciaManual.HINGM  = 'Hora Ingreso Mañana';
lang.AsistenciaManual.HSALM  = 'Hora Salida Mañana';
lang.AsistenciaManual.HINGT  = 'Hora Ingreso Tarde';
lang.AsistenciaManual.HSALT  = 'Hora Salida Tarde';
lang.AsistenciaManual.EXIST  = 'Asistencia ya registrado';
lang.AsistenciaManual.VERITRAB  = 'Debe seleccionar un trabajador';
lang.AsistenciaManual.VALMAN  = 'La hora de ingreso de la mañana no debe ser mayor a hora de salida';
lang.AsistenciaManual.VALTAR  = 'La hora de ingreso de la tarde no debe ser mayor a hora de salida';
lang.AsistenciaManual.VALTARMAN  = 'La hora de salida de la mañana no debe ser mayor a hora de ingreso de la tarde';

/*---------------------------ASISTENCIA AUTOMATICA--------------------------*/
lang.AsistenciaAutomatica = {};
lang.AsistenciaAutomatica.EXIST  = 'Asistencia ya registrado';
lang.AsistenciaAutomatica.TNIDENT  = 'Trabajador no identificado';
lang.AsistenciaAutomatica.HORAIC  = 'Hora de ingreso, cerrado';
lang.AsistenciaAutomatica.FHORA  = 'Fuera de Horario';
lang.AsistenciaAutomatica.DNLBRL  = 'Dia no laborable';