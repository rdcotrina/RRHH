<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 22-01-2015 13:01:45 
* Descripcion : ClasificadorModel.php
* ---------------------------------------
*/ 

class clasificadorModel extends Model{

    private $_flag;
    private $_idClasificador;
    private $_codigo;
    private $_clasificador;
    private $_tipo;
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
        $this->_idClasificador   = Aes::de(SimpleForm::getParam("_idClasificador"));    /*se decifra*/
        $this->_codigo =   SimpleForm::getParam(CLSF.'txt_codigo'); 
        $this->_clasificador =   SimpleForm::getParam(CLSF.'txt_clasificador'); 
        $this->_tipo =   SimpleForm::getParam(CLSF.'lst_tipo'); 
        $this->_activo =   SimpleForm::getParam(CLSF.'chk_activo'); 
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam('pDisplayStart'); 
        $this->_pDisplayLength =   SimpleForm::getParam('pDisplayLength'); 
        $this->_pSortingCols   =   SimpleForm::getParam('pSortingCols');
        $this->_pSearch        =   SimpleForm::getParam('pSearch');
        $this->_pOrder         =   SimpleForm::getParam('pOrder');
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam('sFilterCols'))),ENT_QUOTES);
    }
    
    /*data para el grid: Clasificador*/
    public function getClasificador(){
        $query = "call sp_maeClasificadorGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
        $parms = array(
            ':iDisplayStart' => $this->_pDisplayStart,
            ':iDisplayLength' => $this->_pDisplayLength,
            ':sOrder' => $this->_pOrder,
            ':sSearch' => $this->_pSearch ,
            ':sFilterCols' => $this->_sFilterCols,
        );
        $data = $this->queryAll($query,$parms);
        return $data;
    }
    
    /*mantenimiento registro: Clasificador*/
    public function mantenimientoClasificador(){
        $query = "call sp_maeClasificadorMantenimiento(:flag,:idClasificador,:codigo,:clasificador,:tipo,:activo,:usuario);";
        $parms = array(
            ':flag' => $this->_flag,
            ':idClasificador' => $this->_idClasificador,
            ':codigo' => $this->_codigo,
            ':clasificador' => $this->_clasificador,
            ':tipo' => $this->_tipo,
            ':activo' => (!empty($this->_activo))?$this->_activo:'I',
            ':usuario' => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: Clasificador*/
    public function findClasificador(){
        $query = "call sp_maeMaestrosConsultas(:flag,:idClasificador);";
        $parms = array(
            ':flag' => $this->_flag,
            ':idClasificador' => $this->_idClasificador
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
}
