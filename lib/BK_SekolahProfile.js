/**
 * Created by ayatekapoetra on 6/1/18.
 */
import SimpleSchema from 'simpl-schema';

BK_SekolahProfile = new Mongo.Collection('bk_sekolah_profile');
BK_SekolahProfileSchema =new SimpleSchema({
    tipeuser_id: {
        type: String,
        autoValue: function(){
            return '2'
        }
    },
    tipe_user: {
        type: String,
        autoValue: function(){
            return 'adm_sekolah'
        }
    },
    kd_sekolah: {
        type: String,
        required: true
    },
    nm_sekolah: {
        type: String,
        required: true
    },
    jenjang_sekolah: {
        type: String,
        required: true
    },
    tipe_sekolah: {
        type: String,
        required: true
    },
    akreditasi: {
        type: String,
        required: true
    },
    alamat_sekolah: {
        type: String,
        required: true
    },
    provinsi: {
        type: String,
        required: true
    },
    kota: {
        type: String,
        required: true
    },
    kecamatan: {
        type: String,
        required: true
    },
    kelurahan: {
        type: String,
        required: true
    },
    kodepos: {
        type: Number,
        required: true
    },
    email_sekolah: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    phone_sekolah: {
        type: String,
        required: true
    },
    nm_kepsek: {
        type: String,
        required: true
    },
    nip_kepsek: {
        type: String,
        required: true
    },
    nm_operator: {
        type: String,
        required: true
    },
    email_operator: {
        type: String,
        required: true
    },
    phone_operator: {
        type: String,
        required: true
    },
    identitas_operator: {
        type: String,
        required: true
    },
    tipe_indentitas_operator: {
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
    sts_sekolah: {
        type: String,
        required: true
    }
})
BK_SekolahProfile.attachSchema(BK_SekolahProfileSchema)
