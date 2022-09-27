import request from "@/util";

//自定义标签接口
export function getLabel(name) {
    return request.get(`cms/label/name/${name}`)
}

//网站信息接口
export function getSite() {
    return request.get('cms/site')
}

//公司信息接口
export function getCompany() {
    return request.get('cms/company')
}
//分类列表树接口
export function getNav() {
    return request.get('cms/nav')
}

//指定栏目列表树接口
export function getNavScode(id) {
    return request.get(`cms/nav/scode/${id}`)
}

//幻灯片接口
export function getSlide(gid, num) {
    return request.get(`cms/slide/gid/${gid}/num/${num}`)
}

//指定内容详情接口
export function getContent(id) {
    return request.get(`content/${id}`)
}

export function getPics(id) {
    return request.get(`cms/pics/id/${id}`)
}

//指定单页详情接口
export function getAbout(scode) {
    return request.get(`about/${scode}`)
}

//友情链接接口
export function getLink(gid, num) {
    return request.get(`cms/link/gid/${gid}/num/${num}`)
}

//指定分类信息接口
export function getSort(id) {
    return request.get(`cms/sort/scode/${id}`)
}

//当前栏目位置接口
export function getPosition(id) {
    return request.get(`cms/position/scode/${id}`)
}

//指定内容列表接口
export function getList(scode, pageNum, num) {
    return request.get(`/list/${scode}/page/${pageNum}/num/${num}`)
}

//留言提交接口
export function postAddMsg(data) {
    return request({
        method: 'post',
        url: '/cms/addmsg/',
        data,

    }
    )
}

//表单提交接口
export function postAddForm(data, id, headers) {
    return request({
        method: 'post',
        url: '/cms/addform/fcode/' + id,
        data,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

//搜索内容接口
export function postSearch(data) {
    return request.post({
        url: `cms/search`,
        data
    })
}