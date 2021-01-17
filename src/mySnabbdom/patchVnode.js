import updateChildren from './updateChildren'
export default function patchVnode(oldVnode, newVnode) {
    // 判断新旧节点是不是同一个对象 同一个对象则不作处理 ==> patch(vnode1, vnode1)
    if(oldVnode === newVnode) return
        // 判断新vnode有没有text属性
        if(newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
            // 判断新旧节点text是否相同 不相同则新的vnode覆盖老vnode的innerText  即使老的vnode存在children 也直接覆盖
            if(oldVnode.text != newVnode.text) {
                oldVnode.elm.innerText = newVnode.text
            } else {
                console.log('新旧节点text相同')
            }
        } else {
            console.log('新vnode没有text属性, 有children')
            // 判断老的vnode 有没有children
            if(oldVnode.children != undefined && oldVnode.children.length > 0) {
                // 新旧节点都存在 children  最复杂
                updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
            } else {
                // 老vnode不存在children 新的存在 ==> 清除老dom的text 最加新节点children
                oldVnode.elm.innerHtml = '';
                for (let _ of newVnode.children) {
                    let dom = createElement(_);
                    _.elm = dom;
                    oldVnode.elm.appendChild(dom)
                }

            }
        }
}