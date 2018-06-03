/**
 * Created by ayatekapoetra on 5/25/18.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './SidebarBK.html';

Template.SidebarBK.onRendered(function(){
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

Template.SidebarBK.onCreated(function(){
    var dataMenu = Session.get('MainMenu')
    this.mMenu = new ReactiveDict(dataMenu);
});

Template.SidebarBK.helpers({
    titleHeader: function(){
        var title = Meteor.user().profile.tipeuser_id
        var data = SysTipeUser.findOne({tipeuser_id: title})
        //console.log(data)
        return data
    },

    listMenu: function(){
        var dMenu = Template.instance().data;
        //console.log(dMenu)
        return dMenu
    },

    listSubMenu: function(){
        var listSubMenu = Session.get('submenu')
        return listSubMenu
    }
})

Template.SidebarBK.events({
    'click #main_menu': function(){
        var submenu = SysSubMenuBar.find({'mainmenu_id': '1'}).fetch();
        Session.set('submenu', submenu);
        return submenu
    }
});