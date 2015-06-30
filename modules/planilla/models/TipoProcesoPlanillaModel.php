<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 15-06-2015 20:06:41 
* Descripcion : TipoProcesoPlanillaModel.php
* ---------------------------------------
*/ 

class TipoProcesoPlanillaModel extends Model{

    private $_flag;
    private $_idTipoProcesoPlanilla;
    private $_activo;
    private $_usuario;
    private $_lst_tipopla;
    private $_txt_num_mes_tipo_procesop;
    private $_txt_ano_tipo_procesop;
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
        $this->_idTipoProcesoPlanilla   = SimpleForm::getParam("_idTipoProcesoPlanilla");    /*se decifra*/
        $this->_lst_tipopla      = SimpleForm::getParam(GTPP."lst_tipopla");
        $this->_txt_num_mes_tipo_procesop  = SimpleForm::getParam(GTPP."txt_num_mes_tipo_procesop");
        $this->_txt_ano_tipo_procesop     = SimpleForm::getParam(GTPP."txt_ano_tipo_procesop");
        $this->_activo =   SimpleForm::getParam(GTPP."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: TipoProcesoPlanilla*/
    public function getGridTipoProcesoPlanilla(){
        $query = "call sp_maeTipoProcesoPanillaGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
        $parms = array(
            ":iDisplayStart" => $this->_pDisplayStart,
            ":iDisplayLength" => $this->_pDisplayLength,
            ":sOrder" => $this->_pOrder,
            ":sSearch" => $this->_pSearch ,
            ":sFilterCols" => $this->_sFilterCols
        );
       // print_r ($parms);
        $data = $this->queryAll($query,$parms);
        return $data;
    }
    
    /*mantenimiento (CRUD) registro: TipoProcesoPlanilla*/
    public function mantenimientoTipoProcesoPlanilla(){
        /*-------------------------LOGICA PARA EL INSERT------------------------*/
        /*':flag' => $this->_flag,*/
        $query = "call sp_maeTipoProcesoPlanillaMantenimiento(:flag,:key,:id_tipo_planilla,:num_mes_tipo_procesop,:ano_tipo_procesop,:usuario);";
        
        $parms = array(
            ':flag' => $this->_flag,
            ':key' => $this->_idTipoProcesoPlanilla,
            ':id_tipo_planilla' => $this->_lst_tipopla,
            ':num_mes_tipo_procesop' => $this->_txt_num_mes_tipo_procesop,
            ':ano_tipo_procesop' => $this->_txt_ano_tipo_procesop,
            ':usuario' => $this->_usuario
        );
    //   print_r($parms);
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: TipoProcesoPlanilla*/
    public function findTipoProcesoPlanilla(){
        /*-----------------LOGICA PARA SELECT REGISTRO A EDITAR-----------------*/
        $query = "call sp_maeTipoProcesoPlanillaConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 2,
            ":criterio" => $this->_idTipoProcesoPlanilla
        );
       // print_r($parms);
        
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    public function getAllTipoPlanilla(){
      //  $query = "call sp_maeTipoProcesoPlanillaConsultas(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        //echo $query;
        $query = "call sp_maeTipoProcesoPlanillaConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 1,
            ":criterio" => 1
        );
        $data = $this->queryAll($query,$parms);
        return $data;
    }
}
