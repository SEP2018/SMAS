$("service").onchange(function(){
    $.get("/serviceChosen", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
});