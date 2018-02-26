//Global

$(document).ready(function(){
    var i;
    var tooltip = $('#tooltip');
    var name = tooltip.attr('data-name');
    var type = tooltip.attr('data-type');

    for (i = 0; i < tooltip.length; i++) {
        console.log(type,name)
            tooltip[i].innerHTML = '<img class="icon-effect" src="./assets/' + type + 's/' + name + '.png"></img>';
            tooltip[i].className = 'gw-tooltip';
            tooltip[i].setAttribute('data-position', 'top')
            tooltip[i].setAttribute('data-tooltip', '<img class="icon-effect" src="./assets/' + type + 's/' + name + '.png"></img><span class="text-' + type + '">' + name + '</span>');
        }
});