var key = 'AIzaSyBTs0W0F5gXsvee5EoavUCIefcUGeUqoVI';
var linkchannel = 'https://www.youtube.com/channel/';
var linkvideo = 'https://www.youtube.com/watch?v=';

var publicstring = '<span data-tooltip-text="Public" aria-label="Public" class="vm-video-privacy vm-public yt-uix-tooltip-reverse yt-uix-tooltip yt-sprite" aria-labelledby="yt-uix-tooltip6-arialabel" title="Public"></span>';
var unlistedstring = '<span aria-label="Không công khai" class="vm-video-privacy vm-unlisted yt-uix-tooltip-reverse yt-uix-tooltip yt-sprite" data-tooltip-text="Không công khai" aria-labelledby="yt-uix-tooltip5-arialabel" title="Không công khai"></span>';
var moneystring = '<span aria-label="Monetized" class="vm-video-monetized vm-video-monetization-icon yt-uix-tooltip-reverse yt-uix-tooltip yt-sprite" data-tooltip-text="Monetized" aria-labelledby="yt-uix-tooltip10-arialabel" title="Monetized"></span>';
var unmoneystring = '<span aria-label="Not monetized" class="vm-video-not-monetized vm-video-monetization-icon yt-uix-tooltip-reverse yt-uix-tooltip yt-sprite" data-tooltip-text="Not monetized" aria-labelledby="yt-uix-tooltip11-arialabel" title="Not monetized"></span>';

var isHD = '';
var isCC = '';
var titlebagestring = '';
var hdstring = '<span class="yt-badge ">HD</span>';
var captionstring = '<span class="yt-badge ">CC</span>';


var _action_count = 0;
var _cartoon_count = 0;
var _funny_count = 0;
var _died_count = 0;
localStorage.setItem("_action_count", 0);
localStorage.setItem("_cartoon_count", 0);
localStorage.setItem("_funny_count", 0);
localStorage.setItem("_died_count", 0);

