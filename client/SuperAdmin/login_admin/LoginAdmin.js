/**
 * Created by ayatekapoetra on 5/21/18.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './LoginAdmin.html';



Template.LoginAdmin.onCreated(function(){

});

Template.LoginAdmin.onRendered(function(){

});

Template.LoginAdmin.events({
    'click #btlogin': function(event){
        event.preventDefault();
        var emailVar = $('#emailVar').val();
        var passwordVar = $('#passwordVar').val();
        if(emailVar != '' || passwordVar !=''){
            Meteor.loginWithPassword(emailVar, passwordVar, function(err, res){
                if (err){
                    sweetAlert("ERROR", err, "error");
                }else{
                    sweetAlert("SUCCESS", res, "success");
                    Router.go('AdminDashboard')
                }
            });
        }else {
            sweetAlert("ERROR", "Email & Password harus terisi...!", "error");
        }

    },
});