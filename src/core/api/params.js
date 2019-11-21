import qs from 'qs';

var query = qs.parse(location.search.slice(1))
// console.log(query)

var params = {
    userType:query.userType || "",
    token: query.token || "",
    v:new Date().getTime(),
}
export default params;