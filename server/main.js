import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

    var Sys_TipeUser = [
        {
            tipeuser_id: '1',
            nama_tipe: 'administrator'
        },
        {
            tipeuser_id: '2',
            nama_tipe: 'adm_sekolah'
        },
        {
            tipeuser_id: '3',
            nama_tipe: 'guru_bk'
        },
        {
            tipeuser_id: '4',
            nama_tipe: 'pelajar'
        }
    ]
    var SysMenuSideBar = [
        {
            tipeuser_id: '1',
            tipe_user: 'administrator',
            mainmenu_id: '1',
            nama_mainmenu: 'Master'
        },
        {
            tipeuser_id: '1',
            tipe_user: 'administrator',
            mainmenu_id: '2',
            nama_mainmenu: 'Setting'
        },
        {
            tipeuser_id: '1',
            tipe_user: 'administrator',
            mainmenu_id: '3',
            nama_mainmenu: 'User'
        }
    ]

    var jumDataTipeUser = SysTipeUser.find().count();
    if(jumDataTipeUser === 0){
        _.each(Sys_TipeUser, function(doc) {
            //console.log(doc)
            SysTipeUser.insert(doc);
        })
    }
    var jumDataMunuBar = SysTipeUser.find().count();
    if(jumDataMunuBar === 0){
        _.each(SysMenuSideBar, function(doc) {
            SysMenuBar.insert(doc);
        })
    }
//
    process.env.MAIL_URL = "smtp://postmaster%40sandbox83d6ae5db01b4a7992ebc347dae450ca.mailgun.org:81d544e903212d87a2179892264dfdd6-115fe3a6-573dea07@smtp.mailgun.org:587";
    //var dataJson = JSON.parse(Assets.getText('dataJson/Sys_SubMenuBar.json'))
    //_.each(dataJson, function(data) {
    //    // replace this with something like Companions.insert(companion);
    //    SysSubMenuBar.insert(data)
    //    console.log(data)
    //})

    //Meteor.publish('allowData', function() {
    //    var ok = SysKodePos.find({provinsi: Meteor.userId().profile.provinsi});
    //    console.log(ok);
    //    return ok
    //})
//console.log(SysKodePos.find({provinsi: Meteor.userId().profile.provinsi}))
});

Meteor.publish('allowTipeUser', function() {
    var tipeuser = SysTipeUser.find();
    return tipeuser
});

Meteor.publish('allowMenuBar', function() {
    var menubar = SysMenuBar.find();
    return menubar
});

Meteor.publish("allUsers", function () {
    return Meteor.users.find({});
});

Meteor.publish('allowProvinsi', function() {
    var province = SysProvinsi.find();
    return province
});

Meteor.publish('allowKabupaten', function() {
    var kabupaten = SysKabupaten.find();
    return kabupaten
});

Meteor.publish('allowKecamatan', function() {
    var kecamatan = SysKecamatan.find();
    return kecamatan
});

Meteor.publish('allowSekolahProfile', function() {
    var sekolah_profile = BK_SekolahProfile.find();
    return sekolah_profile
});

Meteor.publish('allowUserProfile', function() {
    var userprofile = BK_UserProfile.find();
    return userprofile
});

Meteor.publish('allowSysOptions', function() {
    return SysOptions.find();
});

Meteor.publish('allowSekolahCounselors', function() {
    return BK_SekolahCounselors.find();
});

Meteor.publish('allowSekolahKelas', function() {
    return BK_SekolahKelas.find();
});

Meteor.publish('allowSekolahJurusan', function() {
    return BK_SekolahJurusan.find({});

});




//Meteor.publish('allowKodepos_byId', function() {
//    //check(prov, String);
//    //var kodepos = SysKodePos.find({'provinsi': Meteor.user().profile.provinsi});
//    var xprov = SysKodePos.find({});
//    if(xprov){
//        return xprov
//    }
//    return this.ready();
//});



Meteor.methods({
    'createdUserCounselors': function(dataToServer){
        var data = {
            email: dataToServer.email,
            password: dataToServer.password,
            profile: {
                fullname: dataToServer.fullname,
                tipeuser_id: '3',
                handphone: dataToServer.handphone,
                tipe_user:[
                    {counselors: true}
                ],
                profile_id: dataToServer.profile_id
            }
        }
        console.log(dataToServer)
        pattern = { email: String, password: String, fullname: String, tipeuser_id: String, handphone: String, counselors: Boolean, profile_id: String }
        check(dataToServer, pattern)

        Accounts.createUser(data)
    },

    'createdUserSekolah':function(data){
        pattern = { email: String, pass: String, nm_sekolah: String, alamat_sekolah: String, tipeuser_id: String }

        var email = data.email
        var pass = (data.pass)

        var xdata = {
            email : data.email,
            pass : (data.pass),
            nm_sekolah: data.profile.fullname,
            tipeuser_id: '2',
            alamat_sekolah: data.profile.profile_id
        }
        check(xdata, pattern)

        console.log(email, pass)
        console.log(xdata)
        Accounts.createUser({
            email: data.email,
            password: data.pass,
            profile: {
                fullname: data.profile.fullname,
                tipeuser_id: '2',
                handphone: data.profile.handphone,
                tipe_user: [
                    { adm_sekolah : true }
                ],
                profile_id: data.profile.profile_id
            }
        })
    },

    'sendVerificationLink': function(NewUserId){
        var userId = NewUserId;
        if ( userId ) {
            Accounts.emailTemplates.siteName = "BikApp";
            Accounts.emailTemplates.from     = "BikApp <admin@bk.com>";

            Accounts.emailTemplates.verifyEmail = {
                 subject(){
                    return "[BikApp] Verify Your Email Address";
                },
                text( userId, url ) {
                    let emailAddress   = userId.emails[0].address,
                        urlWithoutHash = url.replace( '#/', '' ),
                        supportEmail   = "support@bk.com",
                        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;
                        //emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ayat.ekapoetra@gmail.com.`;

                    return emailBody;
                }
            };
            return Accounts.sendVerificationEmail( userId );
        }
    },

    'emailsend': function(){
        this.unblock();
        Email.send({
            to: "ayat.ekapoetra@gmail.com",
            from: "ayat.ekaputra@gmail.com",
            subject: "Registrasi Sekolah",
            text: "The contents of our email in plain text.",
        });
    },



    'getKota': function(prov){
        console.log(SysKabupaten.find({'provinsi': prov}).fetch())
        return SysKabupaten.find({'provinsi': prov}).fetch();

    },

    //'getKecamatan': function(kecamatan){
    //    var datCamat = _.uniq(SysKodePos.find({kecamatan: kecamatan},{sort: {
    //                        kecamatan: 1}
    //                        }).fetch(), true, function(doc){
    //                        return doc.kecamatan;
    //                        });
    //
    //            console.log(datCamat)
    //            return datCamat
    //}

    //'getJson': function(){
    //    this.unblock();
    //    HTTP.get(Meteor.absoluteUrl("./kodepos.json")).data;
    //}

});