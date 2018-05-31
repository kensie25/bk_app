/**
 * Created by ayatekapoetra on 6/1/18.
 */
import SimpleSchema from 'simpl-schema';

BK_SekolahJurusan = new Mongo.Collection('bk_sekolah_jurusan');
BK_SekolahJurusanSchema = new SimpleSchema({
    kd_sekolah: {
        type: String,
        autoValue: function(){
            var idprofile = Meteor.user().profile.profile_id
            var idsekolah = BK_SekolahProfile.findOne({_id: idprofile})
            var kdSekolah = idsekolah.kd_sekolah
            return kdSekolah
        }
    },
    nm_sekolah: {
        type: String,
        autoValue: function(){
            var idprofile = Meteor.user().profile.profile_id
            var idsekolah = BK_SekolahProfile.findOne({_id: idprofile})
            var nmSekolah = idsekolah.nm_sekolah
            return nmSekolah
        }
    },
    kd_jurusan: {
        type: String,
        required: true
    },
    nm_jurusan: {
        type: String,
        required: true
    },
    ket_jurusan: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        autoValue: function(){
            return Meteor.user().profile.fullname
        }
    },
    created_at: {
        type: Date,
        autoValue: function(){
            return new Date()
        }
    },
    updated_at: {
        type: Date,
        autoValue: function(){
            return new Date()
        }
    },
    urut: {
        type: Number,
        required: true
    },
    sts_jurusan: {
        type: String,
        required: true
    }
})

BK_SekolahJurusan.attachSchema(BK_SekolahJurusanSchema)
