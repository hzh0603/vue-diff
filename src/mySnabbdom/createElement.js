// 真正创建节点
export default function createElement(vnode) {
    let domNode = document.createElement(vnode.sel);
    if(vnode.text != '' && (vnode.children == undefined || vnode.children.length ==0)) {
        // 内部是文字
        domNode.innerText = vnode.text;
    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        // 内部是数组
        for(let _ of vnode.children) {
            let childDom = createElement(_);
            domNode.appendChild(childDom)
        }
    } else {
        domNode.appendChild(vnode.c)
    }
    vnode.elm = domNode
    return vnode.elm
}