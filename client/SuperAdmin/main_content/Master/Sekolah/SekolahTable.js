/**
 * Created by ayatekapoetra on 5/24/18.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './SekolahTable.html';


Template.SekolahTable.onCreated(function(){
    //console.log(Meteor.users.findOne({emails:{ $elemMatch: { address:  this.email } }}))
})

Template.SekolahTable.helpers({
    urut: function(index){
        index++
        return index
    },

    StsSekolah: function(sts_sekolah){
        if(sts_sekolah == true){
            return true
        }else{
            return false
        }

    },

    tabSekolah: function(){
        return BK_SekolahProfile.find({});
    }
});

Template.SekolahTable.events({
    'click #btActivateUser': function(e){
        e.preventDefault()
        var xurut = BK_UserProfile.find({tipeuser_id: '2'}).count()
        var userprofile = BK_UserProfile.findOne({sekolah_id: this._id})
        var userprofile_id = userprofile._id
        //console.log(userprofile._id)
        //console.log(this.email_sekolah, this.nm_operator, this.phone_operator, this.email_operator)
        var data = {
            email: this.email_sekolah,
            pass: this.pass,
            profile: {
                fullname: this.nm_operator,
                tipeuser_id: '2',
                handphone: this.phone_operator,
                tipe_user: [
                    {operator_sekolah: true}
                ],
                profile_id: userprofile_id,
                sekolah_id: this._id
            }
        }

        Meteor.call('createdUserSekolah', data, function(err, res){
            if(err){
                //alert(err.reason)
                sweetAlert("ERROR", err.message, "error");
            }else{
                sweetAlert("SUCCESS", "Link Aktifasi telah dikirim ke email "+data.email, "success");
                var userNew = Meteor.users.findOne({emails:{ $elemMatch: { address:  data.email } }});
                console.log(userNew._id)
                var NewUserId = userNew._id
                Meteor.call('sendVerificationLink', NewUserId, function(err, res){
                    if(err){
                        sweetAlert("ERROR", err.message, "error");
                    }
                })
            }
        })
    }
});