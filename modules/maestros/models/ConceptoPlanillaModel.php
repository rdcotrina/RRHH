<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 12-03-2015 08:03:42 
* Descripcion : ConceptoPlanillaModel.php
* ---------------------------------------
*/ 

class ConceptoPlanillaModel extends Model{

    private $_flag;
    private $_idConceptoPlanilla;
    private $_concepto;
    private $_descripcionCorta;
    private $_clasificacion;
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
        $this->_idConceptoPlanilla   = Aes::de(SimpleForm::getParam("_idConceptoPlanilla"));    /*se decifra*/
        $this->_concepto =   SimpleForm::getParam(PCNCP."txt_concepto");
        $this->_descripcionCorta =   SimpleForm::getParam(PCNCP."txt_descorta");
        $this->_clasificacion =   SimpleForm::getParam(PCNCP."lst_clasificacion");
        $this->_activo =   SimpleForm::getParam(PCNCP."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: ConceptoPlanilla*/
    public function getGridConceptoPlanilla(){
        $query = "call sp_maeConceptoPlanillaGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*mantenimiento registro: ConceptoPlanilla*/
    public function mantenimientoConceptoPlanilla(){
        $query = "call sp_maeConceptoPlanillaMantenimiento(:flag,:idConceptoPlanilla,:concepto,:descripcionCorta,:clasificacion,:activo,:usuario);";
        $parms = array(
            ':flag' => $this->_flag,
            ':idConceptoPlanilla' => $this->_idConceptoPlanilla,
            ':concepto' => $this->_concepto,
            ':descripcionCorta' => $this->_descripcionCorta,
            ':clasificacion' => $this->_clasificacion,
            ':activo' => (!empty($this->_activo))?$this->_activo:'I',
            ':usuario' => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: ConceptoPlanilla*/
    public function findConceptoPlanilla(){
        $query = "call sp_maeMaestrosConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 20,
            ":criterio" => $this->_idConceptoPlanilla
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
}
