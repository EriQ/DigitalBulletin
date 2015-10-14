<?php
header('Access-Control-Allow-Origin: *');
$data = '[{
    "welcome": [
        {
            "container": ".welcomeHeader",
            "content": "Welcome to Olive!"
        },
        {
            "container": ".welcomeParagraph",
            "content": "Hurricane Ivan changed Pensacola, changed Olive, and changed me. It was after that storm that our ministry in the community rose to a new level. The Ministry Village at Olive was born. Our engagement with Northwest Florida in compassion ministry has always been a part of our church. But that heartbeat simply became stronger after the storm."
        }
    ],
    "events": {
        "container": "#events .ui-content",
        "repeating": "true",
        "content": [
            {
                "date": "10/14",
                "title": "Identify &amp; Use Your Spiritual Gifts",
                "contact": "Huey Pearson",
                "email": "hpearson@olivebaptist.org",
                "content": "In Christianity, spiritual gifts are endowments which may be given by the Holy Spirit. Join us to find yours! Class begins Wednesday, October 14 at 6pm in Room 5107."
            },
            {
                "date": "10/25",
                "title": "Discovering Olive",
                "contact": "Beth Harris",
                "email": "bharris@olivebaptist.org",
                "content": "Have you Recently Joined Olive? A prospective member? Then join us Sunday, October 25 at 5:30pm in the Passmore Hall. You&#8211;ll enjoy a delicious meal and hear Pastor&#8211;s vision for our church. Reserve your spot by contacting Beth Harris."
            }
        ]
    },
	"service": {
        "container": "#service ul.service",
        "content": [
            {
                "divider": true,
                "title": "Sunday Morning"
            },
            {
                "title": "Prelude",
                "song": "Everlasting God",
                "performer": "Orchestra"
            },
            {
                "title": "Call to Worship",
                "song": "I Sing the Mighty Power of God</br>A Mighty Fortress Is Our God"
            },
            {
                "title": "Welcome",
                "performer": "Pastor"
            },
            {
                "title": "Praise &amp; Worship",
                "song": "Hosanna (Praise Is Rising)</br>Cornerstone"
            },
            {
                "title": "Offeratory Prayer",
                "performer": "Pastor"
            },
            {
                "title": "Offeratory Praise",
				"song": "God of This City",
                "performer": "Choir &amp; Orchestra</br>Jenny Thompson, solo"
            },
            {
                "title": "Message",
                "performer": "Pastor"
            },
            {
                "title": "Hymn of Invitation"
            }
        ]
    },
	"message": {
        "container": "#message .ui-content",
		"title": "I Love My Community",
		"notesContainer": "#message .messageNotes",
        "notes": [
            {
                "title": "The City of Nazareth (v.16)",
				"content": "Boyhood home of Jesus"
            },
            {
                "title": "The City of Capernaum (v.31)",
                "content": "Base of Operations for Jesus"
            },
            {
                "title": "The City of Pensacola",
                "content": "<ol><li>Our Message in the City</li><li>Our Ministry in the City</li><li>Our Methods in the City<ol><li>Spiritual Battles in the __________</li><li>Spiritual Battles in the __________</li><li>Spiritual Battles in the __________</li><li>Spiritual Battles in the __________</li></ol></li></ol>"
            }
        ]
    }
	
}]';
$employees = json_decode($data, true);
			
echo json_encode($employees);
?>