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

  //=========================//
  //     SKILL TOOLTIPS      //
  //=========================//
  $('.tooltip-skill').each(function() {
    var skillID = $(this).attr('data-id');   
    $.ajax({
      url: 'https://api.guildwars2.com/v2/skills/' + skillID,
      context: this
    }).then(function(data) {
      if ($(this).attr('data-include-name') == 'true'){
        $(this).html('<img src="' + data.icon + '" class="image-skill"></img>');
        $(this).append(' <a href="https://wiki.guildwars2.com/wiki/' + data.name.replace(/ /g,"_") + '" class="text-'+ data.professions +'">' + data.name + '</a>')
      }
      else if ($(this).attr('data-include-name') == 'false'){
        $(this).html('<img src="' + data.icon + '" class="image-skill"></img>');
      };
      var skillStats = ''
      var skillRecharge = ''
      $.each(data.facts, function (i, value) {
        // Skill Recharge

        if (data.facts[i].type == 'Recharge') {
          skillRecharge = '<span class="skill-recharge"><span>'+ data.facts[i].value +'</span><img src="'+ data.facts[i].icon +'" class="image-skillrecharge"></span>';
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
          if (data.facts[i].finisher_type == 'Projectile') {
            skillStats = skillStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ data.facts[i].finisher_type +'<sup class="finisher-chance">(' + data.facts[i].percent + '% chance)<sup></span></td></tr>';
          }
          else {
            skillStats = skillStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ data.facts[i].finisher_type +'</span></td></tr>';
          };
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
          if ($.inArray(data.specialization, ['Rifle']) >-1) {
            var weaponstrength = 1095.5;
          }
          else if ($.inArray(data.weapon_type, ['Staff','Hammer']) >-1) {
            var weaponstrength = 1048;
          }
          else if ($.inArray(data.weapon_type, ['Greatsword']) >-1) {
            var weaponstrength = 1047.5;
          }
          else if ($.inArray(data.weapon_type, ['Longbow']) >-1) {
            var weaponstrength = 1000;
          }
          else if ($.inArray(data.specialization, ['Sword','Axe','Mace','Dagger','Pistol','Scepter','Spear','Speargun','Trident','Shortbow']) >-1) {
            var weaponstrength = 952.5;
          }
          else if ($.inArray(data.specialization, ['Focus','Torch','Shield']) >-1) {
            var weaponstrength = 857.5;
          }
          else if ($.inArray(data.specialization, ['Warhorn']) >-1) {
            var weaponstrength = 857;
          }
          else {
            var weaponstrength = 690.5;
          };
          if (data.facts[i].hit_count > '1') {
            skillStats = skillStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ Math.round(data.facts[i].hit_count * weaponstrength * 1000 * data.facts[i].dmg_multiplier / 2597) +'<sup class="hit-count">(x' + data.facts[i].hit_count +')</sup></span></td></tr>';
          }
          else {
            skillStats = skillStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ Math.round(data.facts[i].hit_count * weaponstrength * 1000 * data.facts[i].dmg_multiplier / 2597) +'</span></td></tr>';

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
        lastResort: 'top center',
        onShow: function(){
          resizePopup();
        }
      });
    });
  });

  //=========================//
  //     TRAIT TOOLTIPS      //
  //=========================//
  $('.tooltip-trait').each(function() {
    var traitID = $(this).attr('data-id');  

    $.ajax({
      url: 'https://api.guildwars2.com/v2/traits/' + traitID,
      context: this
    }).then(function(data) {
      $(this).html('<img src="' + data.icon + '" class="image-trait img-trait-fix"></img>');
      if ($(this).attr('data-include-name') == 'true'){
        $(this).append(' <a href="https://wiki.guildwars2.com/wiki/' + data.name.replace(/ /g,"_") + '" class="text-'+ profession +'">' + data.name + '</a>')
      };

      

      if ($.inArray(data.specialization, [4,11,22,36,51,18,61]) >-1) {
        var profession = 'Warrior';
      }
      else if ($.inArray(data.specialization, [13,16,42,46,49,27,62]) >-1) {
        var profession = 'Guardian';
      }
      else if ($.inArray(data.specialization, [3,9,12,14,15,52,63]) >-1) {
        var profession = 'Revenant';
      }
      else if ($.inArray(data.specialization, [8,25,30,32,33,5,55]) >-1) {
        var profession = 'Ranger';
      }
      else if ($.inArray(data.specialization, [6,21,29,38,47,43,57]) >-1) {
        var profession = 'Engineer';
      }
      else if ($.inArray(data.specialization, [20,35,28,44,54,7,58]) >-1) {
        var profession = 'Thief';
      }
      else if ($.inArray(data.specialization, [17,26,31,37,41,48,56]) >-1) {
        var profession = 'Elementalist';
      }
      else if ($.inArray(data.specialization, [1,10,23,24,45,40,59]) >-1) {
        var profession = 'Mesmer';
      }
      else if ($.inArray(data.specialization, [2,19,39,50,53,34,60]) >-1) {
        var profession = 'Necromancer';
      }
      else {
        var profession = 'Any'
      };
      var traitStats = ''
      var traitRecharge = ''
      $.each(data.facts, function (i, value) {
        if (data.facts[i].type == 'Recharge') {
          traitRecharge = '<span class="trait-recharge"><span>'+ data.facts[i].value +'</span><img src="'+ data.facts[i].icon +'" class="image-traitrecharge"></span>';
        }
        else if (data.facts[i].type == 'Buff') {
          if (data.facts[i].apply_count > '1') {
            traitStats = traitStats + '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"><div class="stack-count">' + data.facts[i].apply_count + '</div></td><td><span>'+ data.facts[i].status +'('+ data.facts[i].duration +'s): </span><span>'+ data.facts[i].description +'</span><br>';
          }
          else {
            traitStats = traitStats + '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].status +'('+ data.facts[i].duration +'s): </span><span>'+ data.facts[i].description +'</span><br>';
          }
        }
        else if (data.facts[i].type == 'Distance') {
          traitStats = traitStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ data.facts[i].distance +'</span></td></tr>';
        }
        else if (data.facts[i].type == 'ComboFinisher') {
          if (data.facts[i].finisher_type == 'Projectile') {
            traitStats = traitStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ data.facts[i].finisher_type +'<sup class="finisher-chance">(' + data.facts[i].percent + '% chance)<sup></span></td></tr>';
          }
          else {
            traitStats = traitStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ data.facts[i].finisher_type +'</span></td></tr>';
          };
        }
        else if (data.facts[i].type == 'ComboField') {
          traitStats = traitStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ data.facts[i].field_type +'</span></td></tr>';
        }
        else if (data.facts[i].type == 'Range') {
          traitStats = traitStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ data.facts[i].value +'</span></td></tr>';
        }
        else if (data.facts[i].type == 'AttributeAdjust') {
          traitStats = traitStats + '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ data.facts[i].value +'</span></td></tr>';
        }
        else if (data.facts[i].type == 'Number') {
          traitStats = traitStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ data.facts[i].value +'</span></td></tr>';
        }
        else if (data.facts[i].type == 'Time') {
          traitStats = traitStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ data.facts[i].duration +'s</span></td></tr>';
        }
        else if (data.facts[i].type == 'Percent') {
          traitStats = traitStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +': </span><span>'+ data.facts[i].percent +'%</span></td></tr>';
        }
        else if (data.facts[i].type == 'StunBreak') {
          traitStats = traitStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>Breaks Stun</span></td></tr>';
        }
        else if (data.facts[i].type == 'Barrier') {
          traitStats = traitStats + '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].type +'('+ data.facts[i].duration +'s): </span><span>'+ data.facts[i].text +'</span></td></tr>';
        }
        else if (data.facts[i].type == 'Unblockable') {
          traitStats = traitStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>Unblockable</span></td></tr>';
        }
        else if (data.facts[i].type == 'NoData') {
          traitStats = traitStats +  '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].text +'</span></td></tr>';
        }
        else {
          traitStats = traitStats + '<tr><td><img src="'+ data.facts[i].icon +'" class="image-effect"></td><td><span>'+ data.facts[i].type +'('+ data.facts[i].duration +'s): </span><span>'+ data.facts[i].text +'</span></td></tr>';
        };
      });
//Trait Skills
      if (data.skills !== undefined ) {
        traitSkills = '';
        $.each(data.skills[0].facts, function (i, value) {
          if (data.skills[0].facts[i].type == 'Recharge') {
            skillRecharge = '<span class="trait-recharge"><span>'+ data.skills[0].facts[i].value +'</span><img src="'+ data.skills[0].facts[i].icon +'" class="image-traitrecharge"></span>';
          }
        });
        $(this).popup({
          html    : '<span class="text-'+ profession +'">' + data.name + '</span>'+ traitRecharge+ '<br><span class="trait-description">' + data.description + '</span><table class="trait-stats"><tr><td style="width:24px;"></td><td></td><tr>' + traitStats + '</table><div class="ui divider inverted"></div><span class="text-'+ profession +'">' + data.skills[0].name + '</span>'+ skillRecharge+ '<br><span class="trait-description">' + data.skills[0].description + '</span>',
          variation : 'inverted basic',
          position  : 'top center',
          transition: 'scale',
          lastResort: 'bottom right',
          onShow: function(){
            resizePopup();
          }
        });
      }
      else {
        $(this).popup({
          html      : '<span class="text-'+ profession +'">' + data.name + '</span>'+ traitRecharge+ '<br><span class="trait-description">' + data.description + '</span><table class="trait-stats"><tr><td style="width:24px;"></td><td></td><tr>' + traitStats + '</table>',
          variation : 'inverted basic',
          position  : 'top center',
          transition: 'scale',
          lastResort: 'bottom right',
          onShow: function(){
            resizePopup();
          }
        });
      };
          //Generate Tooltip
        
      });
    }); 

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
    var specialization = $(this).attr('data-profession').replace(/\b\w/g, l => l.toUpperCase());
    if ($.inArray(specialization, ['Warrior','Berserker','Spellbreaker']) >-1) {
        var profession = 'Warrior';
      }
      else if ($.inArray(specialization, ['Guardian','Dragonhunter','Firebrand']) >-1) {
        var profession = 'Guardian';
      }
      else if ($.inArray(specialization, ['Revenant','Herald','Renegade']) >-1) {
        var profession = 'Revenant';
      }
      else if ($.inArray(specialization, ['Ranger','Druid','Soulbeast']) >-1) {
        var profession = 'Ranger';
      }
      else if ($.inArray(specialization, ['Engineer','Scrapper','Holosmith']) >-1) {
        var profession = 'Engineer';
      }
      else if ($.inArray(specialization, ['Thief','Daredevil','Deadeye']) >-1) {
        var profession = 'Thief';
      }
      else if ($.inArray(specialization, ['Elementalist','Tempest','Weaver']) >-1) {
        var profession = 'Elementalist';
      }
      else if ($.inArray(specialization, ['Mesmer','Chrono','Mirage']) >-1) {
        var profession = 'Mesmer';
      }
      else if ($.inArray(specialization, ['Necromancer','Reaper','Scourge']) >-1) {
        var profession = 'Necromancer';
      }
      else {
        var profession = 'Any'
      };

    var role = $(this).attr('data-role').replace(/\b\w/g, l => l.toUpperCase());
    $(this).html('<img class="image-effect" src="./assets/Tooltips/Professions/' + specialization + '.png"></img>');
    $(this).popup({
        html      : '<img class="image-effect" src="./assets/Tooltips/Professions/' + specialization + '.png"></img><span class="text-' + profession + '"> ' + specialization + '</span><sub> (' + role + ') </sub>',
        variation : 'inverted basic',
        position  : 'top center',
        transition: 'scale',
        lastResort: 'bottom right',
        onShow: function(){
            resizePopup();
        }
      });
    if ($(this).attr('data-include-name') == 'true'){
      $(this).append(' <a href="https://wiki.guildwars2.com/wiki/' + specialization + '" class="text-' + profession + '">' + specialization + '</a>')
    };
  });
};
