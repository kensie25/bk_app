/**
 * Created by ayatekapoetra on 5/24/18.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './SekolahTable.html';


Template.SekolahTable.onCreated(function(){
    //$('#loading').html('Loading Data');
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
        return SekolahProfile.find({});
    }
});

Template.SekolahTable.events({
    'click #btActivateUser': function(e){
        e.preventDefault()
        //alert(this.nm_sekolah)
        var data = {
            email: this.email,
            pass: this.pass,
            profile: {
                fullname: this.nm_sekolah,
                tipeuser_id: '2',
                handphone: this.phone,
                tipe_user: [
                    {adm_sekolah: false}
                ],
                profile_id: this._id
            }
        }

        Meteor.call('createdUserSekolah', data, function(err, res){
            if(err){
                alert(err.reason)
            }else{

                alert('Created Akun Sukses...')
                var userNew = Meteor.users.findOne({emails:{ $elemMatch: { address:  data.email } }});
                console.log(userNew._id)
                var NewUserId = userNew._id
                Meteor.call('sendVerificationLink', NewUserId, function(err, res){
                    if(err){
                        alert(err.reason)
                    }
                })
            }
        })
    }
});