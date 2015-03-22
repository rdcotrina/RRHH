/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 22-03-2015 01:03:50 
* Descripcion : EstructuraOrganica.js
* ---------------------------------------
*/
var EstructuraOrganica_ = function(){
    
    /*cargar requires*/
    simpleObject.require({
        maestros: "EstructuraOrganicaScript"
    });
    
    /*metodos privados*/
    var _private = {};
    
    _private.idEstructuraOrganica = 0;
    
    _private.config = {
        modulo: "maestros/EstructuraOrganica/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : EstructuraOrganica*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.ESOG,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                EstructuraOrganica.getIndex();
            }
        });
    };
    
    /*index del tab: EstructuraOrganica*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.ESOG+"_CONTAINER").html(data);
                EstructuraOrganica.getOrganigrama();
            }
        });
    };
    
    _public.getFormNewEstructuraOrganica = function(data){
        _private.idEstructuraOrganica = data.key;
         
        simpleAjax.send({
            gifProcess: true,
            dataType: "html",
            root: _private.config.modulo + "formNewEstructuraOrganica",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.ESOG+"formNewEstructuraOrganica").modal("show");
            }
        });
    };
    
    _public.getFormEditEstructuraOrganica = function(data){
        _private.idEstructuraOrganica = data.key;
            
        simpleAjax.send({
            gifProcess: true,
            dataType: "html",
            root: _private.config.modulo + "formEditEstructuraOrganica",
            fnServerParams: function(sData){
                sData.push({name: "_idEstructuraOrganica", value: _private.idEstructuraOrganica});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.ESOG+"formEditEstructuraOrganica").modal("show");
            }
        });
    };
    
    _public.getOrganigrama = function(){
        simpleAjax.send({
            root: _private.config.modulo + "getOrganigrama",
            fnCallback: function(data){
                EstructuraOrganicaScript.setOrganigrama(data);
            }
        });
    };
    
    _public.postNewEstructuraOrganica = function(flag,form){
        simpleAjax.send({
            flag: flag,
            gifProcess: true,
            root: _private.config.modulo + "newEstructuraOrganica",
            form: "#"+tabs.ESOG+form,
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idEstructuraOrganica", value: _private.idEstructuraOrganica});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            EstructuraOrganica.getOrganigrama();
                            _private.idEstructuraOrganica = 0;
                            if (parseInt(flag) === 2){
                                simpleScript.closeModal("#"+tabs.ESOG+"formNewEstructuraOrganica");
                            }
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.EstructuraOrganica.EXIST 
                    });
                }
            }
        });
    };
    
    _public.postEditEstructuraOrganica = function(){
        simpleAjax.send({
            flag: 3,
            element: "#"+tabs.ESOG+"btnEdEstructuraOrganica",
            root: _private.config.modulo + "editEstructuraOrganica",
            form: "#"+tabs.ESOG+"formEditEstructuraOrganica",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idEstructuraOrganica", value: _private.idEstructuraOrganica});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idEstructuraOrganica = 0;
                            simpleScript.closeModal("#"+tabs.ESOG+"formEditEstructuraOrganica");
                            EstructuraOrganica.getOrganigrama();
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.EstructuraOrganica.EXIST 
                    });
                }
            }
        });
    };
    
    _public.postDeleteEstructuraOrganica = function(data){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 4,
                    gifProcess: true,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteEstructuraOrganica",
                    fnServerParams: function(sData){
                        sData.push({name: "_idEstructuraOrganica", value: data.key});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    EstructuraOrganica.getOrganigrama();
                                }
                            });
                        }
                    }
                });
            }
        });
    };
    
    return _public;
    
};
var EstructuraOrganica = new EstructuraOrganica_();

EstructuraOrganica.main(); 