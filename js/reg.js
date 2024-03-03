var loginIdValidator = new FieldValidator('txtLoginId', async function (val) {

    if (!val) {
        return '账号不能为空'
    }
    const resp = await API.exsits(val)
    if (resp.data) {
        return '该账号已存在'
    }
})
var nicknameValidator = new FieldValidator('txtNickname', function (val) {
    if (!val) {
        return '昵称不能为空'
    }
})
var loginPwdValidator = new FieldValidator('txtLoginPwd', function (val) {
    if (!val) {
        return '请填写密码'
    }
})
var loginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm', function (val) {
    if (!val) {
        return '请填确认密码'
    }
    if (val !== loginPwdValidator.input.value) {
        return '两次密码不一致'
    }
})
const form = $('.user-form')
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const result = await FieldValidator.validate(
        loginIdValidator,
        nicknameValidator,
        loginPwdValidator,
        loginPwdConfirmValidator
    )
    if (!result) {
        return; //验证不通过
    }
    // form表单提供的方法
    const formData = new FormData(form);
    const data = Object.fromEntries(formData)
    // 原始方法
    // const data = {
    //     loginId: loginIdValidator.input.value,
    //     nickname: nicknameValidator.input.value,
    //     loginPwd: loginPwdValidator.input.value
    // }
    // console.log(data);
    // const resp = await API.reg(data)
    const resp = await API.reg(data)

    if (resp.code === 0) {
        alert('注册成功')
        location.href = ('./login.html')
    }
})


