import { db } from '../cloud'

export async function getAlbumListApi(){
    const albumRes = await db.collection('core_album')
        .where({
            delFlag:0
        })
        .orderBy('updateTime','desc')
        .get()
    if(!albumRes.ok){
        throw new Error(albumRes.error)
    }
    return albumRes.data
}
