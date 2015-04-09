


var guid=function () {
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
var s4= function () {
	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};
$(function() {
	var socket = io();
	var data = {};

	var _guid=getCookie('guid');
	if(_guid==null){
		_guid=guid();
	}
	data.guid = _guid;
	setCookie('guid',_guid);
	var _name=getCookie('name');
	if(_name!=null){
		setCookie('name',_name);
		$('#name').val(_name);
		$('#name').attr('disabled', 'disabled');
	}

	$('form').submit(function() {
		if ($.trim($('#name').val()).length==0)
			return false;
		if ($.trim($('#msg').val()).length==0)
			return false;
		$('#name').attr('disabled', 'disabled');

		data.name = $('#name').val();
		data.msg = $('#msg').val();
		setCookie('name',data.name);
		socket.emit('chat message', data);
		$('#msg').val('');

		return false;
	});

	socket.on('disconnect', function() {
		$('#content').append('<div class="alert alert-danger" role="alert">与服务器断开连接</div>');
	});

	socket.on('reconnect', function() {
		$('#content').append('<div class="alert alert-success" role="alert">重新连接服务器</div>');
	});

	socket.on('get', function(data) {
		$('#content').append('<div class="alert alert-success" role="alert">' + data.name + '：' + data.msg + '</div>');
	});
	socket.on('info', function(info) {
		$('#content').append('<div class="alert alert-success" role="alert">' + info + '</div>');
	});
})