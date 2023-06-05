'use strict';

goog.provide('Blockly.Blocks.sensors');
goog.provide('Blockly.Blocks.arduino');
goog.require('Blockly.Blocks');
Blockly.FieldCheckbox.CHECK_CHAR= '✅'

Blockly.Blocks['button_sensor2'] = {
  helpUrl: '',
  init: function() {
	var card=window.localStorage.card;
    this.setColour("#54BCF7");
    this.appendDummyInput()
		.appendField(new Blockly.FieldImage("media/button.png",33,33))
	    .appendField(Blockly.Msg.BUTTON_NAME)
	    .appendField(Blockly.Msg.PIN)
   	    .appendField(new Blockly.FieldDropdown(profile[card].dropdownAllPins), "PIN_BUTTON")
	this.appendDummyInput()
  .appendField(Blockly.Msg.BUTTON_PRESSED)
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'LOGIC');

		this.setOutput(true, 'Boolean');
	this.appendDummyInput()
	this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Arduino['button_sensor2'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN_BUTTON');

  var logic = this.getFieldValue('LOGIC');
  Blockly.Arduino.setups_['setup_btn1white_'+dropdown_pin] = 'pinMode('+dropdown_pin+',INPUT);';

  if(logic=='TRUE')
    var code = '(!digitalRead('+dropdown_pin+'))';
  else
   var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Blocks['button_touch_sensor2'] = {
  helpUrl: '',
  init: function() {
	var card=window.localStorage.card;
    this.setColour("#54BCF7");
    this.appendDummyInput()
		.appendField(new Blockly.FieldImage("media/sensor_touch.png",33,33))
	    .appendField(Blockly.Msg.BUTTON_TOUCH_NAME)
	    .appendField(Blockly.Msg.PIN)
        .appendField(new Blockly.FieldDropdown(profile[card].dropdownAllPins), "PIN_BUTTON")
    this.appendDummyInput()
    .appendField(Blockly.Msg.BUTTON_PRESSED)
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'LOGIC')
     ;
	this.setOutput(true, 'Boolean');
	this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Arduino['button_touch_sensor2'] = function(block) {

  var dropdown_pin = block.getFieldValue('PIN_BUTTON');

  var logic = this.getFieldValue('LOGIC');
  Blockly.Arduino.setups_['setup_btntouch_'+dropdown_pin] = 'pinMode('+dropdown_pin+',INPUT);';

  if(logic=='TRUE')
    var code = '(!digitalRead('+dropdown_pin+'))';
  else
   var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};




Blockly.Blocks['ultrasonic_sensor'] = {  init: function() {
	var card=window.localStorage.card;
    this.setColour("#54BCF7");
    this.appendDummyInput()  .appendField(new Blockly.FieldImage("media/sensor_ultrasound.png",33,33))
    .appendField(Blockly.Msg.OTTO_HOME_TEXT + "#")	.appendField(new Blockly.FieldDropdown([['1','1'],['2','2'],['3','3'],['4','4']]), "US_NUMBER")
		.appendField(Blockly.Msg.ultrasonic_ranger).appendField(Blockly.Msg.TRIG).appendField(new Blockly.FieldDropdown(profile[card].dropdownAllPins), "PIN_TRIG");
	this.appendDummyInput()	.appendField(Blockly.Msg.Echo)	.appendField(new Blockly.FieldDropdown(profile[card].dropdownAllPins), "PIN_ECHO")
	this.setInputsInline(true);
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
    this.setHelpUrl(Blockly.Msg.HELPURL);
    this.setTooltip(Blockly.Msg.ultrason_tooltip);
  }
};

Blockly.Arduino['ultrasonic_sensor'] = function(block) {
	var PIN_TRIG = block.getFieldValue('PIN_TRIG');
	var PIN_ECHO = block.getFieldValue('PIN_ECHO');
	var us_number = this.getFieldValue('US_NUMBER');

    Blockly.Arduino.setups_['setup_output_'+PIN_TRIG] = 'pinMode('+PIN_TRIG+', OUTPUT);';
    Blockly.Arduino.setups_['setup_input_'+PIN_ECHO] = 'pinMode('+PIN_ECHO+', INPUT);';


if ((PIN_TRIG=="4") && (PIN_ECHO=="5"))
	{
	   Blockly.Arduino.definitions_['var_ultrasonic'+PIN_TRIG] = 'long ultrasound_distance_simple() {\n'+
        '   long duration, distance;\n'+
        '   digitalWrite('+PIN_TRIG+',LOW);\n'+
        '   delayMicroseconds(100);\n'+
        '   digitalWrite('+PIN_TRIG+', HIGH);\n'+
        '   delayMicroseconds(100);\n'+
        '   digitalWrite('+PIN_TRIG+', LOW);\n'+
        '   duration = pulseIn('+ PIN_ECHO +', HIGH);\n'+
        '   distance = duration/55;\n'+
        '   return distance;\n'+
        '}\n';
	}
	else
	{
		Blockly.Arduino.definitions_['var_ultrasonic'+PIN_TRIG] = 'long ultrasound_distance_simple() {\n'+
        '   long duration, distance;\n'+
        '   digitalWrite('+PIN_TRIG+',LOW);\n'+
        '   delayMicroseconds(2);\n'+
        '   digitalWrite('+PIN_TRIG+', HIGH);\n'+
        '   delayMicroseconds(10);\n'+
        '   digitalWrite('+PIN_TRIG+', LOW);\n'+
        '   duration = pulseIn('+ PIN_ECHO +', HIGH);\n'+
        '   distance = duration/58;\n'+
        '   return distance;\n'+
        '}\n';
	}

	 var code = '';
	 return code;
};

Blockly.Blocks["ultrasonic_distance"]={init:function(){
  this.appendDummyInput()
	.appendField(new Blockly.FieldImage("media/sensor_ultrasound.png",25,15))
  .appendField("#")	.appendField(new Blockly.FieldDropdown([['1','1'],['2','2'],['3','3'],['4','4']]), "US_NUMBER")
	.appendField(Blockly.Msg.ultrason_distance1);
  this.setColour("#54BCF7");
  this.setHelpUrl(Blockly.Msg.ultrason_helpurl);
  this.setInputsInline(false);
  this.setOutput(true, "Number");
  this.setTooltip(Blockly.Msg.ultrason_distance2);}
};
Blockly.Arduino["ultrasonic_distance"]=function(block){
  var code;
  var us_number = this.getFieldValue('US_NUMBER');

  code = 'ultrasound_distance_simple()';
return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Blocks['ultrasonic_sensor2'] = {  init: function() {
	var card=window.localStorage.card;
    this.setColour("#54BCF7");
    this.appendDummyInput()  .appendField(new Blockly.FieldImage("media/sensor_ultrasound.png",33,33))
		.appendField(Blockly.Msg.OTTO_HOME_TEXT+Blockly.Msg.ultrasonic_ranger).appendField("RGB").appendField(new Blockly.FieldDropdown(profile[card].dropdownAllPins), "PIN_TRIG");
	this.appendDummyInput()	.appendField("IO")	.appendField(new Blockly.FieldDropdown(profile[card].dropdownAllPins), "PIN_ECHO");
	this.setInputsInline(true);
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
  }
};


Blockly.Arduino['ultrasonic_sensor2'] = function(block) {
  var PIN_RGB = block.getFieldValue('PIN_TRIG');
  var PIN_IO = block.getFieldValue('PIN_ECHO');

  Blockly.Arduino.variables_["usrgb"]='const int RgbPin = '+PIN_RGB+';\n'+
  'const int SingPin = '+PIN_IO+';\n'+
  'float distance;\n'+
  'unsigned long Time_Echo_us = 0;\n';
  Blockly.Arduino.includes_["usrgb"]="#include <Adafruit_NeoPixel.h>";
  Blockly.Arduino.setups_['setup_IO'] = 'pinMode('+PIN_IO+', OUTPUT);\n';
      Blockly.Arduino.setups_['setup_RGB'] = 'usrgb.begin();\n'+
      'usrgb.clear();\n'+
      'usrgb.fill( usrgb.Color(0, 255, 255));\n'+
        'usrgb.show();\n';
        Blockly.Arduino.definitions_["usrgb"]="Adafruit_NeoPixel usrgb = Adafruit_NeoPixel(6," + PIN_RGB + ", NEO_GRB + NEO_KHZ800);";
        Blockly.Arduino.definitions_['usrgbdistance'] = 'long ultrasound_distance() {\n'+
            '   long Time_Echo_us, distance;\n'+
            '   pinMode('+PIN_IO+', OUTPUT);\n'+
            '   digitalWrite('+PIN_IO+', LOW);\n'+
            '   delayMicroseconds(2);\n'+
            '   digitalWrite('+PIN_IO+', HIGH);\n'+
            '   delayMicroseconds(20);\n'+
            '   digitalWrite('+PIN_IO+', LOW);\n'+
            '    pinMode('+PIN_IO+', INPUT);\n'+
            '   Time_Echo_us = pulseIn('+PIN_IO+', HIGH);\n'+
            
            'if ((Time_Echo_us < 60000) && (Time_Echo_us > 1)) {\n'+
              ' distance = Time_Echo_us / 58.00;\n'+
              '}\n'+
              ' delay(200);\n'+
              '   return distance;\n'+
            '}\n';

	 var code = '';
	 return code;
};

Blockly.Blocks["usgrgb_fill"]={init:function(){
	this.appendDummyInput().appendField("🌈 fill "+Blockly.Msg.ultrasonic_ranger).appendField(Blockly.Msg.pixel3).appendField(new Blockly.FieldColour("#ff0000"),"color");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#B655F5");
    this.setTooltip(Blockly.Msg.pixel3_tooltip);
    this.setHelpUrl("https://learn.adafruit.com/adafruit-neopixel-uberguide/arduino-library-use")}
};
Blockly.Arduino["usgrgb_fill"]=function(block){
	var color=block.getFieldValue("color");
    var colorR=color[1] + color[2], colorG=color[3] + color[4], colorB=color[5] + color[6];
    var red=parseInt(colorR,16), green=parseInt(colorG,16), blue=parseInt(colorB,16);
    var code = "usrgb.clear();\n"+
    "usrgb.fill( usrgb.Color("  + red + ", " + green + ", " + blue + "));\n"+
    "usrgb.show();\n";
    return code
};

Blockly.Blocks["ultrasonic_distance2"]={init:function(){
  this.appendDummyInput().appendField(new Blockly.FieldImage("media/sensor_ultrasound.png",25,15)).appendField(Blockly.Msg.ultrason_distance1);
  this.setColour("#54BCF7");
  this.setHelpUrl(Blockly.Msg.ultrason_helpurl);
  this.setInputsInline(false);
  this.setOutput(true, "Number");
  this.setTooltip(Blockly.Msg.ultrason_distance2);}
};

Blockly.Arduino["ultrasonic_distance2"]=function(block){
  var code;
  code = 'ultrasound_distance()';
return [code, Blockly.Arduino.ORDER_ATOMIC];
};





Blockly.Blocks['potentiometer_ranger_sensor2'] = {
  helpUrl: '',
  init: function() {
	var card=window.localStorage.card;
    this.setColour("#54BCF7");
    this.appendDummyInput()
	    .appendField(new Blockly.FieldImage("media/potentiometer.png",33,33))
	    .appendField(Blockly.Msg.POTE_NAME)
        .appendField(Blockly.Msg.PIN)
		.appendField(new Blockly.FieldDropdown(profile[card].dropdownAnalog), "PIN_POTENTIOMETER")
	this.appendDummyInput()
  .appendField(new Blockly.FieldDropdown([[Blockly.Msg.VALUE, "1"], [Blockly.Msg.PERCENT, "0"]]), "OUTPUT_VALUE");
	this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('Potentiometer');
  }
};

Blockly.Arduino['potentiometer_ranger_sensor2'] = function(block) {
    var PinPotentiometer = block.getFieldValue('PIN_POTENTIOMETER');
    var Status = this.getFieldValue('OUTPUT_VALUE');
	var code;

	var card=window.localStorage.card;

	 if (card =="MRTnode")
		Blockly.Arduino.setups_['setup_analogResolutionESP32'] = 'analogReadResolution(10);\n';

    //Blockly.Arduino.setups_['setup_input_'+PinPotentiometer] = 'pinMode('+PinPotentiometer+', INPUT);';
    if(Status=='0')
      var code = 'map(analogRead('+PinPotentiometer+'),0,1023,0,100)';
    else
      var code = 'analogRead('+PinPotentiometer+')';

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};











Blockly.Blocks['pir_sensor2'] = {
  helpUrl: '',
  init: function() {
	var card=window.localStorage.card;
    this.setColour("#54BCF7");
    this.appendDummyInput()
		.appendField(new Blockly.FieldImage("media/pir.png",33,33))
	    .appendField(Blockly.Msg.PIR_NAME)
	    .appendField(Blockly.Msg.PIN)
		.appendField(new Blockly.FieldDropdown(profile[card].dropdownAllPins), "PIN_PIR")
	this.setOutput(true, 'Boolean');
   	this.appendDummyInput()
		.appendField(Blockly.Msg.PIR_DETECTED)
	this.appendDummyInput()
	this.setInputsInline(true);
    this.setTooltip('');
  }
};


Blockly.Arduino['pir_sensor2'] = function(block) {

  var dropdown_pin = block.getFieldValue('PIN_PIR');
  Blockly.Arduino.setups_['setup_pir_'+dropdown_pin] = 'pinMode('+dropdown_pin+',INPUT);';

  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};



/*  capteur  */
Blockly.Blocks['mc005']={init:function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField(new Blockly.FieldImage('media/infrared.png', 48, 48, "*"))
        .appendField(Blockly.Msg.mc005);
    this.setInputsInline(false);
    this.setOutput(true);
    this.setColour("#54BCF7");
    this.setTooltip(Blockly.Msg.mc005_tooltip);
    this.setHelpUrl('http://www.mon-club-elec.fr/pmwiki_reference_arduino/pmwiki.php?n=Main.ReferenceMaxi')}
};
Blockly.Arduino['mc005'] = function(block) {
	var value_pin = Blockly.Arduino.valueToCode(block, 'pin', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_["setup_input_" + value_pin]="pinMode(" + value_pin + ", INPUT);";
	var code = "digitalRead(" + value_pin + ") == LOW" ;
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Python['mc005'] = function(block) {
	var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
	var dropdown_state = block.getFieldValue('state') == "HIGH" ? "1" : "0";
	Blockly.Python.imports_["pin"]="from machine import Pin";
    Blockly.Python.definitions_["pin_"+value_pin]="BROCHE_"+value_pin+" = Pin("+value_pin+", Pin.IN)";
	var code = "BROCHE_" + value_pin + ".value() == 0" + dropdown_state ;
	return [code, Blockly.Python.ORDER_ATOMIC];
};
//////////////



//////////////


//////////////
Blockly.Blocks["potentiometre"]={init:function(){
	var card=window.localStorage.card;
	var prog = window.localStorage.prog;
	if (prog != "python") {
        this.appendDummyInput().appendField(new Blockly.FieldImage('media/potentiometer.png', 33, 33, "*"))
		.appendField(Blockly.Msg.potar).appendField(new Blockly.FieldDropdown(profile[card].dropdownAnalog), "broche");
	} else {
		this.appendDummyInput().appendField(new Blockly.FieldImage("data:image/png;base64,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", 37, 50))
		.appendField(Blockly.Msg.potar+" A0");
	}
    this.setColour("#54BCF7");
    this.setHelpUrl("https://www.carnetdumaker.net/articles/la-conversion-analogique-numerique-avec-arduino-genuino/");
    this.setOutput(true, "Number");
    this.setTooltip(Blockly.Msg.potar_tooltip)}
};
Blockly.Arduino["potentiometre"]=function(block){
    var dropdown_pin=block.getFieldValue("broche");
    var code="analogRead(" + dropdown_pin + ")/4";
    return [code, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Python["potentiometre"]=function(block){
	Blockly.Python.imports_["adc"]="from machine import ADC";
	Blockly.Python.definitions_["pin_a0"]="Pot = ADC(0)";
    return ["Pot.read()/4", Blockly.Python.ORDER_ATOMIC]
};
//////////////

//////////////
Blockly.Blocks['block_pir']={init:function(){
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendField(new Blockly.FieldImage('media/pir.png', 33, 33, "*"))
        .appendField(Blockly.Msg.pir+Blockly.Msg.pin);
    this.setOutput(true, "Boolean");
    this.setColour("#54BCF7");
    this.setTooltip(Blockly.Msg.pir_tooltip);
    this.setHelpUrl('http://tiptopboards.free.fr/arduino_forum/viewtopic.php?f=2&t=27');
  }
};
Blockly.Arduino['block_pir']=function(block){
    var value_v1=Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ASSIGNMENT);
    Blockly.Arduino.setups_["setup_output_" + value_v1]='pinMode('+value_v1+', INPUT);' ;
    var code='digitalRead('+value_v1+')';
    return [code, Blockly.Arduino.ORDER_ATOMIC] ;
};
Blockly.Python['block_pir']=function(block){
    var dropdown_pin=Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ASSIGNMENT);
	Blockly.Python.imports_["pin"]="from machine import Pin";
	Blockly.Python.definitions_["pin_"+dropdown_pin]="Present_"+dropdown_pin+" = Pin("+dropdown_pin+", Pin.IN)";
    var code="Present_" + dropdown_pin + ".value()";
    return [code, Blockly.Python.ORDER_ATOMIC]
};
//////////////
Blockly.Blocks['block_feu']={init:function(){
    this.appendValueInput("FEU")
        .setCheck("Number")
        .appendField(new Blockly.FieldImage('media/flame.png', 33, 33, "*"))
        .appendField(Blockly.Msg.feu+Blockly.Msg.pin);
    this.setOutput(true, "Boolean");
    this.setColour("#54BCF7");
    this.setTooltip(Blockly.Msg.feu_tooltip);
    this.setHelpUrl('http://www.tubefr.com/modules-d-arduino-detecteur-de-flamme.html')}
};
Blockly.Arduino['block_feu']=function(block){
    var value_v1=Blockly.Arduino.valueToCode(block, 'FEU', Blockly.Arduino.ORDER_ASSIGNMENT);
    Blockly.Arduino.setups_["setup_output_" + value_v1]='pinMode('+value_v1+', INPUT);' ;
    var code='digitalRead('+value_v1+')';
    return [code, Blockly.Arduino.ORDER_ATOMIC] ;
};
Blockly.Python['block_feu']=function(block){
    var dropdown_pin=Blockly.Python.valueToCode(block, 'FEU', Blockly.Python.ORDER_ASSIGNMENT);
	Blockly.Python.imports_["pin"]="from machine import Pin";
	Blockly.Python.definitions_["pin_"+dropdown_pin]="Fire_"+dropdown_pin+" = Pin("+dropdown_pin+", Pin.IN)";
    var code="Fire_" + dropdown_pin + ".value()";
    return [code, Blockly.Python.ORDER_ATOMIC]
};
//////////////
Blockly.Blocks['block_anticollision']={init:function(){
    this.appendValueInput("COLLISION")
        .setCheck("Number")
        .appendField(new Blockly.FieldImage('media/collision.png', 48, 48, "*"))
        .appendField(Blockly.Msg.presence+Blockly.Msg.pin);
    this.setOutput(true, "Boolean");
    this.setColour("#54BCF7");
    this.setTooltip(Blockly.Msg.presence_tooltip);
    this.setHelpUrl(Blockly.Msg.HELPURL);
  }
};
Blockly.Arduino['block_anticollision']=function(block){
    var value_v1=Blockly.Arduino.valueToCode(block, 'COLLISION', Blockly.Arduino.ORDER_ASSIGNMENT);
    Blockly.Arduino.setups_["setup_output_" + value_v1]='pinMode('+value_v1+', INPUT);' ;
    var code='digitalRead('+value_v1+')';
    return [code, Blockly.Arduino.ORDER_ATOMIC] ;
};
Blockly.Python['block_anticollision']=function(block){
    var dropdown_pin=Blockly.Python.valueToCode(block, 'COLLISION', Blockly.Python.ORDER_ASSIGNMENT);
	Blockly.Python.imports_["pin"]="from machine import Pin";
	Blockly.Python.definitions_["pin_"+dropdown_pin]="Touch_"+dropdown_pin+" = Pin("+dropdown_pin+", Pin.IN)";
    var code="Touch_" + dropdown_pin + ".value()";
    return [code, Blockly.Python.ORDER_ATOMIC]
};
//////////////


//////////////
Blockly.Blocks["cap615"]={init:function(){
	var card=window.localStorage.card;
	var prog = window.localStorage.prog;
	if (prog != "python") {
        this.appendDummyInput().appendField(new Blockly.FieldImage('media/soil.png', 33, 33, "*"))
		.appendField(Blockly.Msg.hum).appendField(new Blockly.FieldDropdown(profile[card].dropdownAnalog), "broche");
	} else {
		this.appendDummyInput().appendField(new Blockly.FieldImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAA8CAIAAAAG1mY/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEDElEQVR42u2X30tbZxjHDyiKPxYVf/8CEaoDHdpU4y524bCrXWLSJuecaDWZ08iqk0Hb6eYEdbjdDNnNwJvqNldbbbq2bBciiCBUKu0Ibmzsqu1/MDsVdJpo3OecNx5TGVLW27wcH598n+/3eZ73PTnkOVI4HD74vwuttL+/v7m5OTIy4vF4Ojo6enp6Luurs7Ozq6vL59MsPkh3dzdROF6vFz4qtBJpRkdHJUmqra2tqamJi4tLTk42mUx1dXVnzpy21L2JxQcBj4+PxzebzfBRodX0qqo2NjaGQiHytba2Qi0vf31o8Mrd2W9qa97A4oOYTK/RCPydnZ36+npUEb2iKP39/WJLY2NjFDl1quzalQ+//mrw7fq3sB9f7QUBHx8fF7Te3l5ZliP69vb2oqKihYWFxcXFysrKrKys/Pw8BGVl5afNZirj5+XlgVdXVy8tLc3NzfERVUTv8/kSEhIyMzPT09MhZWdnV1RU0FRDQ0NxcbHFUutyuSwWS5a+MjIyYCYmJoq9aHq81NRUqAUFBYWFhWSBzWk7nU4OtaWlZXh4mG7T0tJoEw7MlJQUbsRRfT4Ty9cXvcHIzc2l25KSkqqqKjZVWloKIggw4R/Vj9Yjxgoq3eKIHeXk5BjRk/QGiUUXgGJf0fhL6amclJTEdwYr2nlZPYuGOUiOze/3Y/FBjOhxPR51IOUdLu7Q/Py88ZzggxhRmPBfOH/j/pGb+2S1WsF3d3f5UmPxQaLvH/yj+pNTkw1W6zm741yTdr1js13/9jrPwt7eHk8oFn/iu4mzBsfuOGuzTn4/GdH77/nt7ma7ql9K84WWllv+WyiRGXbmzoyj+ZCjNuOjiuiJ2WTFJqva5VLtqjo9Ow1OZcPevH2zSTnkyCo+qoh+9sfZJgXIrV2y2+F2wwansmHpiLwRjuLGRxXTx/QxfUwf08f0Mf0r6m2yFrCdrD/k/Gd9/YfdpZ6gtwmOor6gF/NDdO7p2/r8sL9nWDE/CI5utflBe//gb+Xxiur1WF2KXXVbXar7Pc/ywwdi8hHzB/7yyjK4VZtO4Chur2fl0cPwQVirv7G50Tf4yfmLLnK/65SvDvStPf/rWP9rz9euDfQRhXP+ogx/Y2Nd6z+0F+LfjZkbYv80PzE1IcYmY/4TI9TE1KRDdevHrMAHZ7qTgqEgsT/+/N3b1Units73fwk8BiGveDUzfHCPrwMOFj4IWm3/rO1/toe//LzxgvPToc/W9caO1ceur/89MDIIZ+iLYfiiR8mY0O7/fF9uu/SD3li0ODoFbSttl+7+dE80Hzl/ccJPnz394KPLgV8DBmKIDSSwGoDz5NkTbVP6+5okwthgMLj62+rW9pbY0bH6Atza2oID00Ckg1db/wKZDZL9Usyp1AAAAABJRU5ErkJggg==", 21, 60))
		.appendField(Blockly.Msg.hum+" A0");
	}
    this.setColour("#54BCF7");
    this.setHelpUrl("https://www.carnetdumaker.net/articles/la-conversion-analogique-numerique-avec-arduino-genuino/");
    this.setOutput(true, "Number");
    this.setTooltip(Blockly.Msg.hum_tooltip)}
};
Blockly.Arduino["cap615"]=function(block){
    var dropdown_pin=block.getFieldValue("broche");
    var code="(1023-analogRead(" + dropdown_pin + "))/8";
	return [code, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Python["cap615"]=function(block){
	Blockly.Python.imports_["adc"]="from machine import ADC";
	Blockly.Python.definitions_["pin_a0"]="humidity = ADC(0)";
    return ["(1023-humidity.read())/8", Blockly.Python.ORDER_ATOMIC]
};
//////////////
Blockly.Blocks["cap661"]={init:function(){
	var card=window.localStorage.card;
    this.appendDummyInput().appendField(new Blockly.FieldImage('media/encoder.png', 48, 48, "*"))
		.appendField("pulses on the spindle").appendField(new Blockly.FieldDropdown(profile[card].interrupt), "broche");
    this.setColour("#54BCF7");
    this.setHelpUrl("http://www.ferdinandpiette.com/blog/2012/04/asservissement-en-vitesse-dun-moteur-avec-arduino/");
    this.setOutput(true, "Number");
    this.setTooltip("returns the number of slots (full + hollow) of the encoder wheel")}
};
Blockly.Arduino["cap661"]=function(block){
    var dropdown_pin=block.getFieldValue("broche");
	Blockly.Arduino.variables_["tick_codeuse"]="unsigned int tick_codeuse = 0;";
	Blockly.Arduino.setups_['setup_Interrupt_'+dropdown_pin]='pinMode('+dropdown_pin+', INPUT);\n  attachInterrupt('+dropdown_pin+',codeuse,CHANGE);';
    Blockly.Arduino.codeFunctions_["codeuse"]='void codeuse(){\n  tick_codeuse++;\n}';
    var code="tick_codeuse";
    return [code, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Python["cap661"]=function(){return''};
//////////////

//////////////
Blockly.Blocks["VL53L0X"]={init:function(){
    this.appendDummyInput().appendField(new Blockly.FieldImage('media/laser.png', 33, 33, "*")).appendField(Blockly.Msg.VL53L0X);
    this.setColour("#54BCF7");
	this.setInputsInline(true);
    this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
    this.setHelpUrl("");
    this.setTooltip(Blockly.Msg.VL53L0X_tooltip)}
};
Blockly.Arduino["VL53L0X"]=function(block){
	Blockly.Arduino.includes_["wire"]='#include <Wire.h>';
    Blockly.Arduino.includes_["VL53L0X"]='#include <VL53L0X.h>';
	Blockly.Arduino.variables_["VL53L0X"]="VL53L0X cpt;";
	Blockly.Arduino.setups_["VL53L0X"]='Wire.begin();\n  cpt.init();\n  cpt.setTimeout(500);\n  cpt.startContinuous();'
    var code='';
    return code;
};
Blockly.Python["VL53L0X"]=function(block){
    Blockly.Python.imports_["VL53L0X"]='import VL53L0X';
	Blockly.Python.imports_["i2c"]='from machine import I2C';
	Blockly.Python.definitions_["VL53L0X"]="i2c = I2C(scl=Pin(5), sda=Pin(4))\ntof = VL53L0X.VL53L0X(i2c)";
    return ""
};
//////////////
Blockly.Blocks["VL53L0X_distance"]={init:function(){
    this.appendDummyInput().appendField(new Blockly.FieldImage('media/laser.png', 15, 15, "*")).appendField(Blockly.Msg.VL53L0X_distance);
    this.setColour("#54BCF7");
    this.setHelpUrl("");
    this.setOutput(true, "Number");
    this.setTooltip(Blockly.Msg.VL53L0X_distance_tooltip)}
};
Blockly.Arduino["VL53L0X_distance"]=function(block){
    var code="cpt.readRangeContinuousMillimeters()";
    return [code, Blockly.Arduino.ORDER_ATOMIC]
};
Blockly.Python["VL53L0X_distance"]=function(block){
    return ["tof.read()", Blockly.Python.ORDER_ATOMIC]
};


