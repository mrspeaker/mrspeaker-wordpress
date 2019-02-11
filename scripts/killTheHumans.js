var killTheHumans = {
    startTime: null,
    numberCorrect: 0,
    
    opcodes: [
        { code: '+', op1: true, op2: true, expr: '$1+$2' },
        { code: '-', op1: true, op2: true, expr: '$1-$2' },
        { code: '|', op1: true, op2: true, expr: '$1|$2' },
        { code: '&', op1: true, op2: true, expr: '$1&$2' },
        { code: '~', op1: false, op2: true, expr: '~$2' },
        { code: '>>', op1: true, op2: true, expr: '$1>>$2' }
    ],
    
    init: function( parent ){
        var container = $("<div></div>").addClass("killTheHumans");
        var defaults = ['1','+','1','=',''];
        [ 'calc_op1', 'calc_code', 'calc_op2', 'calc_equals', 'calc_result' ].forEach( function( box, i ){
            $("<input></input>", {
                id: box,
                type: "text",
                "class": "killTheTextbox"
            })
            .appendTo( container )
            .val( defaults[ i ] );
        });
        
        var _this = this;
        container.find(":last").bind({
            "blur keyup": $.proxy( this.checkResult, this )
        })

        $("<span></span>", {
            id: "calc_go",
            text: "start",
            click: function(){
                if( _this.startTime !== null){
                    _this.createComputation();
                    return;
                };
                _this.start();
            }
        }).appendTo( container );
        
        $("<div class='calc_div'>Correct:<span id='calc_correct'>000</span>&nbsp;Required:<span>150</span>&nbsp;Time:<span id='calc_time'>5000</span></div>").appendTo( container );
        $("<div class='calc_div'>You are <span id='calc_hubot'>unauthenticated</span></div>").appendTo( container );

        container.appendTo( parent );
    },
    start: function(){
        $(document).trigger("CaptchaStart",{});
        $("#calc_go").text("pass");
        $("#calc_hubot").text("unauthenticated").removeClass("calc_robot calc_human");
        $('#calc_result').val( "" );
        this.nextResult = "";
        this.createComputation();
        this.startTime = new Date();
        this.update();
    },
    createComputation: function(){
        var opcode = this.opcodes[ ~~( Math.random() * this.opcodes.length ) ];
        var expr = opcode.expr;
        var operand1 = ~~(Math.random()*99);
        var operand2 = ~~(Math.random()*99);
        expr = expr.replace('$1', operand1);
        expr = expr.replace('$2', operand2);
        $('#calc_op1').val( opcode.op1 ? operand1 : "" );
        $('#calc_op2').val( opcode.op2 ? operand2 : "" );
        $('#calc_code').val( opcode.code );
        $('#calc_equals').val( "=" );
        this.nextResult = eval(expr);
    },
    checkResult: function(){
        if( this.startTime && ( this.nextResult == $("#calc_result").val() ) ){
            this.numberCorrect++;
            this.createComputation();                        
        }
    },
    evaluatePerformance: function(){
        $(document).trigger("CaptchaEnd",{});
        $("#calc_go").text("start");
        if( this.numberCorrect > 150 ){
            $("#calc_hubot").text( "one of us").removeClass("calc_human").addClass("calc_robot");
        } else {
            $("#calc_hubot").text( "one of them").removeClass("calc_robot").addClass("calc_human");
        }
        
        this.startTime = null;
        this.numberCorrect = 0;
    },
    update: function(){
        var _this = this;
        $("#calc_time").text(5000 - (new Date() - _this.startTime));
        $("#calc_correct").text( this.numberCorrect );
        setTimeout(function(){
            if( new Date() - _this.startTime < 5000 )
                _this.update();
            else {
                $("#calc_time").text(0);
                $("#calc_correct").text( this.numberCorrect );
                _this.evaluatePerformance();
            }
        }, 100);
    }
}

var ImAMachine = {
    io: null,
    opcode: null,
    init: function( io ){
        this.io = io;
        var _this = this;
        $(document).bind("CaptchaStart", function(){
            if($("#machine_on").is(":checked")){
                _this.start();
                $(document).one("CaptchaEnd", function(){
                    _this.stop();
                })
            }
        });
    },
    cpu: function(){
        this.input();
        this.process();
        this.output();
    },
    start: function(){
        var _this = this;
        this.interval = setInterval(function(){ _this.cpu() },20);
    },
    stop: function(){
        clearInterval( this.interval );
        var _this = this;
        setTimeout(function(){
            _this.cpu();    
        },30);
        
    },
    input: function(){
        this.opcode = {
            op1: $( this.io.op1 ).val(),
            op2: $( this.io.op2 ).val(),
            code: $( this.io.code ).val(),
            expr: "",
            result: 0,
        }
    },
    process: function(){
        with( this.opcode ){
            expr = op1 + "" + code + "" + op2;
            result = eval(expr);
        }
    },
    output: function(){
        $( this.io.result ).val( this.opcode.result ).blur();
    }
};