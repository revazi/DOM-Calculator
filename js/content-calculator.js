var calculator = {
  sum: 0,
  activeOperation: '+',
  mouse: {
    x: 0,
    y: 0,
    init: function(elem) {
      var self = this;
      $('body').mousemove(function(e){
          self.x = e.clientX || e.pageX;
          self.y = e.clientY || e.pageY;

          if(elem.length) {
            elem.css({
              "left": self.x+8,
              "top": self.y-12
            });
          }
      });
    },
    stop: function() {
      $('body').unbind('mousemove');
    }
  },
  dragAndDrop: function() {
    var calculator = $('body').find('#rz-dom-calculator');
    var self = this;
    var dragger = calculator.find('.dragger');
    dragger.mouseup(function(e){
      e.stopPropagation();
      self.mouse.stop();
    }).mousedown(function(e){
      e.stopPropagation();
      self.mouse.init(calculator);
    });
  },
  insertDiv: function() {
    $("body").append("<div id='rz-dom-calculator' tabindex='1000' style='z-index: 1000;'><div class='dragger'></div><div class='screen'><ul class='result'><li>0</li></ul></div><div class='keys'><span class='clear'>c</span><span class='operator plus active' data-operation='+'>+</span><span class='operator minus' data-operation='-'>-</span><span class='operator multiplication' data-operation='*'>x</span><span class='operator division' data-operation='/'>÷</span></div></div>");
    var children = $('body').children();
    var maxZindex = 0;
    children.map(function(index, item){
      if($(item).css('z-index') == 'auto') {
        $(item).css('z-index',0);
      } else {
        maxZindex = maxZindex < $(item).css('z-index') ? $(item).css('z-index') : maxZindex;
      }
    });
    maxZindex +=1;
    $('#rz-dom-calculator').css('z-index', maxZindex);
    return $('#rz-dom-calculator');
  },
  getSelectedText: function(){
    var elems = document.body.getElementsByTagName("*");
    var distinctElems = [];
    var tagname = '';
    var self = this;
    var result = null;
    var marginTop = 0;
    var currentSelection = null;
    $.textHighlighter.createWrapper = function(){
      return $('<span></span>').addClass('rz-dom-calculator-highlight');
    };
    [].map.call(elems, function(obj){
      tagname = $(obj).context.localName;
      if(tagname && !distinctElems[tagname]) {
        distinctElems[tagname] = true;
        $(tagname).mouseup(function(e){
          e.stopPropagation();
          $(this).textHighlighter({
              onAfterHighlight: function(highlights, range) {
                  currentSelection = parseFloat(range) ? parseFloat(range) : 0;

                  self.sum = self.sum + self.activeOperation + currentSelection;
                  self.sum = eval(self.sum);
                  result = $("#rz-dom-calculator .screen .result");
                  marginTop = parseFloat(result.css('margin-top'));
                  if(result.find('li').length) {
                    marginTop -=30;
                  }
                  result.append("<li>"+self.sum+"</li>");
                  result.css('margin-top', marginTop);
                  $('#rz-dom-calculator').focus();
              }
          });
        });
      }
    });
  },
  keyBindings: function(calc) {
    var self = this;

    calc.keypress(function(event) {
      var key = 0;
      var $this = $(this);
      key = String.fromCharCode(event.keyCode);
      $this.find('.operator').map(function(index, elem){
        if($(elem).data('operation') == key) {
          $(elem).click();
        } else if(key == 'c' || key == 'C') {
          $this.find('.clear').click();
        }
      });
      return true;
    });

    calc.find('.keys .operator').click(function(){
      $(this).addClass('active');
      self.activeOperation = $(this).data('operation');
      //console.log(self.activeOperation);
      $(this).siblings().removeClass('active');
    });

    calc.find('.keys .clear').click(function(){
      calc.find('.result li').remove();
      self.sum = 0;
      calc.find('.result').css('margin-top', 0);
      $('.rz-dom-calculator-highlight').removeClass('rz-dom-calculator-highlight');
    });
  },
  init: function(){
    this.keyBindings(this.insertDiv());
    this.getSelectedText();
    this.dragAndDrop();
  },
  off: function(){
    $('#rz-dom-calculator').length ? $('#rz-dom-calculator').remove() : console.log('dom calculator doesn\'t exists');
  }
};

$(document).ready(function(){
  calculator.init();
});
