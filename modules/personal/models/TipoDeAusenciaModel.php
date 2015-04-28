<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 27-03-2015 16:03:35 
* Descripcion : TipoDeAusenciaModel.php
* ---------------------------------------
*/ 

class TipoDeAusenciaModel extends Model{

    private $_flag;
    private $_idTipoDeAusencia;
    private $_TipoDeAusencia;
    private $_GrupoAusencia;
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
        $this->_idTipoDeAusencia   = Aes::de(SimpleForm::getParam("_idTipoDeAusencia"));    /*se decifra*/
        $this->_TipoDeAusencia   = SimpleForm::getParam(TAUS."txt_tipoausencia");    /*se decifra*/
        $this->_GrupoAusencia   = SimpleForm::getParam(TAUS."txt_grupoausencia");    /*se decifra*/
        $this->_activo =   SimpleForm::getParam(TAUS."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: TipoDeAusencia*/
    public function getGridTipoDeAusencia(){
        $query = "call sp_maeTipoAusenciaGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*grabar nuevo registro: TipoDeAusencia*/
    public function mantenimientoTipoDeAusencia(){
        /*-------------------------LOGICA PARA EL INSERT------------------------*/
        $query = "call sp_maeTipoAusenciaMantenimiento(:flag,:key,:tipo_ausencia,:grupo_ausencia,:estado,:usuario);";
        $parms = array(
            ':flag' => $this->_flag,
            ':key' => $this->_idTipoDeAusencia,
            ':tipo_ausencia' => $this->_TipoDeAusencia,
            ':grupo_ausencia' => $this->_GrupoAusencia,
            ':estado' => (!empty($this->_activo))?$this->_activo:'I',
            ':usuario' => $this->_usuario
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: TipoDeAusencia*/
    public function findTipoDeAusencia(){
        /*-----------------LOGICA PARA SELECT REGISTRO A EDITAR-----------------*/
        $query = "call sp_maeGestionarAusenciasConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 1,
            ":criterio" => $this->_idTipoDeAusencia
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*editar registro: TipoDeAusencia*/
    public function editTipoDeAusencia(){
        /*-------------------------LOGICA PARA EL UPDATE------------------------*/
    }
    
    /*eliminar varios registros: TipoDeAusencia*/
    public function deleteTipoDeAusenciaAll(){
        /*--------------------------LOGICA PARA DELETE--------------------------*/
    }
                  //getAllTipoDeAusencia
    public function getAllTipoDeAusencia(){
        $query = "call sp_maeGestionarAusenciasConsultas(:flag,:criterio);";
        
        $parms = array(
            ":flag" => 2,
            ":criterio" => ''
        );
        $data = $this->queryAll($query,$parms);
        return $data;
    }
}