function cubicspline(bG,bH,aM){
	var H = bG.length;
	var bo = aM.length;
	var L = H;
	var O = new Array(H);
	var T = new Array(H);
	var G = new Array(H);
	var ap = new Array(bo);
	var bm = new Array(bo);
	var t = new Array(2);
	t[0] = new Array(H);
	t[1] = new Array(H);
	var next = new Array(2);
	var F = 1,
	    K, C = 0,
	    V, ab;
	var J = 0;
	var l, v, bP;
	var ac, bF, R, aJ, aS, bk, bb, h, aR, bM;
	for (var i = 0; i < bo; i++) {
	    ap[J] = aM[J];
	    J++;
	}
	V = 0;
	for (var i = 0; i < L; i++) {
	    v = parseFloat(bG[V]);
	    bP = parseFloat(bH[V]);
	    V++;
	    if (!isNaN(v) && !isNaN(bP)) {
	        O[i] = v;
	        T[i] = bP;
	    }
	}
	K = 1;
	for (var i = 0; i < (L - 1); i++) {
	    t[0][K] = O[K] - O[i];
	    t[1][K] = (T[K] - T[i]) / t[0][K];
	    K++;
	}
	if (L == 2) {
	    t[1][0] = t[0][0] = 1.0;
	    G[0] = 2.0 * t[1][1];
	} else {
	    v = l = t[0][1];
	    t[1][0] = t[0][2];
	    t[0][0] = v + t[0][2];
	    l *= l * t[1][2];
	    G[0] = ((v + 2.0 * t[0][0]) * t[1][1] * t[0][2] + l) / t[0][0];
	}
	ab = L - 1;
	for (var i = 1; i < ab; i++) {
	    v = -(t[0][i + 1] / t[1][i - 1]);
	    G[i] = v * G[i - 1] + 3.0 * (t[0][i] * t[1][i + 1] + t[0][i + 1] * t[1][i]);
	    t[1][i] = v * t[0][i - 1] + 2.0 * (t[0][i] + t[0][i + 1]);
	}
	if (L == 2) {
	    G[1] = t[1][1];
	} else {
	    if (L == 3) {
	        G[2] = 2.0 * t[1][2];
	        t[1][2] = 1.0;
	        v = -(1.0 / t[1][1]);
	    } else {
	        v = t[0][L - 2] + t[0][L - 1];
	        l = t[0][L - 1] * t[0][L - 1] * (T[L - 2] - T[L - 3]);
	        l /= t[0][L - 2];
	        G[L - 1] = ((t[0][L - 1] + 2.0 * v) * t[1][L - 1] * t[0][L - 2] + l) / v;
	        v = -(v / t[1][L - 2]);
	        t[1][L - 1] = t[0][L - 2];
	    }
	    t[1][L - 1] = v * t[0][L - 2] + t[1][L - 1];
	    G[L - 1] = (v * G[L - 2] + G[L - 1]) / t[1][L - 1];
	}
	for (var i = L - 2; i >= 0; i--) {
	    G[i] = (G[i] - t[0][i] * G[i + 1]) / t[1][i];
	}
	while (C < J) {
	    for (V = C; V < J; V++) {
	        if (ap[V] >= O[F]) break;
	    }
	    if (V < J) {
	        if (F == (L - 1)) V = J;
	    }
	    ab = V - C;
	    if (ab > 0) {
	        aR = h = O[F] - O[F - 1];
	        next[1] = next[0] = 0;
	        bM = 0.0;
	        aS = (T[F] - T[F - 1]) / h;
	        bk = (G[F - 1] - aS) / h;
	        bb = (G[F] - aS) / h;
	        ac = -(bk + bk + bb);
	        bF = ac + ac;
	        R = (bk + bb) / h;
	        aJ = R + R + R;
	        for (k = 0; k < ab; k++) {
	            l = ap[C + k] - O[F - 1];
	            bm[C + k] = T[F - 1] + l * (G[F - 1] + l * (ac + l * R));
	            if (l < bM) next[0] = next[0] + 1;
	            if (l > aR) next[1] = next[1] + 1;
	        }
	        if ((next[0] > 0) && (F != 1)) {
	            for (k = C; k < V; k++) {
	                if (ap[k] < O[F - 1]) break;
	            }
	            V = k;
	            for (k = 0; k < F; k++) {
	                if (ap[V] < O[k]) break;
	            }
	            F = (((k - 1) > 0) ? (k - 1) : 0);
	        }
	        C = V;
	    }
	    F++;
	    if (F >= L) break;
	}
return bm;
} 

