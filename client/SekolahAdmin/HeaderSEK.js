/**
 * Created by ayatekapoetra on 5/21/18.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './HeaderSEK.html';

Template.HeaderSEK.events({
    'click #logout':function(){
        var nama = Meteor.user().profile.fullname;
        Meteor.logout(function(){
            sweetAlert("SUCCESS", nama+" LogOut Berhasil", "success")
            Router.go('RootIndex')
        });
    }
});