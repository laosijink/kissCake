export default (Vue)=>{
    Vue.directive("dire",(el,binding,vnode)=>{
        el.onclick= function(){
            alert("directiveOK")
        }
    })
}