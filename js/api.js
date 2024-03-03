var API=(function(){
    const BASE_URL = "https://study.duyiedu.com";
    const TOKEN_KEY = 'token';
    // fetch 二次封装 为了保存token
    // 越通用的封装难度越大
     function get(path) {
        const headers = {};
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            headers.authorization = `Bearer ${token}`;
        }
        return fetch(BASE_URL + path,{ headers})
    }
     function post(path,bodyObj) {
    
        const headers = {
            'Content-Type': 'application/json'
         };
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            headers.authorization = `Bearer ${token}`;
        }
        return fetch(BASE_URL + path, {
            headers,
            method:'POST',
            body:JSON.stringify(bodyObj)
        })
     }
    /** 
     * 传入注册对象
     * @param {*} userInfo 注册对象
     */
    async function reg(userInfo) {
        const resp = await post('/api/user/reg', userInfo)
        const result = await resp.json();
        return result;
    }
    /**
     * 
     * @param {Object} loginInfo 登录对象
     */
    async function login(loginInfo) {
        const resp = await post('/api/user/login', loginInfo)
        const result = await resp.json();
        // 保存响应头里面的token到本地（先判断是否成功，没有成功直接返回错误结果）
        if (result.code === 0) {
            const token = resp.headers.get('authorization')
            localStorage.setItem(TOKEN_KEY, token)
        }
        return result;
    }
    /**
     * 当前账号是否存在
     * @param {*} loginId 
     */
    async function exsits(loginId) {
     const resp=await get('/api/user/exists?loginId='+loginId)
     return await resp.json();
    }
    /**
     * 令牌带过去确认是哪个用户
     */
    async function profile() {
     const resp=await get('/api/user/profile')
     return await resp.json();
    }
    // 向服务器发送聊天消息
    async function sendChat(content) {
     const resp=await post('/api/chat',{
        content
      })
    
     return await resp.json(); 
    }
    /**
     * 获取聊天记录
     */
    async function getHistory() {
        const resp=await get('/api/chat/history')
        
         return await resp.json(); 
    }
    // 推出登录
    function loginOut(){
        localStorage.removeItem(TOKEN_KEY);
    }
    return {
         reg,
         login,
         exsits,
         profile,
         sendChat,
         getHistory,
         loginOut
    }
})()