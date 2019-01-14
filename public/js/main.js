function AddNew() {
    eventUser = 'NewData';
    ShowHide(true);
    $('#cau-1').removeAttr('disabled');
    var btnAdd = $('#add-new');
    btnAdd.attr('onclick', 'AddData()');
    btnAdd.html('Cập nhật');
    
}

function CancelAdd() {
    eventUser = 'study';
    ShowHide(false);
    $('#cau-1').attr('disabled', 'true');
    var btnAdd = $('#add-new');
    btnAdd.attr('onclick', 'AddNew()');
    btnAdd.html('Thêm mới');
}

function AddData() {
    $.ajax({
        url: '/them-cau',
        method: 'POST',
        data: {
            cau1: $('#cau-1').val(),
            lgCau1: 'vi',
            cau2: $('#cau-2').val(),
            lgCau2: 'en'
        },
        success: data => {
            console.log(data);
            var xacnhan = confirm('Bạn muốn thêm dữ liệu nữa không?');
            if(!xacnhan) CancelAdd();
            else {
                $('#cau-1').val('');
                $('#cau-2').val('')
            }
        },
        error: err => {
            console.log(err);
            CancelAdd();
            alert('Thêm dữ liệu thất bại!');
        }
    });
}

function ShowData() {
    if (data != {}) {
        var index = Math.floor(Math.random() * data.length);
        var dung = data[index].dung;
        var sai = data[index].sai;

        $('#so-lan-hoc').html((dung + sai));
        $('#check-ok').html((dung));
        $('#check-not-ok').html((sai));

        $('#cau-1').val(data[index].lg1.cau);
        $('#id-cau').val(data[index]._id);
        $('#res-cau-1').val(data[index].lg2[0].cau);
        $('#index').val(index);
        $('#cau-2').val('');
    }
}

function UpdateData() {
    $('#check').attr('disabled', 'true');
    var traLoi = $('#cau-2').val();
    var dung = parseInt($('#check-ok').html());
    var sai = parseInt($('#check-not-ok').html());
    var index = $('#index').val();

    if (traLoi == $('#res-cau-1').val()) dung += 1;
    else sai += 1;

    $.ajax({
        url: '/update-cau',
        method: 'POST',
        data: {
            cau: $('#id-cau').val(),
            dung: dung,
            sai: sai,
        },
        success: rs => {
            $('#check-ok').html(dung);
            $('#check-not-ok').html(sai);
            $('#so-lan-hoc').html(dung + sai);
            data[index].sai = parseInt($('#check-not-ok').html());
            data[index].dung = parseInt($('#check-ok').html());
            $('#check').removeAttr('disabled');
            if (traLoi == $('#res-cau-1').val()) {
                $('#status').html('Bạn đã trả lời đúng, cố gắng phát huy nhé! Xin chúc mừng!');
                $('#status').attr('class', 'dung');
                ShowData();
            } else {
                $('#status').html('Bạn đã trả lời sai mất rồi, cẩn thận nhé!');
                $('#status').attr('class', 'sai');
            }
        },
        error: err => {
            console.log(err);
            alert('Cập nhật dữ liệu thất bại!');
            $('#check').removeAttr('disabled');
        }
    });
}

function onTestChange() {
    var key = window.event.keyCode;
    if (key === 13) {
        if(eventUser == 'study') UpdateData();
        else AddData();
    }
}

function ShowHide(isShow) {
    if(isShow) {
        $('#cancel-new').show();
        $('#status-home').show();
        $('#check').hide();
        $('#status').hide();
        $('#study').hide();
        $('#help').hide();
    } else {
        $('#cancel-new').hide();
        $('#status-home').hide();
        $('#check').show();
        $('#status').show();
        $('#study').show();
        $('#help').show();
    }
}

function HelpTest() {
    $('#status').html($('#res-cau-1').val());
}

$(document).ready(() => {
    ShowData();
});