function Calc()
{
		array_reset();
		input();
			if(splinetype == 0) {
		horYint = cubicspline(horX,horY,format_arr); 
		Chart_splineY = cubicspline(horX,horY,format_arr100);
			}
			if(splinetype == 1) {
		horYint = Monotone_cubic_Hermite_interpolation(horX,horY,format_arr); 
		Chart_splineY = Monotone_cubic_Hermite_interpolation(horX,horY,format_arr100);
			}
			if(splinetype == 2) {
		horYint = Akima(horX,horY,format_arr); 
		Chart_splineY = Akima(horX,horY,format_arr100);
			}
		min_max();
		interp_curve();
		document.TVI.output.value = output_table;
		if (document.TVI.graph.checked == false) {
		curves_chart();
		}
		else {
		inter_graph();
		}
}

var input_arr = new Array();
var input_array = new Array();
var input_hor = new Array();
var horX = new Array();
var horY = new Array();
var horYint = new Array();
var format_arr = new Array();
var format_arr100 = new Array();
var output_table = "";
var testMSIE = new RegExp("MSIE");
var Chart_splineY = new Array();
var step_num;
var step;
var corr_cap;
var splinetype = 0;

function array_reset()
{
input_arr.length = 0;
input_array.length = 0;
input_hor.length = 0;
horX.length = 0;
horY.length = 0;
horYint.length = 0;
format_arr.length = 0;
format_arr100.length = 0;
output_table = "";
Chart_splineY.length = 0;

if (document.getElementById('iqplot').getElementsByTagName('div').length > 0){
	document.getElementById('iqplot').removeChild(document.getElementById('iqplot').getElementsByTagName('div')[0]);
	}
	var chart_Div = document.createElement('div');
	
	document.getElementById('iqplot').appendChild(chart_Div);
}

function example1()
{
	document.TVI.input.value = "0\t10\t20\t40\t70\t100\n0\t21.4\t27.9\t31.2\t44.6\t50.8";
	document.TVI.format.value = "5";
	document.TVI.output.value = "";
	Calc();
}

function example2()
{
	document.TVI.input.value = "100\t-0.3\n15\t-1.25\n10\t0.25\n5\t-0.22\n0\t0";
	document.TVI.format.value = "2";
	document.TVI.output.value = "";
	Calc();
}

function example3()
{
	document.TVI.input.value = "98%\t100\n95%\t5\n90%\t7\n85%\t9\n80%\t11\n75%\t12.3\n70%\t14,5\n60%\t15.2\n56.5%\t16.3\n50%\t18\n40%\t20.11\n30%\t-6\n25%\t23.16\n20%\t25.89\n15%\t28.01\n10%\t55\n7%\t79\n5%\t52.33\n3%\t42.36\n2%\t0";
	document.TVI.format.value = "2";
	document.TVI.output.value = "";
	Calc();
}

function example4()
{
	document.TVI.input.value = "0\t1\t2\t3\t4\t5\t6\t7\t8\n14\t18\t-20\t79\t20\t-10\t57\t25\t11.2";
	document.TVI.format.value = "0.5";
	document.TVI.output.value = "";
	Calc();
}

