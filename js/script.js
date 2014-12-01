/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    if(document.getElementById('index')){
        $(document).on('click','#login',function(){
            $.ajax({
                type: "GET",
                url: "Login",
                data: {uid: $('#uid').val(),password: $('#password').val()},
                dataType: "json",
                success: function(data){
                    if(data.flag==true)
                        alert(data.message);
                    else
                        bootbox.alert(data.message);
                }
            });
        });
    }
    
    if(document.getElementById('register')){
        $(document).on('click','#submit',function(){
            $.ajax({
                type: "GET",
                url: "Register",
                data: {uid: $('#uid').val(),password: $('#password').val(),email:$('#email').val(),
                       gender:$('#gender').val(),lname:$('#lname').val(),fname:$('#fname').val(),
                       age:$('#age').val(),street:$('#street').val(),city:$('#city').val(),
                       zip:$('#zip').val(),state:$('#state').val(),country:"U.S."},
                dataType: "json",
                success: function(data){
                    if(data.flag==true)
                        window.location.href='index.html';
                    else{
                        bootbox.alert(data.message);
                    }
                }
            });
        });
    }
});
