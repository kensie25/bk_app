import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template["AdminLTE_loading"] = new Template("Template.AdminLTE_loading", (function() {
    var view = this;
    //var html = "<img src='./loader2.gif' class='img-thumbnail'>";
    //return HTML.Raw("<h3 class='text-active' style='color: white;'>Please, wait a moment...</h3>");
    return HTML.Raw("<img src='./loading8.gif' class='img-responsive' style='margin-top:5%;margin-bottom:20%;margin-left:20%;margin-right:20%;'>");
}));
