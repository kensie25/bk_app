/**
 * Created by ayatekapoetra on 5/21/18.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './LoginSekolah.html';



Template.LoginSekolah.onCreated(function(){


});

Template.LoginSekolah.onRendered(function(){

});

Template.LoginSekolah.events({
    'click #btlogin': function(event){
        event.preventDefault();
        var emailVar = $('#emailVar').val();
        var passwordVar = $('#passwordVar').val();
        if(emailVar != '' || passwordVar !=''){
            Meteor.loginWithPassword(emailVar, passwordVar, function(err, res){
                if (err){
                    sweetAlert("ERROR", err.reason, "error");
                }else{
                    Router.go('SekolahDashboard')
                }
            });
        }else {
            sweetAlert("ERROR", "Email & Password harus terisi...!", "error");
        }

    },
});