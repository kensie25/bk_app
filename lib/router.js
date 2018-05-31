/**
 * Created by ayatekapoetra on 5/20/18.
 */
Router.configure({
    layoutTemplate: 'mainApp'
});

//Router.route("/(.*)", function() {
//    this.render('pageNotFound',{
//        to: "content"
//    });
//    this.next();
//});

//Routing Halaman Main Front atau index
Router.route('/',
    function () {
        this.render('', {
            to: "header"
        });
        this.render('', {
            to: "sidebar"
        });
        this.render('', {
            to: "content"
        });
        this.render('MainFront', {
            to: "custom"
        });
    },
    { name : 'RootIndex' });

//Routing Halaman Register
Router.route('/register',
    function () {
        this.render('RegisterUser', {
            to: "custom"
        });
    },
    { name : 'RegisterUser' });

//Routing Halaman Login Admin
Router.route('/login-admin',
    function () {
        this.render('LoginAdmin', {
            to: "custom"
        });
    },
    { name : 'LoginAdmin'});

//Routing Halaman Login Sekolah
Router.route('/login-sekolah',
    function () {
        this.render('LoginSekolah', {
            to: "custom"
        });
    },
    { name : 'LoginSekolah'});

//Routing Halaman Home Dashboard Admin
Router.route('/admin-home',
    function () {
        this.render('HeaderSA', {
            to: "header"
        });
        this.render('SidebarSA', {
            to: "sidebar",
            data: function(){
                if (this.ready()) {
                    var Currtipeuser = Meteor.user().profile.tipeuser_id;
                    var dataMenu = SysMenuBar.find({'tipeuser_id':Currtipeuser}).fetch();
                    //console.log(dataMenu)
                    return dataMenu
                }
            },
            waitOn: function () {
                Meteor.subscribe('allowMenuBar');
            }
        });
        this.render('ContentSA', {
            to: "content"
        });
        this.render('', {
            to: "custom"
        });
    },
    { name : 'AdminDashboard' });

//Routing Halaman Home Master Dashboard Admin
Router.route('/Master-Questionnaire',
    function () {
        this.render('HeaderSA', {
            to: "header"
        });
        this.render('SidebarSA', {
            to: "sidebar",
            data: function(){
                if (this.ready()) {
                    var Currtipeuser = Meteor.user().profile.tipeuser_id;
                    var dataMenu = SysMenuBar.find({'tipeuser_id':Currtipeuser}).fetch();
                    //console.log(dataMenu)
                    return dataMenu
                }
            },
            waitOn: function () {
                Meteor.subscribe('allowMenuBar');
            }
        });
        this.render('QuestionnaireForm', {
            to: "content"
        });
    },
    { name : 'QuestionnaireForm' });

Router.route('/Master-Sekolah',
    function () {
        this.render('HeaderSA', {
            to: "header"
        });
        this.render('SidebarSA', {
            to: "sidebar",
            data: function(){
                if (this.ready()) {
                    var Currtipeuser = Meteor.user().profile.tipeuser_id;
                    var dataMenu = SysMenuBar.find({'tipeuser_id':Currtipeuser}).fetch();
                    //console.log(dataMenu)
                    return dataMenu
                }
            },
            waitOn: function () {
                Meteor.subscribe('allowMenuBar');
            }
        });
        this.render('SekolahForm', {
            to: "content"
        });
    },
    { name : 'SekolahForm' });

//Routing Halaman Home Setting Dashboard Admin
Router.route('/Setting-Options',
    function () {
        this.render('HeaderSA', {
            to: "header"
        });
        this.render('SidebarSA', {
            to: "sidebar",
            data: function(){
                if (this.ready()) {
                    var Currtipeuser = Meteor.user().profile.tipeuser_id;
                    var dataMenu = SysMenuBar.find({'tipeuser_id':Currtipeuser}).fetch();
                    //console.log(dataMenu)
                    return dataMenu
                }
            },
            waitOn: function () {
                Meteor.subscribe('allowMenuBar');
            }
        });
        this.render('OptionSetting', {
            to: "content"
        });
    },
    { name : 'OptionSetting' });

Router.route('/Setting-Menu',
    function () {
        this.render('HeaderSA', {
            to: "header"
        });
        this.render('SidebarSA', {
            to: "sidebar",
            data: function(){
                if (this.ready()) {
                    var Currtipeuser = Meteor.user().profile.tipeuser_id;
                    var dataMenu = SysMenuBar.find({'tipeuser_id':Currtipeuser}).fetch();
                    //console.log(dataMenu)
                    return dataMenu
                }
            },
            waitOn: function () {
                Meteor.subscribe('allowMenuBar');
            }
        });
        this.render('MenuSetting', {
            to: "content"
        });
    },
    { name : 'OptionMenu' });


