/**
 * Created by ayatekapoetra on 5/25/18.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './SidebarSA.html';

Template.SidebarSA.onRendered(function(){
    var xdelay = 100; // in milliseconds, check every minute
    setInterval(ConnectionReady, xdelay);
    var Constatus = Meteor.status()
    function ConnectionReady(){
        if(Constatus.status === "connected"){
            $('#badCon').hide();
            $('#goodCon').show();
        }else{
            $('#badCon').show();
            $('#goodCon').hide();
        }
    }
});

Template.SidebarSA.onCreated(function(){
    var dataMenu = Session.get('MainMenu')
    this.mMenu = new ReactiveDict(dataMenu);

});

Template.SidebarSA.helpers({
    //isConnecting: function(){
    //    var xdelay = 100; // in milliseconds, check every minute
    //    setInterval(ConnectionReady, xdelay);
    //    var Constatus = Meteor.status()
    //    function ConnectionReady(){
    //        if(Constatus.status === "connected"){
    //            console.log('Connection good....')
    //            return true
    //        }else{
    //            console.log('Connection bad....')
    //            return false
    //        }
    //    }
    //},

    listMenu: function(){
        var dMenu = Template.instance().data;
        //console.log(dMenu)
        return dMenu
    },

    listSubMenu: function(){
        var listSubMenu = Session.get('submenu')
        return listSubMenu
    },

    //selMainMenu: function(){
    //    //console.log(SysMenuBar.find({tipeuser_id: optTpUser}).fetch())
    //    return SysMenuBar.find({tipeuser_id: Meteor.user().profile.tipeuser_id}).fetch()
    //},

})

Template.SidebarSA.events({
    'click #main_menu': function(){
        //var submenu = SysSubMenuBar.find({'mainmenu_id': '1'}).fetch();
        //Session.set('submenu', submenu);
        //return submenu
    }
})