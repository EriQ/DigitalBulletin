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
				$("#"+$(that).attr("data-title")).append("<h2>"+$(this).attr("templatefield")+"</h2><div class='entryField' id='repeating"+$(this).attr("templatefield")+"'><div class='repeatFields'><a class='removeRow' onclick='removeRow(this);'>Remove Item</a></div><a class='addRow'>Add Item</a></div>");
				var templatePattern = new RegExp("{(.*?)}", 'g'),
					allItems = $(this).html().match(templatePattern),
					foundItems = "";
				$.each(allItems, function(templateFieldCount) {
					if(!foundItems.match(new RegExp(this.toString(), 'i')))
					{
							$("<label>"+this.replace(/{/g, "").replace(/}/g, "")+"<input type='text' id='"+templateFieldCount+"'/></label>").insertBefore($("#repeating"+$(theOther).attr("templatefield")+" .repeatFields .removeRow"));
						if(this.toString() == "{date}")
						{
							//$("#repeating"+$(theOther).attr("templatefield")+" #"+templateFieldCount+" ").datepicker();
						}
					}
					foundItems += this+" ";
					
				});
				
			}
			else
			{
				$("#"+$(that).attr("data-title")).append("<div class='entryField'><label>"+$(this).attr("templatefield")+"<input type='text' id='"+$(this).attr("templatefield")+"' name='"+$(this).attr("templatefield")+"'/></label></div>");
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
	var json = '{"name": "'+$("#bulletinTitle").val()+'", "pages": {',
		allPages = $(".page");
	allPages.each(function(pageIndex) {
		json += '"'+$(this).attr('id')+'":{';
		json += '}';
	});
	json += '}}';
	console.log(json);
}