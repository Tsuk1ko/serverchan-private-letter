$('#send_form').submit(function(e) {
    lockBtn();
	e.preventDefault();
	$.ajax({
		type: "POST",
		dataType: "html",
		url: "./sc.php",
		data: $('#send_form').serialize(),
		success: function(data) {
			var parsedJson = jQuery.parseJSON(data);
			if (parsedJson.errno === 0) {
				showOkTip('<h2>发送成功</h2>');
				$('input').val('');
				$('textarea').val('')
			} else {
				showFailTip('<h2 style="font-size:18px">' + parsedJson.errmsg + '</h2>')
			}
			unlockBtn();
		},
		error: function(data) {
			showFailTip('<h2>网络错误</h2>');
			unlockBtn();
		}
	});
})

function showOkTip(tip, ttl, speed) {
	$('body').append('<div class="tip ok"><div class="status-icon sa-success animate" style="display:block"><span class="sa-line sa-tip animateSuccessTip"></span><span class="sa-line sa-long animateSuccessLong"></span><div class="sa-placeholder"></div><div class="sa-fix"></div></div>' + tip + '</div>');
	removeTip(ttl, speed);
}

function showFailTip(tip, ttl, speed) {
	$('body').append('<div class="tip fail"><div class="status-icon sa-error animateErrorIcon" style="display:block"><span class="sa-x-mark animateXMark"><span class="sa-line sa-left"></span><span class="sa-line sa-right"></span></span></div>' + tip + '</div>');
	removeTip(ttl, speed);
}

function removeTip(ttl, speed) {
	ttl = ttl || 2000;
	speed = speed || 1000;
	window.setTimeout("$('.tip').fadeOut(" + speed + ",function(){$(this).remove()})", ttl);
}

function lockBtn(){
    var btn=$('#submit-btn');
    btn.attr('disabled',"true");
    btn.addClass('disable');
    btn.html('发送中…');
}

function unlockBtn(){
    var btn=$('#submit-btn');
    btn.removeAttr("disabled");
    btn.removeClass('disable');
    btn.html('发送消息');
}