/**
 * Created by ayatekapoetra on 5/21/18.
 */
import SimpleSchema from 'simpl-schema';


SysTipeUser = new Mongo.Collection('sys_tipeuser');
SysMenuBar = new Mongo.Collection('sys_menubar');
SysSubMenuBar = new Mongo.Collection('sys_submenubar');
SysOptions = new Mongo.Collection('sys_options');
SysKodePos = new Mongo.Collection('sys_kodepos');
SysProvinsi = new Mongo.Collection('sys_provinsi');
SysKabupaten = new Mongo.Collection('sys_kabupaten');
SysKecamatan = new Mongo.Collection('sys_kecamatan');
BK_UserProfile = new Mongo.Collection('bk_user_profile');
BK_SekolahProfile = new Mongo.Collection('bk_sekolah_profile');
BK_Questions = new Mongo.Collection('bk_questions');


BK_SekolahCounselors = new Mongo.Collection('bk_sekolah_counselors');
BK_SekolahCounselorsSchema = new SimpleSchema({
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
        autoValue: function(){
            return new Date()
        }
    },
    update_at: {
        type: Date,
        autoValue: function(){
            return new Date()
        }
    },
    urut: {
        type: Number,
        required: true
    },
    sts_counselors: {
        type: Boolean,
        required: true
    }
})
BK_SekolahCounselors.attachSchema(BK_SekolahCounselorsSchema)

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
    update_at: {
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
        type: Boolean,
        required: true
    }
})

BK_SekolahJurusan.attachSchema(BK_SekolahJurusanSchema)

BK_SekolahKelas = new Mongo.Collection('bk_sekolah_kelas');
BK_SekolahKelasSchema = new SimpleSchema({
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
        autoValue: function(){
            return new Date()
        }
    },
    updated_at: {
        type: Date,
        autoValue: function() {
            return new Date()
        }
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
        type: Boolean,
        autoValue: function(){
            var isDuplicate = BK_SekolahKelas.find({kd_sekolah: this.kd_sekolah, kd_kelas: this.kd_kelas}).count()
            if(isDuplicate != 1){
                //throw new Meteor.Error("Duplicate Key", "Data Duplikasi...")
                return false
            }else{
                return true
            }

        }
    }
});

BK_SekolahKelas.attachSchema(BK_SekolahKelasSchema)
