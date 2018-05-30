/**
 * Created by ayatekapoetra on 5/30/18.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './MenuMasterJurusan.html';

Template.MenuMasterJurusan.onCreated(function(){
    var idprofile = Meteor.user().profile.profile_id
    var idsekolah = BK_SekolahProfile.findOne({_id: idprofile})
    this.sekolah_id = new ReactiveVar(idsekolah)

})

Template.MenuMasterJurusan.onRendered(function(){
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

Template.MenuMasterJurusan.helpers({
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

    //isTrue: function(sts_jurusan){
    //    if(sts_jurusan == true){
    //        return true
    //    }else{
    //        return false
    //    }
    //
    //},

    listJurusan: function(){
        var dataTsekolah = Template.instance().sekolah_id.get()
        return BK_SekolahJurusan.find({kd_sekolah: dataTsekolah.kd_sekolah, sts_jurusan: true}).fetch()
    }

})

Template.MenuMasterJurusan.events({
    'focusin #inpKetJurusan': function(){
        $('#inpKetJurusan').val('')
    },

    'focusout #inpKetJurusan': function(){
        $('#inpKetJurusan').val('No Descriptions')
    },

    'click #btSaveJurusan': function(e){
        e.preventDefault()
        var dataTsekolah = Template.instance().sekolah_id.get()
        var urutan = BK_SekolahJurusan.find({kd_sekolah: dataTsekolah.kd_sekolah}).count()
        var sts = BK_SekolahJurusan.find({
            kd_sekolah: dataTsekolah.kd_sekolah,
            kd_jurusan: $('#inpKdJurusan').val().toUpperCase(),
            sts_jurusan: true
        }).count()
        if(sts > 0){
            sweetAlert("ERROR", "Duplikasi Data", "error")
        }else{
            var dataJur = {
                kd_sekolah: dataTsekolah.kd_sekolah,
                nm_sekolah: dataTsekolah.nm_sekolah,
                kd_jurusan: $('#inpKdJurusan').val().toUpperCase(),
                nm_jurusan: $('#inpNmJurusan').val().toUpperCase(),
                ket_jurusan: $('#inpKetJurusan').val(),
                urut: urutan + 1,
                sts_jurusan: true
            }
            BK_SekolahJurusan.insert(dataJur, function(error, result){
                if(!error){
                    sweetAlert("SUCCESS", "Insert Data Jurusan Baru Sukses...", "success")
                }else{
                    console.log(error)
                    sweetAlert("ERROR", "Gagal Menyimpan Data...", "error")
                }
            })
        }
        $(':input').val('')
        $('#inpKetJurusan').val('No Descriptions')
    },

    'click #btDelJurusan': function(e){
        e.preventDefault()
        BK_SekolahJurusan.update({_id: this._id}, {$set:{sts_jurusan: false}}, function(error, res){
            if(!error){
                sweetAlert("SUCCESS", "Data Jurusan berhasil di Hapus...", "success")
                $(':input').val('')
            }else{
                console.log(error)
                sweetAlert("ERROR", "Gagal Menghapus Data...", "error")
            }
        })
    }
})