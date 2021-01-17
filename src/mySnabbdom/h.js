import vnode from './vnode'
// 只处理是三个参数情况
export default function(sel, data, c) {
    if(arguments.length !==3) {
        throw new Error('h函数只接受三个参数')
    }
    if(typeof c === 'string' ||　typeof c === 'number' ) {
        return vnode(sel, data, undefined, c, undefined)
    } else if(Array.isArray(c)) {
        let children = [];
        for(let _ of c) {
            if(!(typeof _ === 'object' && 'sel' in _)) {
                throw new Error('h函数数组参数错误')
            }
            children.push(_)
        }
        return vnode(sel, data, children, undefined, undefined)
    } else if(typeof c === 'object' && 'sel' in c) {
        return vnode(sel, data, [c], undefined, undefined)
    } else {
        throw new Error('传入的三个参数类型错误！')
    }
}