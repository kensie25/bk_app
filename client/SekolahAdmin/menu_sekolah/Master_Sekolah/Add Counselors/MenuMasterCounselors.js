/**
 * Created by ayatekapoetra on 5/30/18.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

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
        var data = BK_SekolahCounselors.find({kd_sekolah:dataTsekolah.kd_sekolah, sts_counselors: true}).fetch()
        var x = data.map(function(doc){
            doc.created_at = moment().format('LLL');
            return x
        })
        return data
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
            sts_counselors: true
        }).count()

        if(sts > 0){
            sweetAlert("ERROR", "Duplikasi Data", "error")
        }else{
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
                update_at: new Date(),
                urut: urutan + 1,
                sts_counselors: true
            }
            BK_SekolahCounselors.insert(dataCounselors, function(error, result){
                if(!error){
                    console.log(error, result)
                    sweetAlert("SUCCESS", "Sukses menambah Data Counselor di "+dataTsekolah.nm_sekolah, "success")
                }else{
                    var errStr = error.message
                    var err = errStr.split('in bk')
                    sweetAlert("ERROR", err[0], "error")
                    throw  new Meteor.Error(error)

                }
            })
        }
        console.log(dataCounselors)
    }
})