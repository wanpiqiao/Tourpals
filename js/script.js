/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author wanger
 */
 //this getQueryString() function comes from http://www.cnblogs.com/jiekk/archive/2011/06/28/2092444.html
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) 
        return unescape(r[2]); 
    return null;
}

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
                waitingDialog.show('Working hard', {dialogSize: 'sm'});
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
                            window.location.href='photo.html?uid='+$('#uid').val();
                        else{
                            bootbox.alert(data.message);
                        }
                    }
                });
            }
        });
    }
    
    if(document.getElementById('editProfile')){
        $.ajax({
            type: "GET",
            url: "ViewProfile",
            data: {},
            dataType: "json",
            success: function(data){
                $('#email').val(data.email);
                $('#fname').val(data.fname);
                $('#lname').val(data.lname);
                $('#password').val(data.password);
                $('#gender').val(data.gender);
                $('#age').val(data.age);
                $('#street').val(data.street);
                $('#city').val(data.city);
                $('#state').val(data.state);
                $('#zip').val(data.zip);
            }
        });
        $(document).on('click','#submit',function(){
            if(docheck()){
                $.ajax({
                    type: "GET",
                    url: "UpdateProfile",
                    data: {password: $('#password').val(),email:$('#email').val(),
                           gender:$('#gender').val(),lname:$('#lname').val(),fname:$('#fname').val(),
                           age:$('#age').val(),street:$('#street').val(),city:$('#city').val(),
                           zip:$('#zip').val(),state:$('#state').val(),country:"U.S."},
                    dataType: "json",
                    success: function(data){
                        if(data.flag==true)
                            window.location.href='personal.html';
                        else{
                            bootbox.alert(data.flag);
                        }
                    }
                });
            }
        });
    }
    
    if(document.getElementById('viewProfile')){
        $.ajax({
            type: "GET",
            url: "ViewProfile",
            data: {},
            dataType: "json",
            success: function(data){
                $('#uid').html(data.uid);
                $('#email').html(data.email);
                $('#fname').html(data.fname);
                $('#lname').html(data.lname);
                $('#password').html(data.password);
                if(data.gender=='M')
                    $('#gender').html("Male");
                else
                    $('#gender').html("Female");
                $('#age').html(data.age);
                $('#street').html(data.street);
                $('#city').html(data.city);
                $('#state').html(data.state);
                $('#zip').html(data.zip);
                $('img').attr('src',data.photosrc);
            }
        });
        
        $(document).on('click','#edit',function(){
            window.location.href='edit.html';
        });
        $(document).on('click','#photochange',function(){
            window.location.href='photochange.html?uid='+$('#uid').html();
        });
    }
    
    if(document.getElementById('photochange')){
        var uid=getQueryString("uid");
        $('#imgName').val(uid+"_photo");
        $('#uid').val(uid);
        $.ajax({
            type: "GET",
            url: "GetUserPhoto",
            data: {uid:uid},
            dataType: "json",
            success: function(data){
                //alert(data.photosrc);
                $("img").attr("src",data.photosrc);
            }
        });
        
        $(document).on('click','#default',function(){
            $("img").attr("src","images/photos/Face.svg");            
        });
        
        $(document).on('click','#return',function(){
            window.location.href='personal.html?uid='+uid;            
        });
        
        $(document).on('click','#submit',function(){
            var photo=$("img").attr("src");
            $.ajax({
                type: "GET",
                url: "FinishUpdatePhoto",
                data: {uid:uid,photosrc:photo},
                dataType: "json",
                success: function(data){
                    //alert(data.photosrc);
                    if(data.flag==true)
                        window.location.href='personal.html?uid='+uid;
                    else
                        alert("false");
                }
            });
        });
    }
    
    if(document.getElementById('photo')){
        var uid=getQueryString("uid");
        $('#imgName').val(uid+"_photo");
        $('#uid').val(uid);
        $.ajax({
            type: "GET",
            url: "GetUserPhoto",
            data: {uid:uid},
            dataType: "json",
            success: function(data){
                //alert(data.photosrc);
                $("img").attr("src",data.photosrc);
            }
        });
        
        $(document).on('click','#default',function(){
            $("img").attr("src","images/photos/Face.svg");            
        });
        
        $(document).on('click','#submit',function(){
            var photo=$("img").attr("src");
            $.ajax({
                type: "GET",
                url: "FinishUpdatePhoto",
                data: {uid:uid,photosrc:photo},
                dataType: "json",
                success: function(data){
                    //alert(data.photosrc);
                    if(data.flag==true)
                        window.location.href='index.html';
                    else
                        alert("false");
                }
            });
        });
    }
    
});
