
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
});

