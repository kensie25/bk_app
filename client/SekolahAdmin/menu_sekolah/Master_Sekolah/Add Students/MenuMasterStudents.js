/**
 * Created by ayatekapoetra on 5/26/18.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './MenuMasterStudents.html';
import './MenuMasterStudents.css';

function standart(){
    $('#btNext2').hide()
    $('#btNext3').hide()
    $('#btBack2').hide()
    $('#btBack3').hide()
}
function Step1(){
    $('#step2').removeClass('btn btn-default').addClass('btn btn-warning')
    $('#btNext1').hide()
    $('#btNext2').show()
    $('#btNext3').hide()
    $('#btBack2').show()
    $('#btBack3').hide()
    $('#form1').hide('slow')
    $('#form2').show('slow')
}

function Back1(){
    $('#btNext1').show()
    $('#form1').show('slow')
    $('#btNext2').hide()
    $('#btBack2').hide()
    $('#btBack3').hide()
    $('#btBack2').hide()
    $('#btBack3').hide()
    $('#form2').hide()
    $('#form3').hide()
}

function Step2(){
    $('#step3').removeClass('btn btn-default').addClass('btn btn-danger')
    $('#btNext1').hide()
    $('#btNext2').hide()
    $('#btNext3').show()
    $('#btBack2').hide()
    $('#btBack3').show()
    $('#form1').hide('slow')
    $('#form2').hide('slow')
    $('#form3').show('slow')
}

function Back2(){
    $('#form2').show('slow')
    $('#btNext2').show()
    $('#btBack2').show()
    $('#form1').hide()
    $('#form3').hide()
    $('#btNext1').hide()
    $('#btNext3').hide()
    $('#btBack3').hide()
    $('#btBack3').hide()

}

Template.MenuMasterStudents.onCreated(function(){

    var dprov = $('#selProvince').val('1');
    this.provinsi_name = new ReactiveVar(dprov);

    var dkota = $('#selKota').val('1');
    this.kota = new ReactiveVar(dkota);

    this.tinggal = new ReactiveVar(false);

    //var t4tinggal = $('#selTinggalBersama').val()
    //if(t4tinggal === "LAINNYA"){
    //    this.tinggal = new ReactiveVar(true);
    //}else{
    //    this.tinggal = new ReactiveVar(false);
    //}

})

Template.MenuMasterStudents.onRendered(function(){
    standart()

})

Template.MenuMasterStudents.helpers({
    sekolahProfile: function(){
        var tempData = Meteor.user().profile.profile_id
        //console.log(SekolahProfile.findOne({_id: tempData}))
        return BK_SekolahProfile.findOne({_id: tempData})
    },

    jenKel: function(){
        return SysOptions.find({title: 'SEX'}).fetch()
    },

    optAgama: function(){
        return SysOptions.find({'title':'AGAMA'})
    },

    optKelas: function(){
        return SysOptions.find({'title':'KELAS'})
    },

    optJurusan: function(){
        return SysOptions.find({'title':'KELAS JURUSAN'})
    },

    optPekerjaan: function(){
        return SysOptions.find({'title':'PEKERJAAN'})
    },

    optPendidikan: function(){
      return SysOptions.find({'title':'PENDIDIKAN'},{sort:{urut: 1}}).fetch().reverse()
    },

    optTinggalBersama: function(){
        return SysOptions.find({'title':'TINGGAL BERSAMA'})
    },

    t4tinggal: function(){
        return Template.instance().tinggal.get();
    },

    optJnsTransport: function(){
        return SysOptions.find({'title':'JNS TRANSPORT'})
    },

    optStsEkonomi: function(){
        return SysOptions.find({'title':'STS EKONOMI'})
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
    },
})

Template.MenuMasterStudents.events({
    'change #selProvince': function(e, t){
        e.preventDefault();
        t.provinsi_name.set($('#selProvince').val());
    },

    'change #selKota':function(e, t){
        e.preventDefault();
        t.kota.set($('#selKota').val());
    },

    'change #selTinggalBersama': function(e, t){
        e.preventDefault();
        if($('#selTinggalBersama').val() === "LAINNYA"){
            t.tinggal.set(true);
            console.log(t.tinggal.get())
        } else {
            t.tinggal.set(false);
            console.log(t.tinggal.get())
        }
    },

    'click #btNext1': function(e){
        e.preventDefault()
        Step1()
    },

    'click #btNext2': function(e){
        e.preventDefault()
        Step2()
    },

    'click #btBack2':function(e){
        e.preventDefault()
        Back1()
    },

    'click #btBack3':function(e){
        e.preventDefault()
        Back2()
    }
})