function input()
{
	var input_table = document.TVI.input.value;
	if (input_table != "") { 
	if (input_table != "") { 
		input_table = str_ireplace(input_table,',','.');
		input_table = str_ireplace(input_table,'%','');
		input_table = str_ireplace(input_table,'\t\t\t',' ');
		input_table = str_ireplace(input_table,'\t\t',' ');
		input_table = str_ireplace(input_table,'\t   ',' ');
		input_table = str_ireplace(input_table,'\t  ',' ');
		input_table = str_ireplace(input_table,'\t ',' ');
		input_table = str_ireplace(input_table,'    ',' ');
		input_table = str_ireplace(input_table,'   ',' ');
		input_table = str_ireplace(input_table,'  ',' ');
		input_arr = input_table.split(/[\n]/g);
		input_cols = input_arr.length;
		for (i=0; i<input_cols; i++) {
			input_array[i] = new Array();
			input_array[i] = input_arr[i].split(/[" "\t]/g);
		} //end for
		input_rows = input_array[0].length;
		if (input_rows > input_cols) { //2 horizont
		for (i=0; i<input_cols; i++) {
			input_hor[i] = new Array();
			for (j=0; j<input_rows; j++) {
				input_hor[i][j] = parseFloat(input_array[i][j]);
			} // j
		} // i
		} //enf if 2
		if (input_rows < input_cols) { //3 vert
		for (i=0; i<input_rows; i++) {
			input_hor[i] = new Array();
			for (j=0; j<input_cols; j++) {
				input_hor[i][j] = parseFloat(input_array[j][i]);
			
			} // j
		} // i
		} //enf if 3
		if(input_rows == input_cols && input_rows < 3) { // 4
			alert("Недостаточно данных для вычислений");
		} // end if 4
		hor_length = input_hor[0].length;
		
		for (i=0; i<5; i++) {
		if (isNaN(input_hor[0][hor_length-1]) == true)
		{
			input_hor[0].length += -1;
			input_hor[1].length += -1;
			hor_length += -1;
		}}
			if (input_hor[0][0] < input_hor[0][hor_length-1]) { // 5
					horX = input_hor[0];
					horY = input_hor[1];
			} // end if 5
			else { // 1
				if(input_hor[0][0]  > input_hor[0][hor_length-1]) { // 6
					for (i=0; i<hor_length; i++) {
						horX[i] = input_hor[0][hor_length-i-1];
						horY[i] = input_hor[1][hor_length-i-1];
					} // end for
				} // end if 6
			} //end else 1
	
		var format_table = document.TVI.format.value;
		if (format_table != "") { 
		format_table = str_ireplace(format_table,',','.');
				step_num = parseInt(Math.abs(horX[0]-horX[hor_length-1])/parseFloat(format_table));
				step = parseFloat(format_table);
				format_arr[0] = horX[0];
				for (j=1; j<=step_num; j++) {
					format_arr[j] = horX[0]+step;
					step += parseFloat(format_table);
				}
				format_length = format_arr.length;
				
				step_num = parseInt(Math.abs(horX[0]-horX[hor_length-1])/(format_table/100));
				step = parseFloat(format_table)/100;
				format_arr100[0] = horX[0];
				for (j=1; j<=step_num; j++) {
					format_arr100[j] = horX[0]+step;
					step += parseFloat(format_table)/100;
				}
				format100_length = format_arr100.length;
		}}}
}

function str_ireplace(txt,cut_str,paste_str)
{
var f=0;
var ht='';
ht = ht + txt;
f=ht.indexOf(cut_str);
while (f!=-1){
//цикл для вырезания всех имеющихся подстрок
f=ht.indexOf(cut_str);
if (f>0){
ht = ht.substr(0,f) + paste_str + ht.substr(f+cut_str.length);
}
}
return ht
}

function interp_curve()
{
	output_table = "";
	for (i=0; i<format_length; i++) {
	output_table += format_arr[i] + "\t" + horYint[i] + "\n";
	}
}

function change_input()
{
	input_table = "";
	for (i=0; i<hor_length; i++) {
	input_table += horX[i] + "\t" + horY[i] + "\n";
	}
	document.TVI.input.value = input_table;
}

function curves_chart(){
	if (testMSIE.test(navigator.userAgent) == false){
	if (document.getElementById('iqplot').getElementsByTagName('div').length > 0){
	document.getElementById('iqplot').removeChild(document.getElementById('iqplot').getElementsByTagName('div')[0]);
	}
	var chart_Div = document.createElement('div');
chart_Div.innerHTML = '<div class="jqplot-target" id="observer" style="width: 100%; height: 450px"></div>';
document.getElementById('iqplot').appendChild(chart_Div);

	var yObserver = [];
	var yObserverCurv = [];
	var zObserver = [];
	
	for(i=0; i < hor_length; i++){
		yObserver.push([horX[i], horY[i]]);
	}
	for(i=0; i < format100_length; i++){
		yObserverCurv.push([format_arr100[i], Chart_splineY[i]]);
	}
	for (i=0; i<format_length; i++) {
		zObserver.push([format_arr[i], horYint[i]]);
	}
	
	var plot3 = $.jqplot('observer',  [yObserver, yObserverCurv, zObserver],
    {
		grid: {
            shadow: false,
            background: 'rgba(234,234,234,0)',
            lineWidth:1
        },
			legend:{show:false},
      title:'',
	   seriesDefaults: {
          rendererOptions: {
              smooth: true
          }
      },
	  axes:{
          xaxis:{min:minX, max:maxX},
          yaxis:{min:minY, max:maxY}},
      series:[
		  {
		  showLine:false,
            markerOptions: { style:'filledCircle', size:9, color:'#0072C6' }
          },
		  {
            lineWidth:3,
			color:'#0072C6',
			showMarker:false
          },
		  {
		  showLine:false,
            markerOptions: { style:'filledCircle', size:6, color:'#ff0000' }
          }
      ]
    }
  );
	}
	else {
		if (document.getElementById('iqplot').getElementsByTagName('div').length > 0){
	document.getElementById('iqplot').removeChild(document.getElementById('iqplot').getElementsByTagName('div')[0]);
	}
	var chart_Div = document.createElement('div');
chart_Div.innerHTML = '<p>Internet Explorer не поддерживает данную технологию</p>';
document.getElementById('iqplot').appendChild(chart_Div);
	}
}

