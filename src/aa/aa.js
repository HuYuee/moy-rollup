import {z} from 'ss/ss';
import {zz} from './bb';
var zzz = function(){
    console.log('aa-zzz');
}
var ex = {
    // zzz:zzz,
    // z:z,
    // zz:zz
}
extend(ex,window.u || {});
window.u = ex;

export{
    ex as z,
    zzz
}
