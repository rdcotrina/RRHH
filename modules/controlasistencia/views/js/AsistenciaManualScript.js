var AsistenciaManualScript_ = function(){
  
    var _public = {};
    
    _public.verificaSeleccionTrabajador = function(n){
        var nom=false;
        if(n==0){
           nom=false;
        }else{
           nom=true;
        }            
        return nom;
    };
    
    _public.validaHorasIngreso = function(ingresoM,salidaM,ingresoT,salidaT){
        var resultado=1; 
        var arHoraIngresoM = ingresoM.split(":"); 
        var arHoraSalidaM = salidaM.split(":"); 
        var arHoraIngresoT = ingresoT.split(":"); 
        var arHoraSalidaT = salidaT.split(":");
        
        // Obtener horas y minutos de ingreso de la maniana
        var hhingresom = parseInt(arHoraIngresoM[0],10); 
        var mmingresom = parseInt(arHoraIngresoM[1],10); 
        
        // Obtener horas y minutos de ingreso de la tarde
        var hhingresot = parseInt(arHoraIngresoT[0],10); 
        var mmingresot = parseInt(arHoraIngresoT[1],10); 
        
        // Obtener horas y minutos de salida de la maniana
        var hhsalidadm = parseInt(arHoraSalidaM[0],10); 
        var mmsalidadm = parseInt(arHoraSalidaM[1],10);
        
        // Obtener horas y minutos de salida de la tarde
        var hhsalidadt = parseInt(arHoraSalidaT[0],10); 
        var mmsalidadt = parseInt(arHoraSalidaT[1],10);
        
        if(hhingresom>hhsalidadm){
            resultado=2; //hora de ingreso de la maniana es mayor hora salida
        }else if((hhingresom==hhsalidadm) && (mmingresom>mmsalidadm)){
            resultado=3; //hora de ingreso de la maniana es mayor hora salida
        }
        
        if(hhingresot>hhsalidadt){
            resultado=4; //hora de ingreso de la tarde es mayor hora salida
        }else if((hhingresot==hhsalidadt) && (mmingresot>mmsalidadt)){
            resultado=5; //hora de ingreso de la tarde es mayor hora salida
        }
        
        if(hhsalidadm>hhingresot){
            resultado = 6; //hora de ingreso de la tarde es menor a hora salida de la tarde
        }else if((hhsalidadm==hhingresot) && (mmsalidadm>mmingresot)){
            resultado = 7; //hora de ingreso de la tarde es menor a hora salida de la tarde
        }
        
        return resultado;
    }; 
    
    return _public; 
};

var AsistenciaManualScript = new AsistenciaManualScript_();