function inter_graph()
{
	if (document.getElementById('iqplot').getElementsByTagName('div').length > 0){
	document.getElementById('iqplot').removeChild(document.getElementById('iqplot').getElementsByTagName('div')[0]);
	}
	var chart_Div = document.createElement('div');
chart_Div.innerHTML = '<div id="box" class="jxgbox" style="width:100%; height:402px;"></div>';
document.getElementById('iqplot').appendChild(chart_Div);

var board = JXG.JSXGraph.initBoard('box', {boundingbox: [minX, maxY, maxX, minY], axis:true, keepaspectratio:false});
var p = [];

for(i=0; i < hor_length; i++){
		p[i] = board.create('point', [horX[i], horY[i]], {size: 3, face: 'o'});
	}
	
JXG.addEvent(p[0].rendNode, 'mouseout', function number0(){ 
horX[0] = this.coords.usrCoords[1]; horY[0] = this.coords.usrCoords[2]; change_input();}, p[0]);
if (hor_length > 1) {
JXG.addEvent(p[1].rendNode, 'mouseout', function number1(){ 
horX[1] = this.coords.usrCoords[1]; horY[1] = this.coords.usrCoords[2]; change_input();}, p[1]);}
if (hor_length > 2) {
JXG.addEvent(p[2].rendNode, 'mouseout', function number2(){ 
horX[2] = this.coords.usrCoords[1]; horY[2] = this.coords.usrCoords[2]; change_input();}, p[2]);}
if (hor_length > 3) {
JXG.addEvent(p[3].rendNode, 'mouseout', function number3(){ 
horX[3] = this.coords.usrCoords[1]; horY[3] = this.coords.usrCoords[2]; change_input();}, p[3]);}
if (hor_length > 4) {
JXG.addEvent(p[4].rendNode, 'mouseout', function number4(){ 
horX[4] = this.coords.usrCoords[1]; horY[4] = this.coords.usrCoords[2]; change_input();}, p[4]);}
if (hor_length > 5) {
JXG.addEvent(p[5].rendNode, 'mouseout', function number5(){ 
horX[5] = this.coords.usrCoords[1]; horY[5] = this.coords.usrCoords[2]; change_input();}, p[5]);}
if (hor_length > 6) {
JXG.addEvent(p[6].rendNode, 'mouseout', function number6(){ 
horX[6] = this.coords.usrCoords[1]; horY[6] = this.coords.usrCoords[2]; change_input();}, p[6]);}
if (hor_length > 7) {
JXG.addEvent(p[7].rendNode, 'mouseout', function number7(){ 
horX[7] = this.coords.usrCoords[1]; horY[7] = this.coords.usrCoords[2]; change_input();}, p[7]);}
if (hor_length > 8) {
JXG.addEvent(p[8].rendNode, 'mouseout', function number8(){ 
horX[8] = this.coords.usrCoords[1]; horY[8] = this.coords.usrCoords[2]; change_input();}, p[8]);}
if (hor_length > 9) {
JXG.addEvent(p[9].rendNode, 'mouseout', function number9(){ 
horX[9] = this.coords.usrCoords[1]; horY[9] = this.coords.usrCoords[2]; change_input();}, p[9]);}
if (hor_length > 10) {
JXG.addEvent(p[10].rendNode, 'mouseout', function number10(){ 
horX[10] = this.coords.usrCoords[1]; horY[10] = this.coords.usrCoords[2]; change_input();}, p[10]);}
if (hor_length > 11) {
JXG.addEvent(p[11].rendNode, 'mouseout', function number11(){ 
horX[11] = this.coords.usrCoords[1]; horY[11] = this.coords.usrCoords[2]; change_input();}, p[11]);}
if (hor_length > 12) {
JXG.addEvent(p[12].rendNode, 'mouseout', function number12(){ 
horX[12] = this.coords.usrCoords[1]; horY[12] = this.coords.usrCoords[2]; change_input();}, p[12]);}
if (hor_length > 13) {
JXG.addEvent(p[13].rendNode, 'mouseout', function number13(){ 
horX[13] = this.coords.usrCoords[1]; horY[13] = this.coords.usrCoords[2]; change_input();}, p[13]);}
if (hor_length > 14) {
JXG.addEvent(p[14].rendNode, 'mouseout', function number14(){ 
horX[14] = this.coords.usrCoords[1]; horY[14] = this.coords.usrCoords[2]; change_input();}, p[14]);}
if (hor_length > 15) {
JXG.addEvent(p[15].rendNode, 'mouseout', function number15(){ 
horX[15] = this.coords.usrCoords[1]; horY[15] = this.coords.usrCoords[2]; change_input();}, p[15]);}
if (hor_length > 16) {
JXG.addEvent(p[16].rendNode, 'mouseout', function number16(){ 
horX[16] = this.coords.usrCoords[1]; horY[16] = this.coords.usrCoords[2]; change_input();}, p[16]);}
if (hor_length > 17) {
JXG.addEvent(p[17].rendNode, 'mouseout', function number17(){ 
horX[17] = this.coords.usrCoords[1]; horY[17] = this.coords.usrCoords[2]; change_input();}, p[17]);}
if (hor_length > 18) {
JXG.addEvent(p[18].rendNode, 'mouseout', function number18(){ 
horX[18] = this.coords.usrCoords[1]; horY[18] = this.coords.usrCoords[2]; change_input();}, p[18]);}
if (hor_length > 19) {
JXG.addEvent(p[19].rendNode, 'mouseout', function number19(){ 
horX[19] = this.coords.usrCoords[1]; horY[19] = this.coords.usrCoords[2]; change_input();}, p[19]);}
if (hor_length > 20) {
JXG.addEvent(p[20].rendNode, 'mouseout', function number20(){ 
horX[20] = this.coords.usrCoords[1]; horY[20] = this.coords.usrCoords[2]; change_input();}, p[20]);}
if (hor_length > 21) {
JXG.addEvent(p[21].rendNode, 'mouseout', function number21(){ 
horX[21] = this.coords.usrCoords[1]; horY[21] = this.coords.usrCoords[2]; change_input();}, p[21]);}
if (hor_length > 22) {
JXG.addEvent(p[22].rendNode, 'mouseout', function number22(){ 
horX[22] = this.coords.usrCoords[1]; horY[22] = this.coords.usrCoords[2]; change_input();}, p[22]);}
if (hor_length > 23) {
JXG.addEvent(p[23].rendNode, 'mouseout', function number23(){ 
horX[23] = this.coords.usrCoords[1]; horY[23] = this.coords.usrCoords[2]; change_input();}, p[23]);}
if (hor_length > 24) {
JXG.addEvent(p[24].rendNode, 'mouseout', function number24(){ 
horX[24] = this.coords.usrCoords[1]; horY[24] = this.coords.usrCoords[2]; change_input();}, p[24]);}
if (hor_length > 25) {
JXG.addEvent(p[25].rendNode, 'mouseout', function number25(){ 
horX[25] = this.coords.usrCoords[1]; horY[25] = this.coords.usrCoords[2]; change_input();}, p[25]);}
if (hor_length > 26) {
JXG.addEvent(p[26].rendNode, 'mouseout', function number26(){ 
horX[26] = this.coords.usrCoords[1]; horY[26] = this.coords.usrCoords[2]; change_input();}, p[26]);}
if (hor_length > 27) {
JXG.addEvent(p[27].rendNode, 'mouseout', function number27(){ 
horX[27] = this.coords.usrCoords[1]; horY[27] = this.coords.usrCoords[2]; change_input();}, p[27]);}
if (hor_length > 28) {
JXG.addEvent(p[28].rendNode, 'mouseout', function number28(){ 
horX[28] = this.coords.usrCoords[1]; horY[28] = this.coords.usrCoords[2]; change_input();}, p[28]);}
if (hor_length > 29) {
JXG.addEvent(p[29].rendNode, 'mouseout', function number29(){ 
horX[29] = this.coords.usrCoords[1]; horY[29] = this.coords.usrCoords[2]; change_input();}, p[29]);}

var c = board.create('spline', p, {strokeWidth:3, strokecolor:'#0072C6'});
}

