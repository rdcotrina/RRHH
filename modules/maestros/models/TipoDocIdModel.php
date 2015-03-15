<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 27-02-2015 18:02:03 
* Descripcion : TipoDocIdModel.php
* ---------------------------------------
*/ 

class TipoDocIdModel extends Model{

    private $_flag;
    private $_idTipoDocId;
    private $_tipoDoc;
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
        $this->_idTipoDocId   = Aes::de(SimpleForm::getParam("_idTipoDocId"));    /*se decifra*/
        $this->_tipoDoc =   SimpleForm::getParam(TDCID."txt_tipodoc");
        $this->_activo =   SimpleForm::getParam(TDCID."chk_activo");
        $this->_usuario     = Session::get("sys_idUsuario");
        
        $this->_pDisplayStart  =   SimpleForm::getParam("pDisplayStart"); 
        $this->_pDisplayLength =   SimpleForm::getParam("pDisplayLength"); 
        $this->_pSortingCols   =   SimpleForm::getParam("pSortingCols");
        $this->_pSearch        =   SimpleForm::getParam("pSearch");
        $this->_pOrder         =   SimpleForm::getParam("pOrder");
        $this->_sFilterCols    =   htmlspecialchars(trim(AesCtr::de(SimpleForm::getParam("sFilterCols"))),ENT_QUOTES);
    }
    
    /*data para el grid: TipoDocId*/
    public function getGridTipoDocId(){
        $query = "call sp_maeTipoDocIdGrid(:iDisplayStart,:iDisplayLength,:sOrder,:sSearch,:sFilterCols);";
        
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
    
    /*grabar nuevo registro: TipoDocId*/
    public function mantenimientoTipoDocId(){
        $query = "call sp_maeTipoDocIdMantenimiento(:flag,:idTipoDocId,:tipoDoc,:activo);";
        $parms = array(
            ':flag' => $this->_flag,
            ':idTipoDocId' => $this->_idTipoDocId,
            ':tipoDoc' => $this->_tipoDoc,
            ':activo' => (!empty($this->_activo))?$this->_activo:'I'
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
    /*seleccionar registro a editar: TipoDocId*/
    public function findTipoDocId(){
        $query = "call sp_maeMaestrosConsultas(:flag,:idTipoDocId);";
        $parms = array(
            ':flag' => 14,
            ':idTipoDocId' => $this->_idTipoDocId
        );
        $data = $this->queryOne($query,$parms);
        return $data;
    }
    
}
