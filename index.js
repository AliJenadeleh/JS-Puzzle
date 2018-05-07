/// /// <reference path="jquery-2.1.1.min.js" />
$(function(){
  Reload();
});
var PuzzleCls = function()
{
    var imgs = new Array(18);
    var srcs = new Array(10);
    var tests = new Array(10);
    var selected = null;
    var stag = null;
    var defimg = './images/aj-web.png';
    var scoreCounter = 0;
    
    function InitImgs()
    {
        for(var i = 1;i<9;i++)
        {
            srcs[i-1] = UniqueNumber(i-1);
            tests[i-1] = 0;
        }
    }
    
    function UniqueNumber(index)
    {
        var num = Math.floor((Math.random() * 16) + 1);
        for(var i = index ;i>0;i--)
        {
            if(srcs[i] == num)
             return UniqueNumber(index);
        }
        return num;
    }
    
    this.Initial = function()
    {
        $('img').each(function(index){
            $(this).attr('alt','Puzzle Image ' + (index + 1));
            imgs[index] = $(this);
        });
        InitImgs();
        
        
    }
    function TakeSrc()
    {
        // an new unique role this take time
        var index = Number(Math.floor(Math.random() * 8));
        if(Number(tests[index]) >= 2)
        {
         return TakeSafe();
        }
            tests[index] = Number(tests[index])+1;
            return srcs[index];
    }
    function TakeSafe()
    {
        for(var i = 0;i<8;i++)
        {
            if(tests[i] < 2)
            {
                tests[i] = Number(tests[i]) + 1;
                return srcs[i];
            }
        }
    }
    this.SetImages = function(){
        for(var i =0;i<17;i++)
        {
            var tmp = TakeSrc();
            
            $(imgs[i]).attr('src','./images/' + tmp + '.png');
            $(imgs[i]).attr('tag',tmp);
        }
    }
    
    var DoManage = function()
    {
        for(var i =0;i<17;i++)
        {
            $(imgs[i]).attr('src',defimg);
            $(imgs[i]).click(Clicked);
        }
    }
    var Mistake = function(ctr)
    {
        
        var mistake = Number($('#mistake').text()) + 1;
        $('#mistake').text(mistake);
        
        setTimeout(function() {
            $(selected).attr('src',defimg);
             selected = null;
             stag = null;
            $(ctr).attr('src',defimg);
        }, 250);
    }
    var Score = function(ctr)
    {
        
        var _score = Number($('#score').text()) + 1;
        $('#score').text(_score);
        
        $(selected).off('click');
        $(ctr).off('click');
        
         selected = null;
             stag = null;
             scoreCounter++;
             if(scoreCounter >= 8)
             {
                 $('#alert').text('***Win***');
             }
    }
    var Clicked = function()
    {
        var tag = $(this).attr('tag');
        $(this).attr('src','./images/' + tag + '.png');
        if(stag === null)
        {
            selected = this;
            stag = tag;
        }
        else{
           if(stag === tag)
           {
               Score(this);
           } 
           else
           {
               Mistake(this);
           }
        }
    }
    
 this.Manage = function()
 {
     setTimeout(DoManage,1500);
 }
   
};
var Puzzle = new PuzzleCls();

function Reload()
{
    $('p span').text('0');
    Puzzle = new PuzzleCls();
    Puzzle.Initial();
    Puzzle.SetImages();
    Puzzle.Manage();
}