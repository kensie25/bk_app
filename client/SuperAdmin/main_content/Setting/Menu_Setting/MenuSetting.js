/**
 * Created by ayatekapoetra on 5/26/18.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './MenuSetting.html';


Template.MenuSetting.onCreated(function(){
    Session.set('optTpUser', $('#selTipeUser').val())
});

Template.MenuSetting.onRendered(function(){

});

Template.MenuSetting.helpers({
    selTipeUser: function(){
        //console.log(SysTipeUser.find({}).fetch())
        return SysTipeUser.find({}).fetch()
    },

    selMainMenu: function(){
        var optTpUser = Session.get('optTpUser')
        //console.log(SysMenuBar.find({tipeuser_id: optTpUser}).fetch())
        return SysMenuBar.find({tipeuser_id: optTpUser}).fetch()
    },

    incremented: function(index){
        index++;
        return index;
    },

    selOptions: function(){
        return SysOptions.find({'title': 'STATUS'}).fetch();
    },

    dataMainMenu: function(){
        return SysMenuBar.find().fetch()
    }

});

Template.MenuSetting.events({
    'change #selTipeUser': function(e, t){
        e.preventDefault()
        Session.set('optTpUser', $('#selTipeUser').val())
    },

    'change #selMainMenu': function(e){
        e.preventDefault()
        var TPUserVal1 = $('#selMainMenu').val()
        var nm_tipe1 = TPUserVal1.split("#")
        $('#inpMinMenuName').val(nm_tipe1[1])
    },

    'click #btAddSubMenu': function(e){
        e.preventDefault()
        var xdata = SysTipeUser.findOne({tipeuser_id: $('#selTipeUser').val()})
        //console.log(xdata)
        var dSplit = $('#selMainMenu').val().split("#")
        //var Newdata = {
        //    tipeuser_id: $('#selTipeUser').val(),
        //    tipe_user: xdata.nama_tipe,
        //    mainmenu_id: dSplit[0],
        //    nama_mainmenu: dSplit[1],
        //    sub_mainmenu: [{
        //        nama_submenu: $('#inpSubMenu').val(),
        //        url_submenu: $('#inpSubMenuURL').val(),
        //        ico_submenu: $('#inpSubMenuIco').val()
        //    }]
        //
        //}
        //console.log(dSplit)

        var fulldata = SysMenuBar.findOne({tipeuser_id: $('#selTipeUser').val(), mainmenu_id: dSplit[0]});
        var countData = SysMenuBar.find({tipeuser_id: $('#selTipeUser').val(), mainmenu_id: dSplit[0]}).count();


        if(countData > 0){
            var dataId = fulldata._id;
            console.log(dataId);
            console.log(countData);

            var obj = fulldata.sub_mainmenu;
            //console.log(obj)
            var newArr =
            {
                nama_submenu: $('#inpSubMenu').val(),
                url_submenu: $('#inpSubMenuURL').val(),
                ico_submenu: 'fa '+$('#SelectIcons').val(),
                sts_submenu: $('#stsOpt').val()
            }
            var join = _.union(obj, newArr)
            SysMenuBar.update({_id: dataId}, {$set:{sub_mainmenu: (join)}})
            sweetAlert("SUCCESS", "Main Menu Berhasil di Update...", "success")
        }else{
            sweetAlert("WARNING", "Main Menu Gagal di Update...", "warning")
        }



        //try {
        //    SysFakeMenu.update({_id: dataId}, {$set:{sub_mainmenu: (join)}})
        //
        //}catch (error) {
        //    // will also catch exceptions thrown by Meteor.users.update
        //    console.log("caught an error!");
        //    console.error(error);
        //}


    }

})
