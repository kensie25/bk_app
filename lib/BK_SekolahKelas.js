/**
 * Created by ayatekapoetra on 6/1/18.
 */
import SimpleSchema from 'simpl-schema';

BK_SekolahKelas = new Mongo.Collection('bk_sekolah_kelas');
BK_SekolahKelasSchema = new SimpleSchema({
    kd_sekolah: {
        type: String,
        autoValue: function(){
            var idprofile = Meteor.user().profile.sekolah_id
            var idsekolah = BK_SekolahProfile.findOne({_id: idprofile})
            var kdSekolah = idsekolah.kd_sekolah
            return kdSekolah
        }
    },
    nm_sekolah: {
        type: String,
        autoValue: function(){
            var idprofile = Meteor.user().profile.sekolah_id
            var idsekolah = BK_SekolahProfile.findOne({_id: idprofile})
            var nmSekolah = idsekolah.nm_sekolah
            return nmSekolah
        }
    },
    kd_kelas: {
        type: String,
        required: true
    },
    nm_kelas: {
        type: String,
        required: true
    },
    nm_walikelas: {
        type: String,
    },
    nip_walikelas: {
        type: String
    },
    kelas_jurusan: {
        type: String
    },
    created_by: {
        type: String,
        autoValue: function(){
            return Meteor.user().profile.fullname
        }
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    },
    urut : {
        type: Number,
        autoValue: function(){
            var data = BK_SekolahKelas.find().count()
            var urutx = data + 1
            return urutx
        }
    },
    sts_kelas: {
        type: String,
        required: true
    }
});

BK_SekolahKelas.attachSchema(BK_SekolahKelasSchema)
