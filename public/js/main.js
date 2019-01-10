function AddNew() {
    $('#cancel-new').show();
    $('#cau-1').removeAttr('disabled');
    var btnAdd = $('#add-new');
    btnAdd.attr('onclick', 'AddData()');
    btnAdd.html('Cập nhật');
}

function CancelAdd() {
    $('#cau-1').attr('disabled', 'true');
    $('#cancel-new').hide();
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
        },
        error: err => {
            console.log(err);
            CancelAdd();
            alert('Thêm dữ liệu thất bại!');
        }
    });
}
