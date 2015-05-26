<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 24-05-2015 01:05:46 
* Descripcion : RetencionJudicialModel.php
* ---------------------------------------
*/ 

class RetencionJudicialModel extends Model{

    private $_flag;
    private $_idRetencionJudicial;
    private $_activo;
    private $_usuario;
    private $_idCriterio;
    private $_idbeneficiario;
    private $_idcuentacorriente;
    private $_idconceptoplanilla;
    private $_fechaInicio;
    private $_fechaFin;
    private $_tipoAplicacion;
    private $_monto;
    private $_observacion;
    

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
        //print_r($_POST);
        $this->_flag                    = SimpleForm::getParam("_flag");
        $this->_idRetencionJudicial     = Aes::de(SimpleForm::getParam("_idRetencionJudicial"));    /*se decifra*/
        $this->_activo                  = SimpleForm::getParam(RTJD."chk_activo");
        $this->_usuario                 = Session::get("sys_idUsuario");
        $this->_idCriterio              = SimpleForm::getParam("_idCriterio");
        $this->_idbeneficiario          = SimpleForm::getParam(RTJD."lst_beneficiario");
        $this->_idcuentacorriente       = SimpleForm::getParam(RTJD."lst_cuenta");
        $this->_idconceptoplanilla      = SimpleForm::getParam(RTJD."lst_concepto");
        $this->_fechaInicio             = Functions::dateFormat(SimpleForm::getParam(RTJD."txt_fechainicio"),'Y-m-d');
        $this->_fechaFin                = Functions::dateFormat(SimpleForm::getParam(RTJD."txt_fechafin"),'Y-m-d');
        $this->_tipoAplicacion          = SimpleForm::getParam(RTJD."lst_tipoaplicacion");
        $this->_monto                   = SimpleForm::getParam(RTJD."txt_monto");
        $this->_observacion             = SimpleForm::getParam(RTJD."txt_Observacion");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
       // echo $this->_fechaFin ;
    }
    
    /*data para el grid: RetencionJudicial*/
    public function getGridRetencionJudicial(){
        $query = "call sp_pnllaRetencionJudicialGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
        $parms = array(
            ":iDisplayStart" => $this->_pDisplayStart,
            ":iDisplayLength" => $this->_pDisplayLength,
            ":sOrder" => $this->_pOrder,
            ":sSearch" => $this->_pSearch ,
            ":sFilterCols" => $this->_sFilterCols
        );
      //  print_r($parms);
        $data = $this->queryAll($query,$parms);
        return $data;
    }
    
    /*mantenimiento (CRUD) registro: RetencionJudicial*/
    public function mantenimientoRetencionJudicial(){
        /*-------------------------LOGICA PARA EL INSERT------------------------*/
        $query = "call sp_pnllaRetencionJudicialMantenimiento("
                . ":flag,"
                . ":idretencionjudicial,"
                . ":idderechohabiente,"
                . ":idcuentacorriente,"
                . ":idconceptoplanilla,"
                . ":fechaInicio,"
                . ":fechaFin,"
                . ":tipoAplicacion,"
                . ":monto,"
                . ":observacion,"
                . ":usuario,"
                . ":estado"                
            . ");";
        
        $parms = array(
            ":flag" => $this->_flag,
            ":idretencionjudicial" => $this->_idRetencionJudicial,
            ":idderechohabiente" => $this->_idbeneficiario,
            ":idcuentacorriente" => $this->_idcuentacorriente,
            ":idconceptoplanilla" => $this->_idconceptoplanilla,
            ":fechaInicio" => $this->_fechaInicio,
            ":fechaFin" => $this->_fechaFin,
            ":tipoAplicacion" => $this->_tipoAplicacion,
            ":monto" => $this->_monto,
            ":observacion" => $this->_observacion,
            ":usuario" => $this->_usuario,
            ":estado" => (!empty($this->_activo))?$this->_activo:'I'
        );
        $data = $this->queryOne($query,$parms);
        //print_r($parms);
        return $data;
    }
    
    /*seleccionar registro a editar: RetencionJudicial*/
    public function findRetencionJudicial(){
        /*-----------------LOGICA PARA SELECT REGISTRO A EDITAR-----------------*/
        $query = "call sp_pnllaRetencionJudicialConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 6,
            ":criterio" => $this->_idRetencionJudicial
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    public function getRetencionJudicial($flag,$criterio=''){
        $query = "call sp_pnllaRetencionJudicialConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => $flag,
            ":criterio" => $criterio
        );
        $data = $this->queryAll($query,$parms);
        //print_r($parms);
        return $data;
    }
    
}