$(document).ready(function(){


    var _data = {};
    var _length = 0;
    var _count = 0;
    var _alive = 0;
    var category = '';

    $.getJSON('data.json')
    .done(function(data){
        _data = data;
        _length = data.youtube.length;
        //console.log(_data.youtube);
        $('#creator-subheader-item-count').html(_length);

        if(_length>0)
        do_action();
    });
    
    var do_action = function(){
        if(_count >= _length) return false;

        var id = _data.youtube[_count].id;
        category = _data.youtube[_count].category;
        getVideoInfo(id);
        
    }

	var getVideoInfo = function(id){
        $.getJSON('https://www.googleapis.com/youtube/v3/videos?id='+id+'&key='+key+'&part=snippet,contentDetails,statistics,status')
		.done(function(data){

			console.log(data);

			if(data.items.length<=0) {
				_count++;
            	do_action();
				return false;
			}

			//console.log(data.items[0].statistics);
			var commentCount = data.items[0].statistics.commentCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			var dislikeCount = data.items[0].statistics.dislikeCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			var likeCount = data.items[0].statistics.likeCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			var viewCount = data.items[0].statistics.viewCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            //console.log(data.items[0].status);
            var privacyStatus = data.items[0].status.privacyStatus;
            if(privacyStatus=="public"){
                privacyStatus=publicstring;
            }
            else if(privacyStatus=="unlisted"){
            	privacyStatus=unlistedstring;
            }

			//console.log(data.items[0].snippet);
            var channelId = data.items[0].snippet.channelId;
			var channelTitle = data.items[0].snippet.channelTitle;
			var title = data.items[0].snippet.title;
			var description = data.items[0].snippet.description;
			var thumbnails = data.items[0].snippet.thumbnails.default.url;
            var publishedAt = data.items[0].snippet.publishedAt;
            var date = new Date(publishedAt);
            var publicdate = date.toLocaleString();//toUTCString();


            var duration = (data.items[0].contentDetails.duration).replace("PT","").replace("H",":").replace("M",":").replace("S","");
            var licensedContent = data.items[0].contentDetails.licensedContent;
            if(licensedContent==true){
                licensedContent=moneystring;
            }
            else if(licensedContent==false){
                licensedContent=unmoneystring;
            }

            var definition = data.items[0].contentDetails.definition;
            if(definition == "hd") {
                isHD = hdstring;
            }
            else if(definition != "hd") {
                isHD = '';
            }
            var caption = data.items[0].contentDetails.caption;
            if(caption==true){
                isCC=captionstring;
            }
            else if(caption==false){
                isCC='';
            }

            titlebagestring = '<span class="vm-video-title-badges">'+isHD+isCC+'</span>';
            

            $('#youtube').append(
                '<div class="media mix ' + category + '" id="'+id+'">'+
                  '<div class="media-left">'+
                    '<a href="'+linkvideo+id+'" target="_blank">'+
                      '<img class="media-object" src="'+thumbnails+'" alt="'+title+'">'+
                      '<span class="duration">'+duration+'</span>'+
                    '</a>'+
                  '</div>'+
                  '<div class="media-body">'+
                    '<h4 class="media-heading"><a href="'+linkvideo+id+'" target="_blank" title="'+title+'">'+title+'</a>'+titlebagestring+'</h4>'+
                    '<span class="vm-date-info">'+publicdate+'</span><br>'+
                    'Channel: <a href="'+linkchannel+channelId+'" target="_blank">'+channelTitle+'</a><br/>'+
                    '<div><a href="javascript:;" class="btn-delete" data-id="'+id+'"><i class="fa fa-trash"></i></a></div>'+
                  '</div>'+
                  '<div class="media-right">'+
                    '<div>'+
                        '<div class="info1">'+
                            '<div class="vm-video-indicators">'+privacyStatus+licensedContent+'</div>'+
                        '</div>'+
                        '<div class="info2">'+
                            '<div class="video-view-count">'+
                                '<span title="Views" class="vm-video-metric-icon yt-sprite"></span>'+
                                '<span class="vm-video-metric-value">'+viewCount+'</span>'+
                            '</div>'+
                            '<div style="overflow:hidden;">'+
                                '<div class="video-likes-count">'+
                                    '<span title="Likes" class="vm-video-metric-icon yt-sprite"></span>'+
                                    '<span class="vm-video-metric-value">'+likeCount+'</span>'+
                                '</div>'+
                                '<div class="video-dislikes-count">'+
                                    '<span title="Dislikes" class="vm-video-metric-icon yt-sprite"></span>'+
                                    '<span class="vm-video-metric-value">'+dislikeCount+'</span>'+
                                '</div>'+
                            '</div>'+
                            '<div class="vm-video-metric video-comments">'+
                                '<span title="All comments" class="vm-video-metric-icon yt-sprite"></span>'+
                                '<span class="vm-video-metric-value">'+commentCount+'</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'
            );

            $('#youtube .media#'+id).fadeIn(200);
            // _alive++;
            // $('#creator-subheader-item-count').html(_alive+'/'+_length);

            if(category == 'action') _action_count ++;
            if(category == 'cartoon') _cartoon_count ++;
            if(category == 'funny') _funny_count ++;

            $('#action-count').html(_action_count);
            $('#cartoon-count').html(_cartoon_count);
            $('#funny-count').html(_funny_count);

            _count++;
            do_action();
			
		});
//           .fail(function(){
//               console.log('error');
//           })
//           .always(function() {
		  //   console.log( "complete" );
		  // });
    }



    
});











$(document).ready(function(){
	$('#youtube').mixItUp();

    $(document).on('click','.btn-delete',function(){
        var videoid = $(this).data('id');
        var _confirm = confirm('Delete this video - Are you sure?');
        if(_confirm) del(videoid);
    });

    $("#addnew").submit(function(e){	
		e.preventDefault();
	    form = $('#addnew');
	    var form_data = form.serialize();
			
	   //console.log(form.serialize());
	    var request = $.ajax({
	        url: "save.php",
	        method: "POST",
			data: form_data,
	        //dataType: "json",
		    success: function(data){
				alert(data);

	            getVideoInfo2($('#videoid').val());
			},
	     });
	});
});

function del(id){
		var request = $.ajax({
           url: "del.php",
           method: "POST",
			data: {'id':id},
           //dataType: "json",
		   success: function(data){
				alert(data);
                $('#'+id).fadeOut(function(){$(this).remove();});
			},
         });
};


