// 验证是否有登录 如果没有跳转登录页，有登录获取信息 看token

(async function () {
    const resp = await API.profile()
    const user = resp.data;
    if (!user) {
        alert('未登录，或登录已过期')
        location.href = './login.html';
        return;
    }

    // 已经登陆后下面的代码一定能执行，设置dom
    const doms = {
        aside: {
            nickname: $('#nickname'),
            loginId: $('#loginId')
        },
        close: $('.close'),
        container: $('.chat-container'),
        txtMsg: $('#txtMsg'),
        msgContainer: $('.msg-container'),
    }
    // 设置用户
    setUserInfo();
    function setUserInfo() {
        doms.aside.nickname.innerText = user.nickname;
        doms.aside.loginId.innerText = user.loginId
    }
    // 推出登录
    doms.close.onclick = () => {
        API.loginOut();
        location.href = './login.html'
    }
    // 加载历史记录发送消息


//   发送消息事件
doms.msgContainer.onsubmit = (e)=>{
     e.preventDefault();
    sendChat()
}





await loadHistory()

    async function loadHistory() {
        const resp = await API.getHistory()
        for (const item of resp.data) {
            addChat(item)
        }
        scrollBottom()
    }
    async function sendChat() {
        const content = doms.txtMsg.value.trim()

        if (!content) {
            return;
        }
        addChat({
            from: user.loginId,
            to: null,
            createdAt: Date.now(),
            content,
        })
        doms.txtMsg.value = ''
        scrollBottom();
        const resp = await API.sendChat(content)
        addChat({
            from:null,
            to:user.loginId,
            ...resp.data
        })
        scrollBottom();

    }
    /*{
    _id: '65de3e475f8cc70c8a28591e',
     from: '2915530976', 
     to: null, 
     content: '今天内江天气如何', 
     createdAt: 1709063751430}
     */
    function addChat(chatInfo) {

        const div = $$$('div');
        div.classList.add('chat-item');
        // 判断是谁发的消息添加类样式
        if (chatInfo.from) {
            div.classList.add('me');

        }
        const img = $$$('img');
        img.className = 'chat-avatar'
        img.src = chatInfo.from ? './asset/avatar.png' : './asset/robot-avatar.jpg'
        const content = $$$('div');
        content.className = 'chat-content'
        content.innerText = chatInfo.content;
        const date = $$$('div');
        date.className = 'chat-date';
        date.innerText = formatDate(chatInfo.createdAt);
        div.appendChild(img);
        div.appendChild(content);
        div.appendChild(date);
        doms.container.appendChild(div);

    }
    // 时间函数 转换时间戳为本地格式
    function formatDate(timestamp) {
        const date = new Date(timestamp)
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = (date.getDate()).toString().padStart(2, '0');
        const hour = (date.getHours()).toString().padStart(2, '0');
        const minute = (date.getMinutes()).toString().padStart(2, '0');
        const second = (date.getSeconds()).toString().padStart(2, '0')
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    }
    // 让聊天区的滚动条滚动到最后
    function scrollBottom() {
        const height = doms.container.scrollHeight;
        doms.container.scrollTop = height;

    }
})()
