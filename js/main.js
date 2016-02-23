$(document).ready(function(){
    
    /*Initialize the SDK
      Needs to be included in the html
      Get your key from Azure dashboard -> bottom nav -> manage keys
    */
    var client = new WindowsAzure.MobileServiceClient('https://bloodhound.azure-mobile.net/', 'voCEeZCFMOYOSqmGKodlIoIRVEaFAf57');

    /* Let's get high scores */
    getHighScores();

    function getHighScores(){
        //$('.tg').empty();// empty this
        /* Get results from table named highscore, order by descending on score column, only return 10*/
        client.getTable('leaderboard').orderBy("timeofrun").take(10).read().done(function(results){
            var len = results.length;
            for(var i=0;i<len;i++){
                var data = results[i];
                $(
                    "<tr> " +
                    "<td class='tg-6k2t'> " + data.schoolname + " </td> " +
                    "<td class='tg-6k2t'> " + data.teamname + " </td> " +
                    "<td class='tg-6k2t'> " + data.carspeed + " </td> " +
                    "<td class='tg-6k2t'> " + data.timeofrun + " </td> " +        
                    "</tr>"
                ).appendTo('.tg');
            }
        })
    }
    /*Submitting the form, will insert the data, and then refresh it again */
   $( "form" ).on( "submit", function( event ) {
       if($('#token').val() === "9D0UJ0S083JJD82A01SHFUJA03"){
            event.preventDefault();
            var obj={'teamname':$('#teamname').val(),
                    'schoolname':$('#schoolname').val(),
                    'carspeed':$('#carspeed').val(),
                    'timeofrun':$('#timeofrun').val()
                };
            client.getTable("leaderboard").insert(obj).done(function(result){
                getHighScores();
                window.location.replace("index.html");
            });
       }else{
           alert("Invalid token");
       }


    });
})



/* Basic Rest API - no sdk
 xhr = new XMLHttpRequest();
  function restGet(){
     $.ajax({
    url: ' https://gamingleaderboard.azure-mobile.net/tables/highscore',
    type: 'GET',
    datatype: 'json',
    data:{'$top':'3'},
    success: function(data) { 
        var len = data.length;
        
        for(var i=0;i<len;i++)
        {
           console.log(data[i]);
        }
        
     },
    error: function() { alert('Failed!'); },
    beforeSend: setHeader       
  });   
  }

  function restPost(){
     $.ajax({
    url: ' https://gamingleaderboard.azure-mobile.net/tables/highscore',
    type: 'POST',
    datatype: 'json',
    data:{'user_name':'Mary','score':'333'},
    success: function(data) { 
        var len = data.length;
        console.log("stacey is done")
        for(var i=0;i<len;i++)
        {
        //  $("<p>"+data[i].user_name+":"+data[i].score+"</p>").appendTo('body p');
        }
        
     },
    error: function() { alert('Failed!'); },
    beforeSend: setHeader       
  });   
  }



function setHeader(xhr) {

  xhr.setRequestHeader('X-ZUMO-APPLICATION', 'lsNjRPdjvoigzfsyAePFnMcsLKraFJ21');

}
*/

