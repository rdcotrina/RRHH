<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 11-03-2015 16:03:55 
* Descripcion : CategoriaTrabajadorModel.php
* ---------------------------------------
*/ 

class CategoriaTrabajadorModel extends Model{

    private $_flag;
    private $_idCategoriaTrabajador;
    private $_categoria;
    private $_sicla;
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
        $this->_idCategoriaTrabajador   = Aes::de(SimpleForm::getParam("_idCategoriaTrabajador"));    /*se decifra*/
        $this->_categoria =   SimpleForm::getParam(KTRBA."txt_categoria");
        $this->_sicla =   SimpleForm::getParam(KTRBA."txt_sicla");
        $this->_activo =   SimpleForm::getParam(KTRBA."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: CategoriaTrabajador*/
    public function getGridCategoriaTrabajador(){
        $query = "call sp_maeCategoriaTrabajadorGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*grabar nuevo registro: CategoriaTrabajador*/
    public function mantenimientoCategoriaTrabajador(){
        $query = "call sp_maeCategoriaTrabajadorMantenimiento(:flag,:idCategoriaTrabajador,:categoria,:sicla,:activo,:usuario);";
        $parms = array(
            ':flag' => $this->_flag,
            ':idCategoriaTrabajador' => $this->_idCategoriaTrabajador,
            ':categoria' => $this->_categoria,
            ':sicla' => $this->_sicla,
            ':activo' => (!empty($this->_activo))?$this->_activo:'I',
            ':usuario' => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: CategoriaTrabajador*/
    public function findCategoriaTrabajador(){
        $query = "call sp_maeMaestrosConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 19,
            ":criterio" => $this->_idCategoriaTrabajador
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
}
