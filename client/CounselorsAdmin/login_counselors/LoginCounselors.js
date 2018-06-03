/**
 * Created by ayatekapoetra on 5/21/18.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './LoginCounselors.html';



Template.LoginCounselors.onCreated(function(){


});

Template.LoginCounselors.onRendered(function(){

});

Template.LoginCounselors.events({
    'click #btlogin': function(event){
        event.preventDefault();
        var emailVar = $('#emailVar').val();
        var passwordVar = $('#passwordVar').val();
        if(emailVar != '' || passwordVar !=''){
            Meteor.loginWithPassword(emailVar, passwordVar, function(err, res){
                if (err){
                    sweetAlert("ERROR", err.reason, "error");
                }else{
                    Router.go('CounselorsDashboard')
                }
            });
        }else {
            sweetAlert("ERROR", "Email & Password harus terisi...!", "error");
        }

    },
});