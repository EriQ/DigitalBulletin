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
});
$(document).ready(function() {
	$.ajax({
	  dataType: "json",
	  url: "http://erichigdon.com/DigitalBulletin/php/data.php",
	  success: function(content) {
		//Loop through pages
		$.each(content, function() {
			//loop through page content
			$.each(this.content, function() {
				var that = this;
				if(this.repeating)
				{
					$.each(this.repeatdata, function() {
						var template = $('[templatefield="'+that.templateField+'"] template').html();
						$.each(this, function() {
							var pattern = new RegExp("{"+this.id+"}", 'g');
							template = template.replace(pattern, this.data);
						});
						var inputPattern = new RegExp("{input}", 'g');
						template = template.replace(inputPattern, "<input type='text'></input>");
						var emptyPattern = new RegExp("{(.*?)}", 'g');
						template = template.replace(emptyPattern, "");
						$('[templatefield="'+that.templateField+'"]').append(template);
					});
				}
				else
				{
					$("[templatefield='"+this.templateField+"']").html(this.content);
				}
			});
		});
		
	  }
	});
});