//Arrays for Data Check
var boons = ['Aegis','Alacrity', 'Fury', 'Might', 'Protection', 'Quickness', 'Regeneration', 'Resistance', 'Retaliation', 'Stability','Swiftness','Vigor'];
var effects = ['Daze','Float','Knockback','Knockdown','Launch','Pull','Sink','Stun','Barrier','Nourishment','Enhancement','Invulnerability','Revealed','Stealth','Superspeed'];
var conditions = ['Bleeding','Blind','Burning','Chilled','Confusion','Crippled','Fear','Immobile','Poison','Slow','Taunt','Torment','Vulnerability','Weakness'];
var buffs = ['Banner_Of_Strength'];

$(document).ready(function(){

//Trigger for each Tooltip input
  $('.effect-Tooltip').each(function() {
//Get Tooltip Data
    var name = $(this).attr('data-name');
    var type = $(this).attr('data-type');
//Check Tooltip Data with Arrays
    if ((type == 'Boon' && $.inArray(name, boons) >-1) ||
        (type == 'Effect' && $.inArray(name, effects) >-1) ||
        (type == 'Condition' && $.inArray(name, conditions) >-1) ||
        (type == 'Buff' && $.inArray(name, buffs) >-1)) {
//Return Tooltip if Data is valid
      $(this).html('<img class="icon-Effect" src="./assets/Tooltips/' + type + 's/' + name + '.png"></img>');
      $(this).addClass('tooltip');
      $(this).attr('data-tooltip', '<img class="icon-Effect" src="./assets/Tooltips/' + type + 's/' + name + '.png"></img><span class="text-' + type + '"> ' + name.replace(/_/g, ' ') + '</span>');
    }
//Return Invalid Data Error
    else {
      $(this).html('<img class="icon-Effect" src="./assets/Tooltips/Invalid.png"></img>');
      $(this).addClass('tooltip');
      $(this).attr('data-tooltip', '<span class="text-Error">ERR: Invalid  Data ("' + type + ' : ' + name + '")</span>');  
    };  
  });
//Initialize Materialize Components
  $( "#ValeGuardian" ).load( "pages/ValeGuardian.html");
  $('.tooltip').tooltip({position: 'top'});
  $('.tabs').tabs();
  $('.sidenav').sidenav();
  $('.dropdown-trigger').dropdown({constrainWidth: false, coverTrigger: false});
});