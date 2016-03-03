function readTemplate() {
	var allPages = $("#TemplateContent div[data-role='page']");
		allPages.each(function() {
		//Each page
		var allFields = $("#TemplateContent #"+$(this).attr("id")+" [templatefield]"),
			that = this;

		$("#entryContent").append("<h2>"+$(this).attr("data-title")+"</h2><div class='page' id='"+$(this).attr("data-title")+"'></div>");
		
		allFields.each(function(sectionIndex) {
			//Each templatefield
			var theOther = this;
			//if it is a repeater
			if($(this).attr("templatefield").match(/Repeater/))
			{
				$("#"+$(that).attr("data-title")).append("<h2>"+$(this).attr("templatefield")+"</h2><div class='entryField repeaterField' id='"+$(this).attr("templatefield")+"' data-id='"+$(this).attr("templatefield")+"'><div class='repeatFields'><a class='removeRow' onclick='removeRow(this);'>Remove Item</a></div><a class='addRow'>Add Item</a></div>");
				var templatePattern = new RegExp("{(.*?)}", 'g'),
					allItems = $(this).html().match(templatePattern),
					foundItems = "";
				$.each(allItems, function(templateFieldCount) {
					if(!foundItems.match(new RegExp(this.toString(), 'i')))
					{
                        if(this.toString() == "{content}")
                        {
                            $("<div class='formRow entryField' data-id='"+this.replace(/{/g, "").replace(/}/g, "")+"'><textarea id='"+$(theOther).attr("templatefield")+this.replace(/{/g, "").replace(/}/g, "")+"'' data-id='"+this.replace(/{/g, "").replace(/}/g, "")+"' class='input' required ></textarea><label for='"+$(theOther).attr("templatefield")+this.replace(/{/g, "").replace(/}/g, "")+"'>"+this.replace(/{/g, "").replace(/}/g, "")+"</label></div>").insertBefore($("#"+$(theOther).attr("templatefield")+" .repeatFields .removeRow"));
                        }
                        else{
				            $("<div class='formRow entryField' data-id='"+this.replace(/{/g, "").replace(/}/g, "")+"'><input type='text' id='"+$(theOther).attr("templatefield")+this.replace(/{/g, "").replace(/}/g, "")+"'' data-id='"+this.replace(/{/g, "").replace(/}/g, "")+"' required class='input' /><label for='"+$(theOther).attr("templatefield")+this.replace(/{/g, "").replace(/}/g, "")+"'>"+this.replace(/{/g, "").replace(/}/g, "")+"</label></div>").insertBefore($("#"+$(theOther).attr("templatefield")+" .repeatFields .removeRow"));
                        }
						if(this.toString() == "{date}")
						{
							//$("#"+$(theOther).attr("templatefield")+" #"+templateFieldCount+" ").datepicker();
						}
					}
					foundItems += this+" ";
					
				});
				
			}
			else
			{
				$("#"+$(that).attr("data-title")).append("<div class='formRow entryField' data-id='"+$(this).attr("templatefield")+"'> <input id='"+$(that).attr("data-title")+$(this).attr("templatefield")+"' class='input' type='text' required /><label for='"+$(that).attr("data-title")+$(this).attr("templatefield")+"'>"+$(this).attr("templatefield")+"</label></div>");
			}
			
		});
		
	});
	$("#entryContent").append("<input id='createBulletin' type='button' value='Create Bulletin'/>");
	$("#createBulletin").click(function() {
		saveBulletin();
	});
	$(".addRow").click(function() {
		$(this).siblings(".repeatFields:eq(0)").clone().insertBefore($(this)).find("input:text").val("");
        loadTextListeners();
	});
	$("#TemplateContent").empty();
}
function removeRow(element) {
	$(element).parent().remove();
}
function loadTextListeners() {
    $("input[type='text'], textarea").keyup(function() {
        if($(this).val() != "")
        {
            $(this).addClass("filled");
        }
        else
        {
            $(this).removeClass("filled");
        }
    });
}
function loadTemplate(templateURL) {
	$("#TemplateContent").load(templateURL, function() {
		readTemplate();
        loadTextListeners();
	});
	
}

function saveBulletin() {
	var json = '{',
		allPages = $(".page");
	allPages.each(function(pageIndex) {
		var pageFields = $("#"+$(this).attr("id")+" .entryField");
		json += '"'+$(this).attr('id')+'":{ "title":"'+$(this).attr('id')+'", "content":{';
		pageFields.each(function(fieldIndex) {
			json += '"'+fieldIndex+'": {';
			json += '"templateField":"'+$(this).attr("data-id")+'",';
			if($(this).hasClass("repeaterField"))
			{
				json += '"repeating": true, "repeatdata":{';
				var repeatingFields = $("#"+$(this).attr("id")+" .repeatFields"),
					that = this;
				repeatingFields.each(function(repeatIndex) {
					var repeatInput = $(that).find(".repeatFields:eq("+repeatIndex+")").find(".input");
					json += '"'+repeatIndex+'":{';
					repeatInput.each(function(inputIndex) {
						json += '"'+inputIndex+'":{';
						json += '"id":"'+$(this).attr("data-id")+'", "data":"'+$(this).val()+'"';
						json += '}';
						if(inputIndex != repeatInput.length -1)
						{
							json += ',';
						}
					});
					json += '}';
					if(repeatIndex != repeatingFields.length -1)
					{
						json += ',';
					}
				});
				json += '}';
			}
			else
			{
				json += '"content":"'+$(this).find(".input").val()+'"';
			}
			json += '}';
			if(fieldIndex != pageFields.length -1)
			{
				json += ',';
			}
		});
		json += '}}';
		if(pageIndex != allPages.length -1)
		{
			json += ',';
		}
	});
	json += '}';
	$.ajax({
		type: 'POST',
		url: 'http://erichigdon.com/DigitalBulletin/php/createBulletin.php',
		data: {
			name: $("#bulletinTitle").val(),
			content:json,
			template:$("#chooseTemplate").val(),
			organization: 1
		},
		success: function(data) {
			alert(data);
		}
	});
	
}