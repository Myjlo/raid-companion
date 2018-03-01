

$(document).ready(function(){
  Tooltips();
  Tabcontent();
  $('.ui.dropdown').dropdown();
});


function Tabcontent() {
  $('.menu .item').tab({
    history: true,
    historyType: 'hash',
    alwaysRefresh: true,
    apiSettings: {
      loadingDuration : 1000,
      url: 'modules/{$tab}.html'
    }
  });
}
//=========================//
//   TOOLTIP DATA ARRAYS   //
//=========================//
  var boons = ['Aegis','Alacrity','Fury','Might','Protection','Quickness','Regeneration','Resistance','Retaliation','Stability','Swiftness','Vigor'];
  var effects = ['Barrier','Daze','Float','Knockback','Knockdown','Launch','Pull','Sink','Stun','Nourishment','Enhancement','Invulnerability','Revealed','Stealth','Superspeed'];
  var conditions = ['Bleeding','Blind','Burning','Chilled','Confusion','Crippled','Fear','Immobile','Poison','Slow','Taunt','Torment','Vulnerability','Weakness'];
  
  var professions = ['Warrior','Berserker','Spellbreaker','Guardian','Dragonhunter','Firebrand','Revenant','Herald','Renegade','Ranger','Druid','Soulbeast','Engineer','Scrapper','Holosmith','Thief','Daredevil','Deadeye','Elementalist','Tempest','Weaver','Mesmer','Chronomancer','Mirage','Necromancer','Reaper','Scourge','Any'];

//=========================//
//     EFFECT TOOLTIPS     //
//=========================//
function Tooltips() {
  $('.tooltip-effect').each(function() {
    var name = $(this).attr('data-name').replace(/\b\w/g, l => l.toUpperCase());
    var type = $(this).attr('data-type').replace(/\b\w/g, l => l.toUpperCase());

    if ((type == 'Boon' && $.inArray(name, boons) >-1) ||
        (type == 'Effect' && $.inArray(name, effects) >-1) ||
        (type == 'Condition' && $.inArray(name, conditions) >-1) ||
        (type == 'Buff' && $.inArray(name, buffs) >-1)) {
      $(this).html('<img class="image-effect" src="./assets/Tooltips/' + type + 's/' + name + '.png"></img>');
      $(this).popup({
          html      : '<img class="image-effect" src="./assets/Tooltips/' + type + 's/' + name + '.png"></img><span class="text-' + type + '"> ' + name.replace(/_/g, ' ') + '</span>',
          variation : 'inverted basic',
          position  : 'top center',
          transition: 'fade up'
        });
    } else {
      $(this).html('<img class="image-effect" src="./assets/Tooltips/Invalid.png"></img>');
      $(this).popup({
          html      : '<img class="image-effect" src="./assets/Tooltips/Invalid.png"></img><span class="text-Error">ERR: Invalid  Data</span>',
          variation : 'inverted basic',
          position  : 'top center',
          transition: 'fade up'
        });     
    };  
  });
//=========================//
//   PROFESSION TOOLTIPS   //
//=========================//
  $('.tooltip-profession').each(function() {
    var profession = $(this).attr('data-profession').replace(/\b\w/g, l => l.toUpperCase());
    var role = $(this).attr('data-role').replace(/\b\w/g, l => l.toUpperCase());

    if ($.inArray(profession, professions) >-1) {
      $(this).html('<img class="image-effect" src="./assets/Tooltips/Professions/' + profession + '.png"></img>');
      $(this).popup({
          html      : '<img class="image-effect" src="./assets/Tooltips/Professions/' + profession + '.png"></img><span class="text-' + profession + '"> ' + profession + '</span><sub> (' + role + ') </sub>',
          variation : 'inverted basic',
          position  : 'top center',
          transition: 'fade up'
        });
      if ($(this).attr('data-include-name') == 'true'){
        $(this).append(' <a href="https://wiki.guildwars2.com/wiki/' + profession + '" class="text-' + profession + '">' + profession + '</a>')
      };
    } else {
      $(this).html('<img class="image-effect" src="./assets/Tooltips/Invalid.png"></img>');
      $(this).popup({
          html      : '<img class="image-effect" src="./assets/Tooltips/Invalid.png"></img><span class="text-Error">ERR: Invalid  Data</span>',
          variation : 'inverted basic',
          position  : 'top center',
          transition: 'fade up'
        });     
    }; 
  });
};

//=========================//
//   LOAD ENCOUNTER DATA   //
//=========================//