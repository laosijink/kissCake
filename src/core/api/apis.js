import request from "./http"
import params from './params.js'

var url1 = "json1811.ashx"

class Apis {
    //首页数据
    getIndexData(){
        return request({
            method: "GET",
            url: url1,
            params: {
                c: "NewIndexController",
                m: "index",
                v: params.v
            }
        })
    }
    //分类数据
    getListData(){
        return request({
            method: "GET",
            url: url1,
            params:{
                c: "NsCakeCenter",
                m: "GetJdListNew",
                v: params.v
            }
        })
    }
    //详情数据
    getDetailData1(data){
        return request({
            method:"GET",
            url: url1,
            params:{
               Name:data.Name,
               c:"NsCakeCenter",
               m:data.m,
               v:params.v
           }
        })
    }
    getDetailData2(data){
        return request({
            method:"GET",
            url: url1,
            params:{
               City: data.City,
               ProName:data.ProName,
               c:data.c,
               m:data.m,
               v:params.v
           }
        })
    }
}

export default new Apis();