var loginIdValidator = new FieldValidator('txtLoginId', async function (val) {

    if (!val) {
        return '账号不能为空'
    }
  
})

var loginPwdValidator = new FieldValidator('txtLoginPwd', function (val) {
    if (!val) {
        return '请填写密码'
    }
})

const form = $('.user-form')
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const result = await FieldValidator.validate(
        loginIdValidator,
        loginPwdValidator,
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
    const resp = await API.login(data)

    if (resp.code === 0) {
        location.href = ('./index.html')
    }else{
        loginIdValidator.p.innerText='登录失败请检查账号密码'
        loginPwdValidator.input.value =''
    }
})


