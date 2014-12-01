/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function chkEmail(str) {   
    return str.search(/[\w\-]{1,}@[\w\-]{1,}\.[\w\-]{1,}/)==0?true:false 
} //regular expression comes from http://www.jb51.net/article/19801.htm
function docheck() 
{   
    if($("#uid").val()=="") { 
        alert("Please Enter Username"); 
        return false; 
    } 
    if($("#password").val()=="") { 
        alert("Please Enter Password"); 
        return false; 
    }   
    if($("#email").val()=="") { 
        alert("Please Enter Email"); 
        return false; 
    } 
    if($("#age").val()=="") { 
        alert("Please Enter Age"); 
        return false; 
    }
    if($("#street").val()=="") { 
        alert("Please Enter Street"); 
        return false; 
    }
    if($("#city").val()=="") { 
        alert("Please Enter City"); 
        return false; 
    }
    if($("#zip").val()=="") { 
        alert("Please Enter Zip Code"); 
        return false; 
    }
    if(!chkEmail($("#email").val())) { 
        alert("Wrong Email Adress"); 
        return false; 
    } 
    return true; 
} 
        
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
            if(docheck()){
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
            }
        });
    }
});
