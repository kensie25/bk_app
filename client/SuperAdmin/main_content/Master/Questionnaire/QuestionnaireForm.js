/**
 * Created by ayatekapoetra on 5/22/18.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './QuestionnaireForm.html';

Template.QuestionnaireForm.onRendered(function(){
    $('#GrpQuestions').select2();
    $('#stsQuestions').select2();
});

Template.QuestionnaireForm.helpers({
    stsTanya: function(sts_pertanyaan){
        if(this.sts_pertanyaan != true){
            return "inactive";
        }else {
            return "active";
        }
    },

    grpMasalah: function(){
        var data = SysOptions.find({'title': 'MASALAH'});
        return data
    },

    dataQuestions: function(){
        var data = BK_Questions.find({}).fetch();
        return data
    }
});

Template.QuestionnaireForm.events({
    'click #btaddQuestion': function(e){
        e.preventDefault();
        if($('#txtQuestion').val() === ''){
            sweetAlert("ERROR", "Question must Fill", "error");
        }else{
            //Questions.insert({});
            var increment = BK_Questions.find({}).count();
            //console.log(increment + 1, $('#stsQuestions').val());
            if($('#GrpQuestions').val() != '' || $('#GrpQuestions').val() != undefined){
                BK_Questions.insert({
                    urut            : increment + 1,
                    pertanyaan      : $('#txtQuestion').val(),
                    kode_pertanyaan : $('#GrpQuestions').val(),
                    sts_pertanyaan  : $('#stsQuestions').val(),
                    created_by      : Meteor.userId()._id,
                    created_at      : new Date(),
                    updated_at      : ''
                }, function(err, res){
                    if(!err){
                        $('#txtQuestion').val('');
                        sweetAlert("SUCCESS", "Data Berhasil di Simpan...", "success");
                    }else {
                        sweetAlert("ERROR", err.reason, "error");
                    }
                });
            }else {
                sweetAlert("ERROR", "Kode atau Kelompok Masalah harus dipilih...", "error");
                $('#GrpQuestions').focus;
            }

        }
    },

    'click #btDelQuestion': function(e){
        e.preventDefault();
        BK_Questions.remove(this._id);
        sweetAlert("SUCCESS", "Data Berhasil di Hapus...", "success");
    },

    'click #sts_pertanyaan': function(sts_pertanyaan){
        var reacData = new ReactiveVar(this.sts_pertanyaan);
        if(reacData.curValue === true){
            return BK_Questions.update(this._id, {$set: {'sts_pertanyaan': false, 'updated_at': new Date()}});
        }else{
            return BK_Questions.update(this._id, {$set: {'sts_pertanyaan': true, 'updated_at': new Date()}});
        }

    }
});