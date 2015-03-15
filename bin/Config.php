<?php
/*
 * --------------------------------------
 * creado por:  RDCC
 * fecha: 03.01.2014
 * Config.php
 * --------------------------------------
 */
define('BASE_URL','http://'.$_SERVER['HTTP_HOST'].'/RRHH/');#accede a las vistas delusuario
define('DEFAULT_CONTROLLER','index');
define('DEFAULT_METHOD','index');
define('DEFAULT_LAYOUT','smartadmin');

define('APP_NAME','RECURSOS HUMANOS');
define('APP_SLOGAN','MY CREACION');
define('APP_COMPANY','www.creator.pe');
define('APP_KEY','adABKCDLZEFXGHIJ');               /*llave para AES*/
define('APP_PASS_KEY','99}dF7EZbnbXOkojf&dzvxd5q#guPbPK1spU75Jm|N79Ii7PK');
define('APP_EXPORT_FILES',ROOT . 'public' . DS . 'files' . DS);
define('APP_COD_SADM','0001');
define('APP_COD_ADM','0002');
define('APP_PRE_METHOD','');//antes Event
define('APP_COMPARE_INDEX',-6);

define('DB_ENTORNO','D');  /*D=DESARROLLO, P=PRODUCCION*/
define('DB_MOTOR','mysql');

//define('DB_HOST','gestionirp.com');
//define('DB_USER','admin101_userrrh');
//define('DB_PASS','!JQv#mk+%p-{');
//define('DB_NAME','admin101_rrhh');

define('DB_HOST','localhost');
define('DB_USER','root');
define('DB_PASS','');
define('DB_NAME','municipalidad');


define('DB_PORT','3306');
define('DB_CHARSET','utf8');
define('DB_COLLATION','utf8_unicode_ci');

/*__autoload es obsoleta*/
function autoloadCore($class){
    if(file_exists(ROOT . 'bin' . DS . $class.'.php')){
        require_once (ROOT . 'bin' . DS . $class.'.php');
    }
}

function autoloadLibs($class){
    if(file_exists(ROOT . 'libs' . DS . $class . DS . $class.'.php')){
        require_once (ROOT . 'libs' . DS . $class . DS . $class.'.php');
    }
}

/*se registra la funcion autoload*/
spl_autoload_register('autoloadCore'); 
spl_autoload_register('autoloadLibs');


require_once (ROOT . 'includes' . DS . 'ConstantesPHP.php');
require_once (ROOT . 'includes' . DS . 'Etiquetas.php');