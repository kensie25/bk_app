/**
 * Created by ayatekapoetra on 5/22/18.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './OptionSetting.html';


Template.OptionSetting.helpers({
    incremented: function(index){
        index++;
        return index;
    },

    selOptions: function(){
        return SysOptions.find({'title':'STATUS'});
    },

    dataOptions: function(){
        var data = SysOptions.find({}).map(function(doc, created_time){
            doc.created_time = moment(document.created_at).startOf('day').fromNow();
            return doc
        });
        return data;
    }

});

Template.OptionSetting.events({
    'click #btaddOptions': function(e){
        e.preventDefault();
        if($('#stsOpt').val().toUpperCase() != '' || $('#stsOpt').val().toUpperCase() === undefined){
            var inc = SysOptions.find({"title": $('#titleOpt').val().toUpperCase()}).count();
            var inpData = {
                title       : $('#titleOpt').val().toUpperCase(),
                nilai       : $('#nilaiOpt').val().toUpperCase(),
                teks        : $('#teksOpt').val().toUpperCase(),
                urut        : inc + 1,
                sts_options : $('#stsOpt').val(),
                created_by  : Meteor.userId()._id,
                created_at  : new Date(),
                updated_at  : ''
            }
            SysOptions.insert(inpData, function(err, res){
                if(!err){
                    sweetAlert("SUCCESS", "Data Berhasil di Simpan...", "success");
                    $(':input').val('');
                }else {
                    sweetAlert("ERROR", err.reason, "error");
                }
            })
        }else {
            sweetAlert("ERROR", "Status Options Must Fill...", "error");
            $('#stsOpt').focus;
        }

    },

    'click #btDelOpt': function(){
        //sweetAlert("ERROR", "Status Options Must Fill...", "error");
        SysOptions.remove(this._id);
    }
});