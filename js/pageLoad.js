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
		
		//get welcome content
		$.each(content.welcome.content, function() {
			$("[templatefield='"+this.templateField+"']").html(this.content);
		});
		//get event content
		$.each(content.events.content, function() {
			var that = this;
			if(this.repeating)
			{
				$.each(this.repeatdata, function() {
					var template = $('[templatefield="'+that.templateField+'"] template').html();
					var announcement = template.replace(/{date}/g, this.date).replace(/{title}/g, this.title).replace(/{contact}/g, this.contact).replace(/{email}/g, this.email).replace(/{content}/g, this.content);
					$('[templatefield="'+that.templateField+'"]').append(announcement);
				});
			}
			else
			{
				$("[templatefield='"+this.templateField+"']").html(this.content);
			}
			
		});
		/*//get service content
		$.each(content.service.content, function() {
			if(this.divider)
				var serviceItem = '<li data-role="list-divider">'+this.title+'</li>';
			else
			{
				var serviceItem = '<li>';
				if(this.title)
					serviceItem += '<span class="title">'+this.title+'</span>';
				if(this.song)
					serviceItem += '<span class="song">'+this.song+'</span>';
				if(this.performer)
					serviceItem += '<span class="performer">'+this.performer+'</span>';
				serviceItem += '</li>'
			}
			$(content.service.container).append(serviceItem);
		});
		//get message content
		$(content.message.container).prepend('<h2>'+content.message.title+'</h2>');
		$.each(content.message.notes, function() {
			var note = '<div data-role="collapsible" data-collapsed-icon="carat-d" data-expanded-icon="carat-u"><h3>'+this.title+'</h3><p>'+this.content+'</p></div>';
			$(content.message.notesContainer).append(note);
		});*/
	  }
	});
});