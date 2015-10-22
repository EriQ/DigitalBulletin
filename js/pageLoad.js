function readTemplate() {
	var allPages = $("#TemplateContent div[data-role='page']");
		allPages.each(function() {
		//Each page
		var allFields = $("#TemplateContent #"+$(this).attr("id")+" [templatefield]"),
			that = this;

		$("#entryContent").append("<h1>"+$(this).attr("data-title")+"</h1><div class='page' id='"+$(this).attr("data-title")+"'></div>");
		
		allFields.each(function(sectionIndex) {
			//Each templatefield
			var theOther = this;
			//if it is a repeater
			if($(this).attr("templatefield").match(/Repeater/))
			{
				$("#"+$(that).attr("data-title")).append("<h2>"+$(this).attr("templatefield")+"</h2><div class='entryField repeaterField' id='"+$(this).attr("templatefield")+"'><div class='repeatFields'><a class='removeRow' onclick='removeRow(this);'>Remove Item</a></div><a class='addRow'>Add Item</a></div>");
				var templatePattern = new RegExp("{(.*?)}", 'g'),
					allItems = $(this).html().match(templatePattern),
					foundItems = "";
				$.each(allItems, function(templateFieldCount) {
					if(!foundItems.match(new RegExp(this.toString(), 'i')))
					{
							$("<label>"+this.replace(/{/g, "").replace(/}/g, "")+"<input type='text' data-id='"+this.replace(/{/g, "").replace(/}/g, "")+"'/></label>").insertBefore($("#"+$(theOther).attr("templatefield")+" .repeatFields .removeRow"));
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
				$("#"+$(that).attr("data-title")).append("<div class='entryField' id='"+$(this).attr("templatefield")+"'><label>"+$(this).attr("templatefield")+"<input type='text' /></label></div>");
			}
			
		});
		
	});
	$("body").append("<input id='createBulletin' type='button' value='Create Bulletin'/>");
	$("#createBulletin").click(function() {
		saveBulletin();
	});
	$(".addRow").click(function() {
		$(this).siblings(".repeatFields:eq(0)").clone().insertBefore($(this));
	});
	$("#TemplateContent").empty();
}
function removeRow(element) {
	$(element).parent().remove();
}
function loadTemplate(templateName) {
	$("#TemplateContent").load('templates/'+templateName+'.html', function() {
		readTemplate();
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
			json += '"templatefield":"'+$(this).attr("id")+'",';
			if($(this).hasClass("repeaterField"))
			{
				json += '"repeating": true, "repeatdata":{';
				var repeatingFields = $("#"+$(this).attr("id")+" .repeatFields"),
					that = this;
				repeatingFields.each(function(repeatIndex) {
					var repeatInput = $("#"+$(that).attr("id")+" .repeatFields:eq("+repeatIndex+") input");
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
				json += '"content":"'+$("#"+$(this).attr("id")+" input").val()+'"';
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
			content:json
		},
		success: function(data) {
			alert(data);
		}
	});
	
}