import Cookies from 'universal-cookie';

export const userAuthStatus = async()=>{
    const cookie = new Cookies();
    const _info = await cookie.get('_info');
    if(_info){
        return {
            isUser: true,
            token: _info.token,
            user: _info.user,
        }
    }else{
        return {
            isUser: false
        }
    }
}

export const adminAuthStatus = async()=>{
    const cookie = new Cookies();
    const _info = await cookie.get('_admin');
    if(_info){
        return {
            isAdmin: true,
            token: _info.token,
            admin: _info.admin,
        }
    }else{
        return {
            isAdmin: false
        }
    }
}