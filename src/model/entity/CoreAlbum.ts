import { BaseEntity } from '@/model/BaseEntity'
import { FileInfo } from '@/model/FileInfo'

/**
 * 专辑
 * @author LL
 * @date 2022年04月01日 12点57分
 */
export class CoreAlbum implements BaseEntity {

    public static readonly TABLE_NAME = 'core_album'

    public _id: string

    /**
     * 标题
     */
    public title: string
    /**
     * 简介
     */
    public desc: string
    /**
     * 封面
     */
    public cover: FileInfo
    /**
     * 封面中的URL, 方便取用
     */
    public coverHref: string
    /**
     * 销售价
     * @type {string}
     */
    public sellingPrice: string
    /**
     * 包含的作品, 作品额外信息
     * @type {Array<any>}
     */
    public workList: Array<CoreAlbumWork>

    public createBy: string
    public createTime: number
    public updateBy: string
    public updateTime: number
    public viewers: ViewerType[]

}

//浏览人数
export class ViewerType {
    public _id: string
    public albumId: string
    public createTime: number
    public userId: string
    public workId: string
}

/**
 * 专辑中的作品信息
 */
export class CoreAlbumWork {
    /**
     * @see CoreAlbum._id
     */
    public _id: string

    /**
     * 别名
     * 如果存在, 覆盖 title
     * @see CoreAlbum.title
     */
    public alias: string

    /**
     * 是否免费默认否
     * 0 收费
     * 1 免费
     */
    public isPay: number

    /**
     * 试看时长
     * @type {number}
     */
    public trialTime: number

    /**
     * 排序
     */
    public sort: number

    public watchHistory: number

    /**
     * 判断付费状态, 需要付费吗?
     * @return 付费 true; 免费 false;
     * @param isPay
     */
    public static checkIsFree(isPay: number) {
        return isPay === 0
    }

}
