
var edit;
$(document).ready(function(){
   $('.table').on('click', '#delMember', function(){
       var name = $(this).parent('td').siblings('#teamMemberName').text();
       var designation = $(this).parent('td').siblings('#teamMemberDesignation').text();
       var description = $(this).parent('td').siblings('#teamMemberDescription').text();
       console.log('contents are ----->>>>> ' + name + ' ' + designation + ' ' + description);
       var request = $.ajax({
        url: "http://localhost:8081/delMember",
        type: "POST",
        data: {name : name},
        dataType: "html"
      });
      
      request.done(function(msg) {
        $("#specialMessages").text( msg );
      });
      
      request.fail(function(jqXHR, textStatus) {
        alert( "Request failed: " + textStatus );
      });
   });    
   
   /*
   $('#TestimonyList').on('click', '#delTestimony', function(){
     console.log('testimony button clicked');
     console.log($(this).parent('p').siblings('#testimonyUserName').text());
     console.log($(this).parent('p').text());
     var name = $(this).parent('p').siblings('#testimonyUserName').text();
     var testimonyMessage = $(this).parent('p').text();

     var request = $.ajax({
      url: "http://localhost:8081/delTestimony",
      type: "POST",
      data: {name : name},
      dataType: "html"
    });
    
    request.done(function(msg) {
      $("#specialMessageTestimony").text( msg );
    });
    
    request.fail(function(jqXHR, textStatus) {
      alert( "Request failed: " + textStatus );
    });
   }); */

   
}); 

function delTestimony(val){
  console.log('del button clicked 1' + val);
  var request = $.ajax({
    url: "http://localhost:8081/delTestimony",
    type: "POST",
    data: {name : val},
    dataType: "html"
  });
  
  request.done(function(msg) {
    $("#specialMessageTestimony").text( msg );
  });
  
  request.fail(function(jqXHR, textStatus) {
    alert( "Request failed: " + textStatus );
  });
 
}

