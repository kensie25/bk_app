/**
 * Created by ayatekapoetra on 6/1/18.
 */
import SimpleSchema from 'simpl-schema';

BK_SekolahCounselors = new Mongo.Collection('bk_sekolah_counselors');
BK_SekolahCounselorsSchema = new SimpleSchema({
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
    kd_counselors: {
        type: String,
        required: true
    },
    sts_jabatan: {
        type: String,
        required: true
    },
    nm_lengkap: {
        type: String,
        required: true
    },
    agama: {
        type: String,
        required: true
    },
    jenkel: {
        type: String,
        required: true
    },
    tempat_lahir: {
        type: String
    },
    tanggal_lahir: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    alamat: {
        type: String
    },
    provinsi: {
        type: String
    },
    kota: {
        type: String
    },
    kecamatan: {
        type: String
    },
    kelurahan: {
        type: String
    },
    rt: {
        type: String
    },
    rw: {
        type: String
    },
    kodepos: {
        type: Number
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
    urut: {
        type: Number,
        required: true
    },
    sts_counselors: {
        type: String,
        required: true
    }
})
BK_SekolahCounselors.attachSchema(BK_SekolahCounselorsSchema)