function min_max()
{
		capXmax = format_arr100[0];
		capYmax = Chart_splineY[0];
		capXmin = format_arr100[0];
		capYmin = Chart_splineY[0];
	for (i=1; i<format100_length; i++) {
		if (capXmin < format_arr100[i]) {minX = capXmin; } else {minX = format_arr100[i]; capXmin = format_arr100[i]; }
		if (capYmin < Chart_splineY[i]) {minY = capYmin; } else {minY = Chart_splineY[i]; capYmin = Chart_splineY[i]; }
		if (capXmax > format_arr100[i]) {maxX = capXmax; } else {maxX = format_arr100[i]; capXmax = format_arr100[i]; }
		if (capYmax > Chart_splineY[i]) {maxY = capYmax; } else {maxY = Chart_splineY[i]; capYmax = Chart_splineY[i]; }
	}
	maxX += (maxX-minX)/10;
	maxY += (maxY-minY)/10;
	minX = minX - (maxX-minX)/11;
	minY = minY - (maxY-minY)/11;
	maxX = parseInt((maxX - maxX/30)*10) / 10;
	maxY = parseInt(maxY*10) / 10;
	minX = parseInt((minX + maxX/30)*10) / 10;
	minY = parseInt(minY*10) / 10;
}

function splinetypeHermite(){
	if (document.TVI.Akima.checked == true) {document.TVI.Akima.checked = false;}
	splinetype = 1;
	if (document.TVI.Akima.checked == false && document.TVI.Hermite.checked == false) {
	splinetype = 0;
	}
}

