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

    var userTipe = (Meteor.user().profile.type_user).map(function(doc){
        if(doc.administrator === true){
            return 'ok'
        }

    })
    console.log(userTipe)
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

    optIdentitas: function(){
        return SysOptions.find({'title': 'IDENTITAS'}).fetch();
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

});

Template.SekolahForm.events({
    'click #btaddSekolah':function(){
        var countSek = BK_SekolahProfile.find({'kd_sekolah': $('#inpKdSekolah').val()}).count();
        if(countSek != 0){
            alert('Data sekolah Sdh Ada...');
        }else{
            var chars = $('#inpKdSekolah').val();
            var string_length = 8;
            var randomstring = '';
            for (var i=0; i<string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum,rnum+1);
            }
            var countUrut = BK_SekolahProfile.find().count();
            var dataSekolah = {
                tipeuser_id: '2',
                tipe_user:'adm_sekolah',
                kd_sekolah: $('#inpKdSekolah').val(),
                nm_sekolah: $('#inpNmSekolah').val().toUpperCase(),
                jenjang_sekolah: $('#selJenjang').val(),
                tipe_sekolah: $('#selSts').val(),
                akreditasi: $('#selAkreditasi').val(),
                alamat_sekolah: $('#inpAlamat').val().toUpperCase(),
                provinsi: $('#selProvince').val(),
                kota: $('#selKota').val(),
                kecamatan: $('#selKecamatan').val().toUpperCase(),
                kelurahan: $('#inpKelurahan').val().toUpperCase(),
                rt: $('#inpRt').val(),
                rw: $('#inpRw').val(),
                kodepos: $('#inpKodepos').val(),
                email_sekolah: $('#inpEmail').val(),
                pass: randomstring,
                phone_sekolah: $('#inpPhone').val(),
                nm_kepsek: $('#inpNmKepsek').val().toUpperCase(),
                nip_kepsek: $('#inpNipKepsek').val(),
                nm_operator: $('#inpNmOpr').val().toUpperCase(),
                email_operator: $('#inpEmailOpr').val(),
                phone_operator: $('#inpPhoneOpr').val(),
                identitas_operator: $('#inpNoIdentitasOpr').val(),
                tipe_indentitas_operator: $('#selIdentitas').val(),
                created_by: Meteor.userId()._id,
                created_at: new Date(),
                updated_at: new Date(),
                urut: countUrut + 1,
                sts_sekolah: 'inactive'

            }
            BK_SekolahProfile.insert(dataSekolah, function(err, res){
                if(!err){
                    Meteor.call('emailsend',function(err, res){
                        if(!err){
                            sweetAlert("SUCCESS", "Data Sekolah Berhasil di Simpan...", "success");
                            //alert("Data Sekolah Berhasil di Simpan...!")
                            $(':input').val('');

                        }else{
                            sweetAlert("ERROR", err.message, "error");
                        }
                    })
                }else {
                    sweetAlert("ERROR", err.message, "error");
                    //alert(err.reason);
                }
            })
        }
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
                    jenjang_sekolah: $('#selJenjang').val(),
                    tipe_sekolah: $('#selSts').val(),
                    akreditasi: $('#selAkreditasi').val(),
                    alamat_sekolah: $('#inpAlamat').val().toUpperCase(),
                    provinsi: $('#selProvince').val(),
                    kota: $('#selKota').val(),
                    kecamatan: $('#selKecamatan').val().toUpperCase(),
                    kelurahan: $('#inpKelurahan').val().toUpperCase(),
                    rt: $('#inpRt').val(),
                    rw: $('#inpRw').val(),
                    kodepos: $('#inpKodepos').val(),
                    email_sekolah: $('#inpEmail').val(),
                    pass: randomstring,
                    phone_sekolah: $('#inpPhone').val(),
                    nm_kepsek: $('#inpNmKepsek').val().toUpperCase(),
                    nip_kepsek: $('#inpNipKepsek').val(),
                    nm_operator: $('#inpNmOpr').val().toUpperCase(),
                    email_operator: $('#inpEmailOpr').val(),
                    phone_operator: $('#inpPhoneOpr').val(),
                    identitas_operator: $('#inpNoIdentitasOpr').val(),
                    tipe_indentitas_operator: $('#selIdentitas').val(),
                    created_by: Meteor.userId()._id,
                    created_at: new Date(),
                    updated_at: new Date(),
                    sts_sekolah: 'active'

                }
                // Insert Data Profile Sekolah
                var countSek = BK_SekolahProfile.find({'kd_sekolah': $('#inpKdSekolah').val()}).count();
                if(countSek != 0){
                    alert('Data sekolah Sdh Ada...');

                }else{
                    BK_SekolahProfile.insert(dataSekolah, function(err, res){
                        if(!err){
                            sweetAlert("SUCCESS", "Data Sekolah Berhasil di Simpan...", "success");
                            //alert("Data Sekolah Berhasil di Simpan...!")
                            $(':input').val('');
                        }else {
                            sweetAlert("ERROR", err.message, "error");
                            //alert(err.reason);
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