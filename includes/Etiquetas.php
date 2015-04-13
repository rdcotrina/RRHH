<?php
/*
 * Documento   : Etiquetas
 * Creado      : 15-jul-2014
 * Autor       : ..... .....
 * Descripcion : todas las etiquetas del sistema
 */

/*ETIQUETAS GENERALES*/
define('H_PANEL','Panel:');
define('H_DOMI','Dominios');
define('CK_ACTIVO','Activo');
define('BTN_NUEVO','Nuevo');
define('BTN_DELETE','Eliminar');
define('BTN_CLOSE','Cerrar');
define('ICON_CLOSE','fa fa-ban');
define('THEME_CLOSE','btn btn-default xClose');
define('BTN_ACEP','Aceptar');
define('LABEL_DESC','Iingresar descripción');
define('BTN_GUARDAR','Guardar');
define('LBL_SELECCIONAR','Seleccionar');
define('LBL_PENDIENTE','Pendiente');

/*FORMULARIO LOGIN*/
define('L_TITLE','Ingresar');
define('L_EMAIL','E-mail o usuario');
define('L_PASS','Contraseña');
define('L_OLVIDE','¿Olvide mi contraseña?');
define('L_ENTRAR','Entrar');
define('L_L_EMAIL','Ingrese su email');
define('L_L_PASS','Ingrese su clave');

/*CONFIGURAR MENU*/
define('M_TITLTE_DOM','Módulos');
define('M_TITLTE_MOD','Menú Principal');
define('M_TITLTE_MEP','Opciones');
define('M_TITLTE_OPC','Opciones');
define('M_LB_DOM','Módulo:');
define('M_LB_MOD','Menú:');
    /*formulario dominios*/
    define('M_FG_DOM_TITLTE','Nuevo Módulo');
    define('M_FG_DOM_L_DOM','Módulo');
    define('M_FG_DOM_L_ICON','Icono');
    define('M_FG_DOM_L_ORD','Orden');
    define('M_FG_DOM_H_ICON','Class css para diseño de icono de Dominio');
    define('M_FG_DOM_H_ORD','Posición del módulo');
    define('M_FE_DOM_TITLTE','Editar Módulo');
    /*formulario modulos*/
    define('M_FG_MOD_TITLTE','Nuevo Menú');
    define('M_FG_MOD_L_MOD','Menú');
    define('M_FG_MOD_L_ORD','Orden');
    define('M_FG_MOD_H_ORD','Posición del menú');
    
/*CONFIGURAR USUARIOS*/
define('M_TITLTE_USU','Usuarios');    
    /*formulario usuarios*/
    define('M_FG_USU_TITLTE','Nuevo Usuario');
    define('M_FG_USU_L_PASS','Clave');
    define('M_FG_USU_L_EMP','Empleado');
    define('M_FG_USU_H_EMP','Click en boton para buscar empleado.');
    define('M_FG_USU_T_DP','Datos personales');
    define('M_FG_USU_T_RO','Roles');
    define('LABEL_3','E-mail');
    define('LABEL_4','Ingrese clave.');
    define('LABEL_5','Ingrese empleado.');
    define('LABEL_USU1','Editar Usuario');
    
    /*formulario buscar empleado*/
    define('LABEL_1','Buscar Empleado');
    define('LABEL_2','Empleado');

/*----------------------MODELOS----------------------*/
define('LABEL_6','Módulos');
define('LABEL_7','Nuevo Módulo');
define('LABEL_8','Descripción');
define('LABEL_9','Aplicación');
define('LABEL_14','Crear en DB?');

/*----------------------OPCIONES----------------------*/
define('LABEL_10','Módulo: ');
define('LABEL_11','Ingrese nombre de la opción');
define('LABEL_12','Seleccione tipo de opción');
define('LABEL_13','Ingrese ALIAS de opción para los HTMLElement');
define('LABEL_15','Configuración de Datos');
define('LABEL_16','Etiqueta del elemento');
define('LABEL_17','Valor');
define('LABEL_18','Configurar validación');


/*==============================CLASIFICADOR==============================*/
define('CLSF_1','Nuevo Clasificador General');
define('CLSF_2','Clasificador');
define('CLSF_3','Ingrese el nombre del clasificador');
define('CLSF_4','Código');
define('CLSF_5','Ingrese el código del clasificador');
define('CLSF_6','Editar Clasificador General');
define('CLSF_7','Tipo');

/*==============================SUB CLASIFICADOR==============================*/
define('SBCLF_1','Nuevo Sub Clasificador');
define('SBCLF_2','Sub Clasificador');
define('SBCLF_3','Ingrese el código del sub clasificador');
define('SBCLF_4','Ingrese el nombre del sub clasificador');
define('SBCLF_5','Editar Sub Clasificador');

/*==============================CLASIFICADOR DETALLE==========================*/
define('CLSFD_1','Clasificador Detalle');
define('CLSFD_2','Nuevo Clasificador Detalle');
define('CLSFD_3','Ingrese el código del clasificador detalle');
define('CLSFD_4','Ingrese el nombre del clasificador detalle');
define('CLSFD_5','Editar Clasificador Detalle');

