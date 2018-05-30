/**
 * Created by ayatekapoetra on 5/21/18.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './RegisterUser.html';

Template.RegisterUser.events({
   'click #btlogin': function(e) {
       e.preventDefault();
       var dataReg = {
           email: $('#email').val(),
           password: $('#pwd1').val(),
           profile: {
               fullname: $('#fname').val(),
               handphone: $('#phone').val(),
               type_user: ''
           }
       };
       if($('#pwd1').val() != $('#pwd2').val()){
           sweetAlert("ERROR", "Password anda tdk Sesuai...", "error");
       }else{
           Accounts.createUser(dataReg, function(err, res){
               if(!err){
                   UserProfile.insert({
                       iduser: Meteor.user()._id,
                       fullname: $('#fname').val(),
                       handphone: $('#phone').val(),
                       sts_profile: true,
                       created_at: new Date(),
                       update_at: ''
                   }, function(err, res){
                       if(!err){
                           sweetAlert("SUCCESS", "Registrasi User Sukses...!", "success")
                       }else{
                           sweetAlert("ERROR", err.reason, "error")
                       }
                   })

               }else{
                   sweetAlert("ERROR", err.reason, "error")
               }
           })
       }
   }
});