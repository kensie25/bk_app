/**
 * Created by ayatekapoetra on 6/4/18.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './ContentSEK.html';

Template.ContentSEK.helpers({
    sekolahProfile: function(){
        var tempData = Meteor.user().profile.sekolah_id
        //console.log(SekolahProfile.findOne({_id: tempData}))
        return BK_SekolahProfile.findOne({_id: tempData})
    },
})
