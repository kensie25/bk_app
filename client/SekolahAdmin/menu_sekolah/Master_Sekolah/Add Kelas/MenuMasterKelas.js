/**
 * Created by ayatekapoetra on 5/29/18.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './MenuMasterKelas.html';

Template.MenuMasterKelas.onCreated(function(){
    //var idprofile = Meteor.user().profile.profile_id
    var idsekolah = BK_SekolahProfile.findOne({_id: Meteor.user().profile.sekolah_id})
    this.sekolah_id = new ReactiveVar(idsekolah)
    //console.log(Meteor.status())

})

Template.MenuMasterKelas.onRendered(function(){
    var dataTsekolah = Template.instance().sekolah_id.get()
    console.log(dataTsekolah)
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

Template.MenuMasterKelas.helpers({
    sekolahProfile: function(){
        //var idprofile = Meteor.user().profile.profile_id
        var data = BK_SekolahProfile.findOne({_id: Meteor.user().profile.sekolah_id})
        Template.instance().sekolah_id.set(data)
        return data
    },

    incremented: function(index){
        index++;
        return index;
    },

    optJurusan: function(){
        var dataTsekolah = Template.instance().sekolah_id.get()
        var jur = BK_SekolahJurusan.find({kd_sekolah: dataTsekolah.kd_sekolah, sts_jurusan: 'ACTIVE'}).fetch()
        return jur
    },

    listKelas: function(){
        //var idprofile = Meteor.user().profile.profile_id
        var data = BK_SekolahProfile.findOne({_id: Meteor.user().profile.sekolah_id})
        return BK_SekolahKelas.find({kd_sekolah: data.kd_sekolah, sts_kelas: 'ACTIVE'}).fetch()
    }
})

Template.MenuMasterKelas.events({
    'click #btSaveKelas': function(e){
        e.preventDefault()
        var dataTsekolah = Template.instance().sekolah_id.get()
        var datains = {
            kd_sekolah: dataTsekolah.kd_sekolah,
            nm_sekolah: dataTsekolah.nm_sekolah,
            kd_kelas: $('#inpKdKelas').val().toUpperCase(),
            nm_kelas: $('#inpNmKelas').val().toUpperCase(),
            nm_walikelas: $('#inpNmWaliKelas').val().toUpperCase(),
            nip_walikelas: $('#inpNipWaliKelas').val().toUpperCase(),
            kelas_jurusan: $('#selJurusan').val(),
            sts_kelas: 'ACTIVE',
            created_by: Meteor.user().profile.fullname,
            created_at: new Date(),
            updated_at: new Date(),
            urut: (BK_SekolahKelas.find().count()) + 1
        }

        BK_SekolahKelas.insert(datains, function(error, res){
            if(!error){
                sweetAlert("SUCCESS", "Insert Data Kelas Baru Sukses...", "success")
            }else{
                console.log(error)
                sweetAlert("ERROR", "Gagal Menyimpan Data...", "error")
            }
        })
    },

    'click #btDelKelas': function(){
        console.log(this._id)
        BK_SekolahKelas.update({_id: this._id}, {$set:{sts_kelas: 'INACTIVE'}}, function(error, res){
            if(!error){
                sweetAlert("SUCCESS", "Data Kelas berhasil di Hapus...", "success")
                $(':input').val('')
            }else{
                console.log(error)
                sweetAlert("ERROR", "Gagal Menghapus Data...", "error")
            }
        })
    }
})