var category = '';
// get video info 2
var getVideoInfo2 = function(id){
    $.getJSON('https://www.googleapis.com/youtube/v3/videos?id='+id+'&key='+key+'&part=snippet,contentDetails,statistics,status')
    .done(function(data){

        //console.log(data.items[0].statistics);
        var commentCount = data.items[0].statistics.commentCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var dislikeCount = data.items[0].statistics.dislikeCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var likeCount = data.items[0].statistics.likeCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var viewCount = data.items[0].statistics.viewCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        //console.log(data.items[0].status);
        var privacyStatus = data.items[0].status.privacyStatus;
        if(privacyStatus=="public"){
            privacyStatus=publicstring;
        }
        else if(privacyStatus=="unlisted"){
            privacyStatus=unlistedstring;
        }

        //console.log(data.items[0].snippet);
        var channelId = data.items[0].snippet.channelId;
        var channelTitle = data.items[0].snippet.channelTitle;
        var title = data.items[0].snippet.title;
        var description = data.items[0].snippet.description;
        var thumbnails = data.items[0].snippet.thumbnails.default.url;
        var publishedAt = data.items[0].snippet.publishedAt;
        var date = new Date(publishedAt);
        var publicdate = date.toLocaleString();//toUTCString();


        var duration = (data.items[0].contentDetails.duration).replace("PT","").replace("H",":").replace("M",":").replace("S","");
        var licensedContent = data.items[0].contentDetails.licensedContent;
        if(licensedContent==true){
            licensedContent=moneystring;
        }
        else if(licensedContent==false){
            licensedContent=unmoneystring;
        }

        var definition = data.items[0].contentDetails.definition;
        if(definition == "hd") {
            isHD = hdstring;
        }
        else if(definition != "hd") {
            isHD = '';
        }
        var caption = data.items[0].contentDetails.caption;
        if(caption==true){
            isCC=captionstring;
        }
        else if(caption==false){
            isCC='';
        }

        titlebagestring = '<span class="vm-video-title-badges">'+isHD+isCC+'</span>';
        

        $('#youtube').append(
            '<div class="media mix ' + category + '" id="'+id+'">'+
              '<div class="media-left">'+
                '<a href="'+linkvideo+id+'" target="_blank">'+
                  '<img class="media-object" src="'+thumbnails+'" alt="'+title+'">'+
                  '<span class="duration">'+duration+'</span>'+
                '</a>'+
              '</div>'+
              '<div class="media-body">'+
                '<h4 class="media-heading"><a href="'+linkvideo+id+'" target="_blank" title="'+title+'">'+title+'</a>'+titlebagestring+'</h4>'+
                '<span class="vm-date-info">'+publicdate+'</span><br>'+
                'Channel: <a href="'+linkchannel+channelId+'" target="_blank">'+channelTitle+'</a><br/>'+
                '<div><a href="javascript:;" class="btn-delete" data-id="'+id+'"><i class="fa fa-trash"></i></a></div>'+
                
              '</div>'+
              '<div class="media-right">'+
                '<div>'+
                    '<div class="info1">'+
                        '<div class="vm-video-indicators">'+privacyStatus+licensedContent+'</div>'+
                    '</div>'+
                    '<div class="info2">'+
                        '<div class="video-view-count">'+
                            '<span title="Views" class="vm-video-metric-icon yt-sprite"></span>'+
                            '<span class="vm-video-metric-value">'+viewCount+'</span>'+
                        '</div>'+
                        '<div style="overflow:hidden;">'+
                            '<div class="video-likes-count">'+
                                '<span title="Likes" class="vm-video-metric-icon yt-sprite"></span>'+
                                '<span class="vm-video-metric-value">'+likeCount+'</span>'+
                            '</div>'+
                            '<div class="video-dislikes-count">'+
                                '<span title="Dislikes" class="vm-video-metric-icon yt-sprite"></span>'+
                                '<span class="vm-video-metric-value">'+dislikeCount+'</span>'+
                            '</div>'+
                        '</div>'+
                        '<div class="vm-video-metric video-comments">'+
                            '<span title="All comments" class="vm-video-metric-icon yt-sprite"></span>'+
                            '<span class="vm-video-metric-value">'+commentCount+'</span>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
              '</div>'+
            '</div>'
        );

        $('#youtube .media#'+id).fadeIn(200);

        if(category == 'action') _action_count ++;
        if(category == 'cartoon') _cartoon_count ++;
        if(category == 'funny') _funny_count ++;
        alert(_action_count);
        $('#action-count').html(_action_count);
        $('#cartoon-count').html(_cartoon_count);
        $('#funny-count').html(_funny_count);
        // _alive++;
        // $('#creator-subheader-item-count').html(_alive+'/'+_length);
        
    });
//           .fail(function(){
//               console.log('error');
//           })
//           .always(function() {
      //   console.log( "complete" );
      // });
}
// ------- end video info 2