function splinetypeAkima(){
	if (document.TVI.Hermite.checked == true) {document.TVI.Hermite.checked = false;}
	splinetype = 2;
	if (document.TVI.Akima.checked == false && document.TVI.Hermite.checked == false) {
	splinetype = 0;
	}
}

var Cubic_Spline, MonotonicCubic_Spline;
MonotonicCubic_Spline = function() {
  function MonotonicCubic_Spline(x, y) {            
    var alpha, beta, delta, dist, i, m, n, tau, to_fix, _i, _j, _len, _len2, _ref, _ref2, _ref3, _ref4;
    n = x.length;
    delta = [];
    m = [];
    alpha = [];
    beta = [];
    dist = [];
    tau = [];
    for (i = 0, _ref = n - 1; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
      delta[i] = (y[i + 1] - y[i]) / (x[i + 1] - x[i]);
      if (i > 0) {
        m[i] = (delta[i - 1] + delta[i]) / 2;          
      }
    }
    m[0] = delta[0];
    m[n - 1] = delta[n - 2];
    to_fix = [];
    for (i = 0, _ref2 = n - 1; (0 <= _ref2 ? i < _ref2 : i > _ref2); (0 <= _ref2 ? i += 1 : i -= 1)) {
      if (delta[i] === 0) {
        to_fix.push(i);
      }
    }
    for (_i = 0, _len = to_fix.length; _i < _len; _i++) {
      i = to_fix[_i];
      m[i] = m[i + 1] = 0;
    }
    for (i = 0, _ref3 = n - 1; (0 <= _ref3 ? i < _ref3 : i > _ref3); (0 <= _ref3 ? i += 1 : i -= 1)) {
      alpha[i] = m[i] / delta[i];
      beta[i] = m[i + 1] / delta[i];
      dist[i] = Math.pow(alpha[i], 2) + Math.pow(beta[i], 2);
      tau[i] = 3 / Math.sqrt(dist[i]);
    }
    to_fix = [];
    for (i = 0, _ref4 = n - 1; (0 <= _ref4 ? i < _ref4 : i > _ref4); (0 <= _ref4 ? i += 1 : i -= 1)) {
      if (dist[i] > 9) {
        to_fix.push(i);
      }
    }
    for (_j = 0, _len2 = to_fix.length; _j < _len2; _j++) {
      i = to_fix[_j];
      m[i] = tau[i] * alpha[i] * delta[i];
      m[i + 1] = tau[i] * beta[i] * delta[i];
    }
    this.x = x.slice(0, n);
    this.y = y.slice(0, n);
    this.m = m;    
  }
  MonotonicCubic_Spline.prototype.interpolate = function(x) {
    var h, h00, h01, h10, h11, i, t, t2, t3, y, _ref;
    for (i = _ref = this.x.length - 2; (_ref <= 0 ? i <= 0 : i >= 0); (_ref <= 0 ? i += 1 : i -= 1)) {      
        if (this.x[i] <= x) {
        break;
      }
    }
    h = this.x[i + 1] - this.x[i];
    t = (x - this.x[i]) / h;
    t2 = Math.pow(t, 2);
    t3 = Math.pow(t, 3);
    h00 = 2 * t3 - 3 * t2 + 1;
    h10 = t3 - 2 * t2 + t;
    h01 = -2 * t3 + 3 * t2;
    h11 = t3 - t2;
    y = h00 * this.y[i] + h10 * h * this.m[i] + h01 * this.y[i + 1] + h11 * h * this.m[i + 1];
      
    return y;
  };    
  return MonotonicCubic_Spline;
}();
Cubic_Spline = function() {
  function Cubic_Spline(x, a, d0, dn) {
    var b, c, clamped, d, h, i, k, l, n, s, u, y, z, _ref;
    if (!((x != null) && (a != null))) {
      return;
    }
    clamped = (d0 != null) && (dn != null);
    n = x.length - 1;
    h = [];
    y = [];
    l = [];
    u = [];
    z = [];
    c = [];
    b = [];
    d = [];
    k = [];
    s = [];
    for (i = 0; (0 <= n ? i < n : i > n); (0 <= n ? i += 1 : i -= 1)) {
      h[i] = x[i + 1] - x[i];
      k[i] = a[i + 1] - a[i];
      s[i] = k[i] / h[i];
    }
    if (clamped) {
      y[0] = 3 * (a[1] - a[0]) / h[0] - 3 * d0;
      y[n] = 3 * dn - 3 * (a[n] - a[n - 1]) / h[n - 1];
    }
    for (i = 1; (1 <= n ? i < n : i > n); (1 <= n ? i += 1 : i -= 1)) {
      y[i] = 3 / h[i] * (a[i + 1] - a[i]) - 3 / h[i - 1] * (a[i] - a[i - 1]);
    }
    if (clamped) {
      l[0] = 2 * h[0];
      u[0] = 0.5;
      z[0] = y[0] / l[0];
    } else {
      l[0] = 1;
      u[0] = 0;
      z[0] = 0;
    }
    for (i = 1; (1 <= n ? i < n : i > n); (1 <= n ? i += 1 : i -= 1)) {
      l[i] = 2 * (x[i + 1] - x[i - 1]) - h[i - 1] * u[i - 1];
      u[i] = h[i] / l[i];
      z[i] = (y[i] - h[i - 1] * z[i - 1]) / l[i];
    }
    if (clamped) {
      l[n] = h[n - 1] * (2 - u[n - 1]);
      z[n] = (y[n] - h[n - 1] * z[n - 1]) / l[n];
      c[n] = z[n];
    } else {
      l[n] = 1;
      z[n] = 0;
      c[n] = 0;
    }
    for (i = _ref = n - 1; (_ref <= 0 ? i <= 0 : i >= 0); (_ref <= 0 ? i += 1 : i -= 1)) {
      c[i] = z[i] - u[i] * c[i + 1];
      b[i] = (a[i + 1] - a[i]) / h[i] - h[i] * (c[i + 1] + 2 * c[i]) / 3;
      d[i] = (c[i + 1] - c[i]) / (3 * h[i]);
    }
    this.x = x.slice(0, n + 1);
    this.a = a.slice(0, n);
    this.b = b;
    this.c = c.slice(0, n);
    this.d = d;
  }
  Cubic_Spline.prototype.derivative = function() {
    var c, d, s, x, _i, _j, _len, _len2, _ref, _ref2, _ref3;
    s = new this.constructor();
    s.x = this.x.slice(0, this.x.length);
    s.a = this.b.slice(0, this.b.length);
    _ref = this.c;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      c = _ref[_i];
      s.b = 2 * c;
    }
    _ref2 = this.d;
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      d = _ref2[_j];
      s.c = 3 * d;
    }
    for (x = 0, _ref3 = this.d.length; (0 <= _ref3 ? x < _ref3 : x > _ref3); (0 <= _ref3 ? x += 1 : x -= 1)) {
      s.d = 0;
    }
    return s;
  };
  Cubic_Spline.prototype.interpolate = function(x) {
    var deltaX, i, y, _ref;
    for (i = _ref = this.x.length - 1; (_ref <= 0 ? i <= 0 : i >= 0); (_ref <= 0 ? i += 1 : i -= 1)) {
      if (this.x[i] <= x) {
        break;
      }
    }
    deltaX = x - this.x[i];
    y = this.a[i] + this.b[i] * deltaX + this.c[i] * Math.pow(deltaX, 2) + this.d[i] * Math.pow(deltaX, 3);
    return y;
  };
  return Cubic_Spline;
}();

