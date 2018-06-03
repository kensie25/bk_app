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
    standart()
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
    $('#inpTgllahir').datetimepicker({
        format: "dddd, DD MMMM YYYY",
        locale: 'ID'
    })
    standart()

})

Template.MenuMasterStudents.helpers({
    sekolahProfile: function(){
        var tempData = Meteor.user().profile.sekolah_id
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
        var tempData = Meteor.user().profile.sekolah_id
        var dataid = BK_SekolahProfile.findOne({_id: tempData})
        var datakelas = BK_SekolahKelas.find({'kd_sekolah': dataid.kd_sekolah, sts_kelas: 'ACTIVE'}).fetch()
        return datakelas
    },

    optJurusan: function(){
        var tempData = Meteor.user().profile.sekolah_id
        var dataid = BK_SekolahProfile.findOne({_id: tempData})
        var datajurusan = BK_SekolahJurusan.find({'kd_sekolah': dataid.kd_sekolah, sts_jurusan: 'ACTIVE'}).fetch()
        return datajurusan
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
    'click #btNext3': function(){
        var tempData = Meteor.user().profile.sekolah_id
        var dataid = BK_SekolahProfile.findOne({_id: tempData})
        var dataSiswa = {
            kd_sekolah: dataid.kd_sekolah,
            nm_sekolah: dataid.nm_sekolah,
            nik: $('#inpNik').val().toUpperCase(),
            nm_siswa: $('#inpNmSiswa').val().toUpperCase(),
            agama: $('#selAgamaSiswa').val().toUpperCase(),
            jenkel: $('#selJenkel').val().toUpperCase(),
            tempat_lahir: $('#inpT4lahir').val().toUpperCase(),
            tanggal_lahir: $('#inpTgllahir').val(),
            tinggi_badan: $('#inpTb').val(),
            berat_badan: $('#inpBb').val(),
            golongan_darah: $('#inpGolDarah').val().toUpperCase(),
            kd_kelas: $('#selKelas').val().toUpperCase(),
            kd_jurusan: $('#selJurusan').val().toUpperCase(),
            email: $('#inpEmailSiswa').val(),
            phone: $('#inpPhoneSiswa').val(),
            alamat_siswa: $('#inpAlamatSiswa').val().toUpperCase(),
            provinsi: $('#selProvince').val().toUpperCase(),
            kota: $('#selKota').val().toUpperCase(),
            kecamatan: $('#selKecamatan').val().toUpperCase(),
            kelurahan: $('#inpKelurahan').val().toUpperCase(),
            rt: $('#inpRt').val(),
            rw: $('#inpRw').val(),
            kodepos: $('#inpKodepos').val(),
            nm_ayah: $('#inpNmAyah').val().toUpperCase(),
            agama_ayah: $('#selAgamaAyah').val().toUpperCase(),
            umur_ayah: $('#inpUmurAyah').val(),
            pendidikan_ayah: $('#selPendAyah').val().toUpperCase(),
            pekerjaan_ayah: $('#selPekerjaanAyah').val().toUpperCase(),
            dtl_pekerjaan_ayah: $('#inpSpekJobAyah').val().toUpperCase(),
            alamat_kantor_ayah: $('#inpAlamatJobAyah').val().toUpperCase(),
            phone_ayah: $('#inpPhoneAyah').val(),
            salary_ayah: $('#inpSalaryAyah').val(),
            nm_ibu: $('#inpNmIbu').val().toUpperCase(),
            agama_ibu: $('#selAgamaIbu').val(),
            umur_ibu: $('#inpUmurIbu').val(),
            pendidikan_ibu: $('#selPendIbu').val().toUpperCase(),
            pekerjaan_ibu: $('#selPekerjaanIbu').val(),
            dtl_pekerjaan_ibu: $('#inpSpekJobIbu').val().toUpperCase(),
            alamat_kantor_ibu: $('#inpAlamatJobIbu').val().toUpperCase(),
            phone_ibu: $('#inpPhoneIbu').val(),
            salary_ibu: $('#inpSalaryIbu').val(),
            nm_wali: $('#inpNmWali').val().toUpperCase(),
            agama_wali: $('#selAgamaWali').val().toUpperCase(),
            umur_wali: $('#inpUmurWali').val(),
            pendidikan_wali: $('#selPendWali').val().toUpperCase(),
            pekerjaan_wali: $('#selPekerjaanWali').val().toUpperCase(),
            dtl_pekerjaan_wali: $('#inpSpekJobWali').val().toUpperCase(),
            alamat_kantor_wali: $('#inpAlamatJobWali').val().toUpperCase(),
            phone_wali: $('#inpPhoneWali').val(),
            salary_wali: $('#inpSalaryWali').val(),
            tinggal_siswa: $('#selTinggalBersama').val().toUpperCase(),
            nm_tinggal_siswa: $('#inpTinggalBersama').val().toUpperCase(),
            jum_saudara: $('#inpJumSaudara').val(),
            jum_saudara_lakilaki: $('#inpJumMale').val(),
            jum_saudara_perempuan: $('#inpJumFemale').val(),
            jum_saudara_nikah: $('#inpJumMerried').val(),
            transport_siswa: $('#selTranport').val().toUpperCase(),
            jarak_sekolah: $('#inpJarak').val(),
            sts_ekonomi: $('#selStsEkonomi').val().toUpperCase(),
            urut: '',
            sts_siswa: 'ACTIVE',
            created_by: Meteor.user().profile.fullname,
            created_at: new Date(),
            updated_at: new Date()
        }
        alert('ok')
        console.log(dataSiswa)
    },

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

