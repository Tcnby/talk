// 对单个表单进行验证 拥护登录和注册的通用代码


class FieldValidator {
    /**
     * 
     * @param {String} txtId  文本框的id
     * @param {Function} validatorFunc  验证规则,当需要对该文本进行验证时，调用改函数，函数的参数为文本框的值，函数的返回值为验证的错误的消息，如果没有返回则没有错误
     */
    constructor(txtId, validatorFunc) {
        // 文本框
        this.input = $('#' + txtId);
        //    验证提示的p元素
        this.p = this.input.nextElementSibling;
        // 保存验证规则函数
        this.validatorFunc = validatorFunc;
        this.input.addEventListener('blur', () => {
            this.validate()
        })
        this.input.addEventListener('input', () => {
            this.validate()

        })
        // this.input.addEventListener('blur', this.validate)
        // this.input.addEventListener('input', this.validate)

    }
    // 验证失去焦点，或者表单提交的时候，我这里就输入时就验证
    /**
     * 
     * @returns 有错误返回false 没错误返回true
     */
    async validate() {
        const err = await this.validatorFunc(this.input.value)
        if (err) {
            this.p.innerText = err;
            return false;
        }
        else {
            this.p.innerText = '';
            return true;
        }
    }

    /**
     * 对传入的所有验证器进行验证 所有验证均通过返回true 否者flase
     * @param {FieldValidator[]} validator 
     */
    static async validate(...validators) {

        const promise = validators.map(v => v.validate());
        // 返回一个数组
        const result = await Promise.all(promise)
        return result.every(r => r)

    }
}


