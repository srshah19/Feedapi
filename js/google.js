/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

  google.load("feeds", "1");
    // Our callback function, for when a feed is loaded.
    function feedLoaded(result) {
        if (!result.error) {
            for (var i = 0; i < result.feed.entries.length; i++) {
                var entry = result.feed.entries[i];
                var link = '<a target=_blank; href="' + entry.link + '">' + 'View on Ted.com' + '</a>';
                var image = result.feed.entries[i].mediaGroups[0].contents[0].thumbnails[0].url;
                $(".inner").append('<div class="innerdetail viewmore" data-num="'+ i +'"> <img class="thumbnail" title="Click to view more" src="'+ image +'"/> <p class="title">'+ entry.title +' </p> <p class="snippet">' + entry.contentSnippet + '</p>'+ link + ' </div>');
            }
    
    //On click of the thumbnail(Image), we will display more data with more metadata. 
    $(".thumbnail").click(function() {
        
        //Removing all arrows before initializing
        $(".arrow-up").remove();
        var parentClass = $(this).parent();
        
        //Checking to see if the parent class already is expanded or not
        if ($(parentClass).hasClass( "expandedMain" ) ) {
                $("div").removeClass("expandedMain");
                $(".expandedView").remove();
                $(".arrow-up").remove();
            }
            else{
                $(".arrow-up").show();
                $("div").removeClass("expandedMain");
                $(this).parent().addClass("expandedMain");
                var plant = $(this).parent();
                var DataCount = plant[0].dataset.num;
                var entry = result.feed.entries[DataCount];
                
                //Appending the cideo in a variable for use later
                var video = '<video class="video" width="480" height="320" controls> <source src="'+ entry.mediaGroups[0].contents[0].url +'" type="video/mp4"></video>';
                $(plant).append('<div class="arrow-up"></div> <div class="expandedView" data-category="'+ entry.categories[0] +'"><p class="title">'+ entry.title +' </p>' + video + '<p class="publishedDate">Published Date:'+ entry.publishedDate +' <p> <p class="fullcontent">' + entry.content + '</p></div>');
                $(".expandedView").show(1000);
            }
           });
        }
    }

//On Load event
    function OnLoad() {
        var feed = new google.feeds.Feed("http://feeds.feedburner.com/tedtalks_video");
        feed.includeHistoricalEntries(); // tell the API we want to have old entries too
        feed.setNumEntries(250); // we want a maximum of 250 entries, if they exist

        // Calling load sends the request off.  It requires a callback function.
        feed.load(feedLoaded);
    }

    google.setOnLoadCallback(OnLoad);


