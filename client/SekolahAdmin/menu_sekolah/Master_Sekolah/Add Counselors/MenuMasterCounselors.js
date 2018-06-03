/**
 * Created by ayatekapoetra on 5/30/18.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
//import './../../../../client/BKSekolahCounselors.js';
import './MenuMasterCounselors.html';

function makeid() {
    var text = "";
    var tglReg = moment(new  Date()).format('YYYYMMDD')
    var possible = "0123456789";
    for (var i = 0; i < 6; i++) //081280
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return 'HNR'+tglReg+text;
}

function standart(){
    $('#inpNuptk').attr('disabled', 'true')
    $('#inpRandCounselors').attr('disabled', 'true')
    $('#inpRandCounselors').val(makeid())

}
function pns(){
    $('#inpNip').removeAttr('disabled')
    $('#inpNuptk').attr('disabled', 'true')
    $('#inpRandCounselors').val(makeid())
}

function honorer(){
    $('#inpNuptk').removeAttr('disabled')
    $('#inpNip').attr('disabled', 'true')
    $('#inpRandCounselors').val(makeid())
}

function lainnya(){
    $('#inpNip').attr('disabled', 'true')
    $('#inpNuptk').attr('disabled', 'true')
    $('#inpRandCounselors').val(makeid())
}

Template.MenuMasterCounselors.onCreated(function(){
    //var idprofile = Meteor.user().profile.profile_id
    var idsekolah = BK_SekolahProfile.findOne({_id: Meteor.user().profile.sekolah_id})
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
        //var idprofile = Meteor.user().profile.profile_id
        var data = BK_SekolahProfile.findOne({_id: Meteor.user().profile.sekolah_id})
        Template.instance().sekolah_id.set(data)
        return data
    },

    incremented: function(index){
        index++;
        return index;
    },

    //isDataLoad: function(subdistrict_name){
    //    var loaddata = subdistrict_name
    //    console.log(loaddata)
    //    if(loaddata === '' || loaddata == undefined){
    //        return true
    //    }else{
    //        return false
    //    }
    //},

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
    },

    listCounselors: function(){
        var dataTsekolah = Template.instance().sekolah_id.get()
        var data = BK_SekolahCounselors.find({kd_sekolah:dataTsekolah.kd_sekolah}).fetch()
        var x = data.map(function(doc){
            doc.created_at = moment(doc.created_at).format('DD-MMMM-YYYY, hh:mm:ss');
            doc.updated_at = moment(doc.updated_at).format('DD-MMMM-YYYY, hh:mm:ss');
            return x
        })
        return data
    },

    isStatus: function(sts_counselors){
        if(this.sts_counselors == "ACTIVE"){
            return true
        }else{
            return false
        }
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

    //'change #updPns': function(){
    //    if($('#updPns').val() != 'LAINNYA'){
    //        $('#updNip').val('')
    //    }else{
    //        $('#updNip').attr('readonly')
    //    }
    //},

    'click #btSaveCounselors': function(e){
        e.preventDefault()
        var dataTsekolah = Template.instance().sekolah_id.get()
        var urutan = BK_SekolahCounselors.find({kd_sekolah: dataTsekolah.kd_sekolah}).count()

        var pns = $('#selPns').val()
        switch (pns){
            case 'LAINNYA':
                var kdcounselors = $('#inpRandCounselors').val()
                break;
            case 'HONORER':
                var kdcounselors = $('#inpNuptk').val()
                break;
            default:
                var kdcounselors = $('#inpNip').val()
        }
        var sts = BK_SekolahCounselors.find({
            kd_sekolah: dataTsekolah.kd_sekolah,
            kd_counselors: kdcounselors,
            sts_counselors: 'ACTIVE'
        }).count()

        if(sts > 0){
            sweetAlert("ERROR", "Duplikasi Data", "error")
        }else{
            var chars = kdcounselors
            var string_length = 8;
            var randomstring = '';
            for (var i=0; i<string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum,rnum+1);
            }
            var dataCounselors = {
                kd_sekolah: dataTsekolah.kd_sekolah,
                nm_sekolah: dataTsekolah.nm_sekolah,
                kd_counselors: kdcounselors,
                sts_jabatan: $('#selPns').val().toUpperCase(),
                nm_lengkap: $('#inpNmLengkap').val().toUpperCase(),
                agama: $('#selAgama').val().toUpperCase(),
                jenkel: $('#selJenkel').val().toUpperCase(),
                tempat_lahir: $('#inpT4lahir').val().toUpperCase(),
                tanggal_lahir: new Date($('#inpTglLahir').val()),//$('#').val().toUpperCase(),
                email: $('#inpEmail').val(),
                pass: randomstring,
                phone: $('#inpHandPhone').val(),
                alamat: $('#inpAlamat').val().toUpperCase(),
                provinsi: $('#selProvince').val().toUpperCase(),
                kota: $('#selKota').val().toUpperCase(),
                kecamatan: $('#selKecamatan').val().toUpperCase(),
                kelurahan: $('#inpKelurahan').val().toUpperCase(),
                rt: $('#inpRt').val(),
                rw: $('#inpRw').val(),
                kodepos: $('#inpKodepos').val(),
                created_at: new Date(),
                updated_at: new Date(),
                urut: urutan + 1,
                sts_counselors: 'ACTIVE'
            }
            var profilecount = BK_UserProfile.find({counselors_id: dataCounselors.email}).count()
            if(profilecount > 0){
                sweetAlert("ERROR", "Email Sudah digunakan oleh profile lain...", "error")
            }else{
                BK_SekolahCounselors.insert(dataCounselors, function(error, result){
                    if(!error){
                        var xurut = BK_UserProfile.find({nama_tipe: 'COUNSELORS'}).count()
                        var dataProfile = {
                            fullname: dataCounselors.nm_lengkap,
                            tipe_identitas: dataCounselors.sts_jabatan,
                            no_identitas: dataCounselors.kd_counselors,
                            email: dataCounselors.email,
                            handphone: dataCounselors.phone,
                            tipeuser_id: '3',
                            nama_tipe: 'COUNSELORS',
                            sekolah_id: dataTsekolah._id,
                            counselors_id: result,
                            created_at: new Date(),
                            updated_at: new Date(),
                            urut: xurut + 1
                        }
                        BK_UserProfile.insert(dataProfile, function(error, result) {
                            if (!error) {
                                sweetAlert("SUCCESS", "Sukses menambah Data Counselor di "+dataTsekolah.nm_sekolah, "success")
                                $(':input').val('')
                            }else{
                                var errStr = error.message
                                var err = errStr.split('in bk')
                                sweetAlert("ERROR", err[0], "error")
                                throw  new Meteor.Error(error)
                            }
                        })
                        //sweetAlert("SUCCESS", "Sukses menambah Data Counselor di "+dataTsekolah.nm_sekolah, "success")
                    }else{
                        var errStr = error.message
                        var err = errStr.split('in bk')
                        sweetAlert("ERROR", err[0], "error")
                        throw  new Meteor.Error(error)

                    }
                })
            }
        }

    },

    'click #btDelCounselor': function(){
        //console.log(this._id, new Date())
        var removeid = BK_SekolahCounselors.update({_id: this._id},
            {$set: {sts_counselors: 'INACTIVE', updated_at:new Date()}}, function(error, result){
                if(!error){
                    sweetAlert("SUCCESS", "Sukses DELETE Data Counselor", "success")
                }else{
                    var errStr = error.message
                    var err = errStr.split('.')
                    console.log(err)
                    sweetAlert("ERROR", err[0], "error")
                    throw  new Meteor.Error(error)
                }
            })
        return removeid
    },

    'click #btDtlCounselor': function(){
        //sweetAlert("SORRY", "Maaf,,, Halaman ini masih dalam development...", "warning")
        console.log(this._id, this.kd_counselors, this.nm_lengkap)
        $('#dtlcounselors').html(this.nm_lengkap)
        $('#updNip').val(this.kd_counselors)
        $('#updPns').val(this.sts_jabatan)
        $('#updEmail').val(this.email)
        $('#updHandPhone').val(this.phone)
        $('#updAlamat').val(this.alamat)
        $('#updStsCounselors').val(this.sts_counselors)
        $('#dtlRow').show()
        $('#inpRow').hide()
        $('#tblRow').hide()
    },

    'click #btBackDtlCounselors': function(){
        $('#dtlRow').hide()
        $('#inpRow').show()
        $('#tblRow').show()
    },

    'click #btUpdDtlCounselors': function(){
        var kode = $('#updNip').val()
        var email = $('#updEmail').val()
        var hp = $('#updHandPhone').val()
        var idx = BK_SekolahCounselors.findOne({kd_counselors: kode, email: email, phone: hp})
        console.log(idx)
        BK_SekolahCounselors.update({_id: idx._id},
            {$set:{sts_counselors: 'ACTIVE', updated_at: new Date()}}, function(error, result){
                if(!error){
                    sweetAlert("SUCCESS", "Sukses UPDATE Data Counselor", "success")
                    $('#dtlRow').hide()
                    $('#inpRow').show()
                    $('#tblRow').show()
                }else{
                    sweetAlert("ERROR", error.message, "error");
                }
            })

    },

    'click #btActivedCounselor': function(){
        var profilid = BK_UserProfile.findOne({counselors_id: this._id})
        //console.log(profilid)
        var dataCounselors = {
            fullname: this.nm_lengkap,
            password: this.pass,
            email: this.email,
            handphone: this.phone,
            tipeuser_id: '3',
            //nama_tipe: 'COUNSELORS',
            profile_id: profilid._id,
            counselors_id: this._id
        }
        var checkUser = Meteor.users.findOne({emails: {$elemMatch: {address: dataCounselors.email}}})
        //console.log(checkUser)
        if(checkUser === undefined){
            Meteor.call('createdUserCounselors', dataCounselors, function(error, result) {
                if (!error) {
                    var userEmailNew = dataCounselors.email
                    var userNew = Meteor.users.findOne({emails: {$elemMatch: {address: userEmailNew}}})

                    var NewUserId = userNew._id
                    Meteor.call('sendVerificationLink', NewUserId, function (err, res) {
                        if (err) {
                            sweetAlert("ERROR", err.message, "error");
                        } else {
                            var notifEmail = {
                                emailx: dataCounselors.email,
                                passx: dataCounselors.password
                            }
                            Meteor.call('emailsend', notifEmail, function (error, result) {
                                if (!error) {
                                    sweetAlert("SUCCESS", "Sukses Create Akun Counselor..., User & Password akan di kirim ke " + dataCounselors.email, "success")
                                }
                            })

                        }
                    })

                }else{
                    sweetAlert("ERROR", err.message, "error");
                }
            })
        }else{
            sweetAlert("WARNING", "Email sdh di gunakan User lain, System akan mengirimkan kembali aktivasi akun ke " + dataCounselors.email, "success")
            var userEmailNew = dataCounselors.email
            var userNew = Meteor.users.findOne({emails: {$elemMatch: {address: userEmailNew}}})

            var NewUserId = userNew._id
            Meteor.call('sendVerificationLink', NewUserId, function (err, res) {
                if (err) {
                    sweetAlert("ERROR", err.message, "error");
                } else {
                    var notifEmail = {
                        emailx: dataCounselors.email,
                        passx: dataCounselors.password
                    }
                    Meteor.call('emailsend', notifEmail, function (error, result) {
                        if (!error) {
                            sweetAlert("SUCCESS", "User & Password akan di kirim ke " + dataCounselors.email, "success")
                        }
                    })

                }
            })
        }

    }
})