/*============================SUB CLASIFICADOR DETALLE========================*/
define('SBCLD_1','Nuevo Sub Clasificador Detalle');
define('SBCLD_2','Ingrese el código del sub clasificador detalle');
define('SBCLD_3','Sub Clasificador Detalle');
define('SBCLD_4','Ingrese el nombre del sub clasificador detalle');
define('SBCLD_5','Editar Sub Clasificador Detalle');

/*============================ESPECIFICA========================*/
define('ESPE_1','Nueva Específica');
define('ESPE_2','Específica');
define('ESPE_3','Ingrese el nombre de la específica');
define('ESPE_4','Ingrese el código de la específica');
define('ESPE_5','Editar Específica');

/*============================BANCO========================*/
define('BANK_1','Bancos');
define('BANK_2','Nuevo Banco');
define('BANK_3','Banco');
define('BANK_4','Ingrese el nombre del banco');
define('BANK_5','Editar Banco');

/*============================CUENTA CORRIENTE========================*/
define('CTACT_1','Cuentas Corrientes');
define('CTACT_2','Nueva Cuenta Corriente');
define('CTACT_3','Cuenta Corriente');
define('CTACT_4','Ingrese el número de cuenta corriente');
define('CTACT_5','Editar Cuenta Corriente');

/*============================TIPO DE DOCUMENTO DE IDENTIDAD========================*/
define('TDCID_1','Tipo de Documentos de Identidad');
define('TDCID_2','Nuevo Tipo de Documentos de Identidad');
define('TDCID_3','Ingrese el tipo de documento de identidad');
define('TDCID_4','Tipo de Documento de Identidad');
define('TDCID_5','Editar Tipo de Documentos de Identidad');

/*============================TIPO DE PAGO========================*/
define('PTPG_1','Tipo de Pago');
define('PTPG_2','Nuevo Tipo de Pago');
define('PTPG_3','Ingresar el tipo de pago');
define('PTPG_4','Editar Tipo de Pago');

/*============================TIPO DE CONTRATOS========================*/
define('CTPCT_1','Tipo de Contratos');
define('CTPCT_2','Nombre de la plantilla');
define('CTPCT_3','Ingrese el nombre de la plantilla');
define('CTPCT_4','Nuevo');

/*============================CARGO========================*/
define('KRGO_1','Cargos');
define('KRGO_2','Nuevo Cargo');
define('KRGO_3','Cargo');
define('KRGO_4','Ingrese nombre de cargo');
define('KRGO_5','Editar Cargo');

/*============================AREA========================*/
define('AARA_1','Areas');
define('AARA_2','Nueva Area');
define('AARA_3','Area');
define('AARA_4','Ingrese nombre de area');
define('AARA_5','Editar Area');

/*============================CATEGORIAS DE TRABAJADOR========================*/
define('KTRBA_1','Categorías de Trabajador');
define('KTRBA_2','Nueva Categoría');
define('KTRBA_3','Categoría');
define('KTRBA_4','Ingrese el nombre de la categoría');
define('KTRBA_5','Sicla');
define('KTRBA_6','Ingrese una sicla para la categoría');
define('KTRBA_7','Editar Categoría');

/*============================CATEGORIAS DE TRABAJADOR========================*/
define('PCNCP_1','Conceptos de Planilla');
define('PCNCP_2','Nuevo Concepto');
define('PCNCP_3','Editar Concepto');
define('PCNCP_4','Concepto');
define('PCNCP_5','Ingrese el nombre del concepto');
define('PCNCP_6','Descripción corta');
define('PCNCP_7','Ingrese una descripción corta para el concepto');
define('PCNCP_8','Clasificación');

/*============================CATEGORIAS DE TRABAJADOR========================*/
define('HACT_1','Actividades');
define('HACT_2','Nueva Actividad');
define('HACT_3','Editar Actividad');
define('HACT_4','Actividad');
define('HACT_5','Ingrese el nombre de la actividad');

/*==============================CLASIFICADOR DERIVADO==============================*/
define('DVCL_1','Nuevo Clasificador');
define('DVCL_2','Clasificadores');
define('DVCL_3','Ingrese el nombre del clasificador');
define('DVCL_5','Ingrese el código del clasificador');
define('DVCL_6','Editar Clasificador');

/*==============================TIPO DE VINCULO FAMILIAR==============================*/
define('VNFA_1','Tipo de Vínculo Familiar');
define('VNFA_2','Nuevo Tipo de Vínculo Familiar');
define('VNFA_3','Editar Tipo de Vínculo Familiar');
define('VNFA_4','Ingrese el nombre del tipo de vínculo familiar');