function Monotone_cubic_Hermite_interpolation(arx,ary,intx)
{
	var inty = new Array();
	var mySpline = new MonotonicCubic_Spline(arx,ary);
	for (i=0; i<intx.length; i++)
	{
		inty[i] = mySpline.interpolate(intx[i]);
	}
	return inty;
}

function Akima(xa, ya, xYnterp)
{
	var xa100 = new Array();
	var ya100 = new Array();
	var xYnterp100 = new Array();
	yYnterp = new Array();
	n = xa.length;
	xYnterpLength = xYnterp.length;
	xstep = 1;
	for (i=0; i<xa.length; i++)
	{
		xa100.push(parseInt(xa[i]*100000));
		ya100.push(parseFloat(ya[i]*100000));
	}
	for (i=0; i<xYnterpLength; i++)
	{
		xYnterp100.push(parseInt(xYnterp[i]*100000));
	}
	for (j = 0; j < xYnterpLength; j++)
	{
		yYnterp[j] = calcsplineAkima(xa100, ya100, n, xstep, xYnterp100[j], xYnterp100[j]);
	}
return yYnterp;
}

function calcsplineAkima(xa, ya, n, xstep, llimit, ulimit)
	{
		xAkima = new Array();
		yAkima = new Array();
		for (i=0; i<xa.length; i++)
		{
		xAkima.push(xa[i]);
		yAkima.push(ya[i]);
		}
		if (n == 2)
		{ 
			dx = xAkima[1] - xAkima[0];
			dy = yAkima[1] - yAkima[0];

			d = Math.round((ulimit - llimit) / xstep);
			m = dy / dx; 
			for (i = 0; i <= d; i++)
			{
				r[xAkima[0] + i * xstep] = yAkima[0] + i * m * xstep;
			}
		}
		else
		{ 
			xAkima.unshift(xAkima[0], xAkima[1]);
			xAkima.push(0);
			xAkima.push(0);
			yAkima.unshift(yAkima[0], yAkima[1]);
			yAkima.push(0);
			yAkima.push(0);
			n+= 4;

			dx = new Array();
			dy = new Array();
			m = new Array();
			t = new Array();
			C = new Array();
			D = new Array();
			r = new Array();
			
			for (i = 2; i <= (n - 3); i++)
			{
				dx[i] = xAkima[i + 1] - xAkima[i];
				dy[i] = yAkima[i + 1] - yAkima[i];
				m[i] = dy[i] / dx[i]; 
			}

			xAkima[1] = xAkima[2] + xAkima[3] - xAkima[4];
			dx[1] = xAkima[2] - xAkima[1];
			yAkima[1] = dx[1] * (m[3] - 2 * m[2]) + yAkima[2];
			dy[1] = yAkima[2] - yAkima[1];
			m[1] = dy[1] / dx[1];
			xAkima[0] = 2 * xAkima[2] - xAkima[4];
			dx[0] = xAkima[1] - xAkima[0];
			yAkima[0] = dx[0] * (m[2] - 2 * m[1]) + yAkima[1];
			dy[0] = yAkima[1] - yAkima[0];
			m[0] = dy[0] / dx[0];
			xAkima[n - 2] = xAkima[n - 3] + xAkima[n - 4] - xAkima[n - 5];
			yAkima[n - 2] = (2 * m[n - 4] - m[n - 5]) * (xAkima[n - 2] - xAkima[n - 3]) + yAkima[n - 3];
			xAkima[n - 1] = 2 * xAkima[n - 3] - xAkima[n - 5];

			yAkima[n - 1] = (2 * m[n - 3] - m[n - 4]) * (xAkima[n - 1] - xAkima[n - 2]) + yAkima[n - 2];
			for (i = n - 3; i < n - 1; i++)

			{
				dx[i] = xAkima[i + 1] - xAkima[i];
				dy[i] = yAkima[i + 1] - yAkima[i];
				m[i] = dy[i] / dx[i];
			}

			t[0] = 0.0;
			t[1] = 0.0; 
			for (i = 2; i < n - 2; i++)
			{
				num = Math.abs(m[i + 1] - m[i]) * m[i - 1] + Math.abs(m[i - 1] - m[i - 2]) * m[i];
				den = Math.abs(m[i + 1] - m[i]) + Math.abs(m[i - 1] - m[i - 2]);
				if (den != 0) t[i] = num / den;
				else t[i] = 0.0;
			}

			for (i = 2; i < n - 2; i++)
			{
				C[i] = (3 * m[i] - 2 * t[i] - t[i + 1]) / dx[i];
				D[i] = (t[i] + t[i + 1] - 2 * m[i]) / (dx[i] * dx[i]);
			}

			d = Math.round((ulimit - llimit) / xstep);
			p = 2;

			for (xv = llimit; xv < ulimit + xstep; xv+= xstep)
			{
				while (xv >= xAkima[p] && xAkima[p] !== undefined)
				{
					r[xAkima[p]] = yAkima[p];
					p++;
				}

				if (((xv - xAkima[p - 1]) > xstep / 100.0) && ((xAkima[p] - xv) > xstep / 100.0))
				{
					xd = (xv - xAkima[p - 1]);
					r[xv] = yAkima[p - 1] + (t[p - 1] + (C[p - 1] + D[p - 1] * xd) * xd) * xd;
				}
			}
		}
			last = r.pop();
			xAkima.length = 0;
			yAkima.length = 0;
			dx.length = 0;
			dy.length = 0;
			m.length = 0;
			t.length = 0;
			C.length = 0;
			D.length = 0;
			r.length = 0;
		return last/100000;	
	}