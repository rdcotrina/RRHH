<?php
/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 10-04-2015 17:04:01 
* Descripcion : GenerarContratoController.php
* ---------------------------------------
*/    

class GenerarContratoController extends Controller{
    
    private static $GenerarContratoModel;
    
    public function __construct() {
        self::$GenerarContratoModel = $this->loadModel();
    }
    
    public function index(){ 
        Obj::run()->View->render();
    }
    
    public function getGridGenerarContrato(){
        $rows = array();
        $data =  self::$GenerarContratoModel->getGridGenerarContrato();
        foreach ($data as $value) {
            $rows[] = array(
                "id_trabajador"=>AesCtr::en($value["id_trabajador"]),
                "nombrecompleto"=> $value["nombrecompleto"],
                "numerodocumento"=> $value["numerodocumento"],
                "area"=> $value["area"],
                "cargo"=> $value["cargo"],
                "fe_ini"=> $value["fe_ini"],
                "fe_fin"=> $value["fe_fin"],
                "id_tipocontrato"=> $value["id_tipocontrato"],
                "estadoct"=> Functions::labelState($value["estadoct"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    public function getGridSinContrato(){
        $rows = array();
        $data =  self::$GenerarContratoModel->getGridSinContrato();
        foreach ($data as $value) {
            $rows[] = array(
                "id_trabajador"=>AesCtr::en($value["id_trabajador"]),
                "nombrecompleto"=> $value["nombrecompleto"],
                "numerodocumento"=> $value["numerodocumento"],
                "fe_ini"=> $value["fe_ini"],
                "fe_fin"=> $value["fe_fin"],
                "estadoct"=> Functions::labelState($value["estadoct"]),
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    public function getGridHistorial(){
        $rows = array();
        $data =  self::$GenerarContratoModel->getGridHistorial();
        foreach ($data as $value) {
            $rows[] = array(
                "id_contrato"=>AesCtr::en($value["id_contrato"]),
                "fecha_inicio"=> $value["fecha_inicio"],
                "fecha_fin"=> $value["fecha_fin"],
                "contrato"=> $value["contrato"],
                "total"=> $value["total"]
            );
        }
        echo json_encode($rows);
    }
    
    /*carga formulario (formNewGenerarContrato.phtml) para nuevo registro: GenerarContrato*/
    public function formNewGenerarContrato(){
        Obj::run()->View->render();
    }
    
    public function formHistorial(){
        Obj::run()->View->render();
    }
    
    /*envia datos para grabar registro: GenerarContrato*/
    public function generarContrato(){
        $chkb = SimpleForm::getParam(GNCTR.'gridSinContrato_chk');
        $fini = SimpleForm::getParam(GNCTR.'txt_fechacontratoini');
        $ffin = SimpleForm::getParam(GNCTR.'txt_fechacontratofin');
        
        $cadena = '';
        foreach ($chkb as $key => $chk) {
            $cadena .= AesCtr::de($chk).'*'.Functions::dateFormat($fini[$key],'Y-m-d').'*'.Functions::dateFormat($ffin[$key],'Y-m-d').'#';
        }
        
        $data = self::$GenerarContratoModel->mantenimientoGenerarContrato($cadena,  count($chkb));
        
        echo json_encode($data);
    }
    
    private function getHtmlContrato($data){
        $contrato = $data['contenido'];
        
        $html = str_replace('{{LOGO}}','<img src="'.ROOT.'public'.DS.'img'.DS.'logo.png" />', $contrato);
        $html = str_replace('{{NUM_DOC_TRABAJADOR}}','<b>'.$data['numerodocumento'].'</b>', $html);
        $html = str_replace('{{NAME_TRABAJADOR}}','<b>'.$data['nombrecompleto'].'</b>', $html);
        $html = str_replace('{{DOMICILIO_TRABAJADOR}}','<b>'.$data['direccion'].'</b>', $html);
        $html = str_replace('{{DISTRITO}}','<b>'.$data['distrito'].'</b>', $html);
        $html = str_replace('{{CARGO}}','<b>'.$data['cargo'].'</b>', $html);
        $html = str_replace('{{AREA}}','<b>'.$data['aarea'].'</b>', $html);
        $html = str_replace('{{FECHA_INICIO}}','<b>'.$data['fe_ini'].'</b>', $html);
        $html = str_replace('{{FECHA_FIN}}','<b>'.$data['fe_fin'].'</b>', $html);
        $html = str_replace('{{REMUNERACION}}','7777777', $html);
        $html = str_replace('{{FECHA}}',date('d-m-Y'), $html);
        
        return $html;
    }
    
    public function getContratoPDF(){
        $data = self::$GenerarContratoModel->findContrato();
         
        $c = 'contrato_'.  str_replace(' ','_', $data['numerodocumento']).'.pdf';
        
        $ar = ROOT.'public'.DS.'files'.DS.$c;
               
        $mpdf = new mPDF('c');     
        
//        $mpdf->SetHTMLHeader('<img src="'.ROOT.'public'.DS.'img'.DS.'logo.png" />','',TRUE);

        $mpdf->SetHTMLFooter('<table width="100%" style="vertical-align: bottom; font-family: serif; font-size: 8pt; color: #000000; font-weight: bold;"><tr>
                                <td width="33%"><span style="font-weight: bold;">{DATE j/m/Y}</span></td>
                                <td width="33%" align="center" style="font-weight: bold;">{PAGENO}/{nbpg}</td>
                                <td width="33%" style="text-align: right; ">'.LB_EMPRESA.'</td>
                             </tr></table>');
                
        $html = $this->getHtmlContrato($data);         

        $mpdf->WriteHTML(html_entity_decode($html));
        $mpdf->Output($ar,'F');
        
        $datar = array('result'=>1,'archivo'=>$c,'contrato'=>$data['id_tipocontrato']);
        echo json_encode($datar);
    }
    
    /*envia datos para eliminar registro: GenerarContrato*/
    public function postDeleteContrato(){
        $data = self::$GenerarContratoModel->mantenimientoGenerarContrato();
        
        echo json_encode($data);
    }
    
    public function deleteArchivo(){
        $c = SimpleForm::getParam('_archivo');
        
        $filename = ROOT.'public'.DS.'files'.DS.$c;
        unlink($filename);
        echo $filename;
    }
    
}
