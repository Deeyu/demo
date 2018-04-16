// 图片处理方法
export function handerAppImg(path,size){
    if(path){
         //fuss10.elemecdn.com/9/ec/1f13f62196de7301242a6cebbc8e0png.png?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/
        let hz=path.endsWith('png')?'.png':'.jpeg'
        return (
            'http://fuss10.elemecdn.com/'+path+hz+
            `?imageMogr/format/webp/thumbnail/!${size}x${size}r/gravity/Center/crop/${size}x${size}/`
        )
    }else{
        return ''
    }
}