var EstructuraOrganicaScript_ = function(){
    
    var _public = {};
    
    _public.getCursorTemplate = function () {
        var result = new primitives.orgdiagram.TemplateConfig();
        result.name = "CursorTemplate";

        result.itemSize = new primitives.common.Size(120, 100);
        result.minimizedItemSize = new primitives.common.Size(3, 3);
        result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);
        result.cursorPadding = new primitives.common.Thickness(3, 3, 50, 8);

        var cursorTemplate = $("<div></div>")
        .css({
            position: "absolute",
            overflow: "hidden",
            width: (result.itemSize.width + result.cursorPadding.left + result.cursorPadding.right) + "px",
            height: (result.itemSize.height + result.cursorPadding.top + result.cursorPadding.bottom) + "px"
        });

        var cursorBorder = $("<div></div>")
        .css({
            width: (result.itemSize.width + result.cursorPadding.left + 1) + "px",
            height: (result.itemSize.height + result.cursorPadding.top + 1) + "px"
        }).addClass("bp-item bp-corner-all bp-cursor-frame");
        cursorTemplate.append(cursorBorder);

        var bootStrapVerticalButtonsGroup = $("<div></div>")
        .css({
            position: "absolute",
            overflow: "hidden",
            top: result.cursorPadding.top + "px",
            left: (result.itemSize.width + result.cursorPadding.left + 10) + "px",
            width: "35px",
            height: (result.itemSize.height + 1) + "px"
        }).addClass("btn-group btn-group-vertical");

        bootStrapVerticalButtonsGroup.append('<button class="btn btn-small" data-buttonname="new" type="button"><i class="fa fa-plus"></i></button>');
        bootStrapVerticalButtonsGroup.append('<button class="btn btn-small" data-buttonname="edit" type="button"><i class="fa fa-pencil-square-o"></i></button>');
        bootStrapVerticalButtonsGroup.append('<button class="btn btn-small" data-buttonname="remove" type="button"><i class="fa fa-trash-o"></i></button>');

        cursorTemplate.append(bootStrapVerticalButtonsGroup);

        result.cursorTemplate = cursorTemplate.wrap('<div>').parent().html();

        return result;
    };
    
    _public.onMouseClick = function (event, data) {
        var target = $(event.originalEvent.target);
        if (target.hasClass("btn") || target.parent(".btn").length > 0) {
            var button = target.hasClass("btn") ? target : target.parent(".btn");
            var buttonname = button.data("buttonname");

//            var message = "User clicked '" + buttonname + "' button for item '" + data.context.title + "'.";
//            message += (data.parentItem != null ? " Parent item '" + data.parentItem.title + "'" : "");
            
            switch(buttonname){
                case 'new':
                    EstructuraOrganica.getFormNewEstructuraOrganica(data.context);
                    break;
                case 'edit':
                    EstructuraOrganica.getFormEditEstructuraOrganica(data.context);
                    break;
                case 'remove':
                    EstructuraOrganica.postDeleteEstructuraOrganica(data.context);
                    break;
            }

            data.cancel = true;
        }
    };
    
    _public.setOrganigrama = function(data){
        var options = new primitives.orgdiagram.Config();
            options.hasSelectorCheckbox = primitives.common.Enabled.False;
            options.hasButtons = primitives.common.Enabled.False;
            options.onMouseClick = _public.onMouseClick;
            options.templates = [_public.getCursorTemplate()];
            options.defaultTemplateName = "CursorTemplate";
            options.itemTitleFirstFontColor = "#ffffff";
            
        var items = '[';
        for(var i in data){
            items += 'new primitives.orgdiagram.ItemConfig({\n\
                        id: '+data[i].id_area+',\n\
                        parent: '+data[i].dependencia+',\n\
                        title: "'+data[i].area+'",\n\
                        description: "",\n\
                        itemTitleColor: "#333333",\n\
                        key: "'+data[i].id_area+'"\n\
                    }),';
        }
        items = items.substring(0, items.length-1);
        items += '];';
        
        /*si no hay data items es vacio*/
        if(data.length === 0){
            items = '[];';
        }
        options.items = eval(items);

        $("#"+tabs.ESOG+"basicdiagram").orgDiagram(options);
        _public.resetOrganigrama(data.length);
    };
    
    _public.resetOrganigrama = function(n){
        $("#"+tabs.ESOG+"basicdiagram").orgDiagram("update");
        setTimeout(function(){
            $("#"+tabs.ESOG+"basicdiagram").orgDiagram({ cursorItem: 0 });
        },400);
        
        if(n === 0){
            $("#"+tabs.ESOG+"basicdiagram").find('div').find('.orgdiagram').html('');
        }
    };
    
    return _public; 
};
var EstructuraOrganicaScript = new EstructuraOrganicaScript_();