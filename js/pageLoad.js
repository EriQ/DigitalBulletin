$( document ).on( "pagecreate", ".homePage", function() {
	$( document ).on( "swipeleft", ".ui-page", function( event ) {
		var next = $( this ).next().attr("id");
		$.mobile.changePage( "#"+next, { transition: "slide", changeHash: true });
	});
	$( document ).on( "swiperight", ".ui-page", function( event ) {
		var next = $( this ).prev().attr("id");
		$.mobile.changePage( "#"+next, { transition: "slide", reverse: true, changeHash: true });
	});
	
});
$(function() {
    $( "[data-role='navbar']" ).navbar();
    $( "[data-role='header'], [data-role='footer']" ).toolbar();
});
// Update the contents of the toolbars
$( document ).on( "pagecontainerchange", function() {
    // Each of the four pages in this demo has a data-title attribute
    // which value is equal to the text of the nav button
    // For example, on first page: <div data-role="page" data-title="Info">
    var current = $( ".ui-page-active" ).jqmData( "title" );
    // Change the heading
    $( "[data-role='header'] h1" ).text( current );
    // Remove active class from nav buttons
    $( "[data-role='navbar'] a.ui-btn-active" ).removeClass( "ui-btn-active" );
    // Add active class to current nav button
    $( "[data-role='navbar'] a" ).each(function() {
        if ( $( this ).text() === current )
		{
            $( this ).addClass( "ui-btn-active" );
        }
    });
	$(".loading").fadeOut(500);
});
function loadContent(bulletinName) {
	var table = "bulletin"+bulletinName,
		db = window.openDatabase("DigitalBulletin", "1.0", "Digital Bulletins", 200000),
		storage = window.localStorage;
	function loadData(content) {
		bulletinName = content.name;
		//Loop through pages
		$.each(content.pages, function() {
			//loop through page content
			$.each(this.content, function() {
				var that = this;
				if(this.repeating)
				{
					$.each(this.repeatdata, function(index) {
						var template = $('[templatefield="'+that.templateField+'"] template').html();
						$.each(this, function() {
							var pattern = new RegExp("{"+this.id+"}", 'g');
							template = template.replace(pattern, this.data);
						});
						if(that.saving)
						{
							var inputPattern = new RegExp("{input}", 'g');
							template = template.replace(inputPattern, "<input type='text'/>");
						}
						var emptyPattern = new RegExp("{(.*?)}", 'g');
						template = template.replace(emptyPattern, "");
						$('[templatefield="'+that.templateField+'"]').append(template);
					});
				}
				if(this.saving)
				{
					$('[templatefield="'+this.templateField+'"]').append("<input id='save' type='submit' value='Save'/>");
					
				}
				else
				{
					$("[templatefield='"+this.templateField+"']").html(this.content);
				}
			});
		});
	  	$("body").trigger('create');
		$.mobile.changePage( "#home", {changeHash: true });
		
	
		//Load functions
		function loadDB(tx) {
			tx.executeSql('SELECT * FROM '+table, [], loadSuccess, errorloadingCB);
		}
		
		function loadSuccess(tx, results) {
			var len = results.rows.length;
			for (var i=0; i<len; i++)
			{
				$("input[type='text']:eq("+results.rows.item(i).id+")").val(results.rows.item(i).data);
			}
		}
		
		function errorloadingCB(err) {
			console.log("Error processing SQL: "+err.message);
		}
		
		db.transaction(loadDB, errorloadingCB);
		
		//Save functions
		function populateDB(tx) {
			tx.executeSql('DROP TABLE IF EXISTS '+table);
			 tx.executeSql('CREATE TABLE IF NOT EXISTS '+table+' (id unique, data)');
			 $("input[type='text']").each(function(index) {
				tx.executeSql("INSERT INTO "+table+" (id, data) VALUES ('"+index+"', '"+this.value+"')");
			 });
		}
		
		function errorpopulatingCB(err) {
			console.log("Error processing SQL: "+err.message);
		}
		
		function successpopulatingCB() {
			console.log("Data Saved");
		}
		
		$("#save").click(function() {
			db.transaction(populateDB, errorpopulatingCB, successpopulatingCB);
		});
		
	}
	
	if(storage.getItem(table))
	{
		var loadedContent = JSON.parse(storage.getItem(table));
		loadData(loadedContent);
	}
	else
	{
		$.ajax({
		  dataType: "json",
		  url: "http://erichigdon.com/DigitalBulletin/php/data.php?id="+bulletinName,
		  success: function(content) {
			loadData(content);
			//storage.setItem(table, JSON.stringify(content));
		  }
		});
	}
}
function fail(error) { console.log(error.code); }
function downloadFile(templateName){

window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
    function onFileSystemSuccess(fileSystem) {
        fileSystem.root.getFile(
        "dummy.html", {create: true, exclusive: false}, 
        function gotFileEntry(fileEntry) {
            var sPath = fileEntry.fullPath.replace("dummy.html","");
            var fileTransfer = new FileTransfer();
            fileEntry.remove();

            fileTransfer.download(
                "http://erichigdon.com/templates/"+templateName,
                sPath + templateName,
                function(theFile) {
                    console.log("download complete: " + theFile.toURI());
                    showLink(theFile.toURI());
                },
                function(error) {
                    console.log("download error source " + error.source);
                    console.log("download error target " + error.target);
                    console.log("upload error code: " + error.code);
                }
            );
        }, fail);
    }, fail);
}
function changeContent(bulletinNum, data) {
	var bulletin = data.bulletins[bulletinNum-1];
	$("body").load('templates/'+bulletin.template+'/template.html', function (responseText, textStatus, e) {
		if(e.status == "404")
		{
			downloadFile(bulletin.template);
		}
		else
		{
			loadContent(bulletin.ID);
			$("#selectionPanel").append("<ul>");
			$.each(data.bulletins, function() {
				$("#selectionPanel").append("<li class='bulletinLink' id='"+this.ID+"'>"+this.name+"</li>");
			});
			$("#selectionPanel").append("</ul>");
			$(".bulletinLink").click(function() {
				if($(this).attr("id") != bulletinNum)
				{
					$(".loading").fadeIn(0);
					changeContent($(this).attr("id"), data);
				}
				$("#selectionPanel").panel("close");
			});
		}
		
	});
}
$.ajax({
  dataType: "json",
  url: "http://erichigdon.com/DigitalBulletin/php/allBulletins.php?id=1",
  success: function(data) {
	changeContent(data.count, data);
  }
});
