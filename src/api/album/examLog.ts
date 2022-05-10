import { DB } from '@/config/cloud'
import CoreStudentExamLog, { AnswerLog } from '@/model/entity/CoreStudentExamLog'
import { getUserInfo } from '@/utils/token'

export async function examLogApi(dotId: string, workerId: string, answerLogs: AnswerLog[]) {
    const data: Partial<CoreStudentExamLog> = {
        studentId: getUserInfo()._id,
        dotId,
        workerId,
        answerLogs,
        createTime: Date.now(),
        updateTime: Date.now(),
    }
    const res = await DB.collection(CoreStudentExamLog.TABLE_NAME)
        .add(data)
    if (!res.ok) {
        throw new Error(res.error)
    }
}
