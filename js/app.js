var resizePopup = function(){$('.ui.popup').css('max-height', $(window).height());};

$(window).resize(function(e){
    resizePopup();
});

$(document).ready(function(){
  Tooltips();
  Tabcontent();
  $('.ui.dropdown').dropdown();
});

//=========================//
//       TAB CONTENT       //
//=========================//
function Tabcontent() {
  $('.menu .item').tab({
    cache: false,
    alwaysRefresh: true,
    history: true,
    historyType: 'hash',
    apiSettings: {
      loadingDuration : 1000,
      url: 'modules/{$tab}.html'
    }
  });
}

//=========================//
//        TOOLTIPS         //
//=========================//
function Tooltips() {

  //=========================//
  //      TOOLTIP ARRAYS     //
  //=========================//
  var boons = ['Aegis','Alacrity','Fury','Might','Protection','Quickness','Regeneration','Resistance','Retaliation','Stability','Swiftness','Vigor'];
  var effects = ['Barrier','Daze','Float','Knockback','Knockdown','Launch','Pull','Sink','Stun','Nourishment','Enhancement','Invulnerability','Revealed','Stealth','Superspeed'];
  var conditions = ['Bleeding','Blind','Burning','Chilled','Confusion','Crippled','Fear','Immobile','Poison','Slow','Taunt','Torment','Vulnerability','Weakness'];
  
  var professions = ['Warrior','Berserker','Spellbreaker','Guardian','Dragonhunter','Firebrand','Revenant','Herald','Renegade','Ranger','Druid','Soulbeast','Engineer','Scrapper','Holosmith','Thief','Daredevil','Deadeye','Elementalist','Tempest','Weaver','Mesmer','Chronomancer','Mirage','Necromancer','Reaper','Scourge','Any'];
  
  //=========================//
  //     SKILL TOOLTIPS      //
  //=========================//
  $('.tooltip-skill').each(function() {
    var skillID = $(this).attr('data-id');   
    $.ajax({
      url: 'https://api.guildwars2.com/v2/skills/' + skillID,
      context: this
    }).then(function(data) {
      $(this).html('<img src="' + data.icon + '" class="image-skill"></img>');
      if ($(this).attr('data-include-name') == 'true'){
        $(this).append(' <a href="https://wiki.guildwars2.com/wiki/' + data.name.replace(/ /g,"_") + '" class="text-'+ data.professions +'">' + data.name + '</a>')
      };
      var skillStats = ''
      $.each(data.facts, function (i, value) {
        // Skill Recharge

        if (data.facts[i].type == 'Recharge') {
          skillRecharge = '<div class="skill-recharge"><span>'+ data.facts[i].value +'</span><img src="'+ data.facts[i].icon +'" class="image-skillrecharge"></div>';
        }
        else if (data.facts[i].type == 'Buff') {
          if (data.facts[i].apply_count > '1') {
            skillStats = skillStats + '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"><div class="stack-count">' + data.facts[i].apply_count + '</div></td><td><span>'+ data.facts[i].status +'('+ data.facts[i].duration +'s): </span><span>'+ data.facts[i].description +'</span><br>';
          }
          else {
            skillStats = skillStats + '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].status +'('+ data.facts[i].duration +'s): </span><span>'+ data.facts[i].description +'</span><br>';
          }
        }
        else if (data.facts[i].type == 'Distance') {
          skillStats = skillStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ data.facts[i].distance +'</span></td></tr>';
        }
        else if (data.facts[i].type == 'ComboFinisher') {
          skillStats = skillStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ data.facts[i].finisher_type +'</span></td></tr>';
        }
        else if (data.facts[i].type == 'ComboField') {
          skillStats = skillStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ data.facts[i].field_type +'</span></td></tr>';
        }
        else if (data.facts[i].type == 'Range') {
          skillStats = skillStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ data.facts[i].value +'</span></td></tr>';
        }
        else if (data.facts[i].type == 'AttributeAdjust') {
          skillStats = skillStats + '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ data.facts[i].value +'</span></td></tr>';
        }
        else if (data.facts[i].type == 'Number') {
          skillStats = skillStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ data.facts[i].value +'</span></td></tr>';
        }
        else if (data.facts[i].type == 'Time') {
          skillStats = skillStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ data.facts[i].duration +'s</span></td></tr>';
        }
        else if (data.facts[i].type == 'Percent') {
          skillStats = skillStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ data.facts[i].percent +'%</span></td></tr>';
        }
        else if (data.facts[i].type == 'StunBreak') {
          skillStats = skillStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>Breaks Stun</span></td></tr>';
        }
        else if (data.facts[i].type == 'Barrier') {
          skillStats = skillStats + '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].type +'('+ data.facts[i].duration +'s): </span><span>'+ data.facts[i].text +'</span></td></tr>';
        }
        else if (data.facts[i].type == 'Unblockable') {
          skillStats = skillStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>Unblockable</span></td></tr>';
        }
        else if (data.facts[i].type == 'NoData') {
          skillStats = skillStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +'</span></td></tr>';
        }
        // Damage
        else if (data.facts[i].type == 'Damage') {
          if (data.weapon_type == 'Rifle') {
            var weaponstrength = 1095.5;
          }
          else if (data.weapon_type == 'Staff', 'Hammer') {
            var weaponstrength = 1048;
          }
          else if (data.weapon_type == 'Greatsword') {
            var weaponstrength = 1047.5;
          }
          else if (data.weapon_type == 'Longbow') {
            var weaponstrength = 1047.5;
          }
          else if (data.weapon_type == 'Sword','Axe','Mace','Scepter','Pistol','Dagger','Speargun','Spear','Trident','Shortbow') {
            var weaponstrength = 952.5;
          }
          else if (data.weapon_type == 'Focus','Torch','Shield') {
            var weaponstrength = 857.5;
          }
          else if (data.weapon_type == 'Warhorn') {
            var weaponstrength = 857;
          };
          if (data.facts[i].hit_count > '1') {
            skillStats = skillStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ Math.round(data.facts[i].dmg_multiplier * weaponstrength * 1000 / 2597) +'<sup class="hit-count">(x' + data.facts[i].hit_count +')</sup></span></td></tr>';
          }
          else {
            skillStats = skillStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ Math.round(data.facts[i].dmg_multiplier * weaponstrength * 1000 / 2597) +'</span></td></tr>';

          }
        }
        // Other
        else {
          skillStats = skillStats + '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].type +'('+ data.facts[i].duration +'s): </span><span>'+ data.facts[i].text +'</span></td></tr>';
        };
      });
    
      $(this).popup({
        html      : '<span class="text-'+ data.professions +'">' + data.name + '</span>'+ skillRecharge+ '<br><span class="skill-description">' + data.description + '</span><table class="skill-stats"><tr><td style="width:24px;"></td><td></td><tr>' + skillStats + '</table>',
        variation : 'inverted basic',
        position  : 'top center',
        transition: 'scale',
        lastResort: 'bottom right',
        onShow: function(){
          resizePopup();
        }
      });
    });
  });

  //=========================//
  //     TRAIT TOOLTIPS      //
  //=========================//


  //=========================//
  //     EFFECT TOOLTIPS     //
  //=========================//
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
          transition: 'scale',
          lastResort: 'bottom right',
          onShow: function(){
              resizePopup();
          }
        });
    } else {
      $(this).html('<img class="image-effect" src="./assets/Tooltips/Invalid.png"></img>');
      $(this).popup({
          html      : '<img class="image-effect" src="./assets/Tooltips/Invalid.png"></img><span class="text-Error">ERR: Invalid  Data</span>',
          variation : 'inverted basic',
          position  : 'top center',
          transition: 'scale',
          lastResort: 'bottom right',
          onShow: function(){
              resizePopup();
          }
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
          transition: 'scale',
          lastResort: 'bottom right',
          onShow: function(){
              resizePopup();
          }
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
          transition: 'scale',
          lastResort: 'bottom right',
          onShow: function(){
              resizePopup();
          }
        });     
    }; 
  });
};