/*==============================EMPLEADOS==============================*/
define('EMPL_1','Empleados');
define('EMPL_2','Nuevo Empleado');
define('EMPL_3','Datos Personales');
define('EMPL_4','Primer Nombre');
define('EMPL_5','Ingrese el primer nombre del empleado');
define('EMPL_6','Segundo Nombre');
define('EMPL_7','Ingrese el segundo nombre del empleado');
define('EMPL_8','Apellido Paterno');
define('EMPL_9','Ingrese el apellido paterno del empleado');
define('EMPL_10','Apellido Materno');
define('EMPL_11','Ingrese el apellido materno del empleado');
define('EMPL_12','Sexo');
define('EMPL_13','Masculino');
define('EMPL_14','Femenino');
define('EMPL_15','Dirección');
define('EMPL_16','Ingrese la irección del empleado');
define('EMPL_17','Email');
define('EMPL_18','Ingrese el email del empleado');
define('EMPL_19','Teléfonos');
define('EMPL_20','Ingrese números telefónicos del empleado');
define('EMPL_21','N° Documento');
define('EMPL_22','Ingrese el número de documento del empleado');
define('EMPL_23','Datos Laborales');
define('EMPL_24','Actividad');
define('EMPL_25','Datos de Nacimiento');
define('EMPL_26','Datos de Domicilio');
define('EMPL_27','Departamento');
define('EMPL_28','Provincia');
define('EMPL_29','Distrito');
define('EMPL_30','Fecha de Nacimiento');
define('EMPL_31','Tipo de Documento');
define('EMPL_32','Editar Empleado');
define('EMPL_33','Derechohabientes de: ');
define('EMPL_34','Datos de Derechohabiente');
define('EMPL_35','Listado');
define('EMPL_36','Tipo de vínculo');
define('EMPL_37','Nombres');
define('EMPL_38','Ingrese los nombres de derechohabiente');
define('EMPL_39','Apellidos');
define('EMPL_40','Ingrese los apellidos del derechohabiente');
define('EMPL_41','Ingrese el número de documento del derechohabiente');
define('EMPL_42','Ingrese el email del derechohabiente');
define('EMPL_43','Ingrese números telefónicos del derechohabiente');
define('EMPL_44','Ingrese la irección del derechohabiente');
define('EMPL_45','Datos Laborales de: ');
define('EMPL_46','Datos');
define('EMPL_47','Tipo de Contrato');
define('EMPL_48','Nombrado');
define('EMPL_49','Contratado');
define('EMPL_50','Cargo');
define('EMPL_51','Principal');
define('EMPL_52','Planilla');
define('EMPL_53','Datos Bancarios');
define('EMPL_54','Banco Haberes');
define('EMPL_55','Cuenta Corriente Haberes');
define('EMPL_56','Banco CTS');
define('EMPL_57','Sistema de Pensiones');
define('EMPL_58','Fecha de inscripción');
define('EMPL_59','Tipo descuento');
define('EMPL_61','Monto');
define('EMPL_62','Ingrese el monto del sistema de pensiones');
define('EMPL_63','Sist. de pensiones');
define('EMPL_64','Código essalud');
define('EMPL_65','Ingrese el código de essalud');
define('EMPL_66','Fecha de ingreso');
define('EMPL_67','Datos de Alta');
define('EMPL_68','Datos de Baja');
define('EMPL_69','Remuneración');
define('EMPL_70','Ingrese la remuneración');
define('EMPL_71','Fecha de baja');
define('EMPL_72','Motivo de baja');
define('EMPL_73','Tipo de aplicación');
define('EMPL_74','Permanente');
define('EMPL_75','Ingrese el monto');
define('EMPL_76','Varía cada mes');

/*==============================ESTRUCTURA ORGANICA==============================*/
define('ESOG_1','Estructura Orgánica');
define('ESOG_2','Ingrese el nombre de la estructura orgánica');
define('ESOG_3','Nueva Estructura');
define('ESOG_4','Editar Estructura');

/*==============================HORARIO==============================*/
define('HRIO_1','Horarios');
define('HRIO_2','Nuevo Horario');
define('HRIO_3','Editar Horario');
define('HRIO_4','Horario');
define('HRIO_5','Ingrese la descripción del horario');
define('HRIO_6','Mañana');
define('HRIO_7','Tarde');

/*==============================SISTEMA DE PENSIONES==============================*/
define('SISPE_1','Sistema de Pensiones');
define('SISPE_2','Nuevo Sistema de Pensiones');
define('SISPE_3','Editar Sistema de Pensiones');
define('SISPE_4','Ingrese el nombre del sistema de pensisones');
define('SISPE_5','Sistema de pensión');
define('SISPE_6','RUC');
define('SISPE_7','Ingrese el número de RUC');
define('SISPE_8','Código');
define('SISPE_9','Ingrese el código');

/*==============================TIPOS DE PLANILLA==============================*/
define('TPLL_1','Tipos de Planilla');
define('TPLL_2','Nuevo Tipo de Planilla');
define('TPLL_3','Editar Tipo de Planilla');
define('TPLL_4','Tipo de planilla');
define('TPLL_5','Ingrese nombre de tipo de planilla');

/*==============================TIPOS DE PLANILLA==============================*/
define('MTBA_1','Motivos de Baja');
define('MTBA_2','Nuevo Motivo de Baja');
define('MTBA_3','Editar Motivo de Baja');
define('MTBA_4','Motivo de baja');
define('MTBA_5','Ingrese el motivo de baja');

/*==============================CONTRATOS==============================*/
define('GNCTR_1','Contratos');
define('GNCTR_2','Generar Contratos');