/**
 * Created by ayatekapoetra on 5/22/18.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './SekolahForm.html';
import './SekolahTable.html';


Template.SekolahForm.onCreated(function(){
    var dprov = $('#selProvince').val('1');
    this.provinsi_name = new ReactiveVar(dprov);

    var dkota = $('#selKota').val('1');
    this.kota = new ReactiveVar(dkota);
});

Template.SekolahForm.onRendered(function(){
    $('select').select2({
        placeholder: "Pilih Data...",
        allowClear: false
    });
});

Template.SekolahForm.helpers({
    sekAkreditasi: function(){
        return SysOptions.find({'title': 'AKREDITASI SEKOLAH'}).fetch();
    },

    optJenjang: function(){
        //console.log(Meteor.subscribe('allowSysOptions'));
        return SysOptions.find({'title': 'JENJANG SEKOLAH'}).fetch();
    },

    optStatusSek: function(){
        return SysOptions.find({'title': 'STATUS SEKOLAH'}).fetch();
    },

    optProvinsi: function(){
        return SysProvinsi.find({}).fetch();
    },

    optKota: function(){
        var prov = Template.instance().provinsi_name.get();
        var idprov = SysProvinsi.findOne({province: prov});
        var xidprov = idprov.province_id;
        return SysKabupaten.find({province_id: xidprov}).fetch();

        //var datKota = Meteor.call('getKota', prov, function(err, res){
        //    if(err){
        //        alert(err.reason);
        //    }else{
        //        console.log(res)
        //        return res
        //    }
        //})
        //console.log(datKota)
        //return (datKota)

        //var datProv = _.uniq(SysKabupaten.find({'provinsi': prov},{sort: {
        //    kabupaten: 1}
        //}).fetch(), true, function(doc){
        //    return doc.kabupaten;
        //});
        //return datProv
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

});

Template.SekolahForm.events({
    'click #btaddSekolah':function(){
        Meteor.call('emailsend',function(err, res){
            if(err){
                alert(err.reason);
            }else{
                var chars = $('#inpKdSekolah').val();
                var string_length = 8;
                var randomstring = '';
                for (var i=0; i<string_length; i++) {
                    var rnum = Math.floor(Math.random() * chars.length);
                    randomstring += chars.substring(rnum,rnum+1);
                }
                var dataSekolah = {
                    tipeuser_id: '2',
                    tipe_user:'adm_sekolah',
                    kd_sekolah: $('#inpKdSekolah').val(),
                    nm_sekolah: $('#inpNmSekolah').val().toUpperCase(),
                    alamat_sekolah: $('#inpAlamat').val().toUpperCase(),
                    jenjang_sekolah: $('#selJenjang').val(),
                    tipe_sekolah: $('#selSts').val(),
                    akreditasi: $('#selAkreditasi').val(),
                    provinsi: $('#selProvince').val(),
                    kota: $('#selKota').val(),
                    kecamatan: $('#selKecamatan').val().toUpperCase(),
                    kelurahan: $('#inpKelurahan').val().toUpperCase(),
                    rt: $('#inpRt').val(),
                    rw: $('#inpRw').val(),
                    kodepos: $('#inpKodepos').val(),
                    email: $('#inpEmail').val(),
                    pass: randomstring,
                    phone: $('#inpPhone').val(),
                    nm_kepsek: $('#inpNmKepsek').val().toUpperCase(),
                    nip_kepsek: $('#inpNipKepsek').val(),
                    created_by: Meteor.userId()._id,
                    created_at: new Date(),
                    updated_at: '',
                    sts_sekolah: false

                }
                // Insert Data Profile Sekolah
                var countSek = SekolahProfile.find({'kd_sekolah': $('#inpKdSekolah').val()}).count();
                if(countSek != 0){
                    alert('Data sekolah Sdh Ada...');

                }else{
                    SekolahProfile.insert(dataSekolah, function(err, res){
                        if(!err){
                            //sweetAlert("SUCCESS", "Data Sekolah Berhasil di Simpan...", "success");
                            alert("Data Sekolah Berhasil di Simpan...!")
                            $(':input').val('');
                        }else {
                            //sweetAlert("ERROR", err.reason, "error");
                            alert(err.reason);
                        }
                    })
                }

            }
        })
    },

    'click #tes': function(e){
        e.preventDefault();
        console.log(SysOptions.find({'title': 'AKREDITASI SEKOLAH'}).fetch());
         return SysOptions.find({'title': 'AKREDITASI SEKOLAH'}).fetch();
        //console.log(Template.instance().provinsi_name.get())
        //var userx = Meteor.user().profile.provinsi;

        //Meteor.call('getProvinsi', userx, function(err, res){
        //    if(err){
        //        alert(err.reason)
        //    }else {
        //        console.log(res)
        //    }
        //})
    },

    'change #selProvince': function(e, t){
        e.preventDefault();
        t.provinsi_name.set($('#selProvince').val());
        //console.log(Template.instance().provinsi_name.get())
        //var userx = Meteor.userId().profile.provinsi;

        //Meteor.call('getProvinsi', function(err, res){
        //    if(err){
        //        alert(err.reason)
        //    }else {
        //        t.provinsi_name.set(res);
        //        console.log(res)
        //    }
        //})
    },

    'change #selKota':function(e, t){
        e.preventDefault();
        //var kota = $('#selKota').val();
        //Meteor.call('getKota', kota, function(err, res){
        //    if(err){
        //        alert(err.reason)
        //    }else {
        //        console.log(res)
        //    }
        //})
        t.kota.set($('#selKota').val());
    }
});