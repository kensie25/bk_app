/**
 * Created by ayatekapoetra on 5/30/18.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './MenuMasterCounselors.html';

function makeid() {
    var text = "";
    var possible = "0123456789";
    for (var i = 0; i < 18; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function standart(){
    $('#inpNuptkCounselors').attr('disabled', 'true')
    $('#inpRandCounselors').attr('disabled', 'true')
    $('#inpRandCounselors').val(makeid())

}
function pns(){
    $('#inpNipCounselors').removeAttr('disabled')
    $('#inpNuptkCounselors').attr('disabled', 'true')
    $('#inpRandCounselors').val(makeid())
    $('#inpRandCounselors').attr('disabled', 'true')
}

function honorer(){
    $('#inpNuptkCounselors').removeAttr('disabled')
    $('#inpNipCounselors').attr('disabled', 'true')
    $('#inpRandCounselors').attr('disabled', 'true')
    $('#inpRandCounselors').val(makeid())
}

function lainnya(){
    $('#inpNipCounselors').attr('disabled', 'true')
    $('#inpNuptkCounselors').attr('disabled', 'true')
    $('#inpRandCounselors').removeAttr('disabled')
    $('#inpRandCounselors').val(makeid())
    $('#inpRandCounselors').removeAttr('readonly', 'true')
}

Template.MenuMasterCounselors.onCreated(function(){
    var idprofile = Meteor.user().profile.profile_id
    var idsekolah = BK_SekolahProfile.findOne({_id: idprofile})
    this.sekolah_id = new ReactiveVar(idsekolah)

    var dprov = $('#selProvince').val('1');
    this.provinsi_name = new ReactiveVar(dprov);

    var dkota = $('#selKota').val('1');
    this.kota = new ReactiveVar(dkota);

    var stsPns = $('#selPns').val()
    this.idGenerate = new ReactiveVar(stsPns)

})

Template.MenuMasterCounselors.onRendered(function(){
    standart()
    $('#inpTglLahir').datetimepicker({
        format: "dddd, DD MMMM YYYY",
        locale: 'ID'
    })

    var dataTsekolah = Template.instance().sekolah_id.get()
    var delay = 600; // in milliseconds, check every minute
    var intervalId = setInterval(readyData, delay);
    function readyData(){
        if(_.size(dataTsekolah) != undefined){
            $('#spinner').remove()
            $('#spinnertbl').remove()
            clearInterval(intervalId)

        }
    }
})

Template.MenuMasterCounselors.helpers({
    sekolahProfile: function () {
        var idprofile = Meteor.user().profile.profile_id
        var data = BK_SekolahProfile.findOne({_id: idprofile})
        Template.instance().sekolah_id.set(data)
        return data
    },

    optPns: function(){
        return SysOptions.find({title: "STATUS COUNSELORS"}).fetch()
    },

    jenKel: function(){
        return SysOptions.find({title: 'SEX'}).fetch()
    },

    optAgama: function(){
        return SysOptions.find({'title':'AGAMA'})
    },

    optProvinsi: function(){
        return SysProvinsi.find({}).fetch();
    },

    optKota: function(){
        var prov = Template.instance().provinsi_name.get();
        var idprov = SysProvinsi.findOne({province: prov});
        var xidprov = idprov.province_id;
        return SysKabupaten.find({province_id: xidprov}).fetch();
    },

    optKecamatan: function(){
        var prov = Template.instance().provinsi_name.get();
        var kab = Template.instance().kota.get();
        var idprov = SysProvinsi.findOne({province: prov});
        var xidprov = idprov.province_id;
        var idkab = SysKabupaten.findOne({city_name: kab});
        console.log(xidprov, idkab.city_id)
        console.log("SysKecamatan.find({'province_id': "+xidprov+", 'city_id': "+idkab.city_id+"}).fetch()")

        return SysKecamatan.find({'province_id': xidprov, 'city_id': idkab.city_id}).fetch();
    }
})

Template.MenuMasterCounselors.events({
    'change #selProvince': function(e, t){
        e.preventDefault();
        t.provinsi_name.set($('#selProvince').val());
    },

    'change #selKota':function(e, t){
        e.preventDefault();
        t.kota.set($('#selKota').val());
    },

    'change #selPns': function(){
        var stsPns = $('#selPns').val()
        Template.instance().idGenerate.set(stsPns)
        switch (stsPns) {
            case 'LAINNYA':
                lainnya()
                break;
            case 'HONORER':
                honorer()
                break;
            default:
                pns()
        }
    },

    'click #btSaveCounselors': function(){
        sweetAlert("OK", "Testing", "success")
    }
})