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