//Routing Halaman Home Dashboard Sekolah
Router.route('/sekolah-home',
    function () {
        if(Meteor.user() == undefined){
            Router.go('RootIndex')
        }else {
            this.render('HeaderSEK', {
                to: "header"
            });
        }

        this.render('SidebarSEK', {
            to: "sidebar",
            data: function(){
                if (this.ready()) {
                    var Currtipeuser = Meteor.user().profile.tipeuser_id;
                    var dataMenu = SysMenuBar.find({'tipeuser_id':Currtipeuser}).fetch();
                    //console.log(dataMenu)
                    return dataMenu
                }
            },
            waitOn: function () {
                Meteor.subscribe('allowMenuBar');
            }
        });
        this.render('ContentSEK', {
            to: "content"
        });
        this.render('', {
            to: "custom"
        });
    },
    { name : 'SekolahDashboard' });

Router.route('/Master-Students',
    function () {
        this.render('HeaderSEK', {
            to: "header"
        });
        this.render('SidebarSEK', {
            to: "sidebar",
            data: function(){
                if (this.ready()) {
                    var Currtipeuser = Meteor.user().profile.tipeuser_id;
                    var dataMenu = SysMenuBar.find({'tipeuser_id':Currtipeuser}).fetch();
                    //console.log(dataMenu)
                    return dataMenu
                }
            },
            waitOn: function () {
                Meteor.subscribe('allowMenuBar');
            }
        });
        this.render('MenuMasterStudents', {
            to: "content"
        });
    },
    { name : 'StudentsAddForm' });

Router.route('/Master-Counselors',
    function () {
        this.render('HeaderSEK', {
            to: "header"
        });
        this.render('SidebarSEK', {
            to: "sidebar",
            data: function(){
                if (this.ready()) {
                    var Currtipeuser = Meteor.user().profile.tipeuser_id;
                    var dataMenu = SysMenuBar.find({'tipeuser_id':Currtipeuser}).fetch();
                    //console.log(dataMenu)
                    return dataMenu
                }
            },
            waitOn: function () {
                Meteor.subscribe('allowMenuBar');
            }
        });
        this.render('MenuMasterCounselors', {
            to: "content"
        });
    },
    { name : 'CounselorsAddForm' });

Router.route('/Master-Kelas',
    function () {
        this.render('HeaderSEK', {
            to: "header"
        });
        this.render('SidebarSEK', {
            to: "sidebar",
            data: function(){
                if (this.ready()) {
                    var Currtipeuser = Meteor.user().profile.tipeuser_id;
                    var dataMenu = SysMenuBar.find({'tipeuser_id':Currtipeuser}).fetch();
                    //console.log(dataMenu)
                    return dataMenu
                }
            },
            waitOn: function () {
                Meteor.subscribe('allowMenuBar');
            }
        });
        this.render('MenuMasterKelas', {
            to: "content"
        });
    },
    { name : 'KelasAddForm' });

Router.route('/Master-Jurusan',
    function () {
        this.render('HeaderSEK', {
            to: "header"
        });
        this.render('SidebarSEK', {
            to: "sidebar",
            data: function(){
                if (this.ready()) {
                    var Currtipeuser = Meteor.user().profile.tipeuser_id;
                    var dataMenu = SysMenuBar.find({'tipeuser_id':Currtipeuser}).fetch();
                    //console.log(dataMenu)
                    return dataMenu
                }
            },
            waitOn: function () {
                Meteor.subscribe('allowMenuBar');
            }
        });
        this.render('MenuMasterJurusan', {
            to: "content"
        });
    },
    { name : 'JurusanAddForm' });

Router.route('/verify-email/:_token', {
    controller : 'AccountController',
    action : 'verifyEmail'
});

AccountController = RouteController.extend({
    fastRender: true,
    data: function () {},
    onBeforeAction: function () {
        this.render('TempLoading',{
            to: "custom"
        });
        this.next();
    },

    verifyEmail: function() {
        var verificationToken = this.params._token;
        console.log(verificationToken);
        Accounts.verifyEmail(verificationToken,  function(error) {
            if (error) {
                console.log(error);
            } else {
                Router.go('/sekolah-home');
            }
        });